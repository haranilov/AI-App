import type { GenerateResponse } from "@/types/generate";

/**
 * English template fallback when AI providers are unavailable.
 * @param topic - User video topic.
 */
export function buildEnglishTemplates(topic: string): GenerateResponse {
  const t = topic.trim() || "your topic";

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
