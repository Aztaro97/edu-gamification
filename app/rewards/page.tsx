"use client";

import { useState } from "react";
import { BadgeMark } from "@/features/game/components/Badge";
import { BADGES, getBadgeProgress } from "@/features/game/data";
import { useGame } from "@/features/game/GameContext";
import type { Badge } from "@/features/game/types";

interface BilingualHeaderProps {
  kicker: string;
  kickerAr: string;
  en: string;
  ar: string;
}

function BilingualHeader({ kicker, kickerAr, en, ar }: BilingualHeaderProps) {
  return (
    <div>
      <div className="flex items-center gap-2">
        <div className="font-display text-[10px] tracking-[0.3em] text-[#C8A951] uppercase">
          {kicker}
        </div>
        <div className="font-arabic text-xs text-[#F5EED6]/60" dir="rtl">
          · {kickerAr}
        </div>
      </div>
      <div className="font-display text-2xl font-bold text-white">{en}</div>
      <div className="font-arabic text-lg text-[#F5EED6]/80" dir="rtl">
        {ar}
      </div>
    </div>
  );
}

export default function RewardsPage() {
  const { badges, completedLessons, lessonStars, streak, dailyCompleted, xp } = useGame();
  const [hoverId, setHoverId] = useState<string | null>(null);

  const earned = BADGES.filter((b) => badges.includes(b.id));
  const locked = BADGES.filter((b) => !badges.includes(b.id));
  const nextBadge = locked[0] as Badge | undefined;

  const totalStars = Object.values(lessonStars).reduce((a, b) => a + b, 0);
  const perfectLessons = Object.values(lessonStars).filter((s) => s === 3).length;

  const stats = {
    completedLessons: completedLessons.length,
    totalStars,
    perfectLessons,
    streak,
    dailyCompleted: dailyCompleted ? 1 : 0,
    xp,
  };

  return (
    <div>
      <BilingualHeader
        kicker="Rewards"
        kickerAr="الجوائز"
        en="Badge Collection"
        ar="مجموعة الأوسمة"
      />

      {/* Hero */}
      <div
        className="mt-6 relative rounded-2xl overflow-hidden p-6"
        style={{
          background:
            "linear-gradient(110deg, #1B2A4A 0%, #0A1628 55%, #3B2514 100%)",
          border: "1px solid rgba(244,217,122,0.45)",
        }}
      >
        <svg
          className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
          aria-hidden
          focusable="false"
        >
          <rect width="100%" height="100%" fill="url(#mashrabiya)" />
        </svg>
        <div className="relative flex items-center gap-6 flex-wrap">
          <div className="text-[#F4D97A] font-display text-6xl font-bold tabular-nums">
            {earned.length}
            <span className="text-[#C8A951] text-3xl">/{BADGES.length}</span>
          </div>
          <div className="flex-1 min-w-[240px]">
            <div className="font-display text-xl font-bold text-white">
              Badges Unlocked
            </div>
            <div className="font-arabic text-[#F5EED6]/80" dir="rtl">
              الأوسمة المكتسبة
            </div>
            <div
              className="mt-3 h-2 rounded-full overflow-hidden"
              style={{
                background: "#0A1628",
                border: "1px solid rgba(200,169,81,0.3)",
              }}
            >
              <div
                style={{
                  width: `${(earned.length / BADGES.length) * 100}%`,
                  height: "100%",
                  background: "linear-gradient(90deg, #EF3340, #F4D97A)",
                  transition: "width 2s ease-out",
                }}
              />
            </div>
          </div>
          {nextBadge && (
            <div
              className="rounded-xl px-4 py-3 flex items-center gap-3"
              style={{
                background: "rgba(10,22,40,0.6)",
                border: "1px solid rgba(200,169,81,0.4)",
              }}
            >
              <BadgeMark badge={nextBadge} muted size={48} showLabel={false} />
              <div>
                <div className="text-[10px] tracking-widest uppercase text-[#C8A951]">
                  Next Up
                </div>
                <div className="font-display text-sm text-white font-bold">
                  {nextBadge.name}
                </div>
                <div className="text-[10px] text-[#F5EED6]/60">
                  {nextBadge.req}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Grid */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        {BADGES.map((b) => {
          const isEarned = badges.includes(b.id);
          const { current } = getBadgeProgress(b, stats);
          const pct = Math.min(100, (current / b.threshold) * 100);
          const hovered = hoverId === b.id;
          return (
            <div
              key={b.id}
              onMouseEnter={() => setHoverId(b.id)}
              onMouseLeave={() => setHoverId(null)}
              className="relative rounded-2xl p-5 text-center transition-all cursor-pointer"
              style={{
                background: isEarned
                  ? "linear-gradient(180deg, rgba(244,217,122,0.08), rgba(10,22,40,0.4))"
                  : "rgba(10,22,40,0.5)",
                border: `1px solid ${isEarned ? "rgba(244,217,122,0.5)" : "rgba(200,169,81,0.15)"}`,
                transform: hovered ? "translateY(-4px) scale(1.02)" : "none",
                boxShadow:
                  hovered && isEarned
                    ? "0 20px 40px -10px rgba(244,217,122,0.5)"
                    : "none",
              }}
            >
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none opacity-30"
                aria-hidden
                focusable="false"
              >
                <rect width="100%" height="100%" fill="url(#lattice)" />
              </svg>
              <div className="relative flex justify-center">
                <BadgeMark badge={b} muted={!isEarned} size={72} showLabel={false} />
              </div>
              <div className="relative font-display text-sm font-bold text-white mt-2">
                {b.name}
              </div>
              <div
                className="relative font-arabic text-xs text-[#F5EED6]/70"
                dir="rtl"
              >
                {b.nameAr}
              </div>
              <div className="relative text-[10px] text-[#F5EED6]/60 mt-2">
                {b.description}
              </div>
              {!isEarned && (
                <div className="relative mt-2">
                  <div
                    className="h-1 rounded-full overflow-hidden"
                    style={{ background: "#0A1628" }}
                  >
                    <div
                      style={{
                        width: `${pct}%`,
                        height: "100%",
                        background:
                          "linear-gradient(90deg, #C8A951, #F4D97A)",
                        transition: "width 1s ease-out",
                      }}
                    />
                  </div>
                  <div className="text-[9px] text-[#C8A951] mt-1 tabular-nums">
                    {current}/{b.threshold}
                  </div>
                </div>
              )}
              {isEarned && (
                <div className="relative mt-2 text-[9px] text-[#F4D97A] tracking-widest uppercase">
                  ✓ Earned
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
