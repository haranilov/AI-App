interface ResultCardProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

export function ResultCard({ title, subtitle, icon, children }: ResultCardProps) {
  return (
    <section className="animate-fade-in rounded-[14px] border border-[#e8e8e8] bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_24px_rgba(0,0,0,0.04)] sm:p-6">
      <div className="mb-4 flex items-start gap-3 border-b border-[#f0f0f0] pb-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] bg-gray-100 text-gray-700">
          {icon}
        </div>
        <div>
          <h2 className="text-base font-semibold text-gray-900">{title}</h2>
          <p className="mt-0.5 text-xs text-gray-500">{subtitle}</p>
        </div>
      </div>
      <div className="space-y-0.5">{children}</div>
    </section>
  );
}
