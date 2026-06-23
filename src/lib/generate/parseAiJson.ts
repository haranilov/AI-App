import type { GenerateResponse } from "@/types/generate";

/**
 * Parses and validates JSON returned by an AI provider.
 * @param content - Raw model output (may include markdown fences).
 */
export function parseAiJson(content: string): GenerateResponse {
  const cleaned = content.replace(/^```json\s*/i, "").replace(/```\s*$/i, "").trim();
  const parsed = JSON.parse(cleaned) as GenerateResponse;

  if (
    !Array.isArray(parsed.hooks) ||
    !Array.isArray(parsed.titles) ||
    typeof parsed.script !== "string"
  ) {
    throw new Error("INVALID_AI_RESPONSE");
  }

  return {
    hooks: parsed.hooks.map(String).filter(Boolean),
    titles: parsed.titles.map(String).filter(Boolean),
    script: parsed.script.trim(),
  };
}
