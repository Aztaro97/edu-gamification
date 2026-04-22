"use client";

import { useEffect, useState } from "react";

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

  useEffect(() => {
    const id = setInterval(() => setTime(tick), 1000);
    return () => clearInterval(id);
  }, []);

  const aria = `Daily challenge ends in ${time.h} hours ${time.m} minutes ${time.s} seconds`;

  return (
    <section
      aria-label="Daily challenge"
      className="relative rounded-2xl overflow-hidden"
      style={{
        background:
          "linear-gradient(110deg, #1B2A4A 0%, #0A1628 55%, #3B2514 100%)",
        border: "1px solid rgba(244,217,122,0.45)",
        boxShadow: "0 16px 40px -16px rgba(244,217,122,0.35)",
      }}
    >
      <svg
        className="absolute top-0 right-0 opacity-40"
        width="160"
        height="160"
        viewBox="0 0 160 160"
        aria-hidden
        focusable="false"
      >
        <rect width="160" height="160" fill="url(#mashrabiya)" />
      </svg>
      <div className="relative p-4 flex items-center gap-4 flex-wrap">
        <div className="relative shrink-0" style={{ width: 56, height: 56 }}>
          <svg
            width="56"
            height="56"
            viewBox="0 0 56 56"
            aria-hidden
            focusable="false"
          >
            <g transform="translate(28 28)">
              {Array.from({ length: 12 }).map((_, i) => (
                <rect
                  key={i}
                  x="-1"
                  y="-26"
                  width="2"
                  height="8"
                  fill="#F4D97A"
                  transform={`rotate(${i * 30})`}
                >
                  <animate
                    attributeName="opacity"
                    values="1;0.3;1"
                    dur={`${2 + (i % 3) * 0.4}s`}
                    repeatCount="indefinite"
                    begin={`${i * 0.08}s`}
                  />
                </rect>
              ))}
              <circle r="12" fill="url(#goldGrad)" stroke="#F4D97A" />
              <polygon
                points="0,-6 2,-2 6,-2 3,1 4,5 0,3 -4,5 -3,1 -6,-2 -2,-2"
                fill="#0A1628"
              />
            </g>
          </svg>
        </div>
        <div className="flex-1 min-w-[200px]">
          <div className="flex items-center gap-2">
            <div className="font-display text-[10px] tracking-[0.3em] text-[#F4D97A] uppercase">
              Daily Challenge
            </div>
            <div
              className="font-arabic text-xs text-[#F5EED6]/70"
              dir="rtl"
            >
              · تحدي اليوم
            </div>
          </div>
          <h3 className="font-display text-lg font-bold text-white mt-0.5 leading-tight">
            The Heart Beats 100,000 Times
          </h3>
          <p className="text-xs text-[#F5EED6]/70 mt-0.5">
            Answer 5 questions in under 60 seconds to earn bonus XP.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-[9px] tracking-[0.25em] uppercase text-[#C8A951]">
              Ends in
            </div>
            <div
              className="font-display font-bold text-xl text-white tabular-nums"
              role="timer"
              aria-label={aria}
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
            className="px-3 py-2 rounded-lg text-center"
            style={{
              background:
                "linear-gradient(180deg, rgba(244,217,122,0.2), rgba(200,169,81,0.05))",
              border: "1px solid rgba(244,217,122,0.5)",
            }}
          >
            <div className="text-[9px] text-[#C8A951] uppercase tracking-widest">
              Bonus
            </div>
            <div className="font-display font-bold text-[#F4D97A] text-xl">
              +350 XP
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
