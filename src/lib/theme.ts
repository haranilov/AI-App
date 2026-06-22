/** Supported application color themes. */
export type Theme = "light" | "dark";

/** localStorage key used to persist the user's theme preference. */
export const THEME_STORAGE_KEY = "hookai-theme";

/**
 * Applies the theme class to the document root element.
 * @param theme - Theme to activate
 */
export function applyTheme(theme: Theme): void {
  document.documentElement.classList.toggle("dark", theme === "dark");
}

/**
 * Reads the stored theme or falls back to the system preference.
 */
export function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "light";

  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === "light" || stored === "dark") return stored;

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

/** Inline script that sets the theme before first paint to avoid flashing. */
export const themeInitScript = `(function(){try{var s=localStorage.getItem("${THEME_STORAGE_KEY}");var t=s==="dark"||s==="light"?s:(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");document.documentElement.classList.toggle("dark",t==="dark");}catch(e){}})();`;
