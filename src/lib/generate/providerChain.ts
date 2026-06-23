import { isPlaceholderKey } from "@/lib/generate/isPlaceholderKey";
import { generateWithGemini } from "@/lib/generate/providers/gemini";
import { generateWithGroq } from "@/lib/generate/providers/groq";
import { generateWithOpenAI } from "@/lib/generate/providers/openai";
import { generateWithPollinations } from "@/lib/generate/providers/pollinations";
import { generateWithPuter } from "@/lib/generate/providers/puter";
import type { ProviderEntry } from "@/lib/generate/types";
import { isNativeApp } from "@/lib/platform";

/**
 * Builds the ordered list of AI providers to try before template fallback.
 * @param contentLabel - Detected language label for prompts.
 */
export function buildProviderChain(contentLabel: string): ProviderEntry[] {
  const chain: ProviderEntry[] = [];

  if (!isNativeApp()) {
    chain.push({ fn: (t) => generateWithPuter(t, contentLabel), mode: "puter" });
  }

  const gemini = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  if (!isPlaceholderKey(gemini)) {
    chain.push({
      fn: (t) => generateWithGemini(t, gemini!, contentLabel),
      mode: "gemini",
    });
  }

  const groq = process.env.NEXT_PUBLIC_GROQ_API_KEY;
  if (!isPlaceholderKey(groq)) {
    chain.push({
      fn: (t) => generateWithGroq(t, groq!, contentLabel),
      mode: "groq",
    });
  }

  const pollinations = process.env.NEXT_PUBLIC_POLLINATIONS_API_KEY;
  if (!isPlaceholderKey(pollinations)) {
    chain.push({
      fn: (t) => generateWithPollinations(t, pollinations!, contentLabel),
      mode: "pollinations",
    });
  }

  const openai = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
  if (!isPlaceholderKey(openai)) {
    chain.push({
      fn: (t) => generateWithOpenAI(t, openai!, contentLabel),
      mode: "openai",
    });
  }

  return chain;
}
