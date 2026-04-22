"use client";

import { useGame } from "@/features/game/GameContext";
import { GlassPanel } from "@/features/game/components/Atoms";
import { PlayerPanel } from "@/features/game/components/PlayerPanel";

export default function ProfilePage() {
  const { xp, nextThreshold } = useGame();
  const xpPct = (xp / nextThreshold) * 100;

  return (
    <div className="flex-1 flex flex-col p-6">
      <div className="max-w-2xl mx-auto w-full space-y-6">
        <GlassPanel className="p-8">
          <h1 className="text-2xl font-display font-bold text-white mb-6">Profile Settings</h1>
          <div className="w-full max-w-sm">
            <PlayerPanel xpPct={xpPct} />
          </div>
          <div className="mt-8 space-y-4">
            <div className="bg-[#0A1628] p-4 rounded-xl border border-[#2B3A55]">
              <div className="text-sm tracking-widest uppercase text-[#C8A951] mb-1">Account</div>
              <div className="text-white">Ahmed Al Mansoori</div>
              <div className="text-[#F5EED6]/60 text-sm">ahmed@example.com</div>
            </div>
            
            <div className="bg-[#0A1628] p-4 rounded-xl border border-[#2B3A55]">
              <div className="text-sm tracking-widest uppercase text-[#C8A951] mb-1">School</div>
              <div className="text-white">Al Bayan School</div>
              <div className="text-[#F5EED6]/60 text-sm">Grade 4</div>
            </div>
          </div>
        </GlassPanel>
      </div>
    </div>
  );
}
