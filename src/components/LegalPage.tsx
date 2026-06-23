import Link from "next/link";
import type { LegalDoc } from "@/content/legal";
import { t } from "@/lib/translations";

interface LegalPageProps {
  doc: LegalDoc;
}

/** Renders a legal document page (privacy or terms). */
export function LegalPage({ doc }: LegalPageProps) {
  return (
    <div className="legal-page min-h-[100dvh] bg-[#fafafa] pb-12 pt-[env(safe-area-inset-top)] dark:bg-neutral-950">
      <header className="border-b border-[#e8e8e8] bg-white/90 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-900/90">
        <div className="mx-auto flex max-w-lg items-center gap-3 px-4 py-3">
          <Link
            href="/"
            className="touch-target touch-active rounded-[10px] border border-[#e8e8e8] bg-white px-4 text-xs font-semibold text-gray-700 shadow-sm dark:border-neutral-700 dark:bg-neutral-800 dark:text-gray-200"
          >
            ← {t.backLabel}
          </Link>
          <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{doc.title}</h1>
        </div>
      </header>

      <main className="mx-auto max-w-lg px-4 py-6">
        <p className="mb-8 text-sm text-gray-500">
          {t.updatedPrefix} {doc.updated}
        </p>
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
