"use client";

import { AnimatePresence, motion } from "framer-motion";
import { GoldButton } from "@/features/game/components/Atoms";
import { LevelUpMedal } from "@/features/game/components/LevelUpMedal";
import { LESSONS } from "@/features/game/data";
import { useGame } from "@/features/game/GameContext";
import { useRouter } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useParams, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";

function ResultsContent() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("results");
  const { xp, level, xpIntoLevel, xpForLevel, nextThreshold, getLessonState } = useGame();

  const lessonId = parseInt(id as string, 10);
  const lesson = LESSONS.find((l) => l.id === lessonId);
  const correct = parseInt(searchParams.get("correct") || "0", 10);
  const total = parseInt(searchParams.get("total") || "1", 10);
  const prevLevel = parseInt(searchParams.get("prevLevel") || "0", 10);

  const pct = correct / total;
  let stars = 0;
  if (pct >= 0.95) stars = 3;
  else if (pct >= 0.7) stars = 2;
  else if (pct > 0) stars = 1;

  const earnedXp = lesson ? lesson.xp + correct * 10 : 0;
  const leveledUp = prevLevel > 0 && level > prevLevel;

  const [xpAnim, setXpAnim] = useState(0);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [starsRevealed, setStarsRevealed] = useState(0);

  // Animated XP counter (tick up)
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i += Math.max(1, Math.round(earnedXp / 40));
      if (i >= earnedXp) {
        setXpAnim(earnedXp);
        clearInterval(interval);
      } else {
        setXpAnim(i);
      }
    }, 30);
    return () => clearInterval(interval);
  }, [earnedXp]);

  // Stagger star reveals
  useEffect(() => {
    if (stars === 0) return;
    let count = 0;
    const interval = setInterval(() => {
      count++;
      setStarsRevealed(count);
      if (count >= stars) clearInterval(interval);
    }, 300);
    return () => clearInterval(interval);
  }, [stars]);

  // Level-up overlay (show after initial animations settle)
  useEffect(() => {
    if (!leveledUp) return;
    const timer = setTimeout(() => setShowLevelUp(true), 2_200);
    return () => clearTimeout(timer);
  }, [leveledUp]);

  const nextLesson = useMemo(
    () => LESSONS.find(l => getLessonState(l.id) === "unlocked" || getLessonState(l.id) === "active"),
    [getLessonState],
  );

  if (!lesson) return null;

  const levelPct = xpForLevel > 0 ? (xpIntoLevel / xpForLevel) * 100 : 0;
  const isAr = locale === "ar";

  return (
    <div className="max-w-3xl mx-auto pt-4 relative">
      <Confetti />

      {/* Level-up overlay */}
      <AnimatePresence>
        {showLevelUp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ background: "rgba(5,12,24,0.85)", backdropFilter: "blur(8px)" }}
            onClick={() => setShowLevelUp(false)}
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0, y: 32 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 380, damping: 22 }}
              onClick={(e) => e.stopPropagation()}
              className="text-center px-10 py-8 rounded-3xl max-w-xs w-full mx-4"
              style={{
                background: "linear-gradient(135deg, #1B2A4A 0%, #0A1628 100%)",
                border: "1px solid rgba(244,217,122,0.6)",
                boxShadow: "0 0 60px rgba(200,169,81,0.3)",
              }}
            >
              <motion.div
                animate={{ rotate: [0, -12, 12, -6, 6, 0] }}
                transition={{ delay: 0.2, duration: 0.7 }}
                className="flex justify-center mb-3"
                aria-hidden
              >
                <LevelUpMedal size={56} />
              </motion.div>
              <div className="text-[11px] tracking-[0.3em] text-[#F4D97A] uppercase mb-1">Level Up!</div>
              <div className="font-display text-6xl font-bold text-white mb-2">{level}</div>
              <div className="text-sm text-[#F5EED6]/70 mb-5">Science Explorer · Rank {level}</div>
              <motion.button
                onClick={() => setShowLevelUp(false)}
                className="px-8 py-2.5 rounded-xl font-display font-bold text-sm tracking-[0.1em]"
                whileTap={{ scale: 0.97 }}
                style={{ background: "linear-gradient(180deg, #F4D97A, #C8A951)", color: "#0A1628" }}
              >
                Awesome!
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative rounded-2xl overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #12213F 0%, #0A1628 100%)",
          border: "1px solid rgba(244,217,122,0.5)",
        }}
      >
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40" aria-hidden>
          <rect width="100%" height="100%" fill="url(#mashrabiya)" />
        </svg>

        <div className="relative p-10 text-center">
          {/* UAE Flag */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex justify-center mb-4"
          >
            <svg
              width="80"
              height="52"
              viewBox="0 0 80 52"
              style={{ animation: "flagWave 1.5s ease-in-out infinite" }}
            >
              <rect x="0"  y="0"  width="18" height="52" fill="#EF3340" />
              <rect x="18" y="0"  width="62" height="17" fill="#009A44" />
              <rect x="18" y="17" width="62" height="18" fill="#F5EED6" />
              <rect x="18" y="35" width="62" height="17" fill="#0A1628" />
            </svg>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="font-display text-[11px] tracking-[0.4em] uppercase text-[#F4D97A] mb-2"
          >
            {t("lessonComplete")}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className={`text-4xl font-bold text-white ${isAr ? "font-arabic" : "font-display"}`}
            dir={isAr ? "rtl" : undefined}
          >
            {t("congrats")}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55 }}
            className="text-sm text-[#F5EED6]/70 mt-2"
          >
            {t("mastered")}{" "}
            <span className="text-white font-semibold">{lesson.title}</span>
          </motion.div>

          {/* Stars — Framer Motion spring + stagger */}
          <div className="flex justify-center gap-3 mt-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, rotate: -25, opacity: 0 }}
                animate={
                  i < stars
                    ? { scale: 1, rotate: 0, opacity: 1 }
                    : { scale: 0.35, rotate: -15, opacity: 0.3 }
                }
                transition={{
                  type: "spring",
                  stiffness: 380,
                  damping: 15,
                  delay: 0.7 + i * 0.28,
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
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="mt-2 text-[10px] tracking-[0.3em] uppercase text-[#C8A951]"
          >
            {t("starsEarned", { stars })}
          </motion.div>

          {/* XP + Score cards */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.4 }}
            className="grid grid-cols-2 gap-4 mt-8 max-w-md mx-auto"
          >
            <div
              className="rounded-xl p-4"
              style={{ background: "rgba(244,217,122,0.1)", border: "1px solid rgba(244,217,122,0.4)" }}
            >
              <div className="text-[10px] tracking-[0.25em] uppercase text-[#C8A951]">{t("xpEarned")}</div>
              <div className="font-display text-3xl font-bold text-[#F4D97A] tabular-nums mt-1">
                +{xpAnim}
              </div>
            </div>
            <div
              className="rounded-xl p-4"
              style={{ background: "rgba(10,22,40,0.6)", border: "1px solid rgba(200,169,81,0.3)" }}
            >
              <div className="text-[10px] tracking-[0.25em] uppercase text-[#C8A951]">{t("score")}</div>
              <div className="font-display text-3xl font-bold text-white tabular-nums mt-1">
                {correct}/{total}
              </div>
            </div>
          </motion.div>

          {/* Level progress bar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95, duration: 0.4 }}
            className="mt-6 max-w-md mx-auto rounded-xl p-4"
            style={{ background: "rgba(10,22,40,0.6)", border: "1px solid rgba(200,169,81,0.3)" }}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[10px] tracking-[0.25em] uppercase text-[#C8A951]">
                  {t("levelLabel", { level })}
                </div>
                <div className="text-xs text-[#F5EED6]/60 mt-0.5">
                  {t("xpToLevel", { xp: (nextThreshold - xp).toLocaleString(), next: level + 1 })}
                </div>
              </div>
              <div className="font-display text-xl font-bold text-white tabular-nums">
                {xp.toLocaleString()}
              </div>
            </div>
            <div
              className="mt-3 h-2 rounded-full overflow-hidden"
              style={{ background: "#0A1628", border: "1px solid rgba(200,169,81,0.3)" }}
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${levelPct}%` }}
                transition={{ delay: 1.1, duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  height: "100%",
                  background: "linear-gradient(90deg, #EF3340, #F4D97A)",
                  boxShadow: "0 0 10px rgba(244,217,122,0.5)",
                }}
              />
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.15, duration: 0.4 }}
            className="mt-8 flex items-center justify-center gap-3 flex-wrap"
          >
            <motion.button
              onClick={() => router.push("/")}
              className="font-display font-bold tracking-[0.15em] text-sm px-6 py-2.5 rounded-lg"
              whileHover={{ backgroundColor: "rgba(255,255,255,0.06)" }}
              whileTap={{ scale: 0.97 }}
              style={{ border: "1px solid rgba(200,169,81,0.5)", color: "#C8A951" }}
            >
              {t("backToMap")}
            </motion.button>
            <GoldButton
              onClick={() => {
                if (nextLesson) router.push(`/lesson/${nextLesson.id}`);
                else router.push("/");
              }}
            >
              {t("continueJourney")}
            </GoldButton>
          </motion.div>
        </div>
      </motion.div>
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

/* ─── Confetti ───────────────────────────────────────────────────────────── */

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
      {particles.map((p, i) => (
        <motion.div
          key={i}
          initial={{ y: -20, opacity: 1, rotate: p.rotate }}
          animate={{ y: "100vh", opacity: 0, rotate: p.rotate + 720 }}
          transition={{ duration: p.duration, delay: p.delay, ease: "linear", repeat: Infinity }}
          style={{
            position: "absolute",
            top: -20,
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            background: p.color,
            borderRadius: i % 2 === 0 ? "2px" : "50%",
          }}
        />
      ))}
    </div>
  );
}
