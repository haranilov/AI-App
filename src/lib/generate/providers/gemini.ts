import type { GenerateResponse } from "@/types/generate";
import { buildSystemPrompt, buildUserPrompt } from "@/lib/generate/prompts";
import { parseAiJson } from "@/lib/generate/parseAiJson";

/**
 * Generates content via Google Gemini API.
 * @param topic - User video topic.
 * @param apiKey - Gemini API key.
 * @param contentLabel - Detected language label for prompts.
 */
export async function generateWithGemini(
  topic: string,
  apiKey: string,
  contentLabel: string,
): Promise<GenerateResponse> {
  const model = "gemini-2.5-flash";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey)}`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: buildSystemPrompt(contentLabel) }] },
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
    throw new Error(data.error?.message ?? `Gemini error (${res.status})`);
  }

  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error("EMPTY_GEMINI_RESPONSE");
  return parseAiJson(text);
}
