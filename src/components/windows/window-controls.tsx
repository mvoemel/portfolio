import { useWindowStore } from "@/stores/window-store";
import type { WindowType } from "@/lib/types";
import { useFinderStore } from "@/stores/finder-store";

type WindowControlsProps = {
  target: WindowType;
};

export function WindowControls({ target }: WindowControlsProps) {
  const { closeWindow, minimizeWindow } = useWindowStore();
  const { reset } = useFinderStore();

  const handleWindowClose = () => {
    if (target === "finder") reset();

    closeWindow(target);
  };

  const handleMinimizeWindow = () => minimizeWindow(target);

  return (
    <section className="flex gap-2">
      <div
        className="size-3.5 rounded-full bg-traffic-close hover:bg-traffic-close-hover cursor-pointer"
        onClick={handleWindowClose}
      />
      <div
        className="size-3.5 rounded-full bg-traffic-minimize hover:bg-traffic-minimize-hover cursor-pointer"
        onClick={handleMinimizeWindow}
      />
      <div className="size-3.5 rounded-full bg-traffic-maximize hover:bg-traffic-maximize" />
    </section>
  );
}
