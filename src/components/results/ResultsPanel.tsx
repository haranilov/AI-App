import { CopyableItem } from "@/components/CopyableItem";
import { ResultCard } from "@/components/ResultCard";
import { HookIcon, ScriptIcon, TitleIcon } from "@/components/icons";
import { ResultActions } from "@/components/results/ResultActions";
import { t } from "@/lib/translations";
import type { GenerateResponse } from "@/types/generate";

interface ResultsPanelProps {
  result: GenerateResponse;
  loading: boolean;
  copyAllDone: boolean;
  onCopyAll: () => void;
  onRegenerate: () => void;
}

/** Displays generated hooks, titles, and script with actions. */
export function ResultsPanel({
  result,
  loading,
  copyAllDone,
  onCopyAll,
  onRegenerate,
}: ResultsPanelProps) {
  return (
    <div className={loading ? "pointer-events-none opacity-60" : ""}>
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-text-muted">
            {loading ? t.regenerating : t.done(result.hooks.length, result.titles.length)}
          </p>
          <ResultActions
            copyAllDone={copyAllDone}
            loading={loading}
            onCopyAll={onCopyAll}
            onRegenerate={onRegenerate}
          />
        </div>

        <ResultCard title={t.hooksTitle} subtitle={t.hooksSubtitle} icon={<HookIcon />}>
          {result.hooks.map((hook, i) => (
            <CopyableItem key={`hook-${i}`} text={hook} index={i + 1} />
          ))}
        </ResultCard>

        <ResultCard title={t.titlesTitle} subtitle={t.titlesSubtitle} icon={<TitleIcon />}>
          {result.titles.map((title, i) => (
            <CopyableItem key={`title-${i}`} text={title} index={i + 1} />
          ))}
        </ResultCard>

        <ResultCard title={t.scriptTitle} subtitle={t.scriptSubtitle} icon={<ScriptIcon />}>
          <CopyableItem text={result.script} variant="script" />
        </ResultCard>
      </div>
    </div>
  );
}
