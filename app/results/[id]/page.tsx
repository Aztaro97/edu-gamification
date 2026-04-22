"use client";

import { useParams, useSearchParams, useRouter } from "next/navigation";
import { LESSONS } from "@/features/game/data";
import { GlassPanel, GoldButton } from "@/features/game/components/Atoms";
import { Stars } from "@/features/game/components/Stars";
import { useGame } from "@/features/game/GameContext";

export default function ResultsPage() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { xp } = useGame();

  const lessonId = parseInt(id as string, 10);
  const lesson = LESSONS.find((l) => l.id === lessonId);
  const correct = parseInt(searchParams.get("correct") || "0", 10);
  const total = parseInt(searchParams.get("total") || "1", 10);

  if (!lesson) return null;

  const pct = correct / total;
  let stars = 0;
  if (pct >= 0.95) stars = 3;
  else if (pct >= 0.7) stars = 2;
  else if (pct > 0) stars = 1;

  const earnedXp = lesson.xp + correct * 10;

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6">
      <GlassPanel className="w-full max-w-md p-10 text-center space-y-6">
        <h1 className="text-3xl font-display font-bold text-white mb-2">Lesson Complete!</h1>
        <h2 className="text-xl font-arabic text-[#F4D97A]" dir="rtl">اكتمل الدرس!</h2>

        <div className="flex justify-center py-6">
          <Stars count={3} earned={stars} size={32} />
        </div>

        <div className="bg-[#0A1628] rounded-xl p-6 border border-[#2B3A55] mb-8">
          <div className="text-sm tracking-widest uppercase text-[#C8A951] mb-1">Score</div>
          <div className="text-3xl font-bold text-white mb-4">{correct} / {total}</div>
          
          <div className="text-sm tracking-widest uppercase text-[#C8A951] mb-1">XP Earned</div>
          <div className="text-3xl font-bold text-[#F4D97A]">+{earnedXp} XP</div>
        </div>

        <GoldButton onClick={() => router.push("/")} className="w-full text-lg py-4">
          CONTINUE TO MAP
        </GoldButton>
      </GlassPanel>
    </div>
  );
}
