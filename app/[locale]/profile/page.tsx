"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { useGame } from "@/features/game/GameContext";
import { GlassPanel } from "@/features/game/components/Atoms";
import { Avatar } from "@/features/game/components/Avatar";
import { BadgeMark } from "@/features/game/components/Badge";
import { BADGES, STREAK_HISTORY } from "@/features/game/data";

export default function ProfilePage() {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("profile");
  const {
    xp,
    level,
    xpIntoLevel,
    xpForLevel,
    nextThreshold,
    streak,
    badges,
    completedLessons,
    lessonStars,
    leaderboardRank,
  } = useGame();

  const [xpPct, setXpPct] = useState(0);
  const target = xpForLevel > 0 ? (xpIntoLevel / xpForLevel) * 100 : 0;

  useEffect(() => {
    const t = setTimeout(() => setXpPct(target), 300);
    return () => clearTimeout(t);
  }, [target]);

  const totalStars = Object.values(lessonStars).reduce((a, b) => a + b, 0);
  const avgScore =
    completedLessons.length > 0
      ? Math.round((totalStars / (completedLessons.length * 3)) * 100)
      : 0;

  const isAr = locale === "ar";

  return (
    <div>
      <div className="mb-0">
        <div className="text-[10px] tracking-[0.35em] uppercase text-[#C8A951]">
          {t("kicker")}
        </div>
        <h1
          className={`text-3xl font-bold text-white mt-1 ${
            isAr ? "font-arabic" : "font-display"
          }`}
          dir={isAr ? "rtl" : undefined}
        >
          {t("playerName")}
        </h1>
      </div>

      <div className="grid grid-cols-12 gap-6 mt-6">
        <aside className="col-span-12 lg:col-span-4">
          <GlassPanel>
            <div className="p-6 text-center">
              <div className="flex justify-center mb-3">
                <Avatar initials="AM" tone="red" size={100} />
              </div>
              <div
                className={`text-xl font-bold text-white ${
                  isAr ? "font-arabic" : "font-display"
                }`}
                dir={isAr ? "rtl" : undefined}
              >
                {t("playerName")}
              </div>
              <div className="text-xs text-[#F5EED6]/60 mt-1">{t("school")}</div>

              <div
                className="mt-5 inline-flex items-center gap-2 px-4 py-1.5 rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(244,217,122,0.2), rgba(239,51,64,0.15))",
                  border: "1px solid rgba(244,217,122,0.5)",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16">
                  <polygon
                    points="8,1 10,6 15,6 11,9 13,15 8,11 3,15 5,9 1,6 6,6"
                    fill="#F4D97A"
                  />
                </svg>
                <span
                  className={`text-sm font-bold text-[#F4D97A] ${
                    isAr ? "font-arabic" : "font-display"
                  }`}
                >
                  {t("level", { level })}
                </span>
              </div>

              <div className="mt-5">
                <div className="flex items-baseline justify-between text-[10px] mb-1.5">
                  <span className="text-[#C8A951] tracking-[0.2em] uppercase">
                    {t("xpLabel")}
                  </span>
                  <span className="text-[#F5EED6]/80 tabular-nums whitespace-nowrap" dir="ltr">
                    {xp.toLocaleString()} / {nextThreshold.toLocaleString()}
                  </span>
                </div>
                <div
                  className="relative h-3 rounded-full overflow-hidden"
                  style={{ background: "#0A1628", border: "1px solid rgba(200,169,81,0.4)" }}
                >
                  <div
                    className="absolute inset-y-0 left-0"
                    style={{
                      width: `${xpPct}%`,
                      background:
                        "linear-gradient(90deg, #B21825, #EF3340 35%, #F4D97A 70%, #C8A951)",
                      transition: "width 1.6s cubic-bezier(0.22,1,0.36,1)",
                      boxShadow: "0 0 12px rgba(244,217,122,0.5)",
                    }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 mt-5">
                <StatBlock label={t("streak")} value={streak} color="#EF3340" />
                <StatBlock label={t("stars")} value={totalStars} color="#F4D97A" />
                <StatBlock label={t("badges")} value={badges.length} color="#009A44" />
              </div>

              <button
                onClick={() => router.push("/")}
                className="mt-5 text-[11px] text-[#C8A951] hover:text-[#F4D97A] transition-colors"
              >
                {t("backToJourney")}
              </button>
            </div>
          </GlassPanel>
        </aside>

        <main className="col-span-12 lg:col-span-8 space-y-5">
          <GlassPanel>
            <div className="p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="font-display text-[11px] tracking-[0.25em] uppercase text-[#C8A951]">
                    {t("streakThisWeek")}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-display text-2xl font-bold text-[#EF3340] tabular-nums">
                    {streak}
                  </div>
                  <div className="text-[10px] text-[#F5EED6]/50 uppercase tracking-wider">
                    {t("dayStreak")}
                  </div>
                </div>
              </div>
              <div className="flex items-end justify-between gap-2 h-32">
                {STREAK_HISTORY.map((d, i) => {
                  const max = 250;
                  const h = (d.xp / max) * 100;
                  return (
                    <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                      <div
                        className="w-full relative rounded-t"
                        style={{
                          height: `${Math.max(h, 4)}%`,
                          background:
                            d.xp > 0
                              ? "linear-gradient(180deg, #F4D97A, #B21825)"
                              : "rgba(200,169,81,0.15)",
                          animation: `barGrow 0.8s cubic-bezier(0.22,1,0.36,1) ${i * 0.08}s both`,
                          transformOrigin: "bottom",
                        }}
                      >
                        {d.xp > 0 && (
                          <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-[9px] text-[#F4D97A] font-semibold tabular-nums">
                            {d.xp}
                          </div>
                        )}
                      </div>
                      <div className="text-[10px] text-[#F5EED6]/60 uppercase tracking-wider">
                        {d.day}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </GlassPanel>

          <GlassPanel>
            <div className="p-5">
              <div className="font-display text-[11px] tracking-[0.25em] uppercase text-[#C8A951] mb-3">
                {t("learningStats")}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <BigStat
                  label={t("lessonsCompleted")}
                  value={`${completedLessons.length} / 7`}
                  dir="ltr"
                />
                <BigStat
                  label={t("averageScore")}
                  value={`${avgScore}%`}
                  color="#F4D97A"
                />
                <BigStat label={t("totalTime")} value="3h 14m" />
                <BigStat
                  label={t("leaderboardRank")}
                  value={`#${leaderboardRank}`}
                  color="#EF3340"
                />
              </div>
            </div>
          </GlassPanel>

          <GlassPanel>
            <div className="p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="font-display text-[11px] tracking-[0.25em] uppercase text-[#C8A951]">
                  {t("badgeCollection")}
                </div>
                <button
                  onClick={() => router.push("/rewards")}
                  className="text-[11px] text-[#F4D97A] hover:underline"
                >
                  {t("viewAll")}
                </button>
              </div>
              <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
                {BADGES.map((b) => (
                  <BadgeMark
                    key={b.id}
                    badge={b}
                    muted={!badges.includes(b.id)}
                    size={52}
                    showLabel={false}
                  />
                ))}
              </div>
            </div>
          </GlassPanel>
        </main>
      </div>
    </div>
  );
}

interface StatBlockProps {
  label: string;
  value: number;
  color?: string;
}

function StatBlock({ label, value, color = "#F4D97A" }: StatBlockProps) {
  return (
    <div
      className="rounded-lg p-2.5"
      style={{
        background: "rgba(200,169,81,0.06)",
        border: "1px solid rgba(200,169,81,0.2)",
      }}
    >
      <div
        className="font-display text-xl font-bold tabular-nums"
        style={{ color }}
      >
        {value}
      </div>
      <div className="text-[9px] tracking-widest uppercase text-[#F5EED6]/60">
        {label}
      </div>
    </div>
  );
}

interface BigStatProps {
  label: string;
  value: string;
  color?: string;
  dir?: "ltr" | "rtl";
}

function BigStat({ label, value, color = "#F5EED6", dir }: BigStatProps) {
  return (
    <div
      className="rounded-lg p-3"
      style={{
        background: "rgba(200,169,81,0.04)",
        border: "1px solid rgba(200,169,81,0.2)",
      }}
    >
      <div
        className="font-display text-2xl font-bold tabular-nums"
        style={{ color }}
        dir={dir}
      >
        {value}
      </div>
      <div className="text-[9px] tracking-widest uppercase text-[#C8A951] mt-0.5">
        {label}
      </div>
    </div>
  );
}
