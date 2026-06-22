import type { GenerateResponse } from "@/types/generate";
import { generateWithOpenAiCompatible } from "@/lib/generate/providers/openAiCompatible";

/**
 * Generates content via Groq API.
 * Free key: https://console.groq.com/keys
 * @param topic - User-provided video topic
 * @param apiKey - Groq API key
 */
export function generateWithGroq(topic: string, apiKey: string): Promise<GenerateResponse> {
  return generateWithOpenAiCompatible(topic, apiKey, {
    url: "https://api.groq.com/openai/v1/chat/completions",
    model: "llama-3.3-70b-versatile",
    providerName: "Groq",
  });
}
