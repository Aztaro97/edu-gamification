interface MashrabiyaBandProps {
  className?: string;
  opacity?: number;
  height?: number;
}

export function MashrabiyaBand({
  className,
  opacity = 0.5,
  height = 14,
}: MashrabiyaBandProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 600 14"
      preserveAspectRatio="none"
      style={{ width: "100%", height, opacity }}
      aria-hidden
      focusable="false"
    >
      <g fill="none" stroke="#C8A951" strokeWidth="0.8">
        {Array.from({ length: 30 }).map((_, i) => {
          const x = i * 20 + 10;
          return (
            <g key={i}>
              <polygon points={`${x},1 ${x + 4},7 ${x},13 ${x - 4},7`} />
              <circle cx={x} cy="7" r="1.2" />
            </g>
          );
        })}
        <line x1="0" y1="7" x2="600" y2="7" />
      </g>
    </svg>
  );
}
