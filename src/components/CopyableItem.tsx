"use client";

import { useState } from "react";
import { copyToClipboard, hapticLight } from "@/lib/native";
import { translations, type Lang } from "@/lib/translations";

interface CopyableItemProps {
  text: string;
  index?: number;
  variant?: "list" | "script";
  lang?: Lang;
}

const itemBase =
  "group flex w-full items-start gap-3 rounded-xl border border-transparent px-3 py-3 text-left text-[15px] text-gray-800 transition-colors active:bg-[#f5f5f5] focus:outline-none focus:ring-2 focus:ring-gray-900/10";

export function CopyableItem({
  text,
  index,
  variant = "list",
  lang = "en",
}: CopyableItemProps) {
  const [copied, setCopied] = useState(false);
  const t = translations[lang];

  async function handleCopy() {
    try {
      await copyToClipboard(text);
      void hapticLight();
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* ignore */
    }
  }

  if (variant === "script") {
    return (
      <button type="button" onClick={handleCopy} className={`${itemBase} touch-active flex-col`}>
        <pre className="w-full whitespace-pre-wrap font-sans leading-relaxed">{text}</pre>
        <span className="mt-2 inline-flex min-h-[20px] items-center gap-1.5 text-xs font-medium text-gray-500">
          {copied ? (
            <>
              <CheckIcon className="text-emerald-600" />
              {t.copiedLabel}
            </>
          ) : (
            <>
              <CopyIcon />
              {t.copyLabel}
            </>
          )}
        </span>
      </button>
    );
  }

  return (
    <button type="button" onClick={handleCopy} className={`${itemBase} touch-target touch-active`}>
      {index !== undefined && (
        <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-xs font-semibold text-gray-600">
          {index}
        </span>
      )}
      <span className="min-w-0 flex-1 leading-snug">{text}</span>
      <span className="mt-1 shrink-0">
        {copied ? (
          <CheckIcon className="text-emerald-600" />
        ) : (
          <CopyIcon className="text-gray-400" />
        )}
      </span>
    </button>
  );
}

function CopyIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`h-4 w-4 ${className}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
      />
    </svg>
  );
}

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`h-4 w-4 ${className}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}
