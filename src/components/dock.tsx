import { useRef } from "react";
import { Tooltip } from "react-tooltip";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { useWindowStore } from "@/stores/window-store";
import { dockApps, iconsSrc } from "@/lib/constants";
import { cn } from "@/lib/util";
import type { WindowType } from "@/lib/types";

export function Dock() {
  const { windows, toggleWindow } = useWindowStore();
  const dockRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    const dock = dockRef.current;
    if (!dock) return;

    const icons = dock.querySelectorAll(".dock-icon");

    const animateIcons = (mouseX: number) => {
      const { left } = dock.getBoundingClientRect();

      icons.forEach((icon) => {
        const { left: iconLeft, width } = icon.getBoundingClientRect();
        const center = iconLeft - left + width / 2;
        const distance = Math.abs(mouseX - center);
        const intensity = Math.exp(-(distance ** 2.5) / 20_000);

        gsap.to(icon, {
          scale: 1 + 0.25 * intensity,
          y: -15 * intensity,
          duration: 0.2,
          ease: "power1.out",
        });
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      const { left } = dock.getBoundingClientRect();

      animateIcons(e.clientX - left);
    };

    const resetIcons = () =>
      icons.forEach((icon) =>
        gsap.to(icon, {
          scale: 1,
          y: 0,
          duration: 0.3,
          ease: "power1.out",
        }),
      );

    dock.addEventListener("mousemove", handleMouseMove);
    dock.addEventListener("mouseleave", resetIcons);

    return () => {
      dock.removeEventListener("mousemove", handleMouseMove);
      dock.removeEventListener("mouseleave", resetIcons);
    };
  }, []);

  return (
    <section
      id="dock"
      className="absolute bottom-5 left-1/2 -translate-x-1/2 z-50 select-none max-sm:hidden"
    >
      <div
        ref={dockRef}
        className="bg-dock-bg border-dock-border backdrop-blur-md justify-between rounded-2xl p-1.5 flex items-end gap-1.5"
      >
        {[
          ...dockApps,
          // TODO: refactor
          {
            type: "trash" as WindowType,
            tooltip: "Trash",
            icon: iconsSrc.folders.trash,
            canOpen: false,
          },
        ].map(({ type, tooltip, icon, canOpen }) => (
          <div
            key={`${type}-${tooltip}`}
            className="relative flex flex-col justify-center items-center"
          >
            <button
              type="button"
              className={cn(
                "dock-icon size-14 3xl:size-20 cursor-pointer",
                !canOpen && "opacity-50",
              )}
              aria-label={tooltip}
              data-tooltip-id="dock-tooltip"
              data-tooltip-content={tooltip}
              data-tooltip-delay-show={150}
              disabled={!canOpen}
              onClick={() => canOpen && toggleWindow(type)}
            >
              <img
                src={icon}
                alt={tooltip}
                loading="lazy"
                className={cn(
                  "object-cover object-center",
                  !canOpen && "opacity-60",
                )}
              />
            </button>

            <div
              className={cn(
                "size-1 rounded-full",
                (windows[type]?.isMinimized || windows[type]?.isOpen) &&
                  "bg-text-tertiary",
              )}
            />
          </div>
        ))}

        <Tooltip
          id="dock-tooltip"
          place="top"
          className="py-1! px-3! w-fit! text-center! text-xs! rounded-md! bg-bg-sunken! text-text-secondary! shadow-2xl!"
        />
      </div>
    </section>
  );
}
