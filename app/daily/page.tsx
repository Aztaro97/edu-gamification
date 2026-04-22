"use client";

import { useRouter } from "next/navigation";
import { GlassPanel, GoldButton } from "@/features/game/components/Atoms";
import { useGame } from "@/features/game/GameContext";

export default function DailyPage() {
  const router = useRouter();
  const { dailyCompleted, completeDaily } = useGame();

  const handleComplete = () => {
    if (!dailyCompleted) {
      completeDaily(350);
    }
    router.push("/");
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6">
      <GlassPanel className="w-full max-w-md p-10 text-center space-y-6">
        <h1 className="text-3xl font-display font-bold text-white mb-2">Daily Challenge</h1>
        <h2 className="text-xl font-arabic text-[#F4D97A]" dir="rtl">تحدي اليوم</h2>

        <div className="py-6">
          {dailyCompleted ? (
            <div className="text-xl text-[#009A44] font-bold">Challenge Completed!</div>
          ) : (
            <div className="space-y-4">
              <p className="text-[#F5EED6]/80">Answer 5 questions in under 60 seconds to earn bonus XP.</p>
              <div className="text-4xl font-display font-bold text-[#F4D97A]">+350 XP</div>
            </div>
          )}
        </div>

        <GoldButton onClick={handleComplete} disabled={dailyCompleted} className="w-full text-lg py-4">
          {dailyCompleted ? "RETURN TO MAP" : "START CHALLENGE"}
        </GoldButton>
      </GlassPanel>
    </div>
  );
}
