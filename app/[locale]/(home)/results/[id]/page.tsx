"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { LESSONS } from "@/features/game/data";
import { GoldButton } from "@/features/game/components/Atoms";
import { useGame } from "@/features/game/GameContext";

function ResultsContent() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("results");
  const { xp, level, xpIntoLevel, xpForLevel, nextThreshold, getLessonState } =
    useGame();

  const lessonId = parseInt(id as string, 10);
  const lesson = LESSONS.find((l) => l.id === lessonId);
  const correct = parseInt(searchParams.get("correct") || "0", 10);
  const total = parseInt(searchParams.get("total") || "1", 10);

  const [xpAnim, setXpAnim] = useState(0);

  const pct = correct / total;
  let stars = 0;
  if (pct >= 0.95) stars = 3;
  else if (pct >= 0.7) stars = 2;
  else if (pct > 0) stars = 1;

  const earnedXp = lesson ? lesson.xp + correct * 10 : 0;

  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      i += Math.max(1, Math.round(earnedXp / 40));
      if (i >= earnedXp) {
        setXpAnim(earnedXp);
        clearInterval(t);
      } else {
        setXpAnim(i);
      }
    }, 30);
    return () => clearInterval(t);
  }, [earnedXp]);

  const nextLesson = useMemo(
    () =>
      LESSONS.find(
        (l) =>
          getLessonState(l.id) === "unlocked" || getLessonState(l.id) === "active",
      ),
    [getLessonState],
  );

  if (!lesson) return null;

  const levelPct = xpForLevel > 0 ? (xpIntoLevel / xpForLevel) * 100 : 0;
  const isAr = locale === "ar";

  return (
    <div className="max-w-3xl mx-auto pt-4 relative">
      <Confetti />

      <div
        className="relative rounded-2xl overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #12213F 0%, #0A1628 100%)",
          border: "1px solid rgba(244,217,122,0.5)",
          boxShadow: "0 40px 100px -30px rgba(244,217,122,0.4)",
        }}
      >
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
          aria-hidden
        >
          <rect width="100%" height="100%" fill="url(#mashrabiya)" />
        </svg>

        <div className="relative p-10 text-center">
          {/* UAE Flag */}
          <div
            className="flex justify-center mb-4"
            style={{ animation: "fadeSlideUp 0.5s ease-out" }}
          >
            <svg
              width="80"
              height="52"
              viewBox="0 0 80 52"
              style={{ animation: "flagWave 1.5s ease-in-out infinite" }}
            >
              <rect x="0" y="0" width="18" height="52" fill="#EF3340" />
              <rect x="18" y="0" width="62" height="17" fill="#009A44" />
              <rect x="18" y="17" width="62" height="18" fill="#F5EED6" />
              <rect x="18" y="35" width="62" height="17" fill="#0A1628" />
            </svg>
          </div>

          <div
            className="font-display text-[11px] tracking-[0.4em] uppercase text-[#F4D97A] mb-2"
            style={{ animation: "fadeSlideUp 0.6s ease-out" }}
          >
            {t("lessonComplete")}
          </div>
          <h1
            className={`text-4xl font-bold text-white ${
              isAr ? "font-arabic" : "font-display"
            }`}
            dir={isAr ? "rtl" : undefined}
            style={{ animation: "fadeSlideUp 0.7s ease-out" }}
          >
            {t("congrats")}
          </h1>
          <div
            className="text-sm text-[#F5EED6]/70 mt-2"
            style={{ animation: "fadeSlideUp 0.9s ease-out" }}
          >
            {t("mastered")}{" "}
            <span className="text-white font-semibold">{lesson.title}</span>
          </div>

          {/* Stars */}
          <div className="flex justify-center gap-3 mt-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                style={{
                  animation: `starDrop 0.6s cubic-bezier(0.34,1.56,0.64,1) ${0.8 + i * 0.25}s both`,
                }}
              >
                <svg width="64" height="64" viewBox="0 0 64 64">
                  <polygon
                    points="32,4 40,24 60,26 44,40 48,60 32,50 16,60 20,40 4,26 24,24"
                    fill={i < stars ? "url(#goldGrad)" : "none"}
                    stroke="#F4D97A"
                    strokeWidth="1.5"
                    filter={i < stars ? "url(#softGlow)" : "none"}
                  />
                </svg>
              </div>
            ))}
          </div>
          <div className="mt-2 text-[10px] tracking-[0.3em] uppercase text-[#C8A951]">
            {t("starsEarned", { stars })}
          </div>

          {/* XP + Score cards */}
          <div className="grid grid-cols-2 gap-4 mt-8 max-w-md mx-auto">
            <div
              className="rounded-xl p-4"
              style={{
                background: "rgba(244,217,122,0.1)",
                border: "1px solid rgba(244,217,122,0.4)",
              }}
            >
              <div className="text-[10px] tracking-[0.25em] uppercase text-[#C8A951]">
                {t("xpEarned")}
              </div>
              <div className="font-display text-3xl font-bold text-[#F4D97A] tabular-nums mt-1">
                +{xpAnim}
              </div>
            </div>
            <div
              className="rounded-xl p-4"
              style={{
                background: "rgba(10,22,40,0.6)",
                border: "1px solid rgba(200,169,81,0.3)",
              }}
            >
              <div className="text-[10px] tracking-[0.25em] uppercase text-[#C8A951]">
                {t("score")}
              </div>
              <div className="font-display text-3xl font-bold text-white tabular-nums mt-1">
                {correct}/{total}
              </div>
            </div>
          </div>

          {/* Level progress */}
          <div
            className="mt-6 max-w-md mx-auto rounded-xl p-4"
            style={{
              background: "rgba(10,22,40,0.6)",
              border: "1px solid rgba(200,169,81,0.3)",
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[10px] tracking-[0.25em] uppercase text-[#C8A951]">
                  {t("levelLabel", { level })}
                </div>
                <div className="text-xs text-[#F5EED6]/60 mt-0.5">
                  {t("xpToLevel", {
                    xp: (nextThreshold - xp).toLocaleString(),
                    next: level + 1,
                  })}
                </div>
              </div>
              <div className="font-display text-xl font-bold text-white tabular-nums">
                {xp.toLocaleString()}
              </div>
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
                  width: `${levelPct}%`,
                  height: "100%",
                  background: "linear-gradient(90deg, #EF3340, #F4D97A)",
                  transition: "width 2s ease-out",
                }}
              />
            </div>
          </div>

          {/* CTAs */}
          <div className="mt-8 flex items-center justify-center gap-3 flex-wrap">
            <button
              onClick={() => router.push("/")}
              className="font-display font-bold tracking-[0.15em] text-sm px-6 py-2.5 rounded-lg transition-colors hover:bg-white/5"
              style={{
                border: "1px solid rgba(200,169,81,0.5)",
                color: "#C8A951",
              }}
            >
              {t("backToMap")}
            </button>
            <GoldButton
              onClick={() => {
                if (nextLesson) router.push(`/lesson/${nextLesson.id}`);
                else router.push("/");
              }}
            >
              {t("continueJourney")}
            </GoldButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense>
      <ResultsContent />
    </Suspense>
  );
}

function Confetti() {
  const colors = ["#EF3340", "#009A44", "#F4D97A", "#F5EED6", "#C8A951"];
  const particles = useMemo(
    () =>
      Array.from({ length: 60 }).map((_, i) => ({
        left: Math.random() * 100,
        delay: Math.random() * 0.8,
        duration: 2 + Math.random() * 2,
        color: colors[i % colors.length],
        rotate: Math.random() * 360,
        size: 6 + Math.random() * 6,
      })),
    [],
  );

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 1 }}
    >
      {particles.map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: -20,
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            background: p.color,
            transform: `rotate(${p.rotate}deg)`,
            borderRadius: i % 2 === 0 ? "2px" : "50%",
            animation: `confettiFall ${p.duration}s linear ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
