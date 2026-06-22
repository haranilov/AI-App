import type { GenerateResponse } from "@/types/generate";
import { t } from "@/lib/translations";

/**
 * Parses and validates AI JSON output into a GenerateResponse.
 * @param content - Raw AI response text
 */
export function parseAiJson(content: string): GenerateResponse {
  const cleaned = content.replace(/^```json\s*/i, "").replace(/```\s*$/i, "").trim();
  const parsed = JSON.parse(cleaned) as GenerateResponse;

  if (
    !Array.isArray(parsed.hooks) ||
    !Array.isArray(parsed.titles) ||
    typeof parsed.script !== "string"
  ) {
    throw new Error(t.errorInvalidAiResponse);
  }

  return {
    hooks: parsed.hooks.map(String).filter(Boolean),
    titles: parsed.titles.map(String).filter(Boolean),
    script: parsed.script.trim(),
  };
}
