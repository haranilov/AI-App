"use client";

import { AlertIcon } from "@/components/icons";
import { ExampleTopics } from "@/components/empty/ExampleTopics";
import { TopicForm } from "@/components/form/TopicForm";
import { AppFooter } from "@/components/layout/AppFooter";
import { AppHeader } from "@/components/layout/AppHeader";
import { LoadingBlock } from "@/components/results/LoadingBlock";
import { ResultActions } from "@/components/results/ResultActions";
import { ResultsPanel } from "@/components/results/ResultsPanel";
import { useGenerate } from "@/hooks/useGenerate";
import { t } from "@/lib/translations";

/** Home page — topic input, generation, and results. */
export default function Home() {
  const {
    topic,
    setTopic,
    loading,
    error,
    result,
    copyAllDone,
    modeHint,
    handleSubmit,
    handleTopicKeyDown,
    handleCopyAll,
    handleShareAll,
    regenerate,
  } = useGenerate();

  return (
    <div className="page-shell">
      <AppHeader />

      <main
        className={`app-main mx-auto w-full max-w-lg px-4 pt-6 sm:px-6 ${
          result ? "pb-[var(--app-action-bar-height)]" : "pb-6"
        }`}
      >
        <div className="mb-6 text-center">
          <h1 className="text-[1.625rem] font-semibold leading-tight tracking-tight text-gray-900 dark:text-gray-100">
            {t.headline}
          </h1>
          <p className="mx-auto mt-2.5 max-w-sm text-[15px] leading-relaxed text-gray-500 dark:text-gray-400">
            {t.subheadline}
          </p>
          <p className="mx-auto mt-2 max-w-sm text-xs text-gray-400 dark:text-gray-500">{t.aiDisclosure}</p>
        </div>

        <TopicForm
          topic={topic}
          loading={loading}
          onTopicChange={setTopic}
          onSubmit={handleSubmit}
          onTopicKeyDown={handleTopicKeyDown}
        />

        {modeHint && !error && (
          <p className="mb-4 text-center text-xs leading-relaxed text-gray-400 dark:text-gray-500">{modeHint}</p>
        )}

        {error && (
          <div
            role="alert"
            className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-900 dark:bg-red-950/50 dark:text-red-200"
          >
            <AlertIcon />
            <span>{error}</span>
          </div>
        )}

        {loading && !result && <LoadingBlock />}

        {result && <ResultsPanel result={result} loading={loading} />}

        {!result && !loading && !error && <ExampleTopics onSelect={setTopic} />}

        <AppFooter />
      </main>

      {result && (
        <ResultActions
          loading={loading}
          copyAllDone={copyAllDone}
          onShare={() => void handleShareAll()}
          onCopyAll={() => void handleCopyAll()}
          onRegenerate={regenerate}
        />
      )}
    </div>
  );
}
