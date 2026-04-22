"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { DailyChallenge } from "./components/DailyChallenge";
import { GeometryDefs } from "./components/GeometryDefs";
import { Header } from "./components/Header";
import { Leaderboard } from "./components/Leaderboard";
import { LessonCard } from "./components/LessonCard";
import { PathMap } from "./components/PathMap";
import { PlayerPanel } from "./components/PlayerPanel";
import { LESSONS, PLAYER } from "./data";
import type { Lesson } from "./types";

const DEFAULT_ACTIVE_ID = 3;

export function GameApp() {
  const [activeId, setActiveId] = useState<number>(DEFAULT_ACTIVE_ID);
  const [xpPct, setXpPct] = useState<number>(0);

  const activeLesson = useMemo<Lesson | undefined>(
    () => LESSONS.find((l) => l.id === activeId),
    [activeId],
  );

  const completedCount = useMemo(
    () => LESSONS.filter((l) => l.state === "completed").length,
    [],
  );

  const targetPct = useMemo(
    () => (PLAYER.xp / PLAYER.xpForNext) * 100,
    [],
  );

  useEffect(() => {
    const timer = setTimeout(() => setXpPct(targetPct), 300);
    return () => clearTimeout(timer);
  }, [targetPct]);

  const handleSelect = useCallback((lesson: Lesson) => {
    setActiveId(lesson.id);
  }, []);

  return (
    <div
      className="min-h-screen relative"
      style={{
        background:
          "radial-gradient(ellipse at 70% 10%, #1B2A4A 0%, #0A1628 55%, #050C18 100%)",
      }}
    >
      <GeometryDefs />
      <svg
        className="fixed inset-0 pointer-events-none"
        width="100%"
        height="100%"
        aria-hidden
        focusable="false"
      >
        <rect width="100%" height="100%" fill="url(#mashrabiya)" opacity="0.08" />
      </svg>

      <div className="relative max-w-[1440px] mx-auto px-6 pb-16">
        <Header />

        <div className="grid grid-cols-12 gap-6 mt-6">
          <aside className="col-span-12 md:col-span-4 lg:col-span-3 space-y-5">
            <PlayerPanel xpPct={xpPct} />
            <Leaderboard />
          </aside>

          <main className="col-span-12 md:col-span-8 lg:col-span-6">
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                border: "1px solid rgba(200,169,81,0.35)",
                boxShadow: "0 30px 80px -40px rgba(0,0,0,0.8)",
              }}
            >
              <div className="absolute top-0 inset-x-0 z-10 flex items-center justify-between px-5 pt-4 pointer-events-none">
                <div>
                  <div className="font-display text-[10px] tracking-[0.3em] text-[#F4D97A] uppercase">
                    Chapter 2 · الفصل الثاني
                  </div>
                  <div className="font-display text-xl font-bold text-white drop-shadow">
                    The Human Body
                  </div>
                  <div
                    className="font-arabic text-base text-[#F5EED6]/80 drop-shadow"
                    dir="rtl"
                  >
                    جسم الإنسان
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] tracking-[0.25em] uppercase text-[#C8A951]">
                    Progress
                  </div>
                  <div className="font-display font-bold text-white text-lg tabular-nums">
                    {completedCount} / {LESSONS.length}
                  </div>
                </div>
              </div>
              <PathMap
                lessons={LESSONS}
                activeId={activeId}
                onSelect={handleSelect}
              />
            </div>
          </main>

          <section className="col-span-12 lg:col-span-3 space-y-5">
            <DailyChallenge />
            <LessonCard lesson={activeLesson} />
          </section>
        </div>

        <footer className="mt-8 flex items-center justify-between text-[10px] text-[#F5EED6]/40 uppercase tracking-[0.3em] flex-wrap gap-2">
          <span>وطني الإمارات · My UAE</span>
          <span>Learn · Grow · Lead</span>
          <span>Ver 1.0 · © 2026</span>
        </footer>
      </div>
    </div>
  );
}
