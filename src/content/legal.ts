export type LegalSection = { title: string; body: string[] };

export type LegalDoc = { title: string; updated: string; sections: LegalSection[] };

export const privacyPolicy: LegalDoc = {
  title: "Privacy Policy",
  updated: "June 10, 2026",
  sections: [
    {
      title: "Overview",
      body: [
        "HookAI helps content creators generate video hooks, titles, and short scripts using on-device templates and optional third-party AI services.",
        "We do not operate user accounts and we do not sell personal data.",
      ],
    },
    {
      title: "Data You Provide",
      body: [
        "When you enter a video topic, that text is processed to generate content.",
        "If AI generation is enabled, your topic may be sent to third-party AI providers such as Google Gemini, Groq, or Pollinations solely to produce results.",
        "We do not store your topics on HookAI servers because the app has no backend.",
      ],
    },
    {
      title: "AI Processing",
      body: [
        "HookAI uses artificial intelligence to suggest hooks, titles, and scripts.",
        "AI output may be inaccurate or inappropriate. You are responsible for reviewing content before publishing.",
        "On iOS, generation may use bundled API credentials or local templates when network AI is unavailable.",
      ],
    },
    {
      title: "Data Stored on Your Device",
      body: [
        "The app may keep your last selected language preference in local browser storage.",
        "Generated results remain on your device until you close the app or clear app data.",
      ],
    },
    {
      title: "Third-Party Services",
      body: [
        "Third-party AI providers process prompts according to their own privacy policies.",
        "We recommend reviewing Google, Groq, and Pollinations privacy terms if you use AI generation.",
      ],
    },
    {
      title: "Children",
      body: ["HookAI is not directed to children under 13."],
    },
    {
      title: "Contact",
      body: ["Questions about privacy: support@hookai.app"],
    },
  ],
};

export const termsOfService: LegalDoc = {
  title: "Terms of Service",
  updated: "June 10, 2026",
  sections: [
    {
      title: "Acceptance",
      body: [
        "By using HookAI you agree to these Terms of Service.",
        "If you do not agree, do not use the app.",
      ],
    },
    {
      title: "Service Description",
      body: [
        "HookAI provides AI-assisted and template-based suggestions for short-form video content.",
        "The app is provided as-is without guarantees of virality, accuracy, or platform compliance.",
      ],
    },
    {
      title: "Your Responsibilities",
      body: [
        "You are responsible for reviewing generated content before publishing.",
        "Do not use HookAI to create unlawful, harmful, misleading, or infringing content.",
        "You must comply with TikTok, Instagram, YouTube, and other platform rules.",
      ],
    },
    {
      title: "AI Content",
      body: [
        "AI-generated text may resemble existing content. You are responsible for ensuring originality where required.",
        "We do not claim ownership of content you generate.",
      ],
    },
    {
      title: "Availability",
      body: [
        "AI features depend on network connectivity and third-party providers.",
        "Local templates remain available offline.",
      ],
    },
    {
      title: "Limitation of Liability",
      body: [
        "HookAI is not liable for lost revenue, account penalties, or damages arising from use of generated content.",
      ],
    },
    {
      title: "Contact",
      body: ["Support: support@hookai.app"],
    },
  ],
};
