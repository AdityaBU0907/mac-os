import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { INITIAL_Z_INDEX, WINDOW_CONFIG } from "#constants";

const useWindowStore = create(
  immer((set) => ({
    windows: WINDOW_CONFIG,
    nextZIndex: INITIAL_Z_INDEX + 1,

    // 1. OPEN: Opens window OR focuses it if already open
    openWindow: (windowKey, data = null) =>
      set((state) => {
        const win = state.windows[windowKey];
        if (!win) return;

        // Optimization: If already open, just focus it
        if (win.isOpen) {
          // Check if it is ALREADY the top window to avoid re-render
          if (win.zIndex === state.nextZIndex - 1) return;
          
          win.zIndex = state.nextZIndex;
          state.nextZIndex++;
          return;
        }

        // Standard Open Logic
        win.isOpen = true;
        win.zIndex = state.nextZIndex;
        if (data) win.data = data;
        state.nextZIndex++;
      }),

    // 2. CLOSE: Only runs if window is actually open
    closeWindow: (windowKey) =>
      set((state) => {
        const win = state.windows[windowKey];
        // Optimization: Don't trigger update if already closed
        if (!win || !win.isOpen) return;

        win.isOpen = false;
        win.zIndex = INITIAL_Z_INDEX;
        win.data = null;
      }),

    // 3. FOCUS: Brings window to front
    focusWindow: (windowKey) =>
      set((state) => {
        const win = state.windows[windowKey];
        if (!win || !win.isOpen) return;

        // Optimization: CRITICAL - Stop re-render if already on top
        if (win.zIndex === state.nextZIndex - 1) return;

        win.zIndex = state.nextZIndex;
        state.nextZIndex++;
      }),

    // 4. TOGGLE: Helper for Dock (Cleaner component code)
    toggleWindow: (windowKey) =>
      set((state) => {
        const win = state.windows[windowKey];
        if (!win) return;

        if (win.isOpen) {
           // If it's the top window, close/minimize it
           // (You can add specific 'minimize' logic here later if you want)
           win.isOpen = false;
           win.zIndex = INITIAL_Z_INDEX;
        } else {
           win.isOpen = true;
           win.zIndex = state.nextZIndex;
           state.nextZIndex++;
        }
      }),
  }))
);

export default useWindowStore;