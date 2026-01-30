import { useWindowStore } from "@/stores/window-store";
import type { WindowType } from "@/lib/types";

type WindowControlsProps = {
  target: WindowType;
};

export function WindowControls({ target }: WindowControlsProps) {
  const { closeWindow, minimizeWindow } = useWindowStore();

  return (
    <section className="flex gap-2">
      <div
        className="size-3.5 rounded-full bg-traffic-close hover:bg-traffic-close-hover cursor-pointer"
        onClick={() => closeWindow(target)}
      />
      <div
        className="size-3.5 rounded-full bg-traffic-minimize hover:bg-traffic-minimize-hover cursor-pointer"
        onClick={() => minimizeWindow(target)}
      />
      <div className="size-3.5 rounded-full bg-traffic-maximize hover:bg-traffic-maximize" />
    </section>
  );
}
