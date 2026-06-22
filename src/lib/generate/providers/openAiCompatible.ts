import type { GenerateResponse } from "@/types/generate";
import { buildUserPrompt, SYSTEM_PROMPT } from "@/lib/generate/prompts";
import { parseAiJson } from "@/lib/generate/parseAiJson";
import { t } from "@/lib/translations";

interface OpenAiCompatibleConfig {
  url: string;
  model: string;
  providerName: string;
}

/**
 * Calls an OpenAI-compatible chat completions API.
 * @param topic - User-provided video topic
 * @param apiKey - Provider API key
 * @param config - Provider endpoint configuration
 */
export async function generateWithOpenAiCompatible(
  topic: string,
  apiKey: string,
  config: OpenAiCompatibleConfig,
): Promise<GenerateResponse> {
  const res = await fetch(config.url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: config.model,
      temperature: 0.9,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: buildUserPrompt(topic) },
      ],
    }),
  });

  const data = (await res.json()) as {
    error?: { message?: string };
    choices?: { message?: { content?: string } }[];
  };

  if (!res.ok) {
    throw new Error(data.error?.message ?? t.errorProviderApi(config.providerName, res.status));
  }

  const content = data.choices?.[0]?.message?.content;
  if (!content) throw new Error(t.errorEmptyProviderResponse(config.providerName));
  return parseAiJson(content);
}
