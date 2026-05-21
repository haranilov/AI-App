"use client";

import { useCallback, useEffect, useState } from "react";
import { CopyableItem } from "@/components/CopyableItem";
import { ResultCard } from "@/components/ResultCard";
import { generateHooks } from "@/lib/generate";
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

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    void generate(topic, lang);
  }

  async function handleCopyAll() {
    if (!result) return;

    const text = [
      t.hooksHeader,
      ...result.hooks.map((h, i) => `${i + 1}. ${h}`),
      "",
      t.titlesHeader,
      ...result.titles.map((tl, i) => `${i + 1}. ${tl}`),
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
  }

  function toggleLang() {
    const next: Lang = lang === "en" ? "ru" : "en";
    setLang(next);
    setError(null);
    setModeHint(null);
    setResult(null);
  }

  return (
    <PageShell>
      <header className="border-b border-[#e8e8e8] bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-2.5">
            <LogoMarkIcon />
            <span className="text-lg font-semibold tracking-tight text-gray-900">
              HookAI
            </span>
            <span className="hidden rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-gray-500 sm:inline">
              Pro
            </span>
          </div>
          <div className="flex items-center gap-3">
            <p className="hidden text-xs text-gray-500 sm:block">{t.tagline}</p>
            <button
              type="button"
              onClick={toggleLang}
              className="rounded-[10px] border border-[#e8e8e8] bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 shadow-sm transition-colors hover:bg-gray-50"
              title={lang === "en" ? "Switch to Russian" : "Switch to English"}
            >
              {lang === "en" ? "RU" : "EN"}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 pb-20 pt-10 sm:px-6 sm:pt-16">
        <div className="mb-10 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
            {t.headline}
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-gray-500">
            {t.subheadline}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mb-8">
          <div className="rounded-[14px] border border-[#e8e8e8] bg-white p-2 shadow-[0_2px_16px_rgba(0,0,0,0.06)] transition-shadow focus-within:shadow-[0_4px_24px_rgba(0,0,0,0.08)] focus-within:ring-2 focus-within:ring-gray-900/5">
            <textarea
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder={t.placeholder}
              rows={3}
              disabled={loading}
              className="w-full resize-none rounded-[12px] border-0 bg-transparent px-4 py-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none disabled:opacity-60"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  (e.target as HTMLTextAreaElement).form?.requestSubmit();
                }
              }}
            />
            <div className="flex items-center justify-between gap-3 border-t border-[#f0f0f0] px-2 py-2">
              <p className="px-2 text-xs text-gray-400">{t.hint}</p>
              <button
                type="submit"
                disabled={loading || !topic.trim()}
                className="inline-flex items-center gap-2 rounded-[12px] bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
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
            </div>
          </div>
        </form>

        {modeHint && !error && (
          <p className="mb-4 text-center text-xs text-gray-400">{modeHint}</p>
        )}

        {error && (
          <div
            role="alert"
            className="mb-6 flex items-start gap-3 rounded-[12px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
          >
            <AlertIcon />
            <span>{error}</span>
          </div>
        )}

        {loading && !result && <LoadingBlock t={t} />}

        {result && (
          <div className={loading ? "pointer-events-none opacity-60" : ""}>
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm text-gray-500">
                  {loading
                    ? t.regenerating
                    : t.done(result.hooks.length, result.titles.length)}
                </p>
                <ResultActions
                  copyAllDone={copyAllDone}
                  loading={loading}
                  t={t}
                  onCopyAll={() => void handleCopyAll()}
                  onRegenerate={() => void generate(topic, lang)}
                />
              </div>

              <ResultCard
                title={t.hooksTitle}
                subtitle={t.hooksSubtitle}
                icon={<HookIcon />}
              >
                {result.hooks.map((hook, i) => (
                  <CopyableItem key={`hook-${i}`} text={hook} index={i + 1} lang={lang} />
                ))}
              </ResultCard>

              <ResultCard
                title={t.titlesTitle}
                subtitle={t.titlesSubtitle}
                icon={<TitleIcon />}
              >
                {result.titles.map((title, i) => (
                  <CopyableItem key={`title-${i}`} text={title} index={i + 1} lang={lang} />
                ))}
              </ResultCard>

              <ResultCard
                title={t.scriptTitle}
                subtitle={t.scriptSubtitle}
                icon={<ScriptIcon />}
              >
                <CopyableItem text={result.script} variant="script" lang={lang} />
              </ResultCard>
            </div>
          </div>
        )}

        {!result && !loading && !error && (
          <div className="rounded-[14px] border border-dashed border-[#e0e0e0] bg-white/50 px-6 py-12 text-center">
            <p className="text-sm text-gray-500">
              {t.exampleTopics}{" "}
              <button
                type="button"
                className="text-gray-700 underline-offset-2 hover:underline"
                onClick={() => setTopic(t.example1Topic)}
              >
                {t.example1Label}
              </button>
              {" · "}
              <button
                type="button"
                className="text-gray-700 underline-offset-2 hover:underline"
                onClick={() => setTopic(t.example2Topic)}
              >
                {t.example2Label}
              </button>
            </p>
          </div>
        )}
      </main>

      <footer className="fixed bottom-0 left-0 right-0 border-t border-[#e8e8e8] bg-white/90 py-3 text-center text-xs text-gray-400 backdrop-blur-sm">
        {t.footer}
      </footer>
    </PageShell>
  );
}

function PageShell({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen">{children}</div>;
}

function LoadingBlock({ t }: { t: typeof translations.en }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-4 h-10 w-10 animate-spin-slow rounded-full border-2 border-gray-200 border-t-gray-900" />
      <p className="text-sm font-medium text-gray-700">{t.loadingText}</p>
      <p className="mt-1 text-xs text-gray-500">{t.loadingSubtext}</p>
    </div>
  );
}

function ResultActions({
  copyAllDone,
  loading,
  t,
  onCopyAll,
  onRegenerate,
}: {
  copyAllDone: boolean;
  loading: boolean;
  t: typeof translations.en;
  onCopyAll: () => void;
  onRegenerate: () => void;
}) {
  return (
    <div className="flex gap-2">
      <button
        type="button"
        onClick={onCopyAll}
        disabled={loading}
        className="inline-flex items-center gap-1.5 rounded-[12px] border border-[#e8e8e8] bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 disabled:opacity-50"
      >
        {copyAllDone ? t.copiedAll : t.copyAll}
      </button>
      <button
        type="button"
        onClick={onRegenerate}
        disabled={loading}
        className="inline-flex items-center gap-1.5 rounded-[12px] border border-[#e8e8e8] bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 disabled:opacity-50"
      >
        {loading ? t.generating : t.regenerate}
      </button>
    </div>
  );
}

function LogoMarkIcon() {
  return (
    <div className="flex h-9 w-9 items-center justify-center rounded-[12px] bg-gray-900 text-white">
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
