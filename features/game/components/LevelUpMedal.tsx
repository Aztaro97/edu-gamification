interface LevelUpMedalProps {
  size?: number;
}

/**
 * Gold medal SVG for the level-up overlay — replaces the 🏅 emoji.
 * Uses UAE flag ribbon colours (red + green) and an Islamic 8-point star.
 */
export function LevelUpMedal({ size = 56 }: LevelUpMedalProps) {
  const w = size;
  const h = Math.round(size * 1.3);
  return (
    <svg width={w} height={h} viewBox="0 0 56 72" aria-hidden focusable="false">
      <defs>
        {/* Local radial — only needed for the medal face */}
        <radialGradient id="medalFace" cx="0.32" cy="0.28" r="0.68">
          <stop offset="0%" stopColor="#FFF8DC" />
          <stop offset="45%" stopColor="#F4D97A" />
          <stop offset="100%" stopColor="#7C5E24" />
        </radialGradient>
      </defs>

      {/* Ribbon — UAE flag stripes */}
      <rect x="18" y="0" width="9"  height="23" rx="2" fill="#EF3340" />
      <rect x="29" y="0" width="9"  height="23" rx="2" fill="#009A44" />

      {/* Ribbon clasp fold */}
      <path d="M18,19 L22.5,23 L27,19 L27,23 L18,23 Z" fill="#0A1628" opacity="0.18" />
      <path d="M29,19 L33.5,23 L38,19 L38,23 L29,23 Z" fill="#0A1628" opacity="0.18" />

      {/* Medal circle */}
      <circle cx="28" cy="50" r="20" fill="url(#medalFace)" stroke="#F4D97A" strokeWidth="1.6" />
      {/* Outer ring */}
      <circle cx="28" cy="50" r="16.5" fill="none" stroke="#F4D97A" strokeWidth="0.7" opacity="0.6" />
      {/* Inner dark field */}
      <circle cx="28" cy="50" r="15.5" fill="#0A1628" fillOpacity="0.32" />

      {/* 8-point Islamic star — centrepiece */}
      <polygon
        points="28,39 29.5,43.8 34.7,43.8 30.6,47.2 32.1,52 28,48.8 23.9,52 25.4,47.2 21.3,43.8 26.5,43.8"
        fill="#F4D97A"
        stroke="none"
      />

      {/* Shine arc on medal top */}
      <path
        d="M15,42 C18,36 38,36 41,42"
        fill="none"
        stroke="white"
        strokeWidth="1"
        opacity="0.18"
        strokeLinecap="round"
      />
    </svg>
  );
}
