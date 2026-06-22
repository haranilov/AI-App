import { t } from "@/lib/translations";

/** Fixed footer with application branding. */
export function AppFooter() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 border-t border-border bg-footer-bg py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] text-center text-xs text-text-faint backdrop-blur-sm">
      {t.footer}
    </footer>
  );
}
