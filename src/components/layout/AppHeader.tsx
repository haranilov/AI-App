import { LogoMarkIcon } from "@/components/icons";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { t } from "@/lib/translations";

/** Application header with brand, tagline, and theme toggle. */
export function AppHeader() {
  return (
    <header className="border-b border-border bg-header-bg backdrop-blur-md">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4 sm:px-6">
        <div className="flex items-center gap-2.5">
          <LogoMarkIcon />
          <span className="text-lg font-semibold tracking-tight text-text">
            {t.brandName}
          </span>
          <span className="hidden rounded-full bg-badge-bg px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-text-muted sm:inline">
            {t.brandBadge}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <p className="hidden text-xs text-text-muted sm:block">{t.tagline}</p>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
