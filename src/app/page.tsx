"use client";

import { AlertIcon } from "@/components/icons";
import { ExampleTopics } from "@/components/empty/ExampleTopics";
import { TopicForm } from "@/components/form/TopicForm";
import { AppFooter } from "@/components/layout/AppFooter";
import { AppHeader } from "@/components/layout/AppHeader";
import { LoadingBlock } from "@/components/results/LoadingBlock";
import { ResultsPanel } from "@/components/results/ResultsPanel";
import { useGenerate } from "@/hooks/useGenerate";
import { t } from "@/lib/translations";

/** Home page for the HookAI generator. */
export default function Home() {
  const {
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
  } = useGenerate();

  return (
    <div className="min-h-screen bg-surface">
      <AppHeader />

      <main className="mx-auto max-w-3xl px-4 pb-[calc(5rem+env(safe-area-inset-bottom))] pt-10 sm:px-6 sm:pt-16">
        <div className="mb-10 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-text sm:text-3xl">
            {t.headline}
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-text-muted">
            {t.subheadline}
          </p>
        </div>

        <TopicForm
          topic={topic}
          loading={loading}
          onTopicChange={setTopic}
          onSubmit={handleSubmit}
        />

        {modeHint && !error && (
          <p className="mb-4 text-center text-xs text-text-faint">{modeHint}</p>
        )}

        {error && (
          <div
            role="alert"
            className="mb-6 flex items-start gap-3 rounded-[12px] border border-error-border bg-error-bg px-4 py-3 text-sm text-error-text"
          >
            <AlertIcon />
            <span>{error}</span>
          </div>
        )}

        {loading && !result && <LoadingBlock />}

        {result && (
          <ResultsPanel
            result={result}
            loading={loading}
            copyAllDone={copyAllDone}
            onCopyAll={() => void handleCopyAll()}
            onRegenerate={() => void generate(topic)}
          />
        )}

        {!result && !loading && !error && (
          <ExampleTopics onSelectTopic={setTopic} />
        )}
      </main>

      <AppFooter />
    </div>
  );
}
