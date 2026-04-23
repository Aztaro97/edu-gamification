"use client";

import { AnimatePresence } from "framer-motion";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useMemo, useState } from "react";
import { DailyChallenge } from "./components/DailyChallenge";
import { JourneyRibbon } from "./components/JourneyRibbon";
import { Leaderboard } from "./components/Leaderboard";
import { LessonCard } from "./components/LessonCard";
import { PathMap } from "./components/PathMap";
import { PlayerPanel } from "./components/PlayerPanel";
import { LESSONS } from "./data";
import { useGame } from "./GameContext";
import type { Lesson } from "./types";

const DEFAULT_ACTIVE_ID = 3;

export function GameApp() {
  const { xp, nextThreshold, activeLesson: activeIdContext, getLessonState } = useGame();
  const router = useRouter();
  const t = useTranslations("home");

  const activeId = activeIdContext ?? DEFAULT_ACTIVE_ID;
  const [selectedId, setSelectedId] = useState<number>(activeId);
  const [xpPct, setXpPct] = useState<number>(0);

  const activeLesson = useMemo<Lesson | undefined>(
    () => LESSONS.find((l) => l.id === selectedId),
    [selectedId],
  );

  const completedCount = useMemo(
    () => LESSONS.filter((l) => getLessonState(l.id) === "completed").length,
    [getLessonState],
  );

  const targetPct = useMemo(
    () => (xp / nextThreshold) * 100,
    [xp, nextThreshold],
  );

  useEffect(() => {
    const timer = setTimeout(() => setXpPct(targetPct), 300);
    return () => clearTimeout(timer);
  }, [targetPct]);

  const handleSelect = useCallback((lesson: Lesson) => {
    setSelectedId(lesson.id);
  }, []);

  return (
    <>
      <JourneyRibbon lessons={LESSONS} activeId={selectedId} onSelect={setSelectedId} />

      <div className="grid grid-cols-12 gap-6 mt-6">
        <aside className="col-span-12 md:col-span-4 lg:col-span-3 space-y-5">
          <PlayerPanel xpPct={xpPct} />
          <Leaderboard />
        </aside>

        <main className="col-span-12 md:col-span-8 lg:col-span-6">
          <div
            className="relative rounded-2xl overflow-hidden h-full min-h-[500px]"
            style={{
              border: "1px solid rgba(200,169,81,0.35)",
              boxShadow: "0 30px 80px -40px rgba(0,0,0,0.8)",
            }}
          >
            <div className="absolute top-0 inset-x-0 z-10 flex items-start justify-between px-5 pt-4 pointer-events-none">
              <div className="max-w-[55%]">
                <div className="font-display text-[10px] tracking-[0.3em] text-[#F4D97A] uppercase">
                  {t("chapter")}
                </div>
                <div className="font-display text-xl font-bold text-white drop-shadow">
                  {t("chapterTitle")}
                </div>
              </div>
              <div
                className="text-right bg-[#0A1628]/70 rounded-lg px-3 py-1.5 pointer-events-auto"
                style={{ border: "1px solid rgba(200,169,81,0.4)" }}
              >
                <div className="text-[10px] tracking-[0.25em] uppercase text-[#C8A951]">
                  {t("completed")}
                </div>
                <div className="font-display font-bold text-white text-lg tabular-nums" dir="ltr">
                  {completedCount} / {LESSONS.length}
                </div>
              </div>
            </div>
            <PathMap
              lessons={LESSONS.map((l) => ({ ...l, state: getLessonState(l.id) }))}
              activeId={selectedId}
              onSelect={handleSelect}
            />
          </div>
        </main>

        <section className="col-span-12 lg:col-span-3 space-y-5">
          <DailyChallenge />
          <AnimatePresence mode="wait">
            <LessonCard
              key={selectedId}
              lesson={activeLesson ? { ...activeLesson, state: getLessonState(activeLesson.id) } : undefined}
              onStart={(lesson) => router.push(`/lesson/${lesson.id}`)}
            />
          </AnimatePresence>
        </section>
      </div>
    </>
  );
}
