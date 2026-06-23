import { CopyableItem } from "@/components/CopyableItem";
import { ResultCard } from "@/components/ResultCard";
import { HookIcon, ScriptIcon, TitleIcon } from "@/components/icons";
import { t } from "@/lib/translations";
import type { GenerateResponse } from "@/types/generate";

interface ResultsPanelProps {
  result: GenerateResponse;
  loading: boolean;
}

/** Displays generated hooks, titles, and script. */
export function ResultsPanel({ result, loading }: ResultsPanelProps) {
  return (
    <div className={loading ? "pointer-events-none opacity-60" : ""}>
      <div className="space-y-5">
        <p className="text-center text-sm text-gray-500">
          {loading ? t.regenerating : t.done(result.hooks.length, result.titles.length)}
        </p>

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
