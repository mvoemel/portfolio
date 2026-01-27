import { locations } from "@/lib/constants";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const DEFAULT_LOCATION = locations.work;

type Location = (typeof locations)[keyof typeof locations];

interface LocationStore {
  activeLocation: Location;
  setActiveLocation: (location: Location) => void;
  resetActiveLocation: () => void;
}

export const useLocationStore = create<LocationStore>()(
  immer((set) => ({
    activeLocation: DEFAULT_LOCATION,
    setActiveLocation: (location) =>
      set((state) => {
        if (location === undefined) return;
        state.activeLocation = location;
      }),
    resetActiveLocation: () =>
      set((state) => {
        state.activeLocation = DEFAULT_LOCATION;
      }),
  })),
);
