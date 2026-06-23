"use client";

import { useTheme } from "@/hooks/useTheme";
import { t } from "@/lib/translations";

/** Button that toggles between light and dark mode. */
export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="touch-target touch-active flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] border border-[#e8e8e8] bg-white text-gray-700 shadow-sm dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200"
      aria-label={isDark ? t.themeSwitchLight : t.themeSwitchDark}
      title={isDark ? t.themeSwitchLight : t.themeSwitchDark}
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}

function MoonIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
      />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
  );
}
