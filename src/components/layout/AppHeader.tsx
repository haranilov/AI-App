import { LogoMarkIcon } from "@/components/icons";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { t } from "@/lib/translations";

/** Sticky app header with brand, tagline, and theme toggle. */
export function AppHeader() {
  return (
    <>
      <div className="app-header-spacer" aria-hidden />
      <header className="app-header border-b border-[#e8e8e8] bg-white dark:border-neutral-800 dark:bg-neutral-900">
      <div className="mx-auto flex max-w-lg items-center justify-between px-4 py-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <LogoMarkIcon />
          <div className="min-w-0">
            <span className="block text-lg font-semibold tracking-tight text-gray-900 dark:text-gray-100">
              {t.appName}
            </span>
            <span className="block truncate text-[11px] text-gray-500 dark:text-gray-400">
              {t.tagline}
            </span>
          </div>
        </div>
        <ThemeToggle />
      </div>
    </header>
    </>
  );
}
