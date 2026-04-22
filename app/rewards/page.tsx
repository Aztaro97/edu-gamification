"use client";

import { GlassPanel } from "@/features/game/components/Atoms";
import { BadgeMark as BadgeComponent } from "@/features/game/components/Badge";
import { BADGES } from "@/features/game/data";
import { useGame } from "@/features/game/GameContext";

export default function RewardsPage() {
  const { badges } = useGame();

  return (
    <div className="flex-1 flex flex-col p-6">
      <div className="max-w-4xl mx-auto w-full space-y-6">
        <GlassPanel className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-display font-bold text-white">Your Rewards</h1>
              <h2 className="text-xl font-arabic text-[#F4D97A]" dir="rtl">الجوائز</h2>
            </div>
            <div className="text-right">
              <div className="text-[10px] tracking-[0.25em] uppercase text-[#C8A951]">Unlocked</div>
              <div className="font-display font-bold text-white text-lg tabular-nums">
                {badges.length} / {BADGES.length}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {BADGES.map((b) => {
              const isUnlocked = badges.includes(b.id);
              return (
                <div key={b.id} className={`flex flex-col items-center ${isUnlocked ? '' : 'opacity-50 grayscale'}`}>
                  <BadgeComponent badge={b} size={80} showLabel={false} />
                  <div className="mt-3 text-center">
                    <div className="text-sm font-bold text-white">{b.name}</div>
                    <div className="text-xs font-arabic text-[#F5EED6]/70" dir="rtl">{b.nameAr}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </GlassPanel>
      </div>
    </div>
  );
}
