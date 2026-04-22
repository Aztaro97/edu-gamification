"use client";

import { useTranslations } from "next-intl";
import { LEADERBOARD } from "../data";
import type { LeaderEntry } from "../types";
import { Avatar } from "./Avatar";
import { MashrabiyaBand } from "./MashrabiyaBand";

export function Leaderboard() {
  const t = useTranslations("leaderboard");

  return (
    <section
      aria-label="Weekly leaderboard"
      className="relative rounded-2xl overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #12213F 0%, #0A1628 100%)",
        border: "1px solid rgba(200,169,81,0.3)",
      }}
    >
      <div className="px-5 pt-4 pb-2 flex items-center justify-between">
        <div className="font-display text-[11px] tracking-[0.25em] text-[#C8A951] uppercase">
          {t("title")}
        </div>
        <div className="text-[10px] text-[#F5EED6]/50 uppercase tracking-widest">
          {t("thisWeek")}
        </div>
      </div>
      <MashrabiyaBand className="px-5" opacity={0.4} />
      <ol className="px-4 pb-4 pt-3 space-y-2">
        {LEADERBOARD.slice(0, 3).map((entry) => (
          <LeaderRow key={entry.rank} entry={entry} />
        ))}
      </ol>
    </section>
  );
}

interface LeaderRowProps {
  entry: LeaderEntry;
}

function LeaderRow({ entry }: LeaderRowProps) {
  const t = useTranslations("leaderboard");
  const rankColor =
    entry.rank === 1 ? "#F4D97A" : entry.rank === 2 ? "#EF3340" : "#009A44";
  const tone = entry.rank === 1 ? "gold" : entry.rank === 2 ? "red" : "green";

  return (
    <li
      className="flex items-center gap-3 px-2.5 py-2 rounded-lg"
      style={{
        background: entry.you
          ? "rgba(239,51,64,0.08)"
          : "rgba(200,169,81,0.04)",
        border: entry.you
          ? "1px solid rgba(239,51,64,0.5)"
          : "1px solid rgba(200,169,81,0.15)",
      }}
    >
      <div
        className="relative shrink-0 flex items-center justify-center"
        style={{ width: 32, height: 32 }}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          aria-hidden
          focusable="false"
        >
          <polygon
            points="16,2 20,6 26,5 26,11 30,16 26,21 26,27 20,26 16,30 12,26 6,27 6,21 2,16 6,11 6,5 12,6"
            fill={rankColor}
            fillOpacity="0.2"
            stroke={rankColor}
            strokeWidth="1.3"
          />
        </svg>
        <span
          className="absolute font-display font-bold text-sm"
          style={{ color: rankColor }}
        >
          {entry.rank}
        </span>
      </div>
      <Avatar initials={entry.initials} tone={tone} size={36} />
      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold text-white truncate flex items-center gap-1.5">
          {entry.name}
          {entry.you && (
            <span
              className="text-[9px] px-1.5 py-0.5 rounded text-[#EF3340]"
              style={{
                background: "rgba(239,51,64,0.15)",
                border: "1px solid rgba(239,51,64,0.5)",
              }}
            >
              {t("you")}
            </span>
          )}
        </div>
        <div className="text-[10px] text-[#F5EED6]/50 tracking-wider uppercase">
          {entry.xp.toLocaleString()} XP
        </div>
      </div>
      {entry.rank === 1 && (
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          aria-hidden
          focusable="false"
        >
          <path
            d="M2 5 L6 9 L9 3 L12 9 L16 5 L15 14 L3 14 Z"
            fill="url(#goldGrad)"
            stroke="#F4D97A"
            strokeWidth="0.8"
          />
        </svg>
      )}
    </li>
  );
}
