import Link from "next/link";
import type { LegalDoc } from "@/content/legal";

export function LegalPage({ doc, backLabel }: { doc: LegalDoc; backLabel: string }) {
  return (
    <div className="legal-page min-h-[100dvh] bg-[#fafafa] pb-12 pt-[env(safe-area-inset-top)]">
      <header className="border-b border-[#e8e8e8] bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-lg items-center gap-3 px-4 py-3">
          <Link
            href="/"
            className="touch-target touch-active rounded-[10px] border border-[#e8e8e8] bg-white px-4 text-xs font-semibold text-gray-700 shadow-sm"
          >
            ← {backLabel}
          </Link>
          <h1 className="text-lg font-semibold text-gray-900">{doc.title}</h1>
        </div>
      </header>

      <main className="mx-auto max-w-lg px-4 py-6">
        <p className="mb-8 text-sm text-gray-500">Updated: {doc.updated}</p>
        <div className="space-y-8">
          {doc.sections.map((section) => (
            <section key={section.title}>
              <h2 className="mb-3 text-base font-semibold text-gray-900">{section.title}</h2>
              <div className="space-y-3 text-sm leading-relaxed text-gray-600">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}
