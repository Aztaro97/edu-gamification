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
    /* ── Biology cell with nucleus, mitochondria, vacuole ── */
    case "cell":
      return (
        <svg {...common}>
          {/* Cell membrane — slightly irregular oval */}
          <path d="M24,7 C33,7 42,14 42,24 C42,35 33,42 24,42 C15,42 6,35 6,24 C6,13 15,7 24,7 Z" />
          {/* Nucleus */}
          <circle cx="22" cy="22" r="9" strokeWidth="1.6" />
          {/* Nuclear pore dots */}
          <circle cx="22" cy="13.2" r="1.1" fill={color} stroke="none" />
          <circle cx="13.2" cy="22" r="1.1" fill={color} stroke="none" />
          <circle cx="30.8" cy="22" r="1.1" fill={color} stroke="none" />
          {/* Nucleolus */}
          <circle cx="21" cy="21" r="3.5" fill={color} fillOpacity="0.18" strokeWidth="1" />
          <circle cx="21" cy="21" r="1.6" fill={color} stroke="none" />
          {/* Mitochondria — oval with inner cristae */}
          <ellipse cx="35" cy="13" rx="4.5" ry="2.8" strokeWidth="1.2" />
          <path d="M33,13 C34,11 34.5,15 35.5,13 C36.5,11 37,15 37,13" strokeWidth="0.8" />
          {/* Vacuole — dashed outline */}
          <circle cx="33" cy="34" r="4" strokeWidth="1.1" strokeDasharray="2.5,1.5" />
          {/* Scattered organelle dots */}
          <circle cx="13" cy="33" r="1.5" fill={color} fillOpacity="0.35" stroke="none" />
          <circle cx="13" cy="14" r="1.2" fill={color} fillOpacity="0.35" stroke="none" />
          <circle cx="38" cy="24" r="1" fill={color} fillOpacity="0.3" stroke="none" />
        </svg>
      );

    /* ── Long bone with epiphysis + shaft ── */
    case "bone":
      return (
        <svg {...common}>
          {/* Top-left epiphysis */}
          <circle cx="15" cy="15" r="6.5" strokeWidth="1.6" />
          {/* Extra condyle bump */}
          <path d="M10,16 C9,13 11,10 13,10" strokeWidth="1.2" />
          {/* Shaft — thick stroke for cortical bone */}
          <path d="M19,20 L29,30" strokeWidth="6" strokeLinecap="round" />
          {/* Medullary canal highlight */}
          <path d="M19,20 L29,30" stroke="rgba(10,22,40,0.35)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          {/* Bottom-right epiphysis */}
          <circle cx="33" cy="33" r="6.5" strokeWidth="1.6" />
          {/* Condyle bump */}
          <path d="M38,32 C39,35 37,38 35,38" strokeWidth="1.2" />
        </svg>
      );

    /* ── Heart with major vessels and EKG ── */
    case "heart":
      return (
        <svg {...common}>
          {/* Heart outline */}
          <path d="M24 40 C10 30 6 20 10 14 C13 9 20 9 24 14 C28 9 35 9 38 14 C42 20 38 30 24 40 Z" />
          {/* Aortic arch */}
          <path d="M21 14 C19 9 17 7 17 11" strokeWidth="1.5" />
          {/* Pulmonary artery */}
          <path d="M27 14 C29 8 32 7 32 11" strokeWidth="1.5" />
          {/* EKG line */}
          <path d="M13 23 L16 23 L18 18 L22 28 L25 22 L28 22 L30 18 L35 23" strokeWidth="1.3" />
        </svg>
      );

    /* ── Lungs with trachea, bronchi, and lobes ── */
    case "lungs":
      return (
        <svg {...common}>
          {/* Trachea */}
          <path d="M24 6 L24 18" strokeWidth="2.5" strokeLinecap="round" />
          {/* Carina — bronchi split */}
          <path d="M24 18 L17 23 M24 18 L31 23" strokeWidth="2" />
          {/* Left lung outline */}
          <path d="M17 23 C13 25 9 30 9 36 C9 42 13 45 17 45 C21 45 23 43 23 41 L23 25" />
          {/* Right lung outline */}
          <path d="M31 23 C35 25 39 30 39 36 C39 42 35 45 31 45 C27 45 25 43 25 41 L25 25" />
          {/* Left lobe fissure */}
          <path d="M17 30 C15 32 11 33 11 36" strokeWidth="1" />
          {/* Left secondary bronchus */}
          <path d="M16 28 C13 26 11 28 11 32" strokeWidth="1" />
          <path d="M15 35 C12 34 10 36 11 39" strokeWidth="1" />
          {/* Right lobe fissure */}
          <path d="M31 30 C33 32 37 33 37 36" strokeWidth="1" />
          {/* Right secondary bronchus */}
          <path d="M32 28 C35 26 37 28 37 32" strokeWidth="1" />
          <path d="M33 35 C36 34 38 36 37 39" strokeWidth="1" />
        </svg>
      );

    /* ── Digestive system: oesophagus → stomach → intestine ── */
    case "digest":
      return (
        <svg {...common}>
          {/* Oesophagus */}
          <path d="M24 6 L24 13" strokeWidth="2" />
          {/* Stomach — J-curve */}
          <path d="M24 13 C27 13 32 13 33 16 C35 19 35 25 33 28 C31 30 27 31 24 31 C21 31 19 29 19 27" />
          {/* Pyloric sphincter */}
          <path d="M33 28 C35 30 35 33 33 33.5" strokeWidth="1.5" />
          {/* Small intestine loops */}
          <path d="M33 33.5 C37 37 36 42 31 44 C26 46 21 44 19 40 C17 36 19 32 23 32 C27 32 29 36 27 39 C25 42 21 41 20 39" strokeWidth="1.5" />
          {/* Stomach fold detail */}
          <path d="M21 16 C22 13 26 13 27 16" strokeWidth="0.9" />
          <path d="M22 22 C23 19 28 20 29 23" strokeWidth="0.9" />
        </svg>
      );

    /* ── Brain with bilateral hemispheres and gyri ── */
    case "brain":
      return (
        <svg {...common}>
          {/* Outer brain shape */}
          <path d="M24 7 C16 7 8 13 8 21 C8 27 10 31 12 34 C13 37 14 41 16 43 C19 45 21 43 24 43 C27 43 29 45 32 43 C34 41 35 37 36 34 C38 31 40 27 40 21 C40 13 32 7 24 7 Z" />
          {/* Longitudinal fissure */}
          <line x1="24" y1="7" x2="24" y2="43" strokeWidth="1.5" />
          {/* Left hemisphere gyri */}
          <path d="M10 19 C12 15 18 15 18 19 C18 23 12 23 13 27" strokeWidth="1.1" />
          <path d="M13 29 C15 25 20 26 20 30" strokeWidth="1.1" />
          <path d="M14 35 C17 31 21 32 21 36" strokeWidth="1.1" />
          {/* Right hemisphere gyri */}
          <path d="M38 19 C36 15 30 15 30 19 C30 23 36 23 35 27" strokeWidth="1.1" />
          <path d="M35 29 C33 25 28 26 28 30" strokeWidth="1.1" />
          <path d="M34 35 C31 31 27 32 27 36" strokeWidth="1.1" />
        </svg>
      );

    /* ── Immune shield with star emblem ── */
    case "shield":
      return (
        <svg {...common}>
          {/* Shield outline */}
          <path d="M24 6 L38 12 L38 24 C38 34 32 40 24 44 C16 40 10 34 10 24 L10 12 Z" />
          {/* Inner field tint */}
          <path
            d="M24 10 L35 15 L35 24 C35 33 30 38 24 41 C18 38 13 33 13 24 L13 15 Z"
            fill={color}
            fillOpacity="0.1"
            stroke="none"
          />
          {/* 5-point star centrepiece */}
          <polygon
            points="24,15 25.9,21 32.1,21 27.1,24.7 29,30.8 24,27.1 19,30.8 20.9,24.7 15.9,21 22.1,21"
            fill={color}
            fillOpacity="0.75"
            stroke="none"
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
      {/* Lock body */}
      <rect
        x="7"
        y="15"
        width="22"
        height="16"
        rx="3"
        stroke={color}
        strokeWidth="2"
      />
      {/* Shackle */}
      <path
        d="M12 15 V11 C12 7.5 15 5 18 5 C21 5 24 7.5 24 11 V15"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Keyhole circle */}
      <circle cx="18" cy="22" r="2.5" stroke={color} strokeWidth="1.5" />
      {/* Keyhole stem */}
      <rect x="17" y="23" width="2" height="4.5" rx="1" fill={color} />
    </svg>
  );
}
