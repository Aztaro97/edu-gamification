"use client";

import { useLocale, useTranslations } from "next-intl";
import type { ReactNode } from "react";
import type { Lesson, LessonState } from "../types";
import { LessonIcon } from "./LessonIcon";
import { MashrabiyaBand } from "./MashrabiyaBand";
import { Stars } from "./Stars";
import { StartButton } from "./StartButton";

interface LessonCardProps {
  lesson: Lesson | undefined;
  onStart?: (lesson: Lesson) => void;
}

const ACCENTS: Record<LessonState, string> = {
  completed: "#009A44",
  active: "#EF3340",
  unlocked: "#C8A951",
  locked: "#2B3A55",
};

export function LessonCard({ lesson, onStart }: LessonCardProps) {
  const t = useTranslations("lessonCard");
  const locale = useLocale();
  const isAr = locale === "ar";

  if (!lesson) return null;

  const accent = ACCENTS[lesson.state];
  const stateKey = lesson.state as "completed" | "active" | "unlocked" | "locked";
  const stateLabel = t(
    stateKey === "completed" ? "stateCompleted"
    : stateKey === "active" ? "stateActive"
    : stateKey === "unlocked" ? "stateUnlocked"
    : "stateLocked"
  );

  return (
    <article
      aria-label={`Lesson ${lesson.id}: ${lesson.title}`}
      className="relative rounded-2xl overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #12213F 0%, #0A1628 100%)",
        border: `1px solid ${accent}66`,
      }}
    >
      <div className="px-5 pt-4">
        <MashrabiyaBand opacity={0.55} />
      </div>
      <div
        className="h-1"
        style={{
          background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
        }}
      />

      <div className="px-6 py-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div
              className="relative shrink-0"
              style={{ width: 56, height: 56 }}
            >
              <svg
                width="56"
                height="56"
                viewBox="0 0 56 56"
                aria-hidden
                focusable="false"
              >
                <polygon
                  points="28,2 35,7 43,6 44,14 50,18 47,26 50,34 44,38 43,46 35,45 28,50 21,45 13,46 12,38 6,34 9,26 6,18 12,14 13,6 21,7"
                  fill={`${accent}22`}
                  stroke={accent}
                  strokeWidth="1.5"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <LessonIcon name={lesson.icon} size={28} color={accent} />
              </div>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <div
                  className="text-[10px] tracking-[0.25em] font-semibold"
                  style={{ color: accent }}
                >
                  {t("lesson", { id: lesson.id })} · {lesson.system.toUpperCase()}
                </div>
                <div
                  className="text-[10px] tracking-[0.2em] px-2 py-0.5 rounded-full"
                  style={{
                    color: accent,
                    background: `${accent}18`,
                    border: `1px solid ${accent}55`,
                  }}
                >
                  {stateLabel}
                </div>
              </div>
              <h2
                className={`text-2xl font-bold text-white mt-1 leading-tight ${isAr ? "font-arabic" : "font-display"}`}
                dir={isAr ? "rtl" : undefined}
              >
                {isAr ? lesson.titleAr : lesson.title}
              </h2>
            </div>
          </div>
        </div>

        <p className="text-sm text-[#F5EED6]/80 leading-relaxed mt-4 max-w-prose">
          {lesson.description}
        </p>

        <div className="grid grid-cols-2 gap-3 mt-5">
          <MetaCell label={t("estTime")} value={lesson.time} />
          <MetaCell label={t("xpReward")} value={`+${lesson.xp}`} valueColor="#F4D97A" />
          <MetaCell label={t("difficulty")} custom={<Stars count={3} earned={lesson.difficulty} />} />
          <MetaCell label={t("starsEarned")} custom={<Stars count={3} earned={lesson.starsEarned} />} />
        </div>

        <div className="mt-6 flex items-center justify-between gap-4 flex-wrap">
          <StartButton
            state={lesson.state}
            onClick={onStart ? () => onStart(lesson) : undefined}
          />
          <p className="text-[11px] text-[#F5EED6]/60 max-w-[240px] leading-snug">
            {t.rich("completeAllStars", {
              badge: () => (
                <span className="text-[#F4D97A] font-semibold">{t("falconScholar")}</span>
              ),
            })}
          </p>
        </div>
      </div>
    </article>
  );
}

interface MetaCellProps {
  label: string;
  value?: string;
  valueColor?: string;
  custom?: ReactNode;
}

function MetaCell({ label, value, valueColor = "#F5EED6", custom }: MetaCellProps) {
  return (
    <div
      className="rounded-lg px-3 py-2"
      style={{
        background: "rgba(200,169,81,0.06)",
        border: "1px solid rgba(200,169,81,0.2)",
      }}
    >
      <div className="text-[9px] tracking-[0.2em] uppercase text-[#C8A951]/90">
        {label}
      </div>
      {value && (
        <div
          className="text-base font-display font-bold mt-0.5 tabular-nums"
          style={{ color: valueColor }}
        >
          {value}
        </div>
      )}
      {custom && <div className="mt-1">{custom}</div>}
    </div>
  );
}
