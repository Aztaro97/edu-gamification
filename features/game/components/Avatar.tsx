type AvatarTone = "red" | "green" | "gold";

interface AvatarProps {
  initials: string;
  tone?: AvatarTone;
  size?: number;
}

const TONE_COLORS: Record<AvatarTone, string> = {
  red: "#EF3340",
  green: "#009A44",
  gold: "#C8A951",
};

export function Avatar({ initials, tone = "red", size = 48 }: AvatarProps) {
  const bg = TONE_COLORS[tone];
  return (
    <div
      className="relative flex items-center justify-center shrink-0"
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        aria-hidden
        focusable="false"
      >
        <polygon
          points="24,2 30,10 40,8 40,18 46,24 40,30 40,40 30,38 24,46 18,38 8,40 8,30 2,24 8,18 8,8 18,10"
          fill={bg}
          stroke="#C8A951"
          strokeWidth="1.5"
        />
        <polygon
          points="24,6 29,12 37,11 37,19 42,24 37,29 37,37 29,36 24,42 19,36 11,37 11,29 6,24 11,19 11,11 19,12"
          fill="none"
          stroke="#0A1628"
          strokeWidth="0.8"
          opacity="0.4"
        />
      </svg>
      <div
        className="absolute inset-0 flex items-center justify-center font-display font-bold text-white"
        style={{ fontSize: size * 0.36 }}
      >
        {initials}
      </div>
    </div>
  );
}
