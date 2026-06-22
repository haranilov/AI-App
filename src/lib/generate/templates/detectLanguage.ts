/** Script families used for template fallback when AI providers are unavailable. */
export type TemplateLanguage = "en" | "ru";

/**
 * Detects which built-in template set matches the user's topic script.
 * @param topic - User-provided video topic
 */
export function detectTemplateLanguage(topic: string): TemplateLanguage {
  return /[\u0400-\u04FF]/.test(topic) ? "ru" : "en";
}
