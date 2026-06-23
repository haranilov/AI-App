import type { GenerateResponse } from "@/types/generate";

/** Template fallback language (content script, not UI). */
export type TemplateLang = "en" | "ru";

export type GenerateMode =
  | "puter"
  | "gemini"
  | "groq"
  | "pollinations"
  | "openai"
  | "templates";

export interface GenerateResult {
  data: GenerateResponse;
  mode: GenerateMode;
  /** True if all AI providers failed before templates. */
  usedTemplateFallback?: boolean;
}

/** Error codes surfaced to the UI via translations. */
export type GenerateErrorCode = "EMPTY_TOPIC" | "TOPIC_TOO_LONG";

/** Domain error with an i18n key instead of a hardcoded message. */
export class GenerateError extends Error {
  constructor(public readonly code: GenerateErrorCode) {
    super(code);
    this.name = "GenerateError";
  }
}

export type ProviderFn = (topic: string) => Promise<GenerateResponse>;

export interface ProviderEntry {
  fn: ProviderFn;
  mode: GenerateMode;
}
