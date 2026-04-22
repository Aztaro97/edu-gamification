"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useGame } from "@/features/game/GameContext";
import { GoldButton } from "@/features/game/components/Atoms";
import { LESSONS } from "@/features/game/data";

type Stage = "intro" | "playing" | "done";

interface TimeLeft {
  h: number;
  m: number;
  s: number;
}

export default function DailyPage() {
  const router = useRouter();
  const { dailyCompleted, completeDaily } = useGame();

  const [time, setTime] = useState<TimeLeft>({ h: 8, m: 42, s: 15 });
  const [stage, setStage] = useState<Stage>("intro");
  const [qIdx, setQIdx] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [locked, setLocked] = useState(false);
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    const id = setInterval(() => {
      setTime((p) => {
        let { h, m, s } = p;
        s--;
        if (s < 0) { s = 59; m--; if (m < 0) { m = 59; h = Math.max(0, h - 1); } }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (stage !== "playing") return;
    if (timer <= 0) { setStage("done"); return; }
    const id = setTimeout(() => setTimer((t) => t - 1), 1000);
    return () => clearTimeout(id);
  }, [stage, timer]);

  const dailyQs = useMemo(() => [
    LESSONS[2].questions[0],
    LESSONS[2].questions[2],
    LESSONS[1].questions[0],
    LESSONS[0].questions[0],
    LESSONS[2].questions[3],
  ], []);

  const q = dailyQs[qIdx];
  const pad = (n: number) => String(n).padStart(2, "0");

  function answer(i: number) {
    if (locked) return;
    setSelected(i);
    setLocked(true);
    const isCorrect = i === q.correct;
    if (isCorrect) setCorrect((c) => c + 1);
    setTimeout(() => {
      if (qIdx + 1 >= dailyQs.length) {
        setStage("done");
        completeDaily(350);
      } else {
        setQIdx(qIdx + 1);
        setSelected(null);
        setLocked(false);
      }
    }, 900);
  }

  return (
    <div className="max-w-3xl mx-auto pt-4">
      <div className="mb-5">
        <div className="text-[10px] tracking-[0.35em] uppercase text-[#C8A951]">
          Daily Challenge · <span className="font-arabic" dir="rtl">تحدي اليوم</span>
        </div>
        <h1 className="font-display text-3xl font-bold text-white mt-1">The Heart Beats 100,000 Times</h1>
        <h2 className="font-arabic text-xl text-[#F4D97A]" dir="rtl">نبضات القلب</h2>
      </div>

      <div className="relative rounded-2xl overflow-hidden" style={{
        background: "linear-gradient(110deg, #1B2A4A 0%, #0A1628 55%, #3B2514 100%)",
        border: "1px solid rgba(244,217,122,0.45)",
        boxShadow: "0 30px 60px -20px rgba(244,217,122,0.35)",
      }}>
        <svg className="absolute inset-0 w-full h-full opacity-25 pointer-events-none" aria-hidden>
          <rect width="100%" height="100%" fill="url(#mashrabiya)" />
        </svg>

        {stage === "intro" && (
          <div className="relative p-8 text-center">
            <div className="flex justify-center mb-4">
              <div style={{ width: 88, height: 88 }}>
                <svg width="88" height="88" viewBox="0 0 88 88">
                  <g transform="translate(44 44)">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <rect key={i} x="-1.5" y="-40" width="3" height="12" fill="#F4D97A" transform={`rotate(${i * 30})`}>
                        <animate attributeName="opacity" values="1;0.3;1" dur={`${2 + (i % 3) * 0.4}s`} repeatCount="indefinite" begin={`${i * 0.08}s`} />
                      </rect>
                    ))}
                    <circle r="20" fill="url(#goldGrad)" stroke="#F4D97A" />
                    <polygon points="0,-10 3,-3 10,-3 4,2 6,9 0,5 -6,9 -4,2 -10,-3 -3,-3" fill="#0A1628" />
                  </g>
                </svg>
              </div>
            </div>

            <div className="font-display text-xs tracking-[0.4em] uppercase text-[#F4D97A]">
              5 Questions · 60 Seconds · +350 XP
            </div>
            <h2 className="font-display text-3xl font-bold text-white mt-3">Answer fast. Answer smart.</h2>
            <p className="font-arabic text-xl text-[#F4D97A] mt-1" dir="rtl">أجب بسرعة وذكاء</p>
            <p className="text-sm text-[#F5EED6]/70 mt-3 max-w-md mx-auto">
              Complete today&apos;s challenge to earn bonus XP and unlock the Crescent Keeper badge.
            </p>

            <div className="flex justify-center gap-3 mt-6">
              <div className="text-center px-4 py-2 rounded-lg" style={{ background: "rgba(10,22,40,0.6)", border: "1px solid rgba(200,169,81,0.4)" }}>
                <div className="text-[9px] tracking-widest uppercase text-[#C8A951]">Ends in</div>
                <div className="font-display text-xl text-white font-bold tabular-nums">
                  {pad(time.h)}:{pad(time.m)}:{pad(time.s)}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-center gap-3">
              <button
                onClick={() => router.push("/")}
                className="font-display font-bold tracking-[0.15em] text-sm px-6 py-2.5 rounded-lg transition-colors hover:bg-white/5"
                style={{ border: "1px solid rgba(200,169,81,0.5)", color: "#C8A951" }}
              >
                Back
              </button>
              <GoldButton
                onClick={() => { setStage("playing"); setTimer(60); }}
                disabled={dailyCompleted}
              >
                {dailyCompleted ? "COMPLETED TODAY" : "BEGIN CHALLENGE"}
              </GoldButton>
            </div>
          </div>
        )}

        {stage === "playing" && q && (
          <div className="relative p-8">
            <div className="flex items-center justify-between mb-4">
              <div className="text-[10px] tracking-[0.25em] uppercase text-[#C8A951]">
                Question {qIdx + 1} / {dailyQs.length}
              </div>
              <div className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="8" r="5" stroke="#F4D97A" strokeWidth="1.4" />
                  <path d="M7 5 V8 L 9 9" stroke="#F4D97A" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
                <div
                  className="font-display text-lg font-bold tabular-nums"
                  style={{
                    color: timer < 10 ? "#EF3340" : "#F4D97A",
                    animation: timer < 10 ? "pulse 0.5s ease-in-out infinite" : "none",
                  }}
                >
                  {timer}s
                </div>
              </div>
            </div>

            <div className="relative h-2 rounded-full overflow-hidden mb-6" style={{ background: "#0A1628", border: "1px solid rgba(200,169,81,0.3)" }}>
              <div style={{
                width: `${(timer / 60) * 100}%`,
                height: "100%",
                background: timer < 15 ? "linear-gradient(90deg, #EF3340, #FF5E6B)" : "linear-gradient(90deg, #F4D97A, #C8A951)",
                transition: "width 1s linear",
              }} />
            </div>

            <h3 className="font-display text-2xl font-bold text-white">{q.q}</h3>
            {q.qAr && <h4 className="font-arabic text-lg text-[#F5EED6]/80 mt-1" dir="rtl">{q.qAr}</h4>}

            <div className={`mt-6 grid ${q.type === "tf" ? "grid-cols-2" : "grid-cols-1"} gap-3`}>
              {(q.type === "mcq" ? (q.choices ?? []) : ["TRUE", "FALSE"]).map((c, i) => {
                const isCorrect = locked && i === q.correct;
                const isWrong = locked && selected === i && !isCorrect;
                return (
                  <button
                    key={i}
                    onClick={() => answer(i)}
                    disabled={locked}
                    className="px-4 py-3 rounded-xl text-left transition-all hover:scale-[1.01] disabled:cursor-default"
                    style={{
                      background: isCorrect ? "rgba(0,154,68,0.2)" : isWrong ? "rgba(239,51,64,0.15)" : "rgba(18,33,63,0.6)",
                      border: `1px solid ${isCorrect ? "#009A44" : isWrong ? "#EF3340" : "rgba(200,169,81,0.3)"}`,
                      color: "#F5EED6",
                      animation: isCorrect ? "pulseGreen 0.8s ease-out" : isWrong ? "shakeX 0.4s" : "none",
                    }}
                  >
                    <span className="font-display font-semibold">{c}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {stage === "done" && (
          <div className="relative p-8 text-center">
            <div className="flex justify-center mb-4">
              <div style={{ animation: "starDrop 0.7s cubic-bezier(0.34,1.56,0.64,1)" }}>
                <svg width="80" height="80" viewBox="0 0 80 80">
                  <polygon
                    points="40,4 50,30 76,32 56,50 62,76 40,60 18,76 24,50 4,32 30,30"
                    fill="url(#goldGrad)"
                    stroke="#F4D97A"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>
            </div>
            <div className="font-display text-[11px] tracking-[0.4em] uppercase text-[#F4D97A]">Challenge Complete</div>
            <h2 className="font-display text-3xl font-bold text-white mt-2">+350 XP Bonus!</h2>
            <h3 className="font-arabic text-xl text-[#F4D97A] mt-1" dir="rtl">مكافأة +350 نقطة</h3>
            <div className="text-sm text-[#F5EED6]/70 mt-2">
              You got {correct} of {dailyQs.length} correct. Come back tomorrow!
            </div>
            <div className="mt-6 flex justify-center">
              <GoldButton onClick={() => router.push("/")}>Back to Journey</GoldButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
