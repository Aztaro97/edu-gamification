interface StarsProps {
  count: number;
  earned?: number;
  size?: number;
}

export function Stars({ count, earned = count, size = 10 }: StarsProps) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg
          key={i}
          width={size * 1.6}
          height={size * 1.6}
          viewBox="0 0 20 20"
          aria-hidden
          focusable="false"
        >
          <polygon
            points="10,2 12.2,7.6 18,8.2 13.6,12.1 15,18 10,14.8 5,18 6.4,12.1 2,8.2 7.8,7.6"
            fill={i < earned ? "#C8A951" : "none"}
            stroke="#C8A951"
            strokeWidth="1.2"
          />
        </svg>
      ))}
    </div>
  );
}
