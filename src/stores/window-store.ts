import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { WindowType, WindowConfig, FileSystemItem } from "@/lib/types";

const INITIAL_Z = 100;

interface WindowStore {
  windows: WindowConfig;
  nextZIndex: number;
  openWindow: (key: WindowType, data?: FileSystemItem) => void;
  closeWindow: (key: WindowType) => void;
  minimizeWindow: (key: WindowType) => void;
  toggleWindow: (key: WindowType) => void;
  focusWindow: (key: WindowType) => void;
}

const initialWindows: WindowConfig = {
  finder: { isOpen: false, isMinimized: false, zIndex: INITIAL_Z },
  safari: { isOpen: false, isMinimized: false, zIndex: INITIAL_Z },
  maps: { isOpen: false, isMinimized: false, zIndex: INITIAL_Z },
  contacts: { isOpen: false, isMinimized: false, zIndex: INITIAL_Z },
  terminal: { isOpen: false, isMinimized: false, zIndex: INITIAL_Z },
  preview: { isOpen: false, isMinimized: false, zIndex: INITIAL_Z },
};

export const useWindowStore = create<WindowStore>()(
  immer((set) => ({
    windows: initialWindows,
    nextZIndex: INITIAL_Z + 1,

    openWindow: (key, data) =>
      set((state) => {
        const win = state.windows[key];
        win.isOpen = true;
        win.isMinimized = false;
        win.zIndex = state.nextZIndex++;
        if (data) win.data = data;
      }),

    closeWindow: (key) =>
      set((state) => {
        const win = state.windows[key];
        win.isOpen = false;
        win.isMinimized = false;
        win.zIndex = INITIAL_Z;
        win.data = undefined;
      }),

    minimizeWindow: (key) =>
      set((state) => {
        state.windows[key].isMinimized = true;
      }),

    toggleWindow: (key) =>
      set((state) => {
        const win = state.windows[key];
        if (!win.isOpen) {
          win.isOpen = true;
          win.zIndex = state.nextZIndex++;
        } else if (win.isMinimized) {
          win.isMinimized = false;
          win.zIndex = state.nextZIndex++;
        } else {
          // If already open and focused, minimize it
          win.isMinimized = true;
        }
      }),

    focusWindow: (key) =>
      set((state) => {
        const win = state.windows[key];
        if (win.isOpen && !win.isMinimized) {
          win.zIndex = state.nextZIndex++;
        }
      }),
  })),
);
