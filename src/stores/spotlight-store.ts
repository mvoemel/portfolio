import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface SpotlightStore {
  isOpen: boolean;
  openSpotlight: () => void;
  closeSpotlight: () => void;
  toggleSpotlight: () => void;
}

export const useSpotlightStore = create<SpotlightStore>()(
  immer((set) => ({
    isOpen: false,

    openSpotlight: () =>
      set((state) => {
        state.isOpen = true;
      }),

    closeSpotlight: () =>
      set((state) => {
        state.isOpen = false;
      }),

    toggleSpotlight: () =>
      set((state) => {
        state.isOpen = !state.isOpen;
      }),
  })),
);
