import { t } from "@/lib/translations";

interface ExampleTopicsProps {
  onSelectTopic: (topic: string) => void;
}

/** Empty-state suggestions for example video topics. */
export function ExampleTopics({ onSelectTopic }: ExampleTopicsProps) {
  return (
    <div className="rounded-[14px] border border-dashed border-border-dashed bg-empty-bg px-6 py-12 text-center">
      <p className="text-sm text-text-muted">
        {t.exampleTopics}{" "}
        <button
          type="button"
          className="text-text-secondary underline-offset-2 hover:underline"
          onClick={() => onSelectTopic(t.example1Topic)}
        >
          {t.example1Label}
        </button>
        {" · "}
        <button
          type="button"
          className="text-text-secondary underline-offset-2 hover:underline"
          onClick={() => onSelectTopic(t.example2Topic)}
        >
          {t.example2Label}
        </button>
      </p>
    </div>
  );
}
