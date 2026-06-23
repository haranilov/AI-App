/**
 * Returns true when an env API key is missing or still a placeholder.
 * @param apiKey - Value from environment variables.
 */
export function isPlaceholderKey(apiKey: string | undefined): boolean {
  if (!apiKey) return true;
  const k = apiKey.trim().toLowerCase();
  return (
    k === "" ||
    k === "mock" ||
    k.includes("your-") ||
    k.includes("placeholder") ||
    k === "sk-your-openai-api-key-here"
  );
}
