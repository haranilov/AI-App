import type { GenerateResponse } from "@/types/generate";
import { buildSystemPrompt, buildUserPrompt } from "@/lib/generate/prompts";
import { parseAiJson } from "@/lib/generate/parseAiJson";

interface OpenAiCompatibleConfig {
  url: string;
  model: string;
  providerName: string;
}

/**
 * Calls an OpenAI-compatible chat completions endpoint.
 * @param topic - User video topic.
 * @param apiKey - Provider API key.
 * @param contentLabel - Detected language label for prompts.
 * @param config - Endpoint URL, model name, and provider label for errors.
 */
export async function generateWithOpenAiCompatible(
  topic: string,
  apiKey: string,
  contentLabel: string,
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
        { role: "system", content: buildSystemPrompt(contentLabel) },
        { role: "user", content: buildUserPrompt(topic) },
      ],
    }),
  });

  const data = (await res.json()) as {
    error?: { message?: string };
    choices?: { message?: { content?: string } }[];
  };

  if (!res.ok) {
    throw new Error(data.error?.message ?? `${config.providerName} error (${res.status})`);
  }

  const content = data.choices?.[0]?.message?.content;
  if (!content) throw new Error(`EMPTY_${config.providerName.toUpperCase()}_RESPONSE`);
  return parseAiJson(content);
}
