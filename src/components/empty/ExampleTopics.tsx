import { t } from "@/lib/translations";

interface ExampleTopicsProps {
  onSelect: (topic: string) => void;
}

/** Empty-state example topic chips. */
export function ExampleTopics({ onSelect }: ExampleTopicsProps) {
  return (
    <div className="rounded-2xl border border-dashed border-[#e0e0e0] bg-white/60 px-4 py-8 text-center dark:border-neutral-700 dark:bg-neutral-900/60">
      <p className="mb-3 text-sm text-gray-500">{t.exampleTopics}</p>
      <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
        <ExampleChip label={t.example1Label} onSelect={() => onSelect(t.example1Topic)} />
        <ExampleChip label={t.example2Label} onSelect={() => onSelect(t.example2Topic)} />
      </div>
    </div>
  );
}

function ExampleChip({ label, onSelect }: { label: string; onSelect: () => void }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="touch-target touch-active rounded-full border border-[#e8e8e8] bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm active:bg-gray-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-gray-200 dark:active:bg-neutral-700"
    >
      {label}
    </button>
  );
}
