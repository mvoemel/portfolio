import json
import logging
import os
import time

import requests
from kubernetes import client as k8s_client
from kubernetes import config as k8s_config
from prometheus_api_client import PrometheusConnect
from prometheus_client import Counter, Gauge, start_http_server

# Config
PROMETHEUS_URL = os.getenv(
    "PROMETHEUS_URL",
    "http://telemetry-kube-prometheus-prometheus.telemetry:9090",
)
KP = float(os.getenv("KP", "0.02"))
KI = float(os.getenv("KI", "0.0002"))
L_TARGET_MS = float(os.getenv("L_TARGET_MS", "150.0"))
INTERVAL_S = float(os.getenv("INTERVAL_S", "5"))
COOLDOWN_S = float(os.getenv("COOLDOWN_S", "10"))
CPU_MIN = int(os.getenv("CPU_MIN", "2"))
CPU_MAX = int(os.getenv("CPU_MAX", "10"))
RAY_NAMESPACE = os.getenv("RAY_NAMESPACE", "ray-system")
# Fraction of current CPU limit change that triggers an oscillation warning
OSCILLATION_THRESHOLD = float(os.getenv("OSCILLATION_THRESHOLD", "0.30"))
DEADBAND_MS = float(os.getenv("DEADBAND_MS", "10.0"))
# Cap windup at 2000 ms*s regardless of KI
WINDUP_LIMIT = min((CPU_MAX - CPU_MIN) / KI if KI > 0 else 1e9, 2000.0)


# Prometheus metrics (exported on :8080/metrics, scraped by kube-prometheus)
_m_p95       = Gauge("qos_p95_latency_ms",     "Observed P95 ingress latency (ms)")
_m_error     = Gauge("qos_error_ms",            "Control error: observed P95 - SLA target (ms)")
_m_integral  = Gauge("qos_integral",            "PI integral accumulator")
_m_cpu_limit = Gauge("qos_cpu_limit_cores",     "Applied CPU limit per Ray worker", ["pod"])
_m_patches   = Counter("qos_patches_total",     "Total CPU limit patches applied")
_m_osc       = Counter("qos_oscillations_total","Patches flagged as oscillation (>30% swing)")


# Logging
class _JsonFormatter(logging.Formatter):
    def format(self, record: logging.LogRecord) -> str:
        entry: dict = {
            "ts": self.formatTime(record, self.datefmt),
            "level": record.levelname,
            "msg": record.getMessage(),
        }
        if hasattr(record, "extra"):
            entry.update(record.extra)
        return json.dumps(entry)


_handler = logging.StreamHandler()
_handler.setFormatter(_JsonFormatter())
logger = logging.getLogger("qos-controller")
logger.addHandler(_handler)
logger.setLevel(logging.INFO)


def log(msg: str, **kwargs) -> None:
    record = logger.makeRecord(logger.name, logging.INFO, "", 0, msg, (), None)
    record.extra = kwargs  # type: ignore[attr-defined]
    logger.handle(record)


def log_error(msg: str, **kwargs) -> None:
    record = logger.makeRecord(logger.name, logging.ERROR, "", 0, msg, (), None)
    record.extra = kwargs  # type: ignore[attr-defined]
    logger.handle(record)


# Prometheus query
PROMQL = (
    'histogram_quantile(0.95,'
    ' sum(rate('
    '  http_request_duration_seconds_bucket{'
    '   namespace="ticket-app",'
    '   service!="payments-srv"'
    ' }[60s])) by (le)'
    ') * 1000'
)


def query_p95(prom: PrometheusConnect) -> float | None:
    result = prom.custom_query(query=PROMQL)
    if not result:
        return None
    try:
        value = float(result[0]["value"][1])
        if value != value:  # NaN check
            return None
        return value
    except (KeyError, IndexError, ValueError):
        return None


# Kubernetes helpers
def _k8s_api() -> k8s_client.CoreV1Api:
    try:
        k8s_config.load_incluster_config()
    except k8s_config.ConfigException:
        k8s_config.load_kube_config()
    return k8s_client.CoreV1Api()


def get_worker_pods(v1: k8s_client.CoreV1Api) -> list:
    pods = v1.list_namespaced_pod(
        namespace=RAY_NAMESPACE,
        label_selector="ray.io/node-type=worker",
    )
    return [p for p in pods.items if p.status.phase == "Running"]


def parse_cpu(val: str | None) -> float:
    if val is None:
        return float(CPU_MAX)
    if val.endswith("m"):
        return float(val[:-1]) / 1000.0
    return float(val)


def get_current_cpu_limit(pod) -> float:
    try:
        limits = pod.spec.containers[0].resources.limits or {}
        return parse_cpu(limits.get("cpu"))
    except (AttributeError, IndexError):
        return float(CPU_MAX)


def patch_pod_cpu(pod_name: str, cpu_cores: int) -> None:
    token_path = "/var/run/secrets/kubernetes.io/serviceaccount/token"
    ca_path = "/var/run/secrets/kubernetes.io/serviceaccount/ca.crt"

    try:
        token = open(token_path).read().strip()
        verify: str | bool = ca_path
    except FileNotFoundError:
        token = ""
        verify = False

    body = {
        "spec": {
            "containers": [
                {
                    "name": "ray-worker",
                    "resources": {
                        "limits": {"cpu": str(cpu_cores)},
                        "requests": {"cpu": str(cpu_cores)},
                    },
                }
            ]
        }
    }

    headers = {"Content-Type": "application/strategic-merge-patch+json"}
    if token:
        headers["Authorization"] = f"Bearer {token}"

    resp = requests.patch(
        f"https://kubernetes.default.svc/api/v1/namespaces/{RAY_NAMESPACE}/pods/{pod_name}/resize",
        json=body,
        headers=headers,
        verify=verify,
        timeout=10,
    )
    resp.raise_for_status()


# Control loop
def run() -> None:
    start_http_server(8080)  # expose /metrics for Prometheus scraping

    log("startup", event="startup", config={
        "KP": KP, "KI": KI, "L_TARGET_MS": L_TARGET_MS,
        "INTERVAL_S": INTERVAL_S, "COOLDOWN_S": COOLDOWN_S,
        "CPU_MIN": CPU_MIN, "CPU_MAX": CPU_MAX,
        "RAY_NAMESPACE": RAY_NAMESPACE, "PROMETHEUS_URL": PROMETHEUS_URL,
        "OSCILLATION_THRESHOLD": OSCILLATION_THRESHOLD,
    })

    prom = PrometheusConnect(url=PROMETHEUS_URL, disable_ssl=True)
    v1 = _k8s_api()

    integral = 0.0
    last_patch_time = 0.0
    prev_cpu_by_pod: dict[str, float] = {}  # tracks previous limit per pod for oscillation detection
    _saturated = False  # tracks whether last act was clamped at CPU bounds (anti-windup)

    while True:
        time.sleep(INTERVAL_S)

        # 1. Observe
        try:
            p95_ms = query_p95(prom)
        except Exception as exc:
            log_error("prometheus_error", event="prometheus_error", error=str(exc))
            continue

        if p95_ms is None:
            log("no_data", event="no_data")
            continue

        _m_p95.set(p95_ms)

        # 2. Analyze
        error_ms = p95_ms - L_TARGET_MS
        if not _saturated:
            integral += error_ms * INTERVAL_S
        integral = max(-WINDUP_LIMIT, min(WINDUP_LIMIT, integral))
        u = KP * error_ms + KI * integral

        _m_error.set(error_ms)
        _m_integral.set(integral)

        log("cycle", event="cycle", p95_ms=round(p95_ms, 2),
            error_ms=round(error_ms, 2), u=round(u, 3),
            integral=round(integral, 3))

        # 3. Act
        if abs(error_ms) < DEADBAND_MS:
            continue

        now = time.time()
        remaining = COOLDOWN_S - (now - last_patch_time)
        if remaining > 0:
            log("cooldown_skip", event="cooldown_skip",
                seconds_remaining=round(remaining, 1))
            continue

        try:
            workers = get_worker_pods(v1)
        except Exception as exc:
            log_error("k8s_list_error", event="k8s_list_error", error=str(exc))
            continue

        if not workers:
            log("no_workers", event="no_workers")
            continue

        patched = False
        any_saturated = False
        for pod in workers:
            current_cpu = get_current_cpu_limit(pod)
            new_cpu_raw = current_cpu - u
            new_cpu = int(max(CPU_MIN, min(CPU_MAX, round(new_cpu_raw))))
            if round(new_cpu_raw) < CPU_MIN or round(new_cpu_raw) > CPU_MAX:
                any_saturated = True
            if new_cpu == int(current_cpu):
                continue

            # Oscillation detection
            prev_cpu = prev_cpu_by_pod.get(pod.metadata.name, current_cpu)
            if prev_cpu > 0:
                swing = abs(new_cpu - prev_cpu) / prev_cpu
                if swing > OSCILLATION_THRESHOLD:
                    _m_osc.inc()
                    log("oscillation_warning", event="oscillation_warning",
                        pod=pod.metadata.name, prev_cpu=prev_cpu,
                        new_cpu=new_cpu, swing_pct=round(swing * 100, 1))

            try:
                patch_pod_cpu(pod.metadata.name, new_cpu)
                _m_cpu_limit.labels(pod=pod.metadata.name).set(new_cpu)
                _m_patches.inc()
                prev_cpu_by_pod[pod.metadata.name] = float(new_cpu)
                log("patch", event="patch", pod=pod.metadata.name,
                    old_cpu=current_cpu, new_cpu=new_cpu)
                patched = True
            except Exception as exc:
                log_error("patch_error", event="patch_error",
                          pod=pod.metadata.name, error=str(exc))

        _saturated = any_saturated
        if patched:
            last_patch_time = time.time()


if __name__ == "__main__":
    run()
