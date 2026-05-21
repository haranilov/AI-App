"use client";

import { useState } from "react";
import { translations, type Lang } from "@/lib/translations";

interface CopyableItemProps {
  text: string;
  index?: number;
  variant?: "list" | "script";
  lang?: Lang;
}

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
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* ignore */
    }
  }

  if (variant === "script") {
    return (
      <button
        type="button"
        onClick={handleCopy}
        className="group w-full rounded-[12px] border border-[#e8e8e8] bg-[#fafafa] p-4 text-left text-sm leading-relaxed text-gray-800 transition-all hover:border-gray-300 hover:bg-white hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10"
      >
        <pre className="whitespace-pre-wrap font-sans">{text}</pre>
        <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 group-hover:text-gray-700">
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
    <button
      type="button"
      onClick={handleCopy}
      className="group flex w-full items-start gap-3 rounded-[12px] border border-transparent px-3 py-2.5 text-left text-sm text-gray-800 transition-all hover:border-[#e8e8e8] hover:bg-[#fafafa] focus:outline-none focus:ring-2 focus:ring-gray-900/10"
    >
      {index !== undefined && (
        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-xs font-semibold text-gray-600 group-hover:bg-gray-200">
          {index}
        </span>
      )}
      <span className="flex-1 leading-snug">{text}</span>
      <span className="mt-0.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100">
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
