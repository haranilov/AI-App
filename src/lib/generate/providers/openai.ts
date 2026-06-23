import { generateWithOpenAiCompatible } from "@/lib/generate/providers/openAiCompatible";
import type { GenerateResponse } from "@/types/generate";

/** Generates content via OpenAI API. */
export function generateWithOpenAI(
  topic: string,
  apiKey: string,
  contentLabel: string,
): Promise<GenerateResponse> {
  return generateWithOpenAiCompatible(topic, apiKey, contentLabel, {
    url: "https://api.openai.com/v1/chat/completions",
    model: "gpt-4o-mini",
    providerName: "OpenAI",
  });
}
