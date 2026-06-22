import { useCallback, useState } from "react";
import { generateHooks } from "@/lib/generate";
import type { GenerateMode } from "@/lib/generate";
import { t } from "@/lib/translations";
import type { GenerateResponse } from "@/types/generate";

interface UseGenerateResult {
  topic: string;
  setTopic: (value: string) => void;
  loading: boolean;
  error: string | null;
  result: GenerateResponse | null;
  copyAllDone: boolean;
  modeHint: string | null;
  generate: (topicValue: string) => Promise<void>;
  handleSubmit: (e: React.FormEvent) => void;
  handleCopyAll: () => Promise<void>;
}

function resolveModeHint(mode: GenerateMode, usedTemplateFallback?: boolean): string {
  if (mode === "templates" && usedTemplateFallback) return t.modeAiUnavailable;
  if (mode === "templates") return t.modeLocalTemplates;
  if (mode === "puter") return `${t.modeLabels[mode]} ${t.modeFree}`;
  return t.modeLabels[mode];
}

/**
 * Manages topic input, generation state, and result actions.
 */
export function useGenerate(): UseGenerateResult {
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<GenerateResponse | null>(null);
  const [copyAllDone, setCopyAllDone] = useState(false);
  const [modeHint, setModeHint] = useState<string | null>(null);

  const generate = useCallback(async (topicValue: string) => {
    const trimmed = topicValue.trim();
    if (!trimmed) {
      setError(t.errorEmptyTopic);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { data, mode, usedTemplateFallback } = await generateHooks(trimmed);
      setResult(data);
      setModeHint(resolveModeHint(mode, usedTemplateFallback));
    } catch (e) {
      setModeHint(null);
      setResult(null);
      setError(e instanceof Error ? e.message : t.errorDefault);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      void generate(topic);
    },
    [generate, topic],
  );

  const handleCopyAll = useCallback(async () => {
    if (!result) return;

    const text = [
      t.hooksHeader,
      ...result.hooks.map((hook, i) => `${i + 1}. ${hook}`),
      "",
      t.titlesHeader,
      ...result.titles.map((title, i) => `${i + 1}. ${title}`),
      "",
      t.scriptHeader,
      result.script,
    ].join("\n");

    try {
      await navigator.clipboard.writeText(text);
      setCopyAllDone(true);
      setTimeout(() => setCopyAllDone(false), 2000);
    } catch {
      setError(t.errorClipboard);
    }
  }, [result]);

  return {
    topic,
    setTopic,
    loading,
    error,
    result,
    copyAllDone,
    modeHint,
    generate,
    handleSubmit,
    handleCopyAll,
  };
}
