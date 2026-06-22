import { t } from "@/lib/translations";

/** Loading state shown while waiting for the first generation result. */
export function LoadingBlock() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-4 h-10 w-10 animate-spin-slow rounded-full border-2 border-spinner-track border-t-text" />
      <p className="text-sm font-medium text-text-secondary">{t.loadingText}</p>
      <p className="mt-1 text-xs text-text-muted">{t.loadingSubtext}</p>
    </div>
  );
}
