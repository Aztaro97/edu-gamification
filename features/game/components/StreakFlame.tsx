"use client";

import { useTranslations } from "next-intl";

interface StreakFlameProps {
  count: number;
}

export function StreakFlame({ count }: StreakFlameProps) {
  const t = useTranslations("playerPanel");

  return (
    <div
      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full"
      style={{
        background:
          "linear-gradient(180deg, rgba(239,51,64,0.2) 0%, rgba(239,51,64,0.05) 100%)",
        border: "1px solid rgba(239,51,64,0.5)",
      }}
      role="status"
      aria-label={`${count} day streak`}
    >
      <svg
        width="16"
        height="18"
        viewBox="0 0 16 18"
        aria-hidden
        focusable="false"
      >
        <path
          d="M8 1 C 10 5, 14 6, 13 11 C 13 15, 10 17, 8 17 C 6 17, 3 15, 3 11 C 3 8, 5 7, 6 5 C 7 7, 7 3, 8 1Z"
          fill="url(#redGrad)"
          stroke="#F4D97A"
          strokeWidth="0.8"
        >
          <animate
            attributeName="d"
            values="M8 1 C 10 5, 14 6, 13 11 C 13 15, 10 17, 8 17 C 6 17, 3 15, 3 11 C 3 8, 5 7, 6 5 C 7 7, 7 3, 8 1Z;
                    M8 1 C 11 5, 14 7, 13 11 C 13 15, 10 17, 8 17 C 6 17, 3 15, 3 11 C 3 7, 5 7, 6 5 C 7 7, 7 2, 8 1Z;
                    M8 1 C 10 5, 14 6, 13 11 C 13 15, 10 17, 8 17 C 6 17, 3 15, 3 11 C 3 8, 5 7, 6 5 C 7 7, 7 3, 8 1Z"
            dur="1.4s"
            repeatCount="indefinite"
          />
        </path>
      </svg>
      <span className="font-display font-bold text-[#F4D97A] tabular-nums" dir="ltr">
        {count}
      </span>
      <span className="text-[10px] text-[#F5EED6]/70 uppercase tracking-wider">
        {t("streak")}
      </span>
    </div>
  );
}
