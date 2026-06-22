/** Shape of all user-facing UI strings. */
export interface Translations {
  brandName: string;
  brandBadge: string;
  metaTitle: string;
  metaDescription: string;
  tagline: string;
  headline: string;
  subheadline: string;
  placeholder: string;
  hint: string;
  generating: string;
  generateBtn: string;
  modeAiUnavailable: string;
  modeLocalTemplates: string;
  modeFree: string;
  errorEmptyTopic: string;
  errorTopicTooLong: string;
  errorClipboard: string;
  errorDefault: string;
  errorInvalidAiResponse: string;
  errorEmptyPuterResponse: string;
  errorParsePuterResponse: string;
  errorPuterBrowserOnly: string;
  errorPuterLoadFailed: string;
  errorPuterInitFailed: string;
  errorProviderApi: (provider: string, status: number) => string;
  errorEmptyProviderResponse: (provider: string) => string;
  regenerating: string;
  done: (hooks: number, titles: number) => string;
  copyAll: string;
  copiedAll: string;
  regenerate: string;
  hooksHeader: string;
  titlesHeader: string;
  scriptHeader: string;
  hooksTitle: string;
  hooksSubtitle: string;
  titlesTitle: string;
  titlesSubtitle: string;
  scriptTitle: string;
  scriptSubtitle: string;
  loadingText: string;
  loadingSubtext: string;
  exampleTopics: string;
  example1Label: string;
  example1Topic: string;
  example2Label: string;
  example2Topic: string;
  footer: string;
  copyLabel: string;
  copiedLabel: string;
  themeSwitchToLight: string;
  themeSwitchToDark: string;
  modeLabels: Record<string, string>;
}

/** English UI copy for the application. */
export const t: Translations = {
  brandName: "HookAI",
  brandBadge: "Pro",
  metaTitle: "HookAI — Viral Hooks for Short Videos",
  metaDescription:
    "AI generator of catchy hooks, titles and scripts for TikTok, Reels and YouTube Shorts",
  tagline: "Hooks · Titles · Scripts",
  headline: "Viral Ideas in Seconds",
  subheadline:
    "AI hook generator for TikTok, Reels and Shorts. Enter a topic in any language — get ready-to-film content in that language.",
  placeholder: "Enter video topic in any language…",
  hint: "Enter — submit · Shift+Enter — new line",
  generating: "Generating…",
  generateBtn: "Generate Hooks",
  modeAiUnavailable:
    "AI unavailable — using templates. Free options: Puter (auto-login) or Gemini key in .env.local",
  modeLocalTemplates: "Local templates",
  modeFree: "— free, no key required",
  errorEmptyTopic: "Please enter a video topic",
  errorTopicTooLong: "Topic is too long (max 500 characters)",
  errorClipboard: "Failed to copy to clipboard",
  errorDefault: "Something went wrong",
  errorInvalidAiResponse: "Invalid AI response format",
  errorEmptyPuterResponse: "Empty Puter response",
  errorParsePuterResponse: "Could not parse Puter response",
  errorPuterBrowserOnly: "Puter is only available in the browser",
  errorPuterLoadFailed: "Failed to load Puter.js",
  errorPuterInitFailed: "Puter.js failed to initialize",
  errorProviderApi: (provider, status) => `${provider} error (${status})`,
  errorEmptyProviderResponse: (provider) => `Empty ${provider} response`,
  regenerating: "Regenerating…",
  done: (hooks, titles) => `Done: ${hooks} hooks · ${titles} titles`,
  copyAll: "Copy all",
  copiedAll: "Copied ✓",
  regenerate: "Regenerate",
  hooksHeader: "═══ HOOKS ═══",
  titlesHeader: "═══ TITLES ═══",
  scriptHeader: "═══ SCRIPT ═══",
  hooksTitle: "Hooks",
  hooksSubtitle: "Catchy opening lines — click to copy",
  titlesTitle: "Titles",
  titlesSubtitle: "5 options for thumbnail and description",
  scriptTitle: "Script",
  scriptSubtitle: "15–30 sec: hook → explanation → call to action",
  loadingText: "Generating…",
  loadingSubtext: "Creating hooks, titles and script",
  exampleTopics: "Example topics:",
  example1Label: "earn money online",
  example1Topic: "how to make money online",
  example2Label: "motivación deportiva",
  example2Topic: "motivación para hacer deporte",
  footer: "HookAI · for content creators",
  copyLabel: "Click to copy",
  copiedLabel: "Copied",
  themeSwitchToLight: "Switch to light theme",
  themeSwitchToDark: "Switch to dark theme",
  modeLabels: {
    puter: "Free AI (Puter)",
    gemini: "Google Gemini (free tier)",
    groq: "Groq (free tier)",
    pollinations: "Pollinations",
    openai: "OpenAI",
    templates: "Local templates",
  },
};
