import type { GenerateResponse } from "@/types/generate";

/** AI or template provider used for the last successful generation. */
export type GenerateMode =
  | "puter"
  | "gemini"
  | "groq"
  | "pollinations"
  | "openai"
  | "templates";

/** Outcome of a hook generation request. */
export interface GenerateResult {
  data: GenerateResponse;
  mode: GenerateMode;
  /** True when all AI providers failed before templates were used. */
  usedTemplateFallback?: boolean;
}

/** Async function that generates content for a topic. */
export type ProviderFn = (topic: string) => Promise<GenerateResponse>;

/** Entry in the provider fallback chain. */
export interface ProviderChainEntry {
  fn: ProviderFn;
  mode: GenerateMode;
}
