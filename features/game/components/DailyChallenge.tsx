"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useGame } from "../GameContext";

interface Countdown {
  readonly h: number;
  readonly m: number;
  readonly s: number;
}

function getTimeToMidnight(): Countdown {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);
  const diff = Math.max(0, midnight.getTime() - now.getTime());
  const h = Math.floor(diff / 3_600_000);
  const m = Math.floor((diff % 3_600_000) / 60_000);
  const s = Math.floor((diff % 60_000) / 1_000);
  return { h, m, s };
}

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

export function DailyChallenge() {
  const [time, setTime] = useState<Countdown>(getTimeToMidnight);
  const { dailyCompleted } = useGame();
  const t = useTranslations("dailyWidget");
  const tDaily = useTranslations("daily");

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeToMidnight()), 1_000);
    return () => clearInterval(id);
  }, []);

  const isUrgent = time.h === 0 && time.m < 60;

  return (
    <Link
      href="/daily"
      className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4D97A]/60 rounded-2xl"
    >
      <motion.section
        aria-label="Daily challenge"
        className="relative rounded-2xl overflow-hidden cursor-pointer"
        whileHover={{ scale: 1.025, y: -2 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        style={{
          background: "linear-gradient(110deg, #1B2A4A 0%, #0A1628 55%, #3B2514 100%)",
          border: `1px solid ${isUrgent ? "rgba(239,51,64,0.55)" : "rgba(244,217,122,0.45)"}`,
          boxShadow: isUrgent
            ? "0 16px 40px -16px rgba(239,51,64,0.4)"
            : "0 16px 40px -16px rgba(244,217,122,0.35)",
          transition: "border-color 0.5s, box-shadow 0.5s",
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
          <div className="mb-2 flex items-center gap-2">
            <div className="font-display text-[10px] tracking-[0.3em] text-[#F4D97A] uppercase">
              {t("title")}
            </div>
            {dailyCompleted && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-[9px] px-1.5 py-0.5 rounded-full text-[#009A44] font-bold"
                style={{ background: "rgba(0,154,68,0.15)", border: "1px solid rgba(0,154,68,0.4)" }}
              >
                ✓ DONE
              </motion.span>
            )}
          </div>

          <div className="font-display text-base font-bold text-white leading-tight">
            {dailyCompleted ? t("completedToday") : tDaily("title")}
          </div>

          <div className="flex items-center justify-between mt-3">
            <div>
              <div className="text-[9px] tracking-[0.25em] uppercase text-[#C8A951]">{t("endsIn")}</div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={isUrgent ? "urgent" : "normal"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="font-display font-bold tabular-nums"
                  style={{ color: isUrgent ? "#EF3340" : "white" }}
                  role="timer"
                  aria-label={`Daily challenge ends in ${time.h} hours ${time.m} minutes ${time.s} seconds`}
                  suppressHydrationWarning
                >
                  {pad(time.h)}
                  <span style={{ color: isUrgent ? "#EF3340" : "#C8A951" }}>:</span>
                  {pad(time.m)}
                  <span style={{ color: isUrgent ? "#EF3340" : "#C8A951" }}>:</span>
                  {pad(time.s)}
                </motion.div>
              </AnimatePresence>
            </div>

            <motion.div
              animate={isUrgent ? { scale: [1, 1.05, 1] } : { scale: 1 }}
              transition={isUrgent ? { repeat: Infinity, duration: 1.5 } : {}}
              className="px-2 py-1 rounded-lg text-center"
              style={{
                background: "linear-gradient(180deg, rgba(244,217,122,0.2), rgba(200,169,81,0.05))",
                border: "1px solid rgba(244,217,122,0.5)",
              }}
            >
              <div className="text-[9px] text-[#C8A951] uppercase tracking-widest">{t("bonus")}</div>
              <div className="font-display font-bold text-[#F4D97A]">+350 XP</div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </Link>
  );
}
