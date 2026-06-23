import type { GenerateResponse } from "@/types/generate";
import type { TemplateLang } from "@/lib/generate/types";
import { buildEnglishTemplates } from "@/lib/generate/templates/en";
import { buildRussianTemplates } from "@/lib/generate/templates/ru";

/**
 * Generates hooks, titles, and a script from built-in templates.
 * @param topic - User video topic.
 * @param lang - Template language derived from topic script (not UI).
 */
export function generateFromTemplates(topic: string, lang: TemplateLang = "en"): GenerateResponse {
  return lang === "ru" ? buildRussianTemplates(topic) : buildEnglishTemplates(topic);
}
