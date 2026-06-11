export type Lang = "en" | "ru";

export interface Translations {
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
  errorClipboard: string;
  errorDefault: string;
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
  privacyLink: string;
  termsLink: string;
  aiDisclosure: string;
  shareBtn: string;
  shareUnavailable: string;
  copyLabel: string;
  copiedLabel: string;
  modeLabels: Record<string, string>;
}

export const translations: Record<Lang, Translations> = {
  en: {
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
    errorClipboard: "Failed to copy to clipboard",
    errorDefault: "Something went wrong",
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
    example2Label: "sports motivation",
    example2Topic: "sports motivation",
    footer: "HookAI · for content creators",
    privacyLink: "Privacy",
    termsLink: "Terms",
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
  },
  ru: {
    tagline: "Хуки · Заголовки · Сценарии",
    headline: "Вирусные идеи за секунды",
    subheadline:
      "AI-генератор хуков для TikTok, Reels и Shorts. Введите тему — получите готовый контент для съёмки.",
    placeholder: "Введите тему видео…",
    hint: "Enter — генерация · Shift+Enter — новая строка",
    generating: "Генерация…",
    generateBtn: "Сгенерировать хуки",
    modeAiUnavailable:
      "AI недоступен — шаблоны. Бесплатно: Puter (автовход) или ключ Gemini в .env.local",
    modeLocalTemplates: "Локальные шаблоны",
    modeFree: "— бесплатно, без ключа",
    errorEmptyTopic: "Введите тему видео",
    errorClipboard: "Не удалось скопировать в буфер обмена",
    errorDefault: "Что-то пошло не так",
    regenerating: "Перегенерация…",
    done: (hooks, titles) => `Готово: ${hooks} хуков · ${titles} заголовков`,
    copyAll: "Скопировать всё",
    copiedAll: "Скопировано ✓",
    regenerate: "Перегенерировать",
    hooksHeader: "═══ ХУКИ ═══",
    titlesHeader: "═══ ЗАГОЛОВКИ ═══",
    scriptHeader: "═══ СЦЕНАРИЙ ═══",
    hooksTitle: "Хуки",
    hooksSubtitle: "Цепляющие первые фразы — кликните, чтобы скопировать",
    titlesTitle: "Заголовки",
    titlesSubtitle: "5 вариантов для обложки и описания",
    scriptTitle: "Сценарий",
    scriptSubtitle: "15–30 сек: хук → объяснение → призыв",
    loadingText: "Генерация…",
    loadingSubtext: "Создаём хуки, заголовки и сценарий",
    exampleTopics: "Примеры тем:",
    example1Label: "заработок онлайн",
    example1Topic: "как заработать деньги онлайн",
    example2Label: "мотивация для спорта",
    example2Topic: "мотивация для спорта",
    footer: "HookAI · для контент-креаторов",
    privacyLink: "Конфиденциальность",
    termsLink: "Условия",
    aiDisclosure: "AI-подсказки — проверяйте перед публикацией.",
    shareBtn: "Поделиться",
    shareUnavailable: "Поделиться недоступно на этом устройстве",
    copyLabel: "Нажмите, чтобы скопировать",
    copiedLabel: "Скопировано",
    modeLabels: {
      puter: "Бесплатный AI (Puter)",
      gemini: "Google Gemini (бесплатный тариф)",
      groq: "Groq (бесплатный тариф)",
      pollinations: "Pollinations",
      openai: "OpenAI",
      templates: "Локальные шаблоны",
    },
  },
};
