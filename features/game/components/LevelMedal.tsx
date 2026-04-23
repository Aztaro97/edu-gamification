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
        {/* Outer star — gold gradient */}
        <polygon
          points="22,2 26,8 34,7 35,15 41,20 35,25 35,33 26,31 22,39 18,31 9,33 9,25 3,20 9,15 9,7 18,8"
          fill="url(#goldGrad)"
          stroke="#F4D97A"
          strokeWidth="1"
        />
        {/* Deep-space inner circle */}
        <circle cx="22" cy="21" r="11.5" fill="#0A1628" stroke="#F4D97A" strokeWidth="0.8" />
        {/* Decorative inner ring */}
        <circle cx="22" cy="21" r="9" fill="none" stroke="#C8A951" strokeWidth="0.4" opacity="0.6" />
        {/* Cardinal accent dots on inner ring */}
        <circle cx="22" cy="12" r="0.8" fill="#F4D97A" />
        <circle cx="31" cy="21" r="0.8" fill="#F4D97A" />
        <circle cx="22" cy="30" r="0.8" fill="#F4D97A" />
        <circle cx="13" cy="21" r="0.8" fill="#F4D97A" />
      </svg>
      {/* Level number */}
      <div
        className="absolute inset-0 flex items-center justify-center font-display font-bold text-[#F4D97A] text-sm"
        style={{ paddingBottom: 2 }}
      >
        {level}
      </div>
    </div>
  );
}
