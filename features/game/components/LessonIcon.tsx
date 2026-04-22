import type { LessonIconName } from "../types";

interface LessonIconProps {
  name: LessonIconName;
  size?: number;
  color?: string;
}

export function LessonIcon({
  name,
  size = 36,
  color = "#F5EED6",
}: LessonIconProps) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 48 48",
    fill: "none",
    stroke: color,
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (name) {
    case "cell":
      return (
        <svg {...common}>
          <circle cx="24" cy="24" r="16" />
          <circle cx="24" cy="24" r="6" fill={color} fillOpacity="0.15" />
          <circle cx="17" cy="17" r="1.5" fill={color} />
          <circle cx="31" cy="19" r="1.2" fill={color} />
          <circle cx="30" cy="32" r="1.6" fill={color} />
          <circle cx="16" cy="30" r="1.2" fill={color} />
        </svg>
      );
    case "bone":
      return (
        <svg {...common}>
          <path d="M14 12c-3 0-5 2-5 5 0 2 1 3 2 4-1 1-2 2-2 4 0 3 2 5 5 5 2 0 3-1 4-2l12 12c1 1 2 2 4 2 3 0 5-2 5-5 0-2-1-3-2-4 1-1 2-2 2-4 0-3-2-5-5-5-2 0-3 1-4 2L18 14c-1-1-2-2-4-2z" />
        </svg>
      );
    case "heart":
      return (
        <svg {...common}>
          <path d="M24 40 C10 30 6 22 10 16 C13 11 20 11 24 16 C28 11 35 11 38 16 C42 22 38 30 24 40Z" />
          <path d="M14 22 L18 22 L20 18 L24 28 L26 22 L34 22" />
        </svg>
      );
    case "lungs":
      return (
        <svg {...common}>
          <path d="M24 8 V28" />
          <path d="M18 12 H30" />
          <path d="M22 28 C22 34 18 40 12 40 C8 40 6 36 8 28 C9 22 12 16 18 14" />
          <path d="M26 28 C26 34 30 40 36 40 C40 40 42 36 40 28 C39 22 36 16 30 14" />
        </svg>
      );
    case "digest":
      return (
        <svg {...common}>
          <path d="M18 8 C22 8 26 12 26 16 L26 22 C30 22 34 26 34 30 C34 36 30 40 24 40 C18 40 14 36 14 32" />
          <circle cx="18" cy="14" r="1.5" fill={color} />
          <circle cx="24" cy="30" r="1.5" fill={color} />
        </svg>
      );
    case "brain":
      return (
        <svg {...common}>
          <path d="M16 14 C12 14 10 18 12 22 C8 24 8 30 12 32 C12 36 16 38 20 36 C22 40 28 40 28 36 C32 38 36 36 36 32 C40 30 40 24 36 22 C38 18 36 14 32 14 C30 10 18 10 16 14Z" />
          <path d="M24 14 V38" />
        </svg>
      );
    case "shield":
      return (
        <svg {...common}>
          <path d="M24 6 L38 12 V24 C38 32 32 38 24 42 C16 38 10 32 10 24 V12 Z" />
          <path
            d="M24 16 L28 22 L34 23 L30 28 L31 34 L24 31 L17 34 L18 28 L14 23 L20 22 Z"
            fill={color}
            fillOpacity="0.15"
          />
        </svg>
      );
    default:
      return null;
  }
}

interface LockIconProps {
  color?: string;
}

export function LockIcon({ color = "#6B7A99" }: LockIconProps) {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      aria-hidden
      focusable="false"
    >
      <rect
        x="8"
        y="16"
        width="20"
        height="14"
        rx="2"
        stroke={color}
        strokeWidth="2"
      />
      <path
        d="M12 16 V12 C12 8 14 6 18 6 C22 6 24 8 24 12 V16"
        stroke={color}
        strokeWidth="2"
      />
      <circle cx="18" cy="23" r="1.8" fill={color} />
    </svg>
  );
}
