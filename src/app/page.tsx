"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { CopyableItem } from "@/components/CopyableItem";
import { ResultCard } from "@/components/ResultCard";
import { generateHooks } from "@/lib/generate";
import { copyToClipboard, dismissKeyboard, hapticLight, shareText } from "@/lib/native";
import { translations, type Lang } from "@/lib/translations";
import type { GenerateResponse } from "@/types/generate";

export default function Home() {
  const [lang, setLang] = useState<Lang>("en");
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<GenerateResponse | null>(null);
  const [copyAllDone, setCopyAllDone] = useState(false);
  const [modeHint, setModeHint] = useState<string | null>(null);

  const t = translations[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const generate = useCallback(async (topicValue: string, currentLang: Lang) => {
    const trimmed = topicValue.trim();
    const tr = translations[currentLang];
    if (!trimmed) {
      setError(tr.errorEmptyTopic);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { data, mode, usedTemplateFallback } = await generateHooks(trimmed, currentLang);
      setResult(data);
      if (mode === "templates" && usedTemplateFallback) {
        setModeHint(tr.modeAiUnavailable);
      } else if (mode === "templates") {
        setModeHint(tr.modeLocalTemplates);
      } else if (mode === "puter") {
        setModeHint(`${tr.modeLabels[mode]} ${tr.modeFree}`);
      } else {
        setModeHint(tr.modeLabels[mode]);
      }
    } catch (e) {
      setModeHint(null);
      setResult(null);
      setError(e instanceof Error ? e.message : tr.errorDefault);
    } finally {
      setLoading(false);
    }
  }, []);

  function submitTopic(topicValue: string) {
    void dismissKeyboard();
    void generate(topicValue, lang);
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
    const shared = await shareText("HookAI", buildResultText());
    if (!shared) {
      setError(t.shareUnavailable);
    } else {
      void hapticLight();
    }
  }

  function toggleLang() {
    const next: Lang = lang === "en" ? "ru" : "en";
    setLang(next);
    setError(null);
    setModeHint(null);
    setResult(null);
  }

  return (
    <div className="page-shell">
      <header className="app-header sticky top-0 z-20 border-b border-[#e8e8e8] bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-lg items-center justify-between px-4 py-3">
          <div className="flex min-w-0 items-center gap-2.5">
            <LogoMarkIcon />
            <div className="min-w-0">
              <span className="block text-lg font-semibold tracking-tight text-gray-900">
                HookAI
              </span>
              <span className="block truncate text-[11px] text-gray-500">{t.tagline}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={toggleLang}
            className="touch-target touch-active shrink-0 rounded-[10px] border border-[#e8e8e8] bg-white px-4 text-xs font-semibold text-gray-700 shadow-sm"
            title={lang === "en" ? "Switch to Russian" : "Switch to English"}
          >
            {lang === "en" ? "RU" : "EN"}
          </button>
        </div>
      </header>

      <main
        className={`app-main mx-auto w-full max-w-lg px-4 pt-6 sm:px-6 ${
          result ? "pb-[calc(5.5rem+env(safe-area-inset-bottom))]" : "pb-6"
        }`}
      >
        <div className="mb-6 text-center">
          <h1 className="text-[1.625rem] font-semibold leading-tight tracking-tight text-gray-900">
            {t.headline}
          </h1>
          <p className="mx-auto mt-2.5 max-w-sm text-[15px] leading-relaxed text-gray-500">
            {t.subheadline}
          </p>
          <p className="mx-auto mt-2 max-w-sm text-xs text-gray-400">{t.aiDisclosure}</p>
        </div>

        <form onSubmit={handleSubmit} className="mb-6">
          <div className="overflow-hidden rounded-2xl border border-[#e8e8e8] bg-white shadow-[0_2px_16px_rgba(0,0,0,0.06)]">
            <textarea
              name="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder={t.placeholder}
              rows={3}
              disabled={loading}
              inputMode="text"
              enterKeyHint="go"
              autoComplete="off"
              autoCorrect="on"
              className="ios-input w-full resize-none border-0 bg-transparent px-4 py-3.5 text-gray-900 placeholder:text-gray-400 focus:outline-none disabled:opacity-60"
              onKeyDown={handleTopicKeyDown}
            />
            <div className="border-t border-[#f0f0f0] p-3">
              <button
                type="submit"
                disabled={loading || !topic.trim()}
                className="touch-target touch-active flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 px-5 py-3.5 text-[15px] font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Spinner />
                    {t.generating}
                  </>
                ) : (
                  <>
                    <SparkIcon />
                    {t.generateBtn}
                  </>
                )}
              </button>
              <p className="mt-2 text-center text-[11px] text-gray-400">{t.hint}</p>
            </div>
          </div>
        </form>

        {modeHint && !error && (
          <p className="mb-4 text-center text-xs leading-relaxed text-gray-400">{modeHint}</p>
        )}

        {error && (
          <div
            role="alert"
            className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
          >
            <AlertIcon />
            <span>{error}</span>
          </div>
        )}

        {loading && !result && <LoadingBlock t={t} />}

        {result && (
          <div className={loading ? "pointer-events-none opacity-60" : ""}>
            <div className="space-y-5">
              <p className="text-center text-sm text-gray-500">
                {loading
                  ? t.regenerating
                  : t.done(result.hooks.length, result.titles.length)}
              </p>

              <ResultCard title={t.hooksTitle} subtitle={t.hooksSubtitle} icon={<HookIcon />}>
                {result.hooks.map((hook, i) => (
                  <CopyableItem key={`hook-${i}`} text={hook} index={i + 1} lang={lang} />
                ))}
              </ResultCard>

              <ResultCard title={t.titlesTitle} subtitle={t.titlesSubtitle} icon={<TitleIcon />}>
                {result.titles.map((title, i) => (
                  <CopyableItem key={`title-${i}`} text={title} index={i + 1} lang={lang} />
                ))}
              </ResultCard>

              <ResultCard title={t.scriptTitle} subtitle={t.scriptSubtitle} icon={<ScriptIcon />}>
                <CopyableItem text={result.script} variant="script" lang={lang} />
              </ResultCard>
            </div>
          </div>
        )}

        {!result && !loading && !error && (
          <div className="rounded-2xl border border-dashed border-[#e0e0e0] bg-white/60 px-4 py-8 text-center">
            <p className="mb-3 text-sm text-gray-500">{t.exampleTopics}</p>
            <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
              <ExampleChip label={t.example1Label} onSelect={() => setTopic(t.example1Topic)} />
              <ExampleChip label={t.example2Label} onSelect={() => setTopic(t.example2Topic)} />
            </div>
          </div>
        )}

        <footer className="app-footer mt-10 border-t border-[#e8e8e8] pt-6 text-center text-xs text-gray-400">
          <p>{t.footer}</p>
          <p className="mt-2 flex items-center justify-center gap-4">
            <Link href="/privacy/" className="touch-target inline-flex items-center underline-offset-2 active:text-gray-600">
              {t.privacyLink}
            </Link>
            <Link href="/terms/" className="touch-target inline-flex items-center underline-offset-2 active:text-gray-600">
              {t.termsLink}
            </Link>
          </p>
        </footer>
      </main>

      {result && (
        <div className="action-bar fixed bottom-0 left-0 right-0 z-30 border-t border-[#e8e8e8] bg-white/95 px-3 pt-2 backdrop-blur-md">
          <div className="mx-auto flex max-w-lg gap-2">
            <ActionBarButton onClick={() => void handleShareAll()} disabled={loading}>
              {t.shareBtn}
            </ActionBarButton>
            <ActionBarButton onClick={() => void handleCopyAll()} disabled={loading}>
              {copyAllDone ? t.copiedAll : t.copyAll}
            </ActionBarButton>
            <ActionBarButton
              onClick={() => {
                void dismissKeyboard();
                void generate(topic, lang);
              }}
              disabled={loading}
              primary
            >
              {loading ? "…" : t.regenerate}
            </ActionBarButton>
          </div>
        </div>
      )}
    </div>
  );
}

function ExampleChip({ label, onSelect }: { label: string; onSelect: () => void }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="touch-target touch-active rounded-full border border-[#e8e8e8] bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm active:bg-gray-50"
    >
      {label}
    </button>
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
      className={`touch-target touch-active flex flex-1 items-center justify-center rounded-xl px-2 py-3 text-sm font-semibold disabled:opacity-50 ${
        primary
          ? "bg-gray-900 text-white"
          : "border border-[#e8e8e8] bg-white text-gray-700"
      }`}
    >
      {children}
    </button>
  );
}

function LoadingBlock({ t }: { t: typeof translations.en }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="mb-4 h-10 w-10 animate-spin-slow rounded-full border-2 border-gray-200 border-t-gray-900" />
      <p className="text-sm font-medium text-gray-700">{t.loadingText}</p>
      <p className="mt-1 text-xs text-gray-500">{t.loadingSubtext}</p>
    </div>
  );
}

function LogoMarkIcon() {
  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-900 text-white">
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" />
      </svg>
    </div>
  );
}

function Spinner() {
  return (
    <svg className="h-4 w-4 animate-spin-slow" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg className="mt-0.5 h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function HookIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h6m-6 4h8M5 6a2 2 0 012-2h10a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V6z" />
    </svg>
  );
}

function TitleIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
    </svg>
  );
}

function ScriptIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );
}
