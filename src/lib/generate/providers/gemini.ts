import type { GenerateResponse } from "@/types/generate";
import { buildUserPrompt, SYSTEM_PROMPT } from "@/lib/generate/prompts";
import { parseAiJson } from "@/lib/generate/parseAiJson";
import { t } from "@/lib/translations";

/**
 * Generates content via Google Gemini API.
 * Free key: https://aistudio.google.com/apikey
 * @param topic - User-provided video topic
 * @param apiKey - Gemini API key
 */
export async function generateWithGemini(
  topic: string,
  apiKey: string,
): Promise<GenerateResponse> {
  const model = "gemini-2.5-flash";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey)}`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents: [{ role: "user", parts: [{ text: buildUserPrompt(topic) }] }],
      generationConfig: {
        temperature: 0.9,
        responseMimeType: "application/json",
      },
    }),
  });

  const data = (await res.json()) as {
    error?: { message?: string };
    candidates?: { content?: { parts?: { text?: string }[] } }[];
  };

  if (!res.ok) {
    throw new Error(data.error?.message ?? t.errorProviderApi("Gemini", res.status));
  }

  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error(t.errorEmptyProviderResponse("Gemini"));
  return parseAiJson(text);
}
