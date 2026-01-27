import { INITIAL_Z_INDEX, WINDOW_CONFIG } from "@/lib/constants";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface WindowState<T = unknown> {
  isOpen: boolean;
  zIndex: number;
  data: T | null;
}

type Windows = {
  [key: string]: WindowState;
};

interface WindowStore {
  windows: Windows;
  nextZIndex: number;
  openWindow: (windowKey: string, data?: unknown) => void;
  closeWindow: (windowKey: string) => void;
  focusWindow: (windowKey: string) => void;
}

export const useWindowStore = create<WindowStore>()(
  immer((set) => ({
    windows: WINDOW_CONFIG,
    nextZIndex: INITIAL_Z_INDEX + 1,
    openWindow: (windowKey: string, data = null) =>
      set((state) => {
        const win = state.windows[windowKey];
        if (!win) return;
        win.isOpen = true;
        win.zIndex = state.nextZIndex;
        win.data = data ?? win.data;
        state.nextZIndex++;
      }),
    closeWindow: (windowKey: string) =>
      set((state) => {
        const win = state.windows[windowKey];
        if (!win) return;
        win.isOpen = false;
        win.zIndex = INITIAL_Z_INDEX;
        win.data = null;
      }),
    focusWindow: (windowKey: string) =>
      set((state) => {
        const win = state.windows[windowKey];
        if (!win) return;
        win.zIndex = state.nextZIndex;
        state.nextZIndex++;
      }),
  })),
);
