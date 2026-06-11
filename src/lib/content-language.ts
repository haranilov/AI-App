import type { Lang } from "@/lib/translations";

export interface DetectedContentLanguage {
  /** For built-in template fallback (ru | en) */
  templateLang: Lang;
  /** Human-readable hint for AI prompts */
  label: string;
}

function countLetters(text: string, pattern: RegExp): number {
  const matches = text.match(pattern);
  return matches?.length ?? 0;
}

/**
 * Detect the dominant script/language of user input.
 * AI prompts also instruct the model to match the topic language directly.
 */
export function detectContentLanguage(text: string): DetectedContentLanguage {
  const sample = text.trim();
  if (!sample) return { templateLang: "en", label: "English" };

  const cyrillic = countLetters(sample, /[\u0400-\u04FF]/g);
  const cjk = countLetters(sample, /[\u4E00-\u9FFF\u3040-\u30FF\uAC00-\uD7AF]/g);
  const arabic = countLetters(sample, /[\u0600-\u06FF]/g);
  const hebrew = countLetters(sample, /[\u0590-\u05FF]/g);
  const thai = countLetters(sample, /[\u0E00-\u0E7F]/g);
  const devanagari = countLetters(sample, /[\u0900-\u097F]/g);
  const latin = countLetters(sample, /[A-Za-z\u00C0-\u024F]/g);

  const scores: [DetectedContentLanguage, number][] = [
    [{ templateLang: "ru", label: "Russian" }, cyrillic],
    [{ templateLang: "en", label: "Chinese" }, cjk],
    [{ templateLang: "en", label: "Arabic" }, arabic],
    [{ templateLang: "en", label: "Hebrew" }, hebrew],
    [{ templateLang: "en", label: "Thai" }, thai],
    [{ templateLang: "en", label: "Hindi" }, devanagari],
    [{ templateLang: "en", label: "English" }, latin],
  ];

  const best = scores.sort((a, b) => b[1] - a[1])[0];
  if (best[1] > 0) return best[0];

  return { templateLang: "en", label: "the same language as the topic" };
}
