"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LESSONS } from "@/features/game/data";
import { useGame } from "@/features/game/GameContext";
import { GlassPanel, GoldButton } from "@/features/game/components/Atoms";
import { LessonIcon } from "@/features/game/components/LessonIcon";

export default function LessonPage() {
  const { id } = useParams();
  const router = useRouter();
  const { completeLesson } = useGame();
  
  const lessonId = parseInt(id as string, 10);
  const lesson = LESSONS.find((l) => l.id === lessonId);

  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (!lesson) {
      router.push("/");
    }
  }, [lesson, router]);

  if (!lesson) return null;

  const handleAnswer = (choiceIdx: number) => {
    const question = lesson.questions[currentQuestionIdx];
    if (choiceIdx === question.correct) {
      setCorrectCount(c => c + 1);
    }
    
    if (currentQuestionIdx < lesson.questions.length - 1) {
      setCurrentQuestionIdx(c => c + 1);
    } else {
      // Complete lesson
      setIsFinished(true);
      completeLesson(lessonId, correctCount + (choiceIdx === question.correct ? 1 : 0), lesson.questions.length);
      router.push(`/results/${lessonId}?correct=${correctCount + (choiceIdx === question.correct ? 1 : 0)}&total=${lesson.questions.length}`);
    }
  };

  if (isFinished) return null;

  const currentQuestion = lesson.questions[currentQuestionIdx];

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6">
      <GlassPanel className="w-full max-w-2xl p-8 space-y-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#1B2A4A] flex items-center justify-center border border-[#C8A951]">
              <LessonIcon name={lesson.icon} size={24} color="#C8A951" />
            </div>
            <div>
              <h2 className="text-[#F4D97A] font-display text-sm tracking-widest uppercase">Lesson {lesson.id}</h2>
              <h1 className="text-2xl font-display font-bold text-white">{lesson.title}</h1>
            </div>
          </div>
          <div className="text-[#C8A951] font-display font-bold text-xl">
            {currentQuestionIdx + 1} / {lesson.questions.length}
          </div>
        </div>

        <div className="bg-[#0A1628] p-6 rounded-xl border border-[#2B3A55]">
          <h3 className="text-xl text-white mb-2">{currentQuestion.q}</h3>
          <p className="text-[#F5EED6]/70 font-arabic text-right mb-6" dir="rtl">{currentQuestion.qAr}</p>

          <div className="grid gap-3">
            {currentQuestion.type === "mcq" && currentQuestion.choices?.map((choice, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                className="w-full text-left p-4 rounded-lg bg-[#1B2A4A] hover:bg-[#2B3A55] border border-[#2B3A55] hover:border-[#C8A951] transition-colors flex items-center justify-between group"
              >
                <span className="text-white group-hover:text-[#F4D97A] transition-colors">{choice}</span>
                <span className="text-[#F5EED6]/50 font-arabic group-hover:text-[#C8A951] transition-colors" dir="rtl">
                  {currentQuestion.choicesAr?.[idx]}
                </span>
              </button>
            ))}
            
            {currentQuestion.type === "tf" && (
              <div className="flex gap-4">
                <button
                  onClick={() => handleAnswer(1)}
                  className="flex-1 p-4 rounded-lg bg-[#1B2A4A] hover:bg-[#009A44]/20 border border-[#2B3A55] hover:border-[#009A44] text-white transition-colors"
                >
                  <div className="font-bold">True</div>
                  <div className="font-arabic opacity-70" dir="rtl">صحيح</div>
                </button>
                <button
                  onClick={() => handleAnswer(0)}
                  className="flex-1 p-4 rounded-lg bg-[#1B2A4A] hover:bg-[#EF3340]/20 border border-[#2B3A55] hover:border-[#EF3340] text-white transition-colors"
                >
                  <div className="font-bold">False</div>
                  <div className="font-arabic opacity-70" dir="rtl">خطأ</div>
                </button>
              </div>
            )}
          </div>
        </div>
      </GlassPanel>
    </div>
  );
}
