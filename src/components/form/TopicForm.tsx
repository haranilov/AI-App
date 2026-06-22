import { SparkIcon, Spinner } from "@/components/icons";
import { t } from "@/lib/translations";

interface TopicFormProps {
  topic: string;
  loading: boolean;
  onTopicChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

/** Topic input form with submit action. */
export function TopicForm({ topic, loading, onTopicChange, onSubmit }: TopicFormProps) {
  return (
    <form onSubmit={onSubmit} className="mb-8">
      <div className="rounded-[14px] border border-border bg-card p-2 shadow-card transition-shadow focus-within:shadow-card-focus focus-within:ring-2 focus-within:ring-focus">
        <textarea
          value={topic}
          onChange={(e) => onTopicChange(e.target.value)}
          placeholder={t.placeholder}
          rows={3}
          disabled={loading}
          className="w-full resize-none rounded-[12px] border-0 bg-transparent px-4 py-3 text-base text-text placeholder:text-text-faint focus:outline-none disabled:opacity-60"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              (e.target as HTMLTextAreaElement).form?.requestSubmit();
            }
          }}
        />
        <div className="flex items-center justify-between gap-3 border-t border-border-subtle px-2 py-2">
          <p className="px-2 text-xs text-text-faint">{t.hint}</p>
          <button
            type="submit"
            disabled={loading || !topic.trim()}
            className="inline-flex items-center gap-2 rounded-[12px] bg-button-primary px-5 py-2.5 text-sm font-medium text-button-primary-text transition-colors hover:bg-button-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
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
  );
}
