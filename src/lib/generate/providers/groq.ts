import { generateWithOpenAiCompatible } from "@/lib/generate/providers/openAiCompatible";
import type { GenerateResponse } from "@/types/generate";

/** Generates content via Groq API. */
export function generateWithGroq(
  topic: string,
  apiKey: string,
  contentLabel: string,
): Promise<GenerateResponse> {
  return generateWithOpenAiCompatible(topic, apiKey, contentLabel, {
    url: "https://api.groq.com/openai/v1/chat/completions",
    model: "llama-3.3-70b-versatile",
    providerName: "Groq",
  });
}
