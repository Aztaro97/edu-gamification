"use client";

import { useMemo } from "react";
import { NODE_POSITIONS } from "../data";
import type { Lesson } from "../types";
import { LessonIcon, LockIcon } from "./LessonIcon";

interface PathMapProps {
  lessons: readonly Lesson[];
  activeId: number;
  onSelect: (lesson: Lesson) => void;
}

export function PathMap({ lessons, activeId, onSelect }: PathMapProps) {
  const pathD = useMemo(() => {
    const pts = NODE_POSITIONS;
    if (pts.length === 0) return "";
    let d = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 1; i < pts.length; i++) {
      const prev = pts[i - 1];
      const cur = pts[i];
      const mx = (prev.x + cur.x) / 2;
      d += ` Q ${prev.x} ${cur.y}, ${mx} ${cur.y} T ${cur.x} ${cur.y}`;
    }
    return d;
  }, []);

  return (
    <div className="relative w-full">
      <svg
        viewBox="0 0 900 1100"
        className="w-full block"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Lesson journey map"
      >
        <rect x="0" y="0" width="900" height="1100" fill="url(#nightSky)" />
        <rect
          x="0"
          y="0"
          width="900"
          height="1100"
          fill="url(#mashrabiya)"
          opacity="0.35"
        />
        <circle cx="720" cy="170" r="200" fill="url(#sunGlow)" />
        <circle cx="720" cy="170" r="46" fill="#F4D97A" opacity="0.9" />
        <circle
          cx="720"
          cy="170"
          r="46"
          fill="none"
          stroke="#F4D97A"
          strokeOpacity="0.3"
          strokeWidth="1"
        >
          <animate
            attributeName="r"
            values="46;64;46"
            dur="6s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="stroke-opacity"
            values="0.4;0;0.4"
            dur="6s"
            repeatCount="indefinite"
          />
        </circle>

        {Array.from({ length: 40 }).map((_, i) => {
          const x = (i * 83) % 900;
          const y = (i * 47) % 420;
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={(i % 3) * 0.6 + 0.6}
              fill="#F5EED6"
              opacity={0.3 + (i % 4) * 0.15}
            />
          );
        })}

        <path
          d="M0 820 C 150 760, 300 830, 450 790 S 750 770, 900 830 L 900 1100 L 0 1100 Z"
          fill="#3B2514"
          opacity="0.9"
        />
        <path
          d="M0 900 C 200 840, 380 920, 560 870 S 800 860, 900 910 L 900 1100 L 0 1100 Z"
          fill="#1F140A"
          opacity="0.9"
        />
        <path
          d="M0 980 C 200 940, 400 1000, 600 960 S 850 950, 900 990 L 900 1100 L 0 1100 Z"
          fill="#0E0A06"
        />

        <g transform="translate(80 830)" opacity="0.85">
          <path
            d="M0 100 C -2 60, 0 30, 2 0"
            stroke="#0E0A06"
            strokeWidth="4"
            fill="none"
          />
          <path
            d="M2 0 C -20 -5, -40 0, -55 15"
            stroke="#0E0A06"
            strokeWidth="3"
            fill="none"
          />
          <path
            d="M2 0 C 20 -10, 40 -8, 55 10"
            stroke="#0E0A06"
            strokeWidth="3"
            fill="none"
          />
          <path
            d="M2 0 C -10 -25, -20 -40, -30 -50"
            stroke="#0E0A06"
            strokeWidth="3"
            fill="none"
          />
          <path
            d="M2 0 C 15 -25, 25 -40, 35 -55"
            stroke="#0E0A06"
            strokeWidth="3"
            fill="none"
          />
          <path
            d="M2 0 C -5 -30, 0 -55, 5 -70"
            stroke="#0E0A06"
            strokeWidth="3"
            fill="none"
          />
        </g>
        <g transform="translate(600 820)" opacity="0.85">
          <path d="M0 10 L 60 10 L 54 22 L 6 22 Z" fill="#0E0A06" />
          <path d="M30 10 L 30 -40" stroke="#0E0A06" strokeWidth="2" />
          <path d="M30 -40 L 58 8 L 30 8 Z" fill="#0E0A06" />
        </g>

        <path
          d={pathD}
          stroke="#C8A951"
          strokeWidth="3"
          fill="none"
          strokeDasharray="2 10"
          opacity="0.85"
        />
        <path
          d={pathD}
          stroke="#C8A951"
          strokeWidth="10"
          fill="none"
          opacity="0.08"
        />

        {NODE_POSITIONS.slice(0, -1).map((p, i) => {
          const n = NODE_POSITIONS[i + 1];
          const mx = (p.x + n.x) / 2;
          const my = (p.y + n.y) / 2;
          return (
            <polygon
              key={i}
              points={`${mx},${my - 4} ${mx + 4},${my} ${mx},${my + 4} ${mx - 4},${my}`}
              fill="#C8A951"
              opacity="0.7"
            />
          );
        })}

        {lessons.map((lesson, i) => {
          const pos = NODE_POSITIONS[i];
          if (!pos) return null;
          return (
            <PathNode
              key={lesson.id}
              lesson={lesson}
              x={pos.x}
              y={pos.y}
              index={i}
              isActive={activeId === lesson.id}
              onSelect={() => onSelect(lesson)}
            />
          );
        })}

        <g transform="translate(560 230)" opacity="0.9">
          <path
            d="M0 0 C -14 -6, -26 -2, -36 6 M0 0 C 14 -6, 26 -2, 36 6 M-4 2 L 4 2 L 0 10 Z"
            fill="#F4D97A"
            stroke="#C8A951"
            strokeWidth="1"
          />
        </g>
      </svg>
    </div>
  );
}

interface PathNodeProps {
  lesson: Lesson;
  x: number;
  y: number;
  index: number;
  isActive: boolean;
  onSelect: () => void;
}

const NODE_COLORS = {
  completed: "#009A44",
  active: "#EF3340",
  unlocked: "#C8A951",
  locked: "#2B3A55",
} as const;

function PathNode({ lesson, x, y, index, isActive, onSelect }: PathNodeProps) {
  const { state } = lesson;
  const size = 68;
  const color = NODE_COLORS[state];
  const fillOpacity = state === "locked" ? 0.25 : 1;
  const r = size / 2;
  const disabled = state === "locked";

  const starPts = Array.from({ length: 16 })
    .map((_, k) => {
      const a = (k * Math.PI) / 8 - Math.PI / 2;
      const rr = k % 2 === 0 ? r : r * 0.7;
      return `${x + rr * Math.cos(a)},${y + rr * Math.sin(a)}`;
    })
    .join(" ");

  const handleClick = () => {
    if (!disabled) onSelect();
  };

  const handleKeyDown = (e: React.KeyboardEvent<SVGGElement>) => {
    if (disabled) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect();
    }
  };

  const iconColor =
    state === "completed" || state === "active" ? "#F5EED6" : "#F4D97A";

  return (
    <g
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-label={`Lesson ${lesson.id}: ${lesson.title}${
        disabled ? " (locked)" : ""
      }`}
      aria-pressed={isActive}
      aria-disabled={disabled}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      style={{ cursor: disabled ? "not-allowed" : "pointer" }}
      className="outline-none focus-visible:[&>polygon]:stroke-[3]"
    >
      {isActive && (
        <circle cx={x} cy={y} r={r + 22} fill="#EF3340" opacity="0.18">
          <animate
            attributeName="r"
            values={`${r + 18};${r + 30};${r + 18}`}
            dur="2.4s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.25;0.08;0.25"
            dur="2.4s"
            repeatCount="indefinite"
          />
        </circle>
      )}
      {disabled && (
        <circle
          cx={x}
          cy={y}
          r={r + 6}
          fill="none"
          stroke="#2B3A55"
          strokeWidth="1"
          opacity="0.6"
        >
          <animate
            attributeName="r"
            values={`${r + 4};${r + 10};${r + 4}`}
            dur="3.6s"
            repeatCount="indefinite"
            begin={`${index * 0.3}s`}
          />
        </circle>
      )}

      <polygon
        points={starPts}
        fill={color}
        fillOpacity={fillOpacity}
        stroke={color}
        strokeWidth="2"
      />
      <polygon
        points={starPts}
        fill="url(#lattice)"
        opacity={disabled ? 0.1 : 0.3}
      />
      <circle
        cx={x}
        cy={y}
        r={r * 0.72}
        fill="#0A1628"
        stroke={color}
        strokeWidth="1.5"
        opacity={disabled ? 0.6 : 1}
      />

      <g
        transform={`translate(${x - 18} ${y - 18})`}
        opacity={disabled ? 0.4 : 1}
      >
        {disabled ? (
          <LockIcon color="#6B7A99" />
        ) : (
          <LessonIcon name={lesson.icon} size={36} color={iconColor} />
        )}
      </g>

      {state === "completed" && (
        <g transform={`translate(${x + r - 10} ${y - r + 6})`}>
          <circle r="12" fill="#C8A951" stroke="#F4D97A" strokeWidth="1.5" />
          <path
            d="M-5 0 L -1 4 L 5 -4"
            stroke="#0A1628"
            strokeWidth="2.4"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <animate
              attributeName="stroke-dasharray"
              from="0 20"
              to="20 0"
              dur="0.8s"
              fill="freeze"
            />
          </path>
        </g>
      )}

      <g transform={`translate(${x - 26} ${y + r + 6})`}>
        <rect
          x="0"
          y="0"
          width="52"
          height="18"
          rx="9"
          fill="#0A1628"
          stroke="#C8A951"
          strokeWidth="1"
        />
        <text
          x="26"
          y="13"
          textAnchor="middle"
          fontSize="10"
          fontWeight="700"
          fill="#C8A951"
          fontFamily="Tajawal, sans-serif"
        >
          +{lesson.xp} XP
        </text>
      </g>

      <g transform={`translate(${x - 18} ${y - r - 14})`}>
        {Array.from({ length: 3 }).map((_, k) => (
          <polygon
            key={k}
            transform={`translate(${k * 14} 0)`}
            points="6,0 7.3,4 11.5,4.2 8.1,6.8 9.3,11 6,8.6 2.7,11 3.9,6.8 0.5,4.2 4.7,4"
            fill={k < lesson.difficulty ? "#C8A951" : "none"}
            stroke="#C8A951"
            strokeWidth="0.8"
          />
        ))}
      </g>

      <circle
        cx={x - r + 6}
        cy={y - r + 6}
        r="10"
        fill="#0A1628"
        stroke={color}
        strokeWidth="1.5"
      />
      <text
        x={x - r + 6}
        y={y - r + 10}
        textAnchor="middle"
        fontSize="11"
        fontWeight="700"
        fill={color}
        fontFamily="Cinzel, serif"
      >
        {index + 1}
      </text>
    </g>
  );
}
