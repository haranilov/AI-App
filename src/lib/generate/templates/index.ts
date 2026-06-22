import type { GenerateResponse } from "@/types/generate";
import {
  detectTemplateLanguage,
  type TemplateLanguage,
} from "@/lib/generate/templates/detectLanguage";
import { buildEnglishTemplates } from "@/lib/generate/templates/en";
import { buildRussianTemplates } from "@/lib/generate/templates/ru";

const DEFAULT_SUBJECT: Record<TemplateLanguage, string> = {
  en: "your topic",
  ru: "ваша тема",
};

const TEMPLATE_BUILDERS: Record<
  TemplateLanguage,
  (subject: string) => GenerateResponse
> = {
  en: buildEnglishTemplates,
  ru: buildRussianTemplates,
};

/**
 * Generates fallback hooks, titles, and script from local templates.
 * @param topic - User-provided video topic
 * @param lang - Optional template language override
 */
export function generateFromTemplates(
  topic: string,
  lang?: TemplateLanguage,
): GenerateResponse {
  const templateLang = lang ?? detectTemplateLanguage(topic);
  const subject = topic.trim() || DEFAULT_SUBJECT[templateLang];
  return TEMPLATE_BUILDERS[templateLang](subject);
}
