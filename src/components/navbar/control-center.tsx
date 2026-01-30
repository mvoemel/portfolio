import { useState } from "react";
import {
  Volume2Icon,
  MaximizeIcon,
  PlayIcon,
  PauseIcon,
  SunIcon,
  MoonIcon,
} from "lucide-react";

import { useThemeStore } from "@/stores/theme-store";

type ControlCenterProps = { isOpen: boolean };

export function ControlCenter({ isOpen }: ControlCenterProps) {
  const { theme, toggleTheme } = useThemeStore();

  // TODO: implement
  const [brightness, setBrightness] = useState(100);
  // TODO: implement
  const [volume, setVolume] = useState(75);
  // TODO: implement
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.error("Error toggling fullscreen:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="absolute top-12 right-2 w-80 bg-control-bg backdrop-blur-2xl rounded-2xl border border-border-primary shadow-2xl p-4 flex flex-col gap-4 z-50 animate-in fade-in zoom-in-95 duration-200">
      <div className="grid grid-cols-2 gap-4">
        <button
          className="flex items-center gap-3 p-3 bg-control-card hover:bg-control-card-hover transition-colors rounded-xl shadow-sm border border-border-secondary"
          onClick={toggleFullscreen}
        >
          <div className="bg-primary text-white p-2 rounded-full">
            <MaximizeIcon size={16} />
          </div>
          <span className="font-medium text-sm text-text-secondary">
            Fullscreen
          </span>
        </button>
        <button
          className="flex items-center gap-3 p-3 bg-control-card hover:bg-control-card-hover transition-colors rounded-xl shadow-sm border border-border-secondary"
          onClick={toggleTheme}
        >
          <div className="bg-primary text-white p-2 rounded-full">
            {theme === "light" && <SunIcon size={16} />}
            {theme === "dark" && <MoonIcon size={16} />}
          </div>
          <span className="font-medium text-sm text-text-secondary">Theme</span>
        </button>
      </div>

      <div className="bg-control-card p-4 rounded-xl border border-border-secondary shadow-sm">
        <div className="flex justify-between mb-2">
          <span className="font-medium text-sm text-text-secondary">
            Display
          </span>
        </div>
        <div className="relative flex items-center gap-3">
          <SunIcon size={16} className="text-text-tertiary" />
          <input
            type="range"
            min="0"
            max="100"
            value={brightness}
            onChange={(e) => setBrightness(Number(e.target.value))}
            className="w-full h-2 bg-bg-tertiary rounded-lg appearance-none cursor-pointer accent-primary"
          />
        </div>
      </div>

      <div className="bg-control-card p-4 rounded-xl border border-border-secondary shadow-sm">
        <div className="flex justify-between mb-2">
          <span className="font-medium text-sm text-text-secondary">Sound</span>
        </div>
        <div className="relative flex items-center gap-3">
          <Volume2Icon size={16} className="text-text-tertiary" />
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="w-full h-2 bg-bg-tertiary rounded-lg appearance-none cursor-pointer accent-primary"
          />
        </div>
      </div>

      <div className="bg-control-card p-3 rounded-xl border border-border-secondary shadow-sm flex items-center gap-3">
        <div className="w-12 h-12 bg-slate-800 rounded-md flex items-center justify-center shrink-0 overflow-hidden relative group">
          {/* TODO: use actual album cover */}
          <div className="absolute inset-0 bg-linear-to-br from-indigo-500 to-purple-600" />
          <PlayIcon
            size={20}
            className="text-text-primary relative z-10 opacity-0 group-hover:opacity-100 transition-opacity"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-sm text-text-secondary truncate">
            Xenogenesis
          </p>
          <p className="text-xs text-text-secondary truncate">TheFatRat</p>
        </div>
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="p-2 text-text-secondary hover:bg-control-card-hover rounded-full transition-colors"
        >
          {isPlaying ? <PauseIcon size={20} /> : <PlayIcon size={20} />}
        </button>
      </div>
    </div>
  );
}
