import { isPlaceholderKey } from "@/lib/generate/isPlaceholderKey";
import { generateWithGemini } from "@/lib/generate/providers/gemini";
import { generateWithGroq } from "@/lib/generate/providers/groq";
import { generateWithOpenAI } from "@/lib/generate/providers/openai";
import { generateWithPollinations } from "@/lib/generate/providers/pollinations";
import { generateWithPuter } from "@/lib/generate/providers/puter";
import type { ProviderChainEntry } from "@/lib/generate/types";

/**
 * Builds the ordered AI provider fallback chain based on available API keys.
 */
export function buildProviderChain(): ProviderChainEntry[] {
  const chain: ProviderChainEntry[] = [
    { fn: (topic) => generateWithPuter(topic), mode: "puter" },
  ];

  const gemini = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  if (!isPlaceholderKey(gemini)) {
    chain.push({
      fn: (topic) => generateWithGemini(topic, gemini!),
      mode: "gemini",
    });
  }

  const groq = process.env.NEXT_PUBLIC_GROQ_API_KEY;
  if (!isPlaceholderKey(groq)) {
    chain.push({
      fn: (topic) => generateWithGroq(topic, groq!),
      mode: "groq",
    });
  }

  const pollinations = process.env.NEXT_PUBLIC_POLLINATIONS_API_KEY;
  if (!isPlaceholderKey(pollinations)) {
    chain.push({
      fn: (topic) => generateWithPollinations(topic, pollinations!),
      mode: "pollinations",
    });
  }

  const openai = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
  if (!isPlaceholderKey(openai)) {
    chain.push({
      fn: (topic) => generateWithOpenAI(topic, openai!),
      mode: "openai",
    });
  }

  return chain;
}
