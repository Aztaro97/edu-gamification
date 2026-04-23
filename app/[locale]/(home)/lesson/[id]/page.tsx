"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MashrabiyaBand } from "@/features/game/components/MashrabiyaBand";
import { LESSONS } from "@/features/game/data";
import { useGame } from "@/features/game/GameContext";
import { useRouter } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

const cardVariants = {
  enter: { opacity: 0, y: 28, scale: 0.97 },
  center: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
  exit: { opacity: 0, y: -20, scale: 0.97, transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

const feedbackVariants = {
  hidden: { opacity: 0, y: 12, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring" as const, stiffness: 500, damping: 32 } },
};

export default function LessonPage() {
  const { id } = useParams();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("lesson");
  const { completeLesson, level } = useGame();

  const lessonId = parseInt(id as string, 10);
  const lesson = useMemo(
    () => LESSONS.find((l) => l.id === lessonId),
    [lessonId],
  );

  const [qIdx, setQIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [locked, setLocked] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [showQuitModal, setShowQuitModal] = useState(false);

  useEffect(() => {
    if (!lesson) router.push("/");
  }, [lesson, router]);

  if (!lesson) return null;

  const total = lesson.questions.length;
  const q = lesson.questions[qIdx];
  const progressPct = (qIdx / total) * 100;
  const isAr = locale === "ar";

  const questionText = isAr && q.qAr ? q.qAr : q.q;
  const choicesList: readonly string[] =
    q.type === "mcq"
      ? (isAr && q.choicesAr ? q.choicesAr : q.choices ?? [])
      : (isAr
          ? [t("trueLabel"), t("falseLabel")]
          : ["TRUE", "FALSE"]);
  const tfLetters = ["✓", "✕"];

  const handleAnswer = useCallback((answerIdx: number) => {
    if (locked) return;
    setSelected(answerIdx);
    setLocked(true);

    const isCorrect = answerIdx === q.correct;
    const newCorrect = correctCount + (isCorrect ? 1 : 0);
    if (isCorrect) setCorrectCount(newCorrect);
    setFeedback(isCorrect ? "correct" : "wrong");

    setTimeout(() => {
      if (qIdx + 1 >= total) {
        completeLesson(lessonId, newCorrect, total);
        router.push(`/results/${lessonId}?correct=${newCorrect}&total=${total}&prevLevel=${level}`);
      } else {
        setQIdx(qIdx + 1);
        setSelected(null);
        setLocked(false);
        setFeedback(null);
      }
    }, 1_400);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locked, q.correct, correctCount, qIdx, total, completeLesson, lessonId, level, router]);

  // Keyboard shortcuts
  useEffect(() => {
    if (showQuitModal) return;

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") { setShowQuitModal(true); return; }
      if (locked) return;

      let idx: number | undefined;
      if (q.type === "tf") {
        if (e.key === "1" || e.key.toLowerCase() === "t") idx = 0;
        else if (e.key === "2" || e.key.toLowerCase() === "f") idx = 1;
      } else {
        const map: Record<string, number> = {
          "1": 0, a: 0, A: 0,
          "2": 1, b: 1, B: 1,
          "3": 2, c: 2, C: 2,
          "4": 3, d: 3, D: 3,
        };
        idx = map[e.key];
      }

      const maxIdx = q.type === "tf" ? 1 : (q.choices?.length ?? 0) - 1;
      if (idx !== undefined && idx <= maxIdx) handleAnswer(idx);
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [locked, q, showQuitModal, handleAnswer]);

  return (
    <div className="max-w-3xl mx-auto pt-4">
      {/* Quit modal */}
      <AnimatePresence>
        {showQuitModal && (
          <QuitModal
            onConfirm={() => router.push("/")}
            onCancel={() => setShowQuitModal(false)}
          />
        )}
      </AnimatePresence>

      {/* Top bar */}
      <div className="flex items-center gap-3 mb-6">
        <motion.button
          onClick={() => setShowQuitModal(true)}
          className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center"
          whileHover={{ scale: 1.08, backgroundColor: "rgba(255,255,255,0.08)" }}
          whileTap={{ scale: 0.93 }}
          style={{ border: "1px solid rgba(200,169,81,0.4)", color: "#C8A951" }}
          aria-label="Quit lesson"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M10 3 L 4 7 L 10 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </motion.button>

        <div className="flex-1">
          <div className="flex items-center justify-between mb-1.5">
            <div className="text-[10px] tracking-[0.25em] uppercase text-[#C8A951]">
              {t("question", { current: qIdx + 1, total })}
            </div>
            <div className="text-[10px] text-[#F5EED6]/60 tabular-nums">
              {correctCount} {t("correct")}
            </div>
          </div>

          {/* Segmented progress bar */}
          <div
            className="relative h-2 rounded-full overflow-hidden"
            style={{ background: "#0A1628", border: "1px solid rgba(200,169,81,0.3)" }}
          >
            <motion.div
              className="absolute inset-y-0 left-0"
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{
                background: "linear-gradient(90deg, #EF3340, #F4D97A)",
                boxShadow: "0 0 10px rgba(244,217,122,0.5)",
              }}
            />
            {Array.from({ length: total - 1 }).map((_, i) => (
              <div
                key={i}
                className="absolute top-0 bottom-0 w-px bg-black/40"
                style={{ left: `${((i + 1) / total) * 100}%` }}
              />
            ))}
          </div>

          {/* Question dots */}
          <div className="flex gap-1 mt-1.5">
            {Array.from({ length: total }).map((_, i) => (
              <div
                key={i}
                className="h-1 flex-1 rounded-full transition-colors duration-300"
                style={{
                  background: i < qIdx
                    ? "#009A44"
                    : i === qIdx
                      ? "#F4D97A"
                      : "rgba(200,169,81,0.2)",
                }}
              />
            ))}
          </div>
        </div>

        <div className="shrink-0 text-right">
          <div className="text-[10px] tracking-[0.25em] uppercase text-[#F4D97A]">
            {lesson.system}
          </div>
          <div
            className={`text-sm text-white ${isAr ? "font-arabic" : "font-display"}`}
            dir={isAr ? "rtl" : undefined}
          >
            {isAr ? lesson.titleAr : lesson.title}
          </div>
        </div>
      </div>

      {/* Question card with AnimatePresence */}
      <AnimatePresence mode="wait">
        <motion.div
          key={qIdx}
          variants={cardVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="relative rounded-2xl overflow-hidden"
          style={{
            background: "linear-gradient(180deg, #12213F 0%, #0A1628 100%)",
            border: "1px solid rgba(239,51,64,0.33)",
          }}
        >
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30" aria-hidden>
            <rect width="100%" height="100%" fill="url(#lattice)" />
          </svg>
          <div className="px-5 pt-4">
            <MashrabiyaBand opacity={0.55} />
          </div>

          <div className="relative px-8 py-8">
            <div className="text-[10px] tracking-[0.3em] uppercase text-[#C8A951] mb-2">
              {q.type === "mcq" ? t("mcq") : t("tf")}
            </div>
            <h2
              className={`text-2xl font-bold text-white leading-snug ${isAr ? "font-arabic" : "font-display"}`}
              dir={isAr ? "rtl" : undefined}
            >
              {questionText}
            </h2>

            {/* Answers with stagger */}
            <motion.div
              className={`mt-6 grid ${q.type === "tf" ? "grid-cols-2" : "grid-cols-1"} gap-3`}
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
            >
              {choicesList.map((choice, i) => (
                <motion.div
                  key={i}
                  variants={{
                    hidden: { opacity: 0, x: -14 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.25, ease: "easeOut" } },
                  }}
                >
                  <AnswerButton
                    label={choice as string}
                    letter={q.type === "tf" ? tfLetters[i] : String.fromCharCode(65 + i)}
                    selected={selected === i}
                    correct={locked && i === q.correct}
                    wrong={locked && selected === i && i !== q.correct}
                    disabled={locked}
                    onClick={() => handleAnswer(i)}
                    isAr={isAr}
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* Feedback banner */}
            <AnimatePresence>
              {feedback && (
                <motion.div
                  variants={feedbackVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, y: 8 }}
                  className={`mt-5 rounded-xl px-4 py-3 flex items-start gap-3 ${
                    feedback === "correct"
                      ? "bg-[#009A44]/15 border border-[#009A44]/60"
                      : "bg-[#EF3340]/15 border border-[#EF3340]/60"
                  }`}
                >
                  <motion.div
                    className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 600, damping: 20, delay: 0.1 }}
                    style={{ background: feedback === "correct" ? "#009A44" : "#EF3340" }}
                  >
                    {feedback === "correct" ? (
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M5 10 L9 14 L15 6" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M5 5 L15 15 M15 5 L5 15" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
                      </svg>
                    )}
                  </motion.div>
                  <div className="flex-1">
                    <div className={`text-white font-bold tracking-wider ${isAr ? "font-arabic" : "font-display"}`}>
                      {feedback === "correct" ? t("excellent") : t("notQuite")}
                    </div>
                    <div className="text-xs text-[#F5EED6]/80 mt-0.5">
                      {feedback === "correct" ? t("excellentMsg") : t("notQuiteMsg")}
                    </div>
                    {feedback === "wrong" && (q.explanation || q.explanationAr) && (
                      <div className="text-xs text-[#F5EED6]/60 mt-1.5 leading-relaxed">
                        {isAr && q.explanationAr ? q.explanationAr : q.explanation}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-[#F5EED6]/50 tracking-widest uppercase">
        <span>{t("pressKeys")}</span>
      </div>
    </div>
  );
}

/* ─── Quit Modal ─────────────────────────────────────────────────────────── */

interface QuitModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

function QuitModal({ onConfirm, onCancel }: QuitModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(5,12,24,0.75)", backdropFilter: "blur(6px)" }}
      onClick={onCancel}
    >
      <motion.div
        initial={{ scale: 0.88, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.88, opacity: 0, y: 20 }}
        transition={{ type: "spring", stiffness: 420, damping: 30 }}
        onClick={e => e.stopPropagation()}
        className="relative rounded-2xl p-7 max-w-sm w-full mx-4 text-center overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #12213F 0%, #0A1628 100%)",
          border: "1px solid rgba(239,51,64,0.45)",
          boxShadow: "0 24px 64px -16px rgba(0,0,0,0.7)",
        }}
      >
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" aria-hidden>
          <rect width="100%" height="100%" fill="url(#lattice)" />
        </svg>
        <div className="relative">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ background: "rgba(239,51,64,0.15)", border: "1px solid rgba(239,51,64,0.4)" }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 9v5M12 17h.01M10.3 3.3L3 16.7A2 2 0 0 0 4.7 20h14.6A2 2 0 0 0 21 16.7L13.7 3.3a2 2 0 0 0-3.4 0z"
                stroke="#EF3340" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h2 className="font-display font-bold text-white text-xl mb-2">Quit Lesson?</h2>
          <p className="text-sm text-[#F5EED6]/60 mb-6 leading-relaxed">
            Your progress in this lesson will be lost. You can restart anytime.
          </p>
          <div className="flex gap-3">
            <motion.button
              onClick={onCancel}
              className="flex-1 font-display font-bold text-sm py-2.5 rounded-xl tracking-[0.1em] transition-colors"
              whileHover={{ backgroundColor: "rgba(255,255,255,0.06)" }}
              whileTap={{ scale: 0.97 }}
              style={{ border: "1px solid rgba(200,169,81,0.4)", color: "#C8A951" }}
            >
              Keep Going
            </motion.button>
            <motion.button
              onClick={onConfirm}
              className="flex-1 font-display font-bold text-sm py-2.5 rounded-xl tracking-[0.1em]"
              whileHover={{ brightness: 1.1 } as never}
              whileTap={{ scale: 0.97 }}
              style={{
                background: "linear-gradient(180deg, #EF3340 0%, #B21825 100%)",
                color: "white",
                boxShadow: "0 4px 16px -4px rgba(239,51,64,0.5)",
              }}
            >
              Quit
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Answer Button ──────────────────────────────────────────────────────── */

interface AnswerButtonProps {
  label: string;
  letter: string;
  selected: boolean;
  correct: boolean;
  wrong: boolean;
  disabled: boolean;
  onClick: () => void;
  isAr?: boolean;
}

function AnswerButton({ label, letter, selected, correct, wrong, disabled, onClick, isAr }: AnswerButtonProps) {
  let borderColor = "rgba(200,169,81,0.3)";
  let bg = "rgba(18,33,63,0.6)";
  let glow = "none";
  let letterBg = "rgba(10,22,40,0.8)";
  let letterColor = "#F4D97A";

  if (correct) {
    borderColor = "#009A44";
    bg = "rgba(0,154,68,0.18)";
    glow = "0 0 0 1px #009A44, 0 0 24px rgba(0,154,68,0.6)";
    letterBg = "#009A44";
    letterColor = "#0A1628";
  } else if (wrong) {
    borderColor = "#EF3340";
    bg = "rgba(239,51,64,0.15)";
    glow = "0 0 0 1px #EF3340";
    letterBg = "#EF3340";
    letterColor = "#0A1628";
  } else if (selected) {
    borderColor = "#F4D97A";
    bg = "rgba(244,217,122,0.1)";
    letterBg = "#F4D97A";
    letterColor = "#0A1628";
  }

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className="group relative w-full text-left px-4 py-3.5 rounded-xl"
      whileHover={!disabled ? { scale: 1.02, y: -1 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      animate={
        correct ? { scale: [1, 1.03, 1] } :
        wrong ? { x: [0, -6, 6, -4, 4, 0] } :
        {}
      }
      transition={correct || wrong ? { duration: 0.45 } : { duration: 0.15 }}
      style={{
        background: bg,
        border: `1px solid ${borderColor}`,
        color: "#F5EED6",
        cursor: disabled ? "default" : "pointer",
        boxShadow: glow,
      }}
    >
      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center font-display font-bold text-sm shrink-0"
          style={{
            background: letterBg,
            color: letterColor,
            border: `1px solid ${correct || wrong || selected ? "transparent" : "rgba(200,169,81,0.4)"}`,
            transition: "background 0.2s, color 0.2s",
          }}
        >
          {letter}
        </div>
        <div
          className={`flex-1 text-base font-semibold ${isAr ? "font-arabic" : "font-display"}`}
          dir={isAr ? "rtl" : undefined}
        >
          {label}
        </div>
      </div>
    </motion.button>
  );
}
