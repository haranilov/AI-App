interface ResultCardProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

/** Card wrapper for a group of generated results. */
export function ResultCard({ title, subtitle, icon, children }: ResultCardProps) {
  return (
    <section className="animate-fade-in rounded-2xl border border-[#e8e8e8] bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_24px_rgba(0,0,0,0.04)] dark:border-neutral-700 dark:bg-neutral-900">
      <div className="mb-3 flex items-start gap-3 border-b border-[#f0f0f0] pb-3 dark:border-neutral-700">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-700 dark:bg-neutral-800 dark:text-gray-200">
          {icon}
        </div>
        <div className="min-w-0">
          <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">{title}</h2>
          <p className="mt-0.5 text-xs leading-relaxed text-gray-500 dark:text-gray-400">{subtitle}</p>
        </div>
      </div>
      <div className="space-y-0.5">{children}</div>
    </section>
  );
}
