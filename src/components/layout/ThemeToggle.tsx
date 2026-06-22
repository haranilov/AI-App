"use client";

import { MoonIcon, SunIcon } from "@/components/icons";
import { useTheme } from "@/hooks/useTheme";
import { t } from "@/lib/translations";

/** Button that toggles between light and dark application themes. */
export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex h-8 w-8 items-center justify-center rounded-[10px] border border-border bg-card text-text-secondary shadow-sm transition-colors hover:bg-button-secondary-hover focus:outline-none focus:ring-2 focus:ring-focus"
      title={isDark ? t.themeSwitchToLight : t.themeSwitchToDark}
      aria-label={isDark ? t.themeSwitchToLight : t.themeSwitchToDark}
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
