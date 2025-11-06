import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface SettingState {
  theme: 'light' | 'dark';
  modified: boolean;
  dark: () => void; // Set theme to dark
  light: () => void; // Set theme to light
  onBrowserThemeChange: (isDarkMode: boolean) => void; // Handle browser theme change
}
export const useSettingStore = create<SettingState>()(
  persist(
    (set) => ({
      theme: 'light',
      modified: false,
      dark: () => {
        set(() => {
          document.body.classList.add('dark');
          return { theme: 'dark', modified: true };
        });
      },
      light: () => {
        set(() => {
          document.body.classList.remove('dark');
          return { theme: 'light', modified: true };
        });
      },
      onBrowserThemeChange: (isDarkMode: boolean) =>
        set((state: SettingState) => {
          if (!state.modified) {
            if (isDarkMode) {
              document.body.classList.add('dark');
            } else {
              document.body.classList.remove('dark');
            }
            return { theme: isDarkMode ? 'dark' : 'light' };
          }
          return {};
        }),
    }),
    {
      name: 'setting-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
