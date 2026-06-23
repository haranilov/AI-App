import type { GenerateResponse } from "@/types/generate";
import { buildSystemPrompt, buildUserPrompt } from "@/lib/generate/prompts";
import { parseAiJson } from "@/lib/generate/parseAiJson";
import { extractPuterText, loadPuter } from "@/lib/puter";

/**
 * Generates content via Puter.js in-browser AI.
 * @param topic - User video topic.
 * @param contentLabel - Detected language label for prompts.
 */
export async function generateWithPuter(
  topic: string,
  contentLabel: string,
): Promise<GenerateResponse> {
  const puter = await loadPuter();
  const response = await puter.ai.chat(
    [
      { role: "system", content: buildSystemPrompt(contentLabel) },
      { role: "user", content: buildUserPrompt(topic) },
    ],
    { model: "gemini-2.5-flash", temperature: 0.9 },
  );
  return parseAiJson(extractPuterText(response));
}
