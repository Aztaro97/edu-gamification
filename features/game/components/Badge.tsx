import type { Badge, BadgeMark, BadgeTier } from "../types";

const TIER_COLORS: Record<BadgeTier, string> = {
  gold: "#C8A951",
  red: "#EF3340",
  green: "#009A44",
};

interface BadgeMarkProps {
  badge: Badge;
  size?: number;
  muted?: boolean;
  showLabel?: boolean;
}

export function BadgeMark({
  badge,
  size = 56,
  muted = false,
  showLabel = true,
}: BadgeMarkProps) {
  const tierColor = TIER_COLORS[badge.tier];
  const color = muted ? "#6B7A99" : tierColor;
  const height = Math.round((size * 64) / 56);

  return (
    <div className="relative flex flex-col items-center group">
      <svg
        width={size}
        height={height}
        viewBox="0 0 56 64"
        aria-hidden
        focusable="false"
      >
        {/* Outer shell */}
        <polygon
          points="28,2 42,7 52,17 52,35 42,47 28,58 14,47 4,35 4,17 14,7"
          fill="#0A1628"
          stroke={color}
          strokeWidth="1.5"
          opacity={muted ? 0.6 : 1}
        />
        {/* Lattice inner fill */}
        <polygon
          points="28,6 39,10 48,19 48,33 39,43 28,52 17,43 8,33 8,19 17,10"
          fill="url(#lattice)"
          opacity={muted ? 0.2 : 0.5}
        />
        {/* Glyph centered at (28,28) */}
        <g transform="translate(28 28)" opacity={muted ? 0.5 : 1}>
          <Glyph mark={badge.mark} color={color} />
        </g>
      </svg>
      {showLabel && (
        <div className="text-[9px] text-center text-[#F5EED6]/70 leading-tight mt-0.5 px-0.5 truncate w-full">
          {badge.name}
        </div>
      )}
    </div>
  );
}

interface GlyphProps {
  mark: BadgeMark;
  color: string;
}

function Glyph({ mark, color }: GlyphProps) {
  if (mark === "falcon") return <FalconMark color={color} />;
  if (mark === "dune") return <DuneMark color={color} />;
  if (mark === "star") return <StarMark color={color} />;
  if (mark === "crescent") return <CrescentMark color={color} />;
  if (mark === "heart") return <HeartMark color={color} />;
  if (mark === "lotus") return <LotusMark color={color} />;
  if (mark === "shield") return <ShieldMark color={color} />;
  return <BookMark color={color} />;
}

/* ── UAE Peregrine Falcon — head profile, right-facing ── */
function FalconMark({ color }: { color: string }) {
  return (
    <g>
      {/* Head + body silhouette */}
      <path
        d="M-2,-11 C-7,-10 -10,-6 -10,-1 C-10,4 -7,8 -2,10 L0,11 L2,10 C7,8 10,4 10,-1 C10,-6 7,-10 2,-11 Z"
        fill={color}
        stroke="none"
      />
      {/* Hooked beak pointing right */}
      <path
        d="M10,-1 C13,-2 14,2 12,5 C13,5 14,1 12,-2 Z"
        fill={color}
        stroke="none"
      />
      {/* Eye socket — dark oval cutout */}
      <ellipse cx="5" cy="-2" rx="2.6" ry="2.2" fill="#0A1628" stroke="none" />
      {/* Pupil shine */}
      <circle cx="4.2" cy="-2.7" r="0.7" fill={color} fillOpacity="0.55" stroke="none" />
      {/* UAE falcon tear-stripe from eye down to neck */}
      <path
        d="M6,0 C5.5,3 5,7 4.5,10"
        stroke="#0A1628"
        strokeWidth="1.7"
        strokeLinecap="round"
        fill="none"
      />
      {/* Wing sweep hint at bottom */}
      <path
        d="M-9,5 C-10,9 -5,12 0,12 C5,12 10,9 9,5"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
      />
    </g>
  );
}

/* ── Arabian desert dunes with sun ── */
function DuneMark({ color }: { color: string }) {
  return (
    <g>
      {/* Sun disc */}
      <circle cx="0" cy="-9" r="2.5" fill={color} stroke="none" />
      {/* Sun rays */}
      <line x1="0" y1="-5.8" x2="0" y2="-4.3" stroke={color} strokeWidth="1.1" strokeLinecap="round" />
      <line x1="2.5" y1="-6.7" x2="3.3" y2="-5.5" stroke={color} strokeWidth="1.1" strokeLinecap="round" />
      <line x1="-2.5" y1="-6.7" x2="-3.3" y2="-5.5" stroke={color} strokeWidth="1.1" strokeLinecap="round" />
      {/* Back dune — distant, subtle */}
      <path
        d="M-11,2 C-7,-3 7,-3 11,2"
        fill="none"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.42"
      />
      {/* Mid dune */}
      <path
        d="M-11,7 C-3,0 3,1 11,7"
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.72"
      />
      {/* Foreground dune */}
      <path
        d="M-11,11 C-4,4 3,6 11,11"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </g>
  );
}

/* ── 8-point Islamic star (Rub el Hizb) ── */
function StarMark({ color }: { color: string }) {
  return (
    <polygon
      points="10,0 3.7,1.5 7.1,7.1 1.5,3.7 0,10 -1.5,3.7 -7.1,7.1 -3.7,1.5 -10,0 -3.7,-1.5 -7.1,-7.1 -1.5,-3.7 0,-10 1.5,-3.7 7.1,-7.1 3.7,-1.5"
      fill={color}
      stroke={color}
      strokeWidth="0.4"
      strokeLinejoin="round"
    />
  );
}

/* ── Islamic crescent moon + 5-point star ── */
function CrescentMark({ color }: { color: string }) {
  return (
    <g fill={color} stroke="none">
      {/* Crescent: large outer arc minus smaller offset arc */}
      <path d="M-4,2 A9,9 0 1 0 3,-8 A7,7 0 1 1 -4,2 Z" />
      {/* 5-point star to the right of the crescent opening */}
      <polygon points="8,-3 8.8,-0.9 11.1,-0.9 9.3,0.5 9.9,2.8 8,1.5 6.1,2.8 6.7,0.5 4.9,-0.9 7.2,-0.9" />
    </g>
  );
}

/* ── Heart with EKG pulse line ── */
function HeartMark({ color }: { color: string }) {
  return (
    <g>
      {/* Solid heart */}
      <path
        d="M0 8 C-10 0 -10 -8 -4 -8 C-1 -8 0 -5 0 -3 C0 -5 1 -8 4 -8 C10 -8 10 0 0 8 Z"
        fill={color}
        stroke={color}
        strokeWidth="0.4"
        strokeLinejoin="round"
      />
      {/* EKG heartbeat line */}
      <path
        d="M-7,0 L-4,0 L-2,-4 L0,4 L2,-3 L4,1 L7,0"
        fill="none"
        stroke="#0A1628"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  );
}

/* ── Lotus blossom — 5 petals ── */
function LotusMark({ color }: { color: string }) {
  return (
    <g
      fill="none"
      stroke={color}
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Centre upright petal */}
      <path d="M0,2 C-2,-2 -2,-9 0,-11 C2,-9 2,-2 0,2 Z" />
      {/* Upper-left petal */}
      <path d="M0,2 C-3,-1 -9,-1 -10,-4 C-7,-5 -3,-2 0,2 Z" opacity="0.88" />
      {/* Lower-left petal */}
      <path d="M0,2 C-3,3 -8,6 -9,9 C-6,10 -2,6 0,2 Z" opacity="0.7" />
      {/* Upper-right petal */}
      <path d="M0,2 C3,-1 9,-1 10,-4 C7,-5 3,-2 0,2 Z" opacity="0.88" />
      {/* Lower-right petal */}
      <path d="M0,2 C3,3 8,6 9,9 C6,10 2,6 0,2 Z" opacity="0.7" />
      {/* Stem */}
      <line x1="0" y1="2" x2="0" y2="10" strokeWidth="1.5" />
      {/* Water arc */}
      <path d="M-7,12 C-3,9 3,9 7,12" />
    </g>
  );
}

/* ── Heater shield with 4-pointed star ── */
function ShieldMark({ color }: { color: string }) {
  return (
    <g>
      {/* Outer shield */}
      <path
        d="M0,-11 L9,-7 L9,2 C9,7 5,10 0,12 C-5,10 -9,7 -9,2 L-9,-7 Z"
        fill="none"
        stroke={color}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      {/* Inner field tint */}
      <path
        d="M0,-8 L6.5,-5 L6.5,2 C6.5,6 3.5,8.5 0,10 C-3.5,8.5 -6.5,6 -6.5,2 L-6.5,-5 Z"
        fill={color}
        fillOpacity="0.14"
        stroke="none"
      />
      {/* 4-pointed star — central charge */}
      <path
        d="M0,-6 L1.3,-1.2 L6,0 L1.3,1.2 L0,6 L-1.3,1.2 L-6,0 L-1.3,-1.2 Z"
        fill={color}
        stroke="none"
      />
    </g>
  );
}

/* ── Open book with page-text lines ── */
function BookMark({ color }: { color: string }) {
  return (
    <g
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Left page */}
      <path d="M0,-10 C-2,-10 -9,-9 -9,-6 L-9,9 C-5,8 -2,9 0,9 Z" strokeWidth="1.3" />
      {/* Right page */}
      <path d="M0,-10 C2,-10 9,-9 9,-6 L9,9 C5,8 2,9 0,9 Z" strokeWidth="1.3" />
      {/* Spine */}
      <line x1="0" y1="-10" x2="0" y2="9" strokeWidth="1" />
      {/* Left text lines */}
      <line x1="-7.5" y1="-5" x2="-1.5" y2="-5.5" strokeWidth="0.7" opacity="0.65" />
      <line x1="-7.5" y1="-2" x2="-1.5" y2="-2.5" strokeWidth="0.7" opacity="0.65" />
      <line x1="-7.5" y1="1"  x2="-1.5" y2="0.5"  strokeWidth="0.7" opacity="0.65" />
      <line x1="-7.5" y1="4"  x2="-3.5" y2="3.5"  strokeWidth="0.7" opacity="0.65" />
      {/* Right text lines */}
      <line x1="1.5" y1="-5.5" x2="7.5" y2="-5" strokeWidth="0.7" opacity="0.65" />
      <line x1="1.5" y1="-2.5" x2="7.5" y2="-2" strokeWidth="0.7" opacity="0.65" />
      <line x1="1.5" y1="0.5"  x2="7.5" y2="1"  strokeWidth="0.7" opacity="0.65" />
      <line x1="3.5" y1="3.5"  x2="7.5" y2="4"  strokeWidth="0.7" opacity="0.65" />
    </g>
  );
}
