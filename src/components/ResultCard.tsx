interface ResultCardProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

/** Card container for a group of generated content items. */
export function ResultCard({ title, subtitle, icon, children }: ResultCardProps) {
  return (
    <section className="animate-fade-in rounded-[14px] border border-border bg-card p-5 shadow-result sm:p-6">
      <div className="mb-4 flex items-start gap-3 border-b border-border-subtle pb-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] bg-icon-bg text-icon-text">
          {icon}
        </div>
        <div>
          <h2 className="text-base font-semibold text-text">{title}</h2>
          <p className="mt-0.5 text-xs text-text-muted">{subtitle}</p>
        </div>
      </div>
      <div className="space-y-0.5">{children}</div>
    </section>
  );
}
