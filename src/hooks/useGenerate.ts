"use client";

import { useCallback, useState } from "react";
import { generateHooks, GenerateError } from "@/lib/generate";
import { dismissKeyboard } from "@/lib/native";
import { t } from "@/lib/translations";
import type { GenerateResponse } from "@/types/generate";

export interface UseGenerateResult {
  topic: string;
  setTopic: (value: string) => void;
  loading: boolean;
  error: string | null;
  result: GenerateResponse | null;
  copyAllDone: boolean;
  modeHint: string | null;
  submitTopic: (topicValue: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleTopicKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  handleCopyAll: () => Promise<void>;
  handleShareAll: () => Promise<void>;
  regenerate: () => void;
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

  const runGenerate = useCallback(async (topicValue: string) => {
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
      if (mode === "templates" && usedTemplateFallback) {
        setModeHint(t.modeAiUnavailable);
      } else if (mode === "templates") {
        setModeHint(t.modeLocalTemplates);
      } else if (mode === "puter") {
        setModeHint(`${t.modeLabels[mode]} ${t.modeFree}`);
      } else {
        setModeHint(t.modeLabels[mode]);
      }
    } catch (e) {
      setModeHint(null);
      setResult(null);
      if (e instanceof GenerateError) {
        setError(e.code === "TOPIC_TOO_LONG" ? t.errorTopicTooLong : t.errorEmptyTopic);
      } else {
        setError(t.errorDefault);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  function submitTopic(topicValue: string) {
    void dismissKeyboard();
    void runGenerate(topicValue);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const value = new FormData(e.currentTarget).get("topic");
    submitTopic(typeof value === "string" ? value : topic);
  }

  function handleTopicKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key !== "Enter" || e.shiftKey || e.nativeEvent.isComposing) return;
    e.preventDefault();
    if (loading) return;
    const value = e.currentTarget.value;
    if (!value.trim()) return;
    submitTopic(value);
  }

  function buildResultText() {
    if (!result) return "";
    return [
      t.hooksHeader,
      ...result.hooks.map((h, i) => `${i + 1}. ${h}`),
      "",
      t.titlesHeader,
      ...result.titles.map((tl, i) => `${i + 1}. ${tl}`),
      "",
      t.scriptHeader,
      result.script,
    ].join("\n");
  }

  async function handleCopyAll() {
    if (!result) return;
    const { copyToClipboard, hapticLight } = await import("@/lib/native");
    try {
      await copyToClipboard(buildResultText());
      void hapticLight();
      setCopyAllDone(true);
      setTimeout(() => setCopyAllDone(false), 2000);
    } catch {
      setError(t.errorClipboard);
    }
  }

  async function handleShareAll() {
    if (!result) return;
    const { shareText, hapticLight } = await import("@/lib/native");
    const shared = await shareText(t.shareTitle, buildResultText());
    if (!shared) {
      setError(t.shareUnavailable);
    } else {
      void hapticLight();
    }
  }

  function regenerate() {
    void dismissKeyboard();
    void runGenerate(topic);
  }

  return {
    topic,
    setTopic,
    loading,
    error,
    result,
    copyAllDone,
    modeHint,
    submitTopic,
    handleSubmit,
    handleTopicKeyDown,
    handleCopyAll,
    handleShareAll,
    regenerate,
  };
}
