import { detectContentLanguage } from "@/lib/content-language";
import { buildProviderChain } from "@/lib/generate/providerChain";
import { generateFromTemplates } from "@/lib/generate/templates";
import { GenerateError, type GenerateResult } from "@/lib/generate/types";

async function delay(ms: number): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Runs the free AI provider chain (no backend) and falls back to templates.
 * Output language follows the topic text, not the UI.
 * @param topic - User-entered video topic.
 */
export async function generateHooks(topic: string): Promise<GenerateResult> {
  const trimmed = topic.trim();
  if (!trimmed) throw new GenerateError("EMPTY_TOPIC");
  if (trimmed.length > 500) throw new GenerateError("TOPIC_TOO_LONG");

  const { templateLang, label: contentLabel } = detectContentLanguage(trimmed);
  const chain = buildProviderChain(contentLabel);
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
    data: generateFromTemplates(trimmed, templateLang),
    mode: "templates",
    usedTemplateFallback: failedProviders > 0,
  };
}
