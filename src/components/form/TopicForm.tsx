import { SparkIcon, Spinner } from "@/components/icons";
import { t } from "@/lib/translations";

interface TopicFormProps {
  topic: string;
  loading: boolean;
  onTopicChange: (value: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onTopicKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}

/** Topic input form with generate button. */
export function TopicForm({
  topic,
  loading,
  onTopicChange,
  onSubmit,
  onTopicKeyDown,
}: TopicFormProps) {
  return (
    <form onSubmit={onSubmit} className="mb-6">
      <div className="overflow-hidden rounded-2xl border border-[#e8e8e8] bg-white shadow-[0_2px_16px_rgba(0,0,0,0.06)] dark:border-neutral-700 dark:bg-neutral-900 dark:shadow-[0_2px_16px_rgba(0,0,0,0.3)]">
        <textarea
          name="topic"
          value={topic}
          onChange={(e) => onTopicChange(e.target.value)}
          placeholder={t.placeholder}
          rows={3}
          disabled={loading}
          inputMode="text"
          enterKeyHint="go"
          autoComplete="off"
          autoCorrect="on"
          className="ios-input w-full resize-none border-0 bg-transparent px-4 py-3.5 text-gray-900 placeholder:text-gray-400 focus:outline-none disabled:opacity-60 dark:text-gray-100 dark:placeholder:text-gray-500"
          onKeyDown={onTopicKeyDown}
        />
        <div className="border-t border-[#f0f0f0] p-3 dark:border-neutral-700">
          <button
            type="submit"
            disabled={loading || !topic.trim()}
            className="touch-target touch-active flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 px-5 py-3.5 text-[15px] font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-100 dark:text-gray-900"
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
  );
}
