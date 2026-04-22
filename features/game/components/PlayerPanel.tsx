"use client";

import { useLocale, useTranslations } from "next-intl";
import { BADGES, PLAYER } from "../data";
import { ArchFrame } from "./ArchFrame";
import { GlassPanel } from "./Atoms";
import { Avatar } from "./Avatar";
import { BadgeMark } from "./Badge";
import { LevelMedal } from "./LevelMedal";
import { StreakFlame } from "./StreakFlame";
import { useGame } from "../GameContext";

interface PlayerPanelProps {
  xpPct?: number;
}

export function PlayerPanel({ xpPct: externalXpPct }: PlayerPanelProps) {
  const { xp, nextThreshold, level, streak, badges } = useGame();
  const t = useTranslations("playerPanel");
  const locale = useLocale();
  const isAr = locale === "ar";

  const remaining = nextThreshold - xp;
  const xpPct = externalXpPct !== undefined ? externalXpPct : (xp / nextThreshold) * 100;
  const earnedBadges = badges.map(id => BADGES.find(b => b.id === id)).filter(Boolean) as typeof BADGES;

  return (
    <GlassPanel aria-label="Player profile">
      <div className="px-5 pt-5 pb-4">
        <ArchFrame>
          <div className="flex items-center gap-4">
            <Avatar initials={PLAYER.initials} tone="red" size={56} />
            <div className="min-w-0">
              <div className="font-display text-[11px] tracking-[0.25em] text-[#C8A951] uppercase">
                {t("player")}
              </div>
              <div
                className={`text-lg text-white leading-tight truncate ${isAr ? "font-arabic" : "font-display"}`}
                dir={isAr ? "rtl" : undefined}
              >
                {isAr ? PLAYER.nameAr : PLAYER.name}
              </div>
              <div className="text-[11px] text-[#F5EED6]/60 mt-0.5">
                {PLAYER.grade}
              </div>
            </div>
          </div>
        </ArchFrame>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LevelMedal level={level} />
            <div>
              <div className="text-[10px] tracking-[0.2em] uppercase text-[#C8A951]">
                {t("level", { level })}
              </div>
              <div
                className={`text-sm text-white font-semibold ${isAr ? "font-arabic" : ""}`}
                dir={isAr ? "rtl" : undefined}
              >
                {isAr ? PLAYER.titleAr : PLAYER.title}
              </div>
            </div>
          </div>
          <StreakFlame count={streak} />
        </div>

        <div className="mt-4">
          <div className="flex items-baseline justify-between text-[11px] mb-1.5">
            <span className="text-[#C8A951] tracking-[0.2em] uppercase">
              {t("xp")}
            </span>
            <span className="text-[#F5EED6]/80 tabular-nums" dir="ltr">
              {xp.toLocaleString()} / {nextThreshold.toLocaleString()}
            </span>
          </div>
          <div
            className="relative h-3 rounded-full overflow-hidden"
            role="progressbar"
            aria-label="Experience progress"
            aria-valuemin={0}
            aria-valuemax={nextThreshold}
            aria-valuenow={xp}
            style={{
              background: "#0A1628",
              border: "1px solid rgba(200,169,81,0.4)",
            }}
          >
            <div
              className="absolute inset-y-0 left-0 motion-reduce:transition-none"
              style={{
                width: `${xpPct}%`,
                background:
                  "linear-gradient(90deg, #B21825 0%, #EF3340 35%, #F4D97A 70%, #C8A951 100%)",
                transition: "width 1.6s cubic-bezier(0.22,1,0.36,1)",
                boxShadow: "0 0 12px rgba(244,217,122,0.5)",
              }}
            />
            {[25, 50, 75].map((tick) => (
              <div
                key={tick}
                className="absolute top-0 bottom-0 w-px bg-black/40"
                style={{ left: `${tick}%` }}
              />
            ))}
          </div>
          <div className="mt-1 text-[10px] text-[#F5EED6]/50">
            {t("xpToLevel", { remaining: remaining.toLocaleString(), next: level + 1 })}
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <div className="text-[11px] tracking-[0.2em] uppercase text-[#C8A951]">
              {t("badges")}
            </div>
            <div className="text-[10px] text-[#F5EED6]/50">
              {earnedBadges.length} {t("earned")}
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {earnedBadges.slice(0, 4).map((b) => (
              <BadgeMark key={b.id} badge={b} />
            ))}
          </div>
        </div>
      </div>
    </GlassPanel>
  );
}
