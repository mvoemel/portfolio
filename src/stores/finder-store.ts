import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { fileSystemRoot } from "@/lib/file-system";

interface FinderStore {
  currentDirectoryId: string;
  history: string[]; // Stack of folder IDs
  historyIndex: number; // Current position in stack

  changeDirectory: (id: string) => void;
  goBack: () => void;
  goForward: () => void;
}

export const useFinderStore = create<FinderStore>()(
  immer((set) => ({
    currentDirectoryId: fileSystemRoot.id,
    history: [fileSystemRoot.id],
    historyIndex: 0,

    changeDirectory: (id) =>
      set((state) => {
        if (state.currentDirectoryId === id) return;

        // Truncate forward history if we diverge
        const newHistory = state.history.slice(0, state.historyIndex + 1);
        newHistory.push(id);

        state.history = newHistory;
        state.historyIndex = newHistory.length - 1;
        state.currentDirectoryId = id;
      }),

    goBack: () =>
      set((state) => {
        if (state.historyIndex > 0) {
          state.historyIndex--;
          state.currentDirectoryId = state.history[state.historyIndex];
        }
      }),

    goForward: () =>
      set((state) => {
        if (state.historyIndex < state.history.length - 1) {
          state.historyIndex++;
          state.currentDirectoryId = state.history[state.historyIndex];
        }
      }),
  })),
);
