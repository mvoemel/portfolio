import { useState, useEffect } from "react";
import dayjs from "dayjs";

export function Clock() {
  const [time, setTime] = useState(dayjs());

  useEffect(() => {
    const timer = setInterval(() => setTime(dayjs()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <time className="text-sm font-medium text-text-primary tabular-nums min-w-20 text-center">
      {time.format("ddd D MMM H:mm")}
    </time>
  );
}
