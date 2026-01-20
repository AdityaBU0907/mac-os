import { create } from "zustand";
import { persist } from "zustand/middleware";

const useThemeStore = create(
  persist(
    (set) => ({
      theme: "dark", // Default to dark mode (since you like Arch/Cyberpunk themes)
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === "light" ? "dark" : "light",
        })),
    }),
    {
      name: "os-theme-storage", // Unique name for localStorage
    }
  )
);

export default useThemeStore;