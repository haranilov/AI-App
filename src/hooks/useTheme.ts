"use client";

import { useCallback, useEffect, useState } from "react";
import {
  applyTheme,
  getInitialTheme,
  THEME_STORAGE_KEY,
  type Theme,
} from "@/lib/theme";
import { syncNativeStatusBar } from "@/lib/nativeStatusBar";

interface UseThemeResult {
  theme: Theme;
  toggleTheme: () => void;
}

/**
 * Manages application theme state with localStorage persistence.
 */
export function useTheme(): UseThemeResult {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const initial = getInitialTheme();
    setTheme(initial);
    applyTheme(initial);
    syncNativeStatusBar(initial);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((current) => {
      const next: Theme = current === "light" ? "dark" : "light";
      localStorage.setItem(THEME_STORAGE_KEY, next);
      applyTheme(next);
      syncNativeStatusBar(next);
      return next;
    });
  }, []);

  return { theme, toggleTheme };
}
