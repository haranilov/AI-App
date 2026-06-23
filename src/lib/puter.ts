/** Load Puter.js — free in-browser AI without a developer API key */

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

/** Loads Puter.js for free in-browser AI (browser only). */
export function loadPuter(): Promise<NonNullable<Window["puter"]>> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Puter is only available in the browser"));
  }

  if (window.puter?.ai?.chat) {
    return Promise.resolve(window.puter);
  }

  if (!loadPromise) {
    loadPromise = new Promise((resolve, reject) => {
      const existing = document.querySelector('script[data-hookai-puter]');
      if (existing) {
        existing.addEventListener("load", () => waitReady(resolve, reject));
        existing.addEventListener("error", () => reject(new Error("Failed to load Puter.js")));
        return;
      }

      const script = document.createElement("script");
      script.src = "https://js.puter.com/v2/";
      script.async = true;
      script.dataset.hookaiPuter = "1";
      script.onload = () => waitReady(resolve, reject);
      script.onerror = () => reject(new Error("Failed to load Puter.js"));
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
      reject(new Error("Puter.js failed to initialize"));
      return;
    }
    setTimeout(tick, 100);
  };
  tick();
}

/** Extracts plain text from a Puter.ai chat response object. */
export function extractPuterText(response: unknown): string {
  if (typeof response === "string") return response;
  if (!response || typeof response !== "object") {
    throw new Error("Empty Puter response");
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

  throw new Error("Could not parse Puter response");
}
