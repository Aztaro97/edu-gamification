"use client";

import { useTranslations } from "next-intl";
import type { LessonState } from "../types";

interface StartButtonProps {
  state: LessonState;
  onClick?: () => void;
}

export function StartButton({ state, onClick }: StartButtonProps) {
  const t = useTranslations("startButton");
  const disabled = state === "locked" || state === "completed";
  const label = t(state as "completed" | "active" | "unlocked" | "locked");

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="relative group font-display font-bold tracking-[0.15em] text-sm px-7 py-3 rounded-lg overflow-hidden transition-transform active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4D97A]/80 disabled:cursor-not-allowed"
      style={{
        background: disabled
          ? "linear-gradient(180deg, #2B3A55 0%, #1B2A4A 100%)"
          : "linear-gradient(180deg, #EF3340 0%, #B21825 100%)",
        color: "#FFFFFF",
        border: `1px solid ${disabled ? "#2B3A55" : "#F4D97A"}`,
        boxShadow: disabled
          ? "none"
          : "0 8px 24px -6px rgba(239,51,64,0.6), inset 0 1px 0 rgba(255,255,255,0.2)",
        cursor: disabled ? "not-allowed" : "pointer",
      }}
    >
      {!disabled && (
        <span
          aria-hidden
          className="absolute inset-0 pointer-events-none motion-reduce:hidden"
          style={{
            background:
              "linear-gradient(110deg, transparent 35%, rgba(244,217,122,0.5) 50%, transparent 65%)",
            animation: "game-shimmer 2.8s linear infinite",
          }}
        />
      )}
      <span className="relative flex items-center gap-2">
        <span>{label}</span>
        {!disabled && (
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden
            focusable="false"
            className="transition-transform group-hover:translate-x-0.5"
          >
            <path
              d="M3 8 H12 M9 5 L12 8 L9 11"
              stroke="#F4D97A"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
    </button>
  );
}
