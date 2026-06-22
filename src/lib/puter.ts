/** Load Puter.js — free in-browser AI without a developer API key */

import { t } from "@/lib/translations";

declare global {
  interface Window {
    puter?: {
      ai: {
        chat: (
          prompt: string | { role: string; content: string }[],
          options?: { model?: string; temperature?: number },
        ) => Promise<unknown>;
      };
    };
  }
}

let loadPromise: Promise<NonNullable<Window["puter"]>> | null = null;

/**
 * Loads Puter.js for in-browser AI without a developer API key.
 */
export function loadPuter(): Promise<NonNullable<Window["puter"]>> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error(t.errorPuterBrowserOnly));
  }

  if (window.puter?.ai?.chat) {
    return Promise.resolve(window.puter);
  }

  if (!loadPromise) {
    loadPromise = new Promise((resolve, reject) => {
      const existing = document.querySelector('script[data-hookai-puter]');
      if (existing) {
        existing.addEventListener("load", () => waitReady(resolve, reject));
        existing.addEventListener("error", () => reject(new Error(t.errorPuterLoadFailed)));
        return;
      }

      const script = document.createElement("script");
      script.src = "https://js.puter.com/v2/";
      script.async = true;
      script.dataset.hookaiPuter = "1";
      script.onload = () => waitReady(resolve, reject);
      script.onerror = () => reject(new Error(t.errorPuterLoadFailed));
      document.head.appendChild(script);
    });
  }

  return loadPromise;
}

function waitReady(
  resolve: (p: NonNullable<Window["puter"]>) => void,
  reject: (e: Error) => void,
) {
  let attempts = 0;
  const tick = () => {
    if (window.puter?.ai?.chat) {
      resolve(window.puter);
      return;
    }
    if (attempts++ > 50) {
      reject(new Error(t.errorPuterInitFailed));
      return;
    }
    setTimeout(tick, 100);
  };
  tick();
}

/**
 * Extracts text content from a Puter.js chat response.
 * @param response - Raw Puter API response
 */
export function extractPuterText(response: unknown): string {
  if (typeof response === "string") return response;
  if (!response || typeof response !== "object") {
    throw new Error(t.errorEmptyPuterResponse);
  }

  const r = response as Record<string, unknown>;

  if (typeof r.message === "object" && r.message !== null) {
    const msg = r.message as Record<string, unknown>;
    if (typeof msg.content === "string") return msg.content;
  }

  if (typeof r.text === "string") return r.text;
  if (typeof r.content === "string") return r.content;

  const choices = r.choices as { message?: { content?: string } }[] | undefined;
  const fromChoice = choices?.[0]?.message?.content;
  if (fromChoice) return fromChoice;

  throw new Error(t.errorParsePuterResponse);
}
