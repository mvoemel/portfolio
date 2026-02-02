import { type ComponentType, useLayoutEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Draggable } from "gsap/all";

import { useWindowStore } from "@/stores/window-store";
import type { WindowType } from "@/lib/types";
import { cn } from "@/lib/util";

// TODO: fix focus bug; window does not focus if inside click only if header click
export function WindowWrapper<P extends object>(
  Component: ComponentType<P>,
  windowKey: WindowType,
  className?: string,
) {
  const Wrapped = (props: P) => {
    const { focusWindow, windows } = useWindowStore();
    const { isOpen, isMinimized, zIndex } = windows[windowKey];
    const ref = useRef<HTMLDivElement | null>(null);

    const handleFocus = () => {
      focusWindow(windowKey);
    };

    useGSAP(() => {
      const el = ref.current;
      if (!el || !isOpen) return;

      el.style.display = "block";

      gsap.fromTo(
        el,
        { scale: 0.8, opacity: 0, y: 40 },
        { scale: 1, opacity: 1, y: 0, duration: 0.2, ease: "power3.out" },
      );
    }, [isOpen]);

    useGSAP(() => {
      const el = ref.current;
      if (!el) return;

      const header = el.querySelector(".window-header");

      const [instance] = Draggable.create(el, {
        trigger: header,
        dragClickables: false,
      });

      return () => instance.kill();
    }, []);

    useLayoutEffect(() => {
      const el = ref.current;
      if (!el) return;

      el.style.display = isOpen && !isMinimized ? "block" : "none";
    }, [isOpen, isMinimized]);

    return (
      <section
        id={windowKey}
        ref={ref}
        style={{ zIndex }}
        onMouseDownCapture={handleFocus}
        className={cn("absolute", className)}
      >
        <Component {...props} />
      </section>
    );
  };

  Wrapped.displayName = `WindowWrapper(${Component.displayName || Component.name || "Component"})`;

  return Wrapped;
}
