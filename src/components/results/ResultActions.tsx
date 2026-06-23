import { t } from "@/lib/translations";

interface ResultActionsProps {
  loading: boolean;
  copyAllDone: boolean;
  onShare: () => void;
  onCopyAll: () => void;
  onRegenerate: () => void;
}

/** Fixed bottom action bar for share, copy, and regenerate. */
export function ResultActions({
  loading,
  copyAllDone,
  onShare,
  onCopyAll,
  onRegenerate,
}: ResultActionsProps) {
  return (
    <div className="action-bar fixed bottom-0 left-0 right-0 z-30 border-t border-[#e8e8e8] bg-white dark:border-neutral-800 dark:bg-neutral-900">
      <div className="action-bar-inner">
        <ActionBarButton onClick={onShare} disabled={loading}>
          {t.shareBtn}
        </ActionBarButton>
        <ActionBarButton onClick={onCopyAll} disabled={loading}>
          {copyAllDone ? t.copiedAll : t.copyAll}
        </ActionBarButton>
        <ActionBarButton onClick={onRegenerate} disabled={loading} primary>
          {loading ? t.loadingEllipsis : t.regenerate}
        </ActionBarButton>
      </div>
    </div>
  );
}

function ActionBarButton({
  children,
  onClick,
  disabled,
  primary,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  primary?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`action-bar-btn flex min-h-11 min-w-0 flex-1 items-center justify-center rounded-xl px-2 py-2.5 text-sm font-semibold disabled:opacity-50 ${
        primary
          ? "bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900"
          : "border border-[#e8e8e8] bg-white text-gray-700 dark:border-neutral-700 dark:bg-neutral-800 dark:text-gray-200"
      }`}
    >
      <span className="truncate">{children}</span>
    </button>
  );
}
