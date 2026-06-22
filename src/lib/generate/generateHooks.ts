import { buildProviderChain } from "@/lib/generate/providerChain";
import { generateFromTemplates } from "@/lib/generate/templates";
import type { GenerateResult } from "@/lib/generate/types";
import { t } from "@/lib/translations";

async function delay(ms: number): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Generates viral hooks, titles, and a script for a video topic.
 * Tries AI providers in order, then falls back to local templates.
 * @param topic - User-provided video topic in any language
 */
export async function generateHooks(topic: string): Promise<GenerateResult> {
  const trimmed = topic.trim();
  if (!trimmed) throw new Error(t.errorEmptyTopic);
  if (trimmed.length > 500) throw new Error(t.errorTopicTooLong);

  const chain = buildProviderChain();
  let failedProviders = 0;

  for (const { fn, mode } of chain) {
    try {
      const data = await fn(trimmed);
      return { data, mode };
    } catch {
      failedProviders++;
    }
  }

  await delay(500);
  return {
    data: generateFromTemplates(trimmed),
    mode: "templates",
    usedTemplateFallback: failedProviders > 0,
  };
}
