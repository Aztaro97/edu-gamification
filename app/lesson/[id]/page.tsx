"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { LESSONS } from "@/features/game/data";
import { useGame } from "@/features/game/GameContext";
import { MashrabiyaBand } from "@/features/game/components/MashrabiyaBand";

export default function LessonPage() {
  const { id } = useParams();
  const router = useRouter();
  const { completeLesson } = useGame();

  const lessonId = parseInt(id as string, 10);
  const lesson = useMemo(() => LESSONS.find((l) => l.id === lessonId), [lessonId]);

  const [qIdx, setQIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [locked, setLocked] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [transitionOut, setTransitionOut] = useState(false);

  useEffect(() => {
    if (!lesson) router.push("/");
  }, [lesson, router]);

  if (!lesson) return null;

  const total = lesson.questions.length;
  const q = lesson.questions[qIdx];
  const progressPct = (qIdx / total) * 100;

  function handleAnswer(answerIdx: number) {
    if (locked) return;
    setSelected(answerIdx);
    setLocked(true);

    const isCorrect = answerIdx === q.correct;
    const newCorrect = correctCount + (isCorrect ? 1 : 0);
    if (isCorrect) setCorrectCount(newCorrect);
    setFeedback(isCorrect ? "correct" : "wrong");

    setTimeout(() => {
      setTransitionOut(true);
      setTimeout(() => {
        if (qIdx + 1 >= total) {
          completeLesson(lessonId, newCorrect, total);
          router.push(`/results/${lessonId}?correct=${newCorrect}&total=${total}`);
        } else {
          setQIdx(qIdx + 1);
          setSelected(null);
          setLocked(false);
          setFeedback(null);
          setTransitionOut(false);
        }
      }, 350);
    }, 1200);
  }

  function handleQuit() {
    if (window.confirm("Quit this lesson? Progress will be lost.")) {
      router.push("/");
    }
  }

  return (
    <div className="max-w-3xl mx-auto pt-4">
      {/* Top bar */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={handleQuit}
          className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:bg-white/5"
          style={{ border: "1px solid rgba(200,169,81,0.4)", color: "#C8A951" }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M10 3 L 4 7 L 10 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>

        <div className="flex-1">
          <div className="flex items-center justify-between mb-1.5">
            <div className="text-[10px] tracking-[0.25em] uppercase text-[#C8A951]">
              Question {qIdx + 1} / {total}{" "}
              <span className="font-arabic" dir="rtl">· سؤال</span>
            </div>
            <div className="text-[10px] text-[#F5EED6]/60 tabular-nums">{correctCount} correct</div>
          </div>
          <div
            className="relative h-2 rounded-full overflow-hidden"
            style={{ background: "#0A1628", border: "1px solid rgba(200,169,81,0.3)" }}
          >
            <div
              className="absolute inset-y-0 left-0"
              style={{
                width: `${progressPct}%`,
                background: "linear-gradient(90deg, #EF3340, #F4D97A)",
                transition: "width 0.5s cubic-bezier(0.22,1,0.36,1)",
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
        </div>

        <div className="shrink-0 text-right">
          <div className="text-[10px] tracking-[0.25em] uppercase text-[#F4D97A]">{lesson.system}</div>
          <div className="font-display text-sm text-white">{lesson.title}</div>
        </div>
      </div>

      {/* Question card */}
      <div
        key={qIdx}
        className="relative rounded-2xl overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #12213F 0%, #0A1628 100%)",
          border: "1px solid rgba(239,51,64,0.33)",
          boxShadow: "0 30px 80px -30px rgba(239,51,64,0.33)",
          opacity: transitionOut ? 0 : 1,
          transform: transitionOut ? "translateY(-12px)" : "translateY(0)",
          transition: "opacity 0.3s ease, transform 0.3s ease",
          animation: "fadeSlideUp 0.5s cubic-bezier(0.22,1,0.36,1) both",
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
            {q.type === "mcq" ? "Multiple Choice" : "True or False"}
            <span className="font-arabic ms-2" dir="rtl">
              {q.type === "mcq" ? "اختيار من متعدد" : "صح أم خطأ"}
            </span>
          </div>
          <h2 className="font-display text-2xl font-bold text-white leading-snug">{q.q}</h2>
          {q.qAr && (
            <h3 className="font-arabic text-lg text-[#F5EED6]/80 mt-2" dir="rtl">
              {q.qAr}
            </h3>
          )}

          {/* Answers */}
          <div className={`mt-6 grid ${q.type === "tf" ? "grid-cols-2" : "grid-cols-1"} gap-3`}>
            {q.type === "mcq"
              ? q.choices?.map((choice, i) => (
                  <AnswerButton
                    key={i}
                    label={choice}
                    letter={String.fromCharCode(65 + i)}
                    selected={selected === i}
                    correct={locked && i === q.correct}
                    wrong={locked && selected === i && i !== q.correct}
                    disabled={locked}
                    onClick={() => handleAnswer(i)}
                  />
                ))
              : (
                  [
                    { label: "TRUE", letter: "✓", labelAr: "صح", idx: 0 },
                    { label: "FALSE", letter: "✕", labelAr: "خطأ", idx: 1 },
                  ].map(({ label, letter, labelAr, idx }) => (
                    <AnswerButton
                      key={idx}
                      label={label}
                      letter={letter}
                      selected={selected === idx}
                      correct={locked && idx === q.correct}
                      wrong={locked && selected === idx && idx !== q.correct}
                      disabled={locked}
                      onClick={() => handleAnswer(idx)}
                      tfLabelAr={labelAr}
                    />
                  ))
                )}
          </div>

          {/* Feedback banner */}
          {feedback && (
            <div
              className={`mt-5 rounded-xl px-4 py-3 flex items-center gap-3 ${
                feedback === "correct"
                  ? "bg-[#009A44]/15 border border-[#009A44]/60"
                  : "bg-[#EF3340]/15 border border-[#EF3340]/60"
              }`}
              style={{ animation: "fadeSlideUp 0.3s ease-out" }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                style={{
                  background: feedback === "correct" ? "#009A44" : "#EF3340",
                  animation:
                    feedback === "correct" ? "bouncePop 0.5s ease-out" : "shakeX 0.4s ease-out",
                }}
              >
                {feedback === "correct" ? (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M5 10 L9 14 L15 6"
                      stroke="#fff"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M5 5 L15 15 M15 5 L5 15"
                      stroke="#fff"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </svg>
                )}
              </div>
              <div>
                <div className="font-display text-white font-bold tracking-wider">
                  {feedback === "correct" ? "EXCELLENT!" : "NOT QUITE"}
                  <span className="font-arabic ms-2 text-[#F4D97A]" dir="rtl">
                    {feedback === "correct" ? "ممتاز!" : "حاول مرة أخرى"}
                  </span>
                </div>
                <div className="text-xs text-[#F5EED6]/80">
                  {feedback === "correct"
                    ? "+10 XP · Keep going, explorer!"
                    : "The correct answer is highlighted in green."}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-[#F5EED6]/50 tracking-widest uppercase">
        <span>Press A / B / C / D to answer</span>
      </div>
    </div>
  );
}

interface AnswerButtonProps {
  label: string;
  letter: string;
  selected: boolean;
  correct: boolean;
  wrong: boolean;
  disabled: boolean;
  onClick: () => void;
  tfLabelAr?: string;
}

function AnswerButton({
  label,
  letter,
  selected,
  correct,
  wrong,
  disabled,
  onClick,
  tfLabelAr,
}: AnswerButtonProps) {
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
    <button
      onClick={onClick}
      disabled={disabled}
      className="group relative text-left px-4 py-3.5 rounded-xl transition-all hover:scale-[1.015] disabled:hover:scale-100"
      style={{
        background: bg,
        border: `1px solid ${borderColor}`,
        color: "#F5EED6",
        cursor: disabled ? "default" : "pointer",
        boxShadow: glow,
        animation: correct
          ? "pulseGreen 1.2s ease-out"
          : wrong
          ? "shakeX 0.4s ease-out"
          : "none",
      }}
    >
      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center font-display font-bold text-sm shrink-0"
          style={{
            background: letterBg,
            color: letterColor,
            border: `1px solid ${
              correct || wrong || selected ? "transparent" : "rgba(200,169,81,0.4)"
            }`,
          }}
        >
          {letter}
        </div>
        <div className="flex-1">
          <div className="font-display text-base font-semibold">{label}</div>
          {tfLabelAr && (
            <div className="font-arabic text-sm text-[#F5EED6]/70" dir="rtl">
              {tfLabelAr}
            </div>
          )}
        </div>
      </div>
    </button>
  );
}
