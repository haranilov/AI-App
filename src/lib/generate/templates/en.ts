import type { GenerateResponse } from "@/types/generate";

/**
 * Builds English fallback templates for a video topic.
 * @param subject - Trimmed topic or default placeholder
 */
export function buildEnglishTemplates(subject: string): GenerateResponse {
  return {
    hooks: [
      `Nobody is talking about this when it comes to "${subject}"…`,
      `I spent 3 years on "${subject}" — here's what actually works`,
      `Stop doing this with "${subject}" if you want real results`,
      `99% of beginners in "${subject}" make this mistake in the first 10 seconds`,
      `This changed my "${subject}" content in just one week`,
      `The secret about "${subject}" that big creators are hiding`,
      `You're doing "${subject}" wrong — here's the proof`,
      `One trick in "${subject}" that doubled my views`,
      `Why you're struggling with "${subject}"? The answer is brutal`,
      `Watch till the end about "${subject}" — or you'll miss the most important part`,
      `I wouldn't have believed this about "${subject}" if I hadn't seen it myself`,
      `Three steps in "${subject}" that nobody shows you`,
      `This is free in "${subject}" but almost nobody uses it`,
      `I'll explain "${subject}" better in 30 seconds than an hour on Google`,
      `If you care about "${subject}" — stop scrolling`,
    ],
    titles: [
      `How to master "${subject}" in 30 seconds`,
      `5 mistakes in "${subject}" that kill your views`,
      `The secret to a viral video about "${subject}" (tested)`,
      `Do "${subject}" THIS way — and the algorithm will love you`,
      `"${subject}" for beginners: the complete no-fluff guide`,
    ],
    script: `HOOK: "Stop. If you're interested in ${subject} — the next 20 seconds will save you weeks of trial and error."

EXPLANATION: "Here are three things about ${subject} that are working right now: first — start with a specific pain point for your viewer, second — show the result in 3 seconds, third — speak in plain language with no jargon."

CALL TO ACTION: "Save this video, follow for more, and comment 'HOOK' below — I'll send you a checklist with 10 ready-to-use lines about ${subject}."`,
  };
}
