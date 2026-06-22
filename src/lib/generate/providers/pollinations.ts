import type { GenerateResponse } from "@/types/generate";
import { generateWithOpenAiCompatible } from "@/lib/generate/providers/openAiCompatible";

/**
 * Generates content via Pollinations API.
 * Free credits: https://enter.pollinations.ai
 * @param topic - User-provided video topic
 * @param apiKey - Pollinations API key
 */
export function generateWithPollinations(
  topic: string,
  apiKey: string,
): Promise<GenerateResponse> {
  return generateWithOpenAiCompatible(topic, apiKey, {
    url: "https://gen.pollinations.ai/v1/chat/completions",
    model: "openai",
    providerName: "Pollinations",
  });
}
