import { create } from "zustand";
import { persist } from "zustand/middleware";

const useThemeStore = create(
  persist(
    (set) => ({
      darkMode: false, // Initial mode is light
      toggleDarkMode: () => {
        set((state: any) => {
          const newMode = !state.darkMode;
          // Update the body class
          document.body.classList.toggle("dark", newMode);
          return { darkMode: newMode };
        });
      },
      initializeTheme: () => {
        set((state: any) => {
          // Retrieve the current mode from persisted state
          const savedMode =
            typeof window !== "undefined" &&
            localStorage.getItem("theme-storage")
              ? JSON.parse(localStorage.getItem("theme-storage") || "{}").state
                  .darkMode
              : false;

          // Apply the theme to the document body
          document.body.classList.toggle("dark", savedMode);
          return { darkMode: savedMode };
        });
      },
    }),
    {
      name: "theme-storage", // Unique key for localStorage
    }
  )
);

export default useThemeStore;
