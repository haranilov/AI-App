/** localStorage key for theme preference. */
export const THEME_STORAGE_KEY = "hookai-theme";

/** Supported color themes. */
export type Theme = "light" | "dark";

/**
 * Applies the theme class on the document root.
 * @param theme - Light or dark mode.
 */
export function applyTheme(theme: Theme): void {
  document.documentElement.classList.toggle("dark", theme === "dark");
}

/**
 * Reads the stored theme or falls back to system preference.
 */
export function getStoredTheme(): Theme {
  if (typeof window === "undefined") return "light";
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    /* ignore */
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

/**
 * Persists and applies a theme preference.
 * @param theme - Light or dark mode.
 */
export function setStoredTheme(theme: Theme): void {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    /* ignore */
  }
  applyTheme(theme);
}
