import { useWindowStore } from "@/stores/window-store";
import { cn } from "@/lib/util";

export function Debug() {
  const { windows } = useWindowStore();

  return (
    <div className="z-5000 absolute bottom-5 right-5 flex flex-col items-start bg-bg-primary text-text-primary p-4 rounded-lg">
      {Object.entries(windows).map(([windowName, config]) => (
        <span key={windowName} className="flex items-center gap-2">
          <span className="font-bold">{windowName}:</span>
          <div
            className={cn(
              "size-2 rounded-full",
              config.isOpen ? "bg-green-500" : "bg-red-500",
            )}
          />{" "}
          open,
          <div
            className={cn(
              "size-2 rounded-full",
              config.isMinimized ? "bg-green-500" : "bg-red-500",
            )}
          />{" "}
          minimized,
          <span className="font-semibold">{config.zIndex}</span> Zidx
        </span>
      ))}
    </div>
  );
}
