import { t } from "@/lib/translations";

/** Loading placeholder shown while generating content. */
export function LoadingBlock() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="mb-4 h-10 w-10 animate-spin-slow rounded-full border-2 border-gray-200 border-t-gray-900" />
      <p className="text-sm font-medium text-gray-700">{t.loadingText}</p>
      <p className="mt-1 text-xs text-gray-500">{t.loadingSubtext}</p>
    </div>
  );
}
