import type { ReactNode } from "react";
import type { Lesson, LessonState } from "../types";
import { LessonIcon } from "./LessonIcon";
import { MashrabiyaBand } from "./MashrabiyaBand";
import { StartButton } from "./StartButton";
import { Stars } from "./Stars";

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

const STATE_LABELS: Record<LessonState, string> = {
  completed: "COMPLETED",
  active: "IN PROGRESS",
  unlocked: "READY TO START",
  locked: "LOCKED",
};

const STATE_LABELS_AR: Record<LessonState, string> = {
  completed: "مكتمل",
  active: "قيد التقدم",
  unlocked: "جاهز للبدء",
  locked: "مقفل",
};

export function LessonCard({ lesson, onStart }: LessonCardProps) {
  if (!lesson) return null;

  const accent = ACCENTS[lesson.state];
  const stateLabel = STATE_LABELS[lesson.state];
  const stateAr = STATE_LABELS_AR[lesson.state];

  return (
    <article
      aria-label={`Lesson ${lesson.id}: ${lesson.title}`}
      className="relative rounded-2xl overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #12213F 0%, #0A1628 100%)",
        border: `1px solid ${accent}66`,
        boxShadow: `0 20px 60px -20px ${accent}55`,
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
                  LESSON {lesson.id} · {lesson.system.toUpperCase()}
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
                  <span className="font-arabic ms-1.5" dir="rtl">
                    · {stateAr}
                  </span>
                </div>
              </div>
              <h2 className="font-display text-2xl font-bold text-white mt-1 leading-tight">
                {lesson.title}
              </h2>
              <h3
                className="font-arabic text-lg text-[#F5EED6]/80 mt-0.5"
                dir="rtl"
              >
                {lesson.titleAr}
              </h3>
            </div>
          </div>
        </div>

        <p className="text-sm text-[#F5EED6]/80 leading-relaxed mt-4 max-w-prose">
          {lesson.description}
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
          <MetaCell
            label="Est. Time"
            labelAr="الوقت"
            value={lesson.time}
          />
          <MetaCell
            label="XP Reward"
            labelAr="نقاط الخبرة"
            value={`+${lesson.xp}`}
            valueColor="#F4D97A"
          />
          <MetaCell
            label="Difficulty"
            labelAr="الصعوبة"
            custom={<Stars count={3} earned={lesson.difficulty} />}
          />
          <MetaCell
            label="Stars Earned"
            labelAr="النجوم"
            custom={<Stars count={3} earned={lesson.starsEarned} />}
          />
        </div>

        <div className="mt-6 flex items-center justify-between gap-4 flex-wrap">
          <StartButton
            state={lesson.state}
            onClick={onStart ? () => onStart(lesson) : undefined}
          />
          <p className="text-[11px] text-[#F5EED6]/60 max-w-[240px] leading-snug">
            Complete all 3 stars to earn the{" "}
            <span className="text-[#F4D97A] font-semibold">
              Falcon Scholar
            </span>{" "}
            bonus badge.
          </p>
        </div>
      </div>
    </article>
  );
}

interface MetaCellProps {
  label: string;
  labelAr: string;
  value?: string;
  valueColor?: string;
  custom?: ReactNode;
}

function MetaCell({
  label,
  labelAr,
  value,
  valueColor = "#F5EED6",
  custom,
}: MetaCellProps) {
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
      <div
        className="text-[9px] font-arabic text-[#F5EED6]/50 -mt-0.5"
        dir="rtl"
      >
        {labelAr}
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
