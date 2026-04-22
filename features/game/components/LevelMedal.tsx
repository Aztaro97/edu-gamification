interface LevelMedalProps {
  level: number;
}

export function LevelMedal({ level }: LevelMedalProps) {
  return (
    <div className="relative" style={{ width: 44, height: 44 }}>
      <svg
        width="44"
        height="44"
        viewBox="0 0 44 44"
        aria-hidden
        focusable="false"
      >
        <polygon
          points="22,2 27,8 35,6 35,14 41,19 35,24 35,32 27,30 22,38 17,30 9,32 9,24 3,19 9,14 9,6 17,8"
          fill="url(#goldGrad)"
          stroke="#F4D97A"
          strokeWidth="1"
        />
        <circle
          cx="22"
          cy="20"
          r="10"
          fill="#0A1628"
          stroke="#F4D97A"
          strokeWidth="1"
        />
      </svg>
      <div
        className="absolute inset-0 flex items-center justify-center font-display font-bold text-[#F4D97A] text-sm"
        style={{ paddingBottom: 6 }}
      >
        {level}
      </div>
    </div>
  );
}
