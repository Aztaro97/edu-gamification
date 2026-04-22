"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { BADGES, levelInfoFromXp, LESSONS, starsFromScore } from "./data";
import type { LessonState } from "./types";

interface GameState {
  xp: number;
  completedLessons: number[];
  lessonStars: Record<number, number>;
  activeLesson: number | null;
  streak: number;
  badges: string[]; // Badge IDs
  dailyCompleted: boolean;
  leaderboardRank: number;
}

interface GameContextValue extends GameState {
  level: number;
  xpIntoLevel: number;
  xpForLevel: number;
  nextThreshold: number;
  getLessonState: (id: number) => LessonState;
  completeLesson: (lessonId: number, correctCount: number, total: number) => { earnedXp: number; stars: number };
  completeDaily: (bonusXp?: number) => void;
  resetProgress: () => void;
}

const GameContext = createContext<GameContextValue | null>(null);

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<GameState>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = JSON.parse(localStorage.getItem("rihlat_save") || "null");
        if (saved && saved.xp != null) return saved;
      } catch (e) {
        // Ignore error
      }
    }
    return {
      xp: 1840,
      completedLessons: [1, 2],
      lessonStars: { 1: 3, 2: 3, 3: 2 },
      activeLesson: 3,
      streak: 5,
      badges: ["first-steps", "falcon-scholar", "seven-stars", "dune-runner"], // match initial BADGES in data.ts
      dailyCompleted: false,
      leaderboardRank: 2,
    };
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("rihlat_save", JSON.stringify(state));
    }
  }, [state, mounted]);

  const { level, xpIntoLevel, xpForLevel, nextThreshold } = levelInfoFromXp(state.xp);

  const getLessonState = (id: number): LessonState => {
    if (state.completedLessons.includes(id)) return "completed";
    if (state.activeLesson === id) return "active";
    if (id === 1) return "unlocked";
    const prev = id - 1;
    if (state.completedLessons.includes(prev) || state.activeLesson === prev) return "unlocked";
    return "locked";
  };

  const completeLesson = (lessonId: number, correctCount: number, total: number) => {
    const lesson = LESSONS.find((l) => l.id === lessonId);
    if (!lesson) return { earnedXp: 0, stars: 0 };
    
    const earnedXp = lesson.xp + correctCount * 10;
    const stars = starsFromScore(correctCount, total);
    
    setState((s) => {
      const already = s.completedLessons.includes(lessonId);
      const completedLessons = already ? s.completedLessons : [...s.completedLessons, lessonId];
      const nextActive = completedLessons.length < LESSONS.length
        ? (lessonId === s.activeLesson ? lessonId + 1 : s.activeLesson)
        : null;
        
      const newBadges = [...s.badges];
      
      return {
        ...s,
        xp: s.xp + earnedXp,
        completedLessons,
        lessonStars: { ...s.lessonStars, [lessonId]: Math.max(stars, s.lessonStars[lessonId] || 0) },
        activeLesson: nextActive,
        badges: newBadges, // badges logic can be extended here
      };
    });
    return { earnedXp, stars };
  };

  const completeDaily = (bonusXp = 350) => {
    setState((s) => ({
      ...s,
      xp: s.xp + bonusXp,
      dailyCompleted: true,
      badges: s.badges.includes("crescent-keeper") ? s.badges : [...s.badges, "crescent-keeper"],
    }));
  };

  const resetProgress = () => {
    localStorage.removeItem("rihlat_save");
    setState({
      xp: 0,
      completedLessons: [],
      lessonStars: {},
      activeLesson: 1,
      streak: 0,
      badges: [],
      dailyCompleted: false,
      leaderboardRank: 6,
    });
  };

  const value: GameContextValue = {
    ...state,
    level,
    xpIntoLevel,
    xpForLevel,
    nextThreshold,
    getLessonState,
    completeLesson,
    completeDaily,
    resetProgress,
  };

  if (!mounted) return null; // Avoid hydration mismatch

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}
