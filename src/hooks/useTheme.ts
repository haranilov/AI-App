"use client";

import { useCallback, useEffect, useState } from "react";
import { applyTheme, getStoredTheme, setStoredTheme, type Theme } from "@/lib/theme";

/**
 * Manages light/dark theme state with localStorage persistence.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const initial = getStoredTheme();
    setTheme(initial);
    applyTheme(initial);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((current) => {
      const next: Theme = current === "light" ? "dark" : "light";
      setStoredTheme(next);
      void import("@/lib/nativeStatusBar").then(({ syncNativeStatusBar }) =>
        syncNativeStatusBar(next),
      );
      return next;
    });
  }, []);

  return { theme, toggleTheme };
}
