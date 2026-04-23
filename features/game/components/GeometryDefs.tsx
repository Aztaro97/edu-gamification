export function GeometryDefs() {
  return (
    <svg
      width="0"
      height="0"
      style={{ position: "absolute" }}
      aria-hidden
      focusable="false"
    >
      <defs>
        {/* ── Patterns ── */}
        <pattern
          id="mashrabiya"
          x="0"
          y="0"
          width="60"
          height="60"
          patternUnits="userSpaceOnUse"
        >
          <g fill="none" stroke="#C8A951" strokeWidth="0.7" opacity="0.35">
            <polygon points="30,4 36,18 52,20 40,30 44,46 30,38 16,46 20,30 8,20 24,18" />
            <circle cx="30" cy="30" r="4" />
            <path d="M0 30 H60 M30 0 V60" />
            <path d="M0 0 L60 60 M60 0 L0 60" />
          </g>
        </pattern>

        <pattern
          id="lattice"
          x="0"
          y="0"
          width="24"
          height="24"
          patternUnits="userSpaceOnUse"
        >
          <g fill="none" stroke="#C8A951" strokeWidth="0.5" opacity="0.18">
            <path d="M12 0 L24 12 L12 24 L0 12 Z" />
            <circle cx="12" cy="12" r="2" />
          </g>
        </pattern>

        {/* ── Linear gradients ── */}
        <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F4D97A" />
          <stop offset="50%" stopColor="#C8A951" />
          <stop offset="100%" stopColor="#8A6A1E" />
        </linearGradient>

        <linearGradient id="redGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FF5E6B" />
          <stop offset="100%" stopColor="#B21825" />
        </linearGradient>

        <linearGradient id="greenGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2CC46A" />
          <stop offset="100%" stopColor="#006A2E" />
        </linearGradient>

        <linearGradient id="nightSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0A1628" />
          <stop offset="55%" stopColor="#1B2A4A" />
          <stop offset="100%" stopColor="#3B2514" />
        </linearGradient>

        {/* ── Radial gradients ── */}
        <radialGradient id="sunGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#F4D97A" stopOpacity="0.9" />
          <stop offset="60%" stopColor="#C8A951" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#C8A951" stopOpacity="0" />
        </radialGradient>

        {/* XP gem — top-left facet highlight */}
        <radialGradient id="gemGold" cx="0.3" cy="0.25" r="0.65">
          <stop offset="0%" stopColor="#FFF8DC" />
          <stop offset="40%" stopColor="#F4D97A" />
          <stop offset="100%" stopColor="#7C5E24" />
        </radialGradient>

        {/* Avatar tone radials — radiate from top-left */}
        <radialGradient id="avatarRed" cx="0.3" cy="0.25" r="0.75">
          <stop offset="0%" stopColor="#FF9097" />
          <stop offset="100%" stopColor="#B21825" />
        </radialGradient>

        <radialGradient id="avatarGreen" cx="0.3" cy="0.25" r="0.75">
          <stop offset="0%" stopColor="#2CC46A" />
          <stop offset="100%" stopColor="#006A2E" />
        </radialGradient>

        <radialGradient id="avatarGold" cx="0.3" cy="0.25" r="0.75">
          <stop offset="0%" stopColor="#F4D97A" />
          <stop offset="100%" stopColor="#8A6A1E" />
        </radialGradient>

        {/* ── Filters ── */}
        <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  );
}
