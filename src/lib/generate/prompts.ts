/**
 * Builds the system prompt for AI providers.
 * @param contentLabel - Detected language label for the user's topic.
 */
export function buildSystemPrompt(contentLabel: string): string {
  return `You are an expert in viral content for TikTok, Instagram Reels and YouTube Shorts.
Respond with ONLY valid JSON, no markdown and no explanations.
Response format:
{
  "hooks": ["string1", ...],
  "titles": ["string1", ...],
  "script": "one string with \\n line breaks"
}
Requirements:
- hooks: 10-15 short catchy opening lines (up to 80 characters each)
- titles: exactly 5 video titles
- script: one 15-30 second script with HOOK → EXPLANATION → CALL TO ACTION sections (use section labels natural for the output language)
CRITICAL LANGUAGE RULE: Write hooks, titles, and script in the SAME LANGUAGE as the user's topic text.
The detected topic language is ${contentLabel}. Never switch to English unless the topic itself is in English.
Text: emotional, conversational, optimized for retention in the first 3 seconds.`;
}

/**
 * Builds the user prompt for a given video topic.
 * @param topic - User-entered video topic.
 */
export function buildUserPrompt(topic: string): string {
  return `Generate viral TikTok hooks, titles and a short script for this topic:
"${topic}"

Write every hook, title, and the full script in the exact same language as the topic above. Do not translate.`;
}
