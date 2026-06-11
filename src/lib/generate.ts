import { detectContentLanguage } from "@/lib/content-language";
import type { GenerateResponse } from "@/types/generate";
import { isNativeApp } from "@/lib/platform";
import { extractPuterText, loadPuter } from "@/lib/puter";
import type { Lang } from "@/lib/translations";

function buildSystemPrompt(contentLabel: string): string {
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

function buildUserPrompt(topic: string): string {
  return `Generate viral TikTok hooks, titles and a short script for this topic:
"${topic}"

Write every hook, title, and the full script in the exact same language as the topic above. Do not translate.`;
}

function parseAiJson(content: string): GenerateResponse {
  const cleaned = content.replace(/^```json\s*/i, "").replace(/```\s*$/i, "").trim();
  const parsed = JSON.parse(cleaned) as GenerateResponse;

  if (
    !Array.isArray(parsed.hooks) ||
    !Array.isArray(parsed.titles) ||
    typeof parsed.script !== "string"
  ) {
    throw new Error("Invalid AI response format");
  }

  return {
    hooks: parsed.hooks.map(String).filter(Boolean),
    titles: parsed.titles.map(String).filter(Boolean),
    script: parsed.script.trim(),
  };
}

function isPlaceholderKey(apiKey: string | undefined): boolean {
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

export function generateFromTemplates(topic: string, lang: Lang = "en"): GenerateResponse {
  const t = topic.trim() || (lang === "ru" ? "ваша тема" : "your topic");

  if (lang === "ru") {
    return {
      hooks: [
        `Никто не говорит об этом про «${t}»…`,
        `Я потратил 3 года на «${t}» — вот что реально работает`,
        `Перестань делать это в нише «${t}», если хочешь результат`,
        `99% новичков в «${t}» ошибаются в первые 10 секунд`,
        `Это изменило мой контент про «${t}» за одну неделю`,
        `Секрет «${t}», который прячут крупные блогеры`,
        `Ты делаешь «${t}» неправильно — вот доказательство`,
        `Один трюк в «${t}», который удвоил мои просмотры`,
        `Почему у тебя не получается с «${t}»? Ответ жёсткий`,
        `Смотри до конца про «${t}» — иначе потеряешь главное`,
        `Я бы не поверил про «${t}», если бы не увидел сам`,
        `Три шага в «${t}», которые никто не показывает`,
        `Это бесплатно в «${t}», но почти никто не использует`,
        `За 30 секунд объясню «${t}» лучше, чем за час в Google`,
        `Если тебя интересует «${t}» — останови скролл`,
      ],
      titles: [
        `Как разобраться в «${t}» за 30 секунд`,
        `5 ошибок в «${t}», которые убивают просмотры`,
        `Секрет вирусного видео про «${t}» (проверено)`,
        `Делайте «${t}» ТАК — и алгоритм полюбит вас`,
        `«${t}» для новичков: полный гайд без воды`,
      ],
      script: `ХУК: «Стоп. Если вас интересует ${t} — следующие 20 секунд сэкономят вам недели попыток.»

ОБЪЯСНЕНИЕ: «Вот три вещи по теме «${t}», которые работают прямо сейчас: первое — начните с конкретной боли зрителя, второе — покажите результат за 3 секунды, третье — говорите простым языком без жаргона.»

ПРИЗЫВ: «Сохраните это видео, подпишитесь и напишите в комментариях «ХУК» — пришлю чек-лист с 10 готовыми фразами про ${t}.»`,
    };
  }

  return {
    hooks: [
      `Nobody is talking about this when it comes to "${t}"…`,
      `I spent 3 years on "${t}" — here's what actually works`,
      `Stop doing this with "${t}" if you want real results`,
      `99% of beginners in "${t}" make this mistake in the first 10 seconds`,
      `This changed my "${t}" content in just one week`,
      `The secret about "${t}" that big creators are hiding`,
      `You're doing "${t}" wrong — here's the proof`,
      `One trick in "${t}" that doubled my views`,
      `Why you're struggling with "${t}"? The answer is brutal`,
      `Watch till the end about "${t}" — or you'll miss the most important part`,
      `I wouldn't have believed this about "${t}" if I hadn't seen it myself`,
      `Three steps in "${t}" that nobody shows you`,
      `This is free in "${t}" but almost nobody uses it`,
      `I'll explain "${t}" better in 30 seconds than an hour on Google`,
      `If you care about "${t}" — stop scrolling`,
    ],
    titles: [
      `How to master "${t}" in 30 seconds`,
      `5 mistakes in "${t}" that kill your views`,
      `The secret to a viral video about "${t}" (tested)`,
      `Do "${t}" THIS way — and the algorithm will love you`,
      `"${t}" for beginners: the complete no-fluff guide`,
    ],
    script: `HOOK: "Stop. If you're interested in ${t} — the next 20 seconds will save you weeks of trial and error."

EXPLANATION: "Here are three things about ${t} that are working right now: first — start with a specific pain point for your viewer, second — show the result in 3 seconds, third — speak in plain language with no jargon."

CALL TO ACTION: "Save this video, follow for more, and comment 'HOOK' below — I'll send you a checklist with 10 ready-to-use lines about ${t}."`,
  };
}

async function delay(ms: number) {
  await new Promise((r) => setTimeout(r, ms));
}

async function generateWithPuter(topic: string, contentLabel: string): Promise<GenerateResponse> {
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

/** Google Gemini — free key: https://aistudio.google.com/apikey */
async function generateWithGemini(
  topic: string,
  apiKey: string,
  contentLabel: string,
): Promise<GenerateResponse> {
  const model = "gemini-2.5-flash";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey)}`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: buildSystemPrompt(contentLabel) }] },
      contents: [{ role: "user", parts: [{ text: buildUserPrompt(topic) }] }],
      generationConfig: {
        temperature: 0.9,
        responseMimeType: "application/json",
      },
    }),
  });

  const data = (await res.json()) as {
    error?: { message?: string };
    candidates?: { content?: { parts?: { text?: string }[] } }[];
  };

  if (!res.ok) {
    throw new Error(data.error?.message ?? `Gemini error (${res.status})`);
  }

  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error("Empty Gemini response");
  return parseAiJson(text);
}

/** Groq — free key: https://console.groq.com/keys */
async function generateWithGroq(
  topic: string,
  apiKey: string,
  contentLabel: string,
): Promise<GenerateResponse> {
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      temperature: 0.9,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: buildSystemPrompt(contentLabel) },
        { role: "user", content: buildUserPrompt(topic) },
      ],
    }),
  });

  const data = (await res.json()) as {
    error?: { message?: string };
    choices?: { message?: { content?: string } }[];
  };

  if (!res.ok) {
    throw new Error(data.error?.message ?? `Groq error (${res.status})`);
  }

  const content = data.choices?.[0]?.message?.content;
  if (!content) throw new Error("Empty Groq response");
  return parseAiJson(content);
}

/** Pollinations — free credits: https://enter.pollinations.ai (pk_ key for browser) */
async function generateWithPollinations(
  topic: string,
  apiKey: string,
  contentLabel: string,
): Promise<GenerateResponse> {
  const res = await fetch("https://gen.pollinations.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "openai",
      temperature: 0.9,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: buildSystemPrompt(contentLabel) },
        { role: "user", content: buildUserPrompt(topic) },
      ],
    }),
  });

  const data = (await res.json()) as {
    error?: { message?: string };
    choices?: { message?: { content?: string } }[];
  };

  if (!res.ok) {
    throw new Error(data.error?.message ?? `Pollinations error (${res.status})`);
  }

  const content = data.choices?.[0]?.message?.content;
  if (!content) throw new Error("Empty Pollinations response");
  return parseAiJson(content);
}

async function generateWithOpenAI(
  topic: string,
  apiKey: string,
  contentLabel: string,
): Promise<GenerateResponse> {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      temperature: 0.9,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: buildSystemPrompt(contentLabel) },
        { role: "user", content: buildUserPrompt(topic) },
      ],
    }),
  });

  const data = (await res.json()) as {
    error?: { message?: string };
    choices?: { message?: { content?: string } }[];
  };

  if (!res.ok) {
    throw new Error(data.error?.message ?? `OpenAI error (${res.status})`);
  }

  const content = data.choices?.[0]?.message?.content;
  if (!content) throw new Error("Empty OpenAI response");
  return parseAiJson(content);
}

export type GenerateMode =
  | "puter"
  | "gemini"
  | "groq"
  | "pollinations"
  | "openai"
  | "templates";

export interface GenerateResult {
  data: GenerateResponse;
  mode: GenerateMode;
  /** true if all AI providers failed */
  usedTemplateFallback?: boolean;
}

type ProviderFn = (topic: string) => Promise<GenerateResponse>;

function buildProviderChain(contentLabel: string): { fn: ProviderFn; mode: GenerateMode }[] {
  const chain: { fn: ProviderFn; mode: GenerateMode }[] = [];

  // Puter.js is unreliable inside iOS WebView and may fail App Review.
  if (!isNativeApp()) {
    chain.push({ fn: (t) => generateWithPuter(t, contentLabel), mode: "puter" });
  }

  const gemini = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  if (!isPlaceholderKey(gemini)) {
    chain.push({
      fn: (t) => generateWithGemini(t, gemini!, contentLabel),
      mode: "gemini",
    });
  }

  const groq = process.env.NEXT_PUBLIC_GROQ_API_KEY;
  if (!isPlaceholderKey(groq)) {
    chain.push({
      fn: (t) => generateWithGroq(t, groq!, contentLabel),
      mode: "groq",
    });
  }

  const pollinations = process.env.NEXT_PUBLIC_POLLINATIONS_API_KEY;
  if (!isPlaceholderKey(pollinations)) {
    chain.push({
      fn: (t) => generateWithPollinations(t, pollinations!, contentLabel),
      mode: "pollinations",
    });
  }

  const openai = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
  if (!isPlaceholderKey(openai)) {
    chain.push({
      fn: (t) => generateWithOpenAI(t, openai!, contentLabel),
      mode: "openai",
    });
  }

  return chain;
}

/**
 * Free AI provider chain (no backend):
 * 1. Puter.js — no key needed (may prompt Puter login)
 * 2. Gemini / Groq / Pollinations — if a free key is set in .env.local
 * 3. Templates — always work
 */
/** @param uiLang — interface language (errors only). Output language follows the topic text. */
export async function generateHooks(topic: string, uiLang: Lang = "en"): Promise<GenerateResult> {
  const trimmed = topic.trim();
  if (!trimmed)
    throw new Error(uiLang === "ru" ? "Введите тему видео" : "Please enter a video topic");
  if (trimmed.length > 500)
    throw new Error(
      uiLang === "ru"
        ? "Тема слишком длинная (макс. 500 символов)"
        : "Topic is too long (max 500 characters)",
    );

  const { templateLang, label: contentLabel } = detectContentLanguage(trimmed);
  const chain = buildProviderChain(contentLabel);
  let failedProviders = 0;

  for (const { fn, mode } of chain) {
    try {
      const data = await fn(trimmed);
      return { data, mode };
    } catch {
      failedProviders++;
    }
  }

  await delay(500);
  return {
    data: generateFromTemplates(trimmed, templateLang),
    mode: "templates",
    usedTemplateFallback: failedProviders > 0,
  };
}
