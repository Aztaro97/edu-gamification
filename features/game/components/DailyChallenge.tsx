"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useGame } from "../GameContext";

interface Countdown {
  readonly h: number;
  readonly m: number;
  readonly s: number;
}

const INITIAL: Countdown = { h: 8, m: 42, s: 15 };

function tick(prev: Countdown): Countdown {
  let { h, m, s } = prev;
  s -= 1;
  if (s < 0) {
    s = 59;
    m -= 1;
    if (m < 0) {
      m = 59;
      h = Math.max(0, h - 1);
    }
  }
  return { h, m, s };
}

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

export function DailyChallenge() {
  const [time, setTime] = useState<Countdown>(INITIAL);
  const { dailyCompleted } = useGame();
  const t = useTranslations("dailyWidget");
  const tDaily = useTranslations("daily");

  useEffect(() => {
    const id = setInterval(() => setTime(tick), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <Link
      href="/daily"
      className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4D97A]/60 rounded-2xl"
    >
      <section
        aria-label="Daily challenge"
        className="relative rounded-2xl overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]"
        style={{
          background: "linear-gradient(110deg, #1B2A4A 0%, #0A1628 55%, #3B2514 100%)",
          border: "1px solid rgba(244,217,122,0.45)",
          boxShadow: "0 16px 40px -16px rgba(244,217,122,0.35)",
        }}
      >
        <svg
          className="absolute top-0 right-0 opacity-40"
          width="140"
          height="140"
          viewBox="0 0 140 140"
          aria-hidden
          focusable="false"
        >
          <rect width="140" height="140" fill="url(#mashrabiya)" />
        </svg>
        <div className="relative p-4">
          <div className="mb-2">
            <div className="font-display text-[10px] tracking-[0.3em] text-[#F4D97A] uppercase">
              {t("title")}
            </div>
          </div>
          <div className="font-display text-base font-bold text-white leading-tight">
            {dailyCompleted ? t("completedToday") : tDaily("title")}
          </div>
          <div className="flex items-center justify-between mt-3">
            <div>
              <div className="text-[9px] tracking-[0.25em] uppercase text-[#C8A951]">{t("endsIn")}</div>
              <div
                className="font-display font-bold text-white tabular-nums"
                role="timer"
                aria-label={`Daily challenge ends in ${time.h} hours ${time.m} minutes ${time.s} seconds`}
                suppressHydrationWarning
              >
                {pad(time.h)}
                <span className="text-[#C8A951]">:</span>
                {pad(time.m)}
                <span className="text-[#C8A951]">:</span>
                {pad(time.s)}
              </div>
            </div>
            <div
              className="px-2 py-1 rounded-lg text-center"
              style={{
                background: "linear-gradient(180deg, rgba(244,217,122,0.2), rgba(200,169,81,0.05))",
                border: "1px solid rgba(244,217,122,0.5)",
              }}
            >
              <div className="text-[9px] text-[#C8A951] uppercase tracking-widest">{t("bonus")}</div>
              <div className="font-display font-bold text-[#F4D97A]">+350 XP</div>
            </div>
          </div>
        </div>
      </section>
    </Link>
  );
}
