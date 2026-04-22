import type { Badge, BadgeTier } from "../types";

const TIER_COLORS: Record<BadgeTier, string> = {
  gold: "#C8A951",
  red: "#EF3340",
  green: "#009A44",
};

interface BadgeProps {
  badge: Badge;
}

export function BadgeMark({ badge }: BadgeProps) {
  const color = TIER_COLORS[badge.tier];
  return (
    <div className="relative flex flex-col items-center group">
      <svg
        width="56"
        height="64"
        viewBox="0 0 56 64"
        aria-hidden
        focusable="false"
      >
        <polygon
          points="28,2 42,7 52,17 52,35 42,47 28,58 14,47 4,35 4,17 14,7"
          fill="#0A1628"
          stroke={color}
          strokeWidth="1.5"
        />
        <polygon
          points="28,6 39,10 48,19 48,33 39,43 28,52 17,43 8,33 8,19 17,10"
          fill="url(#lattice)"
          opacity="0.5"
        />
        <g transform="translate(28 28)">
          {badge.id === "falcon" && <FalconMark color={color} />}
          {badge.id === "dune" && <DuneMark color={color} />}
          {badge.id === "star" && <StarMark color={color} />}
          {badge.id === "crescent" && <CrescentMark color={color} />}
        </g>
      </svg>
      <div className="text-[9px] text-center text-[#F5EED6]/70 leading-tight mt-0.5 px-0.5 truncate w-full">
        {badge.name}
      </div>
    </div>
  );
}

function FalconMark({ color }: { color: string }) {
  return (
    <g
      stroke={color}
      strokeWidth="1.4"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M-10 -2 C -6 -6, -2 -6, 0 -2 C 2 -6, 6 -6, 10 -2" />
      <path d="M-2 -1 L 0 5 L 2 -1 Z" fill={color} />
      <path d="M0 -2 L 0 -8" />
    </g>
  );
}

function DuneMark({ color }: { color: string }) {
  return (
    <g stroke={color} strokeWidth="1.4" fill="none" strokeLinecap="round">
      <path d="M-12 4 C -7 -2, -2 2, 0 -2 C 3 -5, 8 -1, 12 4" />
      <circle cx="-8" cy="-6" r="2" fill={color} stroke="none" />
    </g>
  );
}

function StarMark({ color }: { color: string }) {
  return (
    <polygon
      points="0,-10 3,-3 10,-3 4,2 6,9 0,5 -6,9 -4,2 -10,-3 -3,-3"
      fill={color}
      stroke={color}
      strokeWidth="0.8"
    />
  );
}

function CrescentMark({ color }: { color: string }) {
  return (
    <g fill={color}>
      <path d="M-6 0 A 8 8 0 1 0 2 -8 A 6 6 0 1 1 -6 0 Z" />
      <polygon points="6,-2 7,1 10,1 8,3 9,6 6,4 3,6 4,3 2,1 5,1" />
    </g>
  );
}
