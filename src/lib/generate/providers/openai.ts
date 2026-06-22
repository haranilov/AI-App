import type { GenerateResponse } from "@/types/generate";
import { generateWithOpenAiCompatible } from "@/lib/generate/providers/openAiCompatible";

/**
 * Generates content via OpenAI API.
 * @param topic - User-provided video topic
 * @param apiKey - OpenAI API key
 */
export function generateWithOpenAI(
  topic: string,
  apiKey: string,
): Promise<GenerateResponse> {
  return generateWithOpenAiCompatible(topic, apiKey, {
    url: "https://api.openai.com/v1/chat/completions",
    model: "gpt-4o-mini",
    providerName: "OpenAI",
  });
}
