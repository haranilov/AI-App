import { generateWithOpenAiCompatible } from "@/lib/generate/providers/openAiCompatible";
import type { GenerateResponse } from "@/types/generate";

/** Generates content via Pollinations API. */
export function generateWithPollinations(
  topic: string,
  apiKey: string,
  contentLabel: string,
): Promise<GenerateResponse> {
  return generateWithOpenAiCompatible(topic, apiKey, contentLabel, {
    url: "https://gen.pollinations.ai/v1/chat/completions",
    model: "openai",
    providerName: "Pollinations",
  });
}
