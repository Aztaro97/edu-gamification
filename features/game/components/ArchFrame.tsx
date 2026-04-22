import type { ReactNode } from "react";

interface ArchFrameProps {
  children: ReactNode;
}

export function ArchFrame({ children }: ArchFrameProps) {
  return (
    <div
      className="relative rounded-t-[36px] rounded-b-xl p-3"
      style={{
        background:
          "linear-gradient(180deg, rgba(200,169,81,0.10) 0%, rgba(200,169,81,0.02) 100%)",
        border: "1px solid rgba(200,169,81,0.25)",
      }}
    >
      <svg
        width="100%"
        height="8"
        viewBox="0 0 300 8"
        preserveAspectRatio="none"
        className="absolute -top-[1px] left-0"
        aria-hidden
        focusable="false"
      >
        <path
          d="M0 8 C 100 -6, 200 -6, 300 8"
          fill="none"
          stroke="#C8A951"
          strokeWidth="1"
          opacity="0.6"
        />
      </svg>
      {children}
    </div>
  );
}
