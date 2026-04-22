
import React from "react";
import type { Lesson } from "../types";

interface JourneyRibbonProps {
  lessons: Lesson[];
  activeId: number;
  onSelect: (id: number) => void;
}

export function JourneyRibbon({ lessons, activeId, onSelect }: JourneyRibbonProps) {
  const completed = lessons.filter(l => l.state === "completed").length;
  const pct = (completed / lessons.length) * 100;
  return (
    <div className="mt-4 relative rounded-xl overflow-hidden" style={{
      background: "linear-gradient(90deg, rgba(18,33,63,0.8) 0%, rgba(10,22,40,0.8) 100%)",
      border: "1px solid rgba(200,169,81,0.3)",
    }}>
      <div className="flex items-center gap-5 px-5 py-3">
        <div className="shrink-0">
          <div className="font-display text-[10px] tracking-[0.25em] uppercase text-[#C8A951]">Your Journey</div>
          <div className="font-arabic text-xs text-[#F5EED6]/70" dir="rtl">مسار التعلم</div>
        </div>
        <div className="flex-1 flex items-center gap-1.5">
          {lessons.map((l, i) => {
            const isActive = l.id === activeId;
            const color =
              l.state === "completed" ? "#009A44" :
              l.state === "active"    ? "#EF3340" :
              l.state === "unlocked"  ? "#C8A951" : "#2B3A55";
            return (
              <React.Fragment key={l.id}>
                <button
                  onClick={() => l.state !== "locked" && onSelect(l.id)}
                  className="group relative flex items-center gap-2 px-2.5 py-1.5 rounded-md transition-all"
                  style={{
                    background: isActive ? `${color}22` : "transparent",
                    border: `1px solid ${isActive ? color : "transparent"}`,
                    cursor: l.state === "locked" ? "not-allowed" : "pointer",
                    opacity: l.state === "locked" ? 0.5 : 1,
                  }}
                  title={l.title}
                >
                  <div className="w-5 h-5 flex items-center justify-center rounded-full font-display font-bold text-[10px]"
                    style={{ background: color, color: l.state === "locked" ? "#6B7A99" : "#0A1628" }}>
                    {l.state === "completed" ? "✓" : i + 1}
                  </div>
                  <span className="text-[11px] text-white/90 hidden lg:inline truncate max-w-[120px]">{l.title}</span>
                </button>
                {i < lessons.length - 1 && (
                  <div className="flex-1 h-px" style={{
                    background: i < completed - 1
                      ? "linear-gradient(90deg, #009A44, #C8A951)"
                      : "repeating-linear-gradient(90deg, rgba(200,169,81,0.3) 0 4px, transparent 4px 8px)"
                  }}/>
                )}
              </React.Fragment>
            );
          })}
        </div>
        <div className="shrink-0 text-right">
          <div className="text-[10px] tracking-[0.25em] uppercase text-[#C8A951]">Progress</div>
          <div className="font-display font-bold text-white tabular-nums text-lg">{Math.round(pct)}<span className="text-[#C8A951] text-sm">%</span></div>
        </div>
      </div>
    </div>
  );
}