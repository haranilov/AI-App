import { t } from "@/lib/translations";

interface ResultActionsProps {
  copyAllDone: boolean;
  loading: boolean;
  onCopyAll: () => void;
  onRegenerate: () => void;
}

/** Copy-all and regenerate action buttons for generated results. */
export function ResultActions({
  copyAllDone,
  loading,
  onCopyAll,
  onRegenerate,
}: ResultActionsProps) {
  const buttonClass =
    "inline-flex items-center gap-1.5 rounded-[12px] border border-border bg-button-secondary px-4 py-2 text-sm font-medium text-text-secondary shadow-sm transition-colors hover:bg-button-secondary-hover disabled:opacity-50";

  return (
    <div className="flex gap-2">
      <button type="button" onClick={onCopyAll} disabled={loading} className={buttonClass}>
        {copyAllDone ? t.copiedAll : t.copyAll}
      </button>
      <button type="button" onClick={onRegenerate} disabled={loading} className={buttonClass}>
        {loading ? t.generating : t.regenerate}
      </button>
    </div>
  );
}
