import Link from "next/link";
import { t } from "@/lib/translations";

/** Footer with legal links. */
export function AppFooter() {
  return (
    <footer className="app-footer mt-10 border-t border-[#e8e8e8] pt-6 text-center text-xs text-gray-400 dark:border-neutral-800 dark:text-gray-500">
      <p>{t.footer}</p>
      <p className="mt-2 flex items-center justify-center gap-4">
        <Link
          href="/privacy/"
          className="touch-target inline-flex items-center underline-offset-2 active:text-gray-600"
        >
          {t.privacyLink}
        </Link>
        <Link
          href="/terms/"
          className="touch-target inline-flex items-center underline-offset-2 active:text-gray-600"
        >
          {t.termsLink}
        </Link>
      </p>
    </footer>
  );
}
