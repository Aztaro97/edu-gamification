import { motion } from "framer-motion";
import React from "react";

interface GoldButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function GoldButton({ children, className = "", disabled, onClick, ...props }: GoldButtonProps) {
  return (
    <motion.button
      {...(props as object)}
      disabled={disabled}
      onClick={onClick}
      className={`relative group font-display font-bold tracking-[0.15em] text-sm px-6 py-2.5 rounded-lg overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4D97A]/80 disabled:cursor-not-allowed ${className}`}
      whileHover={!disabled ? { scale: 1.04, y: -1 } : {}}
      whileTap={!disabled ? { scale: 0.97 } : {}}
      transition={{ duration: 0.15 }}
      style={{
        background: disabled
          ? "linear-gradient(180deg, #2B3A55 0%, #1B2A4A 100%)"
          : "linear-gradient(180deg, #F4D97A 0%, #C8A951 100%)",
        color: disabled ? "#6B7A99" : "#0A1628",
        border: `1px solid ${disabled ? "#2B3A55" : "#F4D97A"}`,
        boxShadow: disabled
          ? "none"
          : "0 8px 24px -6px rgba(200,169,81,0.4), inset 0 1px 0 rgba(255,255,255,0.4)",
      }}
    >
      {!disabled && (
        <span
          aria-hidden
          className="absolute inset-0 pointer-events-none motion-reduce:hidden"
          style={{
            background: "linear-gradient(110deg, transparent 35%, rgba(255,255,255,0.6) 50%, transparent 65%)",
            animation: "game-shimmer 2.8s linear infinite",
          }}
        />
      )}
      <span className="relative flex items-center justify-center gap-2">
        {children}
      </span>
    </motion.button>
  );
}

interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function GlassPanel({ children, className = "", style, ...props }: GlassPanelProps) {
  return (
    <div
      {...props}
      className={`relative rounded-2xl overflow-hidden backdrop-blur-md ${className}`}
      style={{
        background: "rgba(10, 22, 40, 0.65)",
        border: "1px solid rgba(200,169,81,0.25)",
        boxShadow: "0 10px 40px -10px rgba(0,0,0,0.5)",
        ...style,
      }}
    >
      <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden>
        <rect width="100%" height="100%" fill="url(#lattice)" opacity="0.3" />
      </svg>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
