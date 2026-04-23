interface XpGemProps {
  value: number;
  size?: number;
}

/**
 * Hexagonal crystal XP display — references #gemGold from GeometryDefs.
 */
export function XpGem({ value, size = 14 }: XpGemProps) {
  const h = Math.round(size * 1.15);
  return (
    <div className="flex items-center gap-1.5">
      <svg
        width={size}
        height={h}
        viewBox="0 0 20 23"
        aria-hidden
        focusable="false"
      >
        {/* Outer hexagon */}
        <polygon
          points="10,1 18,5.5 18,17 10,22 2,17 2,5.5"
          fill="url(#gemGold)"
          stroke="#F4D97A"
          strokeWidth="1"
        />
        {/* Inner ring */}
        <polygon
          points="10,4.5 15.5,7.5 15.5,14.5 10,17.5 4.5,14.5 4.5,7.5"
          fill="none"
          stroke="#F4D97A"
          strokeWidth="0.5"
          opacity="0.4"
        />
        {/* Top-facet highlight */}
        <path
          d="M7,5.5 L10,4 L13,5.5 L10,7 Z"
          fill="white"
          fillOpacity="0.32"
          stroke="none"
        />
        {/* Vertical centre shine */}
        <line
          x1="10"
          y1="4"
          x2="10"
          y2="19"
          stroke="white"
          strokeWidth="0.4"
          opacity="0.14"
        />
      </svg>
      <span className="font-display font-bold text-[#F4D97A] tabular-nums">
        {value.toLocaleString()}
      </span>
      <span className="text-[9px] text-[#F5EED6]/70 uppercase tracking-wider">
        XP
      </span>
    </div>
  );
}
