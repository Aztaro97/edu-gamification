type AvatarTone = "red" | "green" | "gold";

interface AvatarProps {
  initials: string;
  tone?: AvatarTone;
  size?: number;
}

const GRAD_ID: Record<AvatarTone, string> = {
  red: "avatarRed",
  green: "avatarGreen",
  gold: "avatarGold",
};

export function Avatar({ initials, tone = "red", size = 48 }: AvatarProps) {
  const gradId = GRAD_ID[tone];

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
        {/* Outer star — tone radial gradient from GeometryDefs */}
        <polygon
          points="24,2 30,10 40,8 40,18 46,24 40,30 40,40 30,38 24,46 18,38 8,40 8,30 2,24 8,18 8,8 18,10"
          fill={`url(#${gradId})`}
          stroke="#C8A951"
          strokeWidth="1.5"
        />
        {/* Inner frame ring */}
        <polygon
          points="24,6 29,12 37,11 37,19 42,24 37,29 37,37 29,36 24,42 19,36 11,37 11,29 6,24 11,19 11,11 19,12"
          fill="none"
          stroke="white"
          strokeWidth="0.7"
          opacity="0.2"
        />
        {/* Dark centre for initials contrast */}
        <circle cx="24" cy="24" r="13" fill="#0A1628" fillOpacity="0.45" />
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
