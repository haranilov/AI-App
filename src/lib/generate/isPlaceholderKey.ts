/**
 * Returns true when an API key is missing or still a placeholder value.
 * @param apiKey - Environment API key value
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
