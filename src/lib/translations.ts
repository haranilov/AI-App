/** All user-facing UI strings (English). */
export interface Translations {
  appName: string;
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
  regenerating: string;
  loadingEllipsis: string;
  done: (hooks: number, titles: number) => string;
  copyAll: string;
  copiedAll: string;
  regenerate: string;
  shareTitle: string;
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
  privacyLink: string;
  termsLink: string;
  privacyPageTitle: string;
  termsPageTitle: string;
  backLabel: string;
  updatedPrefix: string;
  aiDisclosure: string;
  shareBtn: string;
  shareUnavailable: string;
  copyLabel: string;
  copiedLabel: string;
  modeLabels: Record<string, string>;
  themeSwitchLight: string;
  themeSwitchDark: string;
  metaDescription: string;
}

/** Default English UI copy. */
export const t: Translations = {
  appName: "HookAI",
  tagline: "Hooks · Titles · Scripts",
  headline: "Viral Ideas in Seconds",
  subheadline:
    "AI hook generator for TikTok, Reels and Shorts. Enter a topic — get ready-to-film content.",
  placeholder: "Enter video topic…",
  hint: "Enter — generate · Shift+Enter — new line",
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
  regenerating: "Regenerating…",
  loadingEllipsis: "…",
  done: (hooks, titles) => `Done: ${hooks} hooks · ${titles} titles`,
  copyAll: "Copy all",
  copiedAll: "Copied ✓",
  regenerate: "Regenerate",
  shareTitle: "HookAI",
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
  example2Label: "sports motivation",
  example2Topic: "sports motivation",
  footer: "HookAI · for content creators",
  privacyLink: "Privacy",
  termsLink: "Terms",
  privacyPageTitle: "Privacy Policy — HookAI",
  termsPageTitle: "Terms of Service — HookAI",
  backLabel: "Back",
  updatedPrefix: "Updated:",
  aiDisclosure: "AI-generated suggestions — review before publishing.",
  shareBtn: "Share",
  shareUnavailable: "Sharing is not available on this device",
  copyLabel: "Click to copy",
  copiedLabel: "Copied",
  modeLabels: {
    puter: "Free AI (Puter)",
    gemini: "Google Gemini (free tier)",
    groq: "Groq (free tier)",
    pollinations: "Pollinations",
    openai: "OpenAI",
    templates: "Local templates",
  },
  metaDescription:
    "AI generator of catchy hooks, titles and scripts for TikTok, Reels and YouTube Shorts",
  themeSwitchLight: "Switch to light mode",
  themeSwitchDark: "Switch to dark mode",
};
