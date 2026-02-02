import { useEffect, useRef, useState } from "react";
import {
  Volume2Icon,
  MaximizeIcon,
  PlayIcon,
  PauseIcon,
  SunIcon,
  MoonIcon,
} from "lucide-react";

import { useThemeStore } from "@/stores/theme-store";
import { cn } from "@/lib/util";

type ControlCenterProps = { isOpen: boolean };

export function ControlCenter({ isOpen }: ControlCenterProps) {
  const { theme, toggleTheme } = useThemeStore();

  const [brightness, setBrightness] = useState(100);
  const [volume, setVolume] = useState(50);
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio("/audio/xenogenesis-thefatrat.mp3");
    audioRef.current.loop = true;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.play().catch((e) => {
        console.error("Audio play failed:", e);
        setIsPlaying(false);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  useEffect(() => {
    const safeBrightness = Math.max(10, brightness);
    document.documentElement.style.filter = `brightness(${safeBrightness}%)`;

    return () => {
      document.documentElement.style.filter = "none";
    };
  }, [brightness]);

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

  return (
    <div
      className={cn(
        "absolute top-12 right-2 w-80 bg-control-bg backdrop-blur-2xl rounded-2xl border border-border-primary shadow-2xl p-4 flex flex-col gap-4 z-50 animate-in fade-in zoom-in-95 duration-200",
        isOpen
          ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
          : "opacity-0 scale-95 -translate-y-4 pointer-events-none",
      )}
    >
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
        <div className="size-12 bg-slate-800 rounded-md flex items-center justify-center shrink-0 overflow-hidden relative group">
          <img
            src="/images/xenogenesis-album-cover.jpg"
            alt="Xenogenesis Album Cover"
            className="absolute inset-0 h-full w-full object-cover"
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
