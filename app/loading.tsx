"use client";

import { motion, MotionConfig } from "framer-motion";

// Fixed star field — deterministic positions to avoid hydration mismatch
const STARS = [
  { left: 8,  top: 12, size: 3.6, delay: 0     },
  { left: 92, top: 8,  size: 2.4, delay: 0.5   },
  { left: 75, top: 22, size: 4.5, delay: 1.0   },
  { left: 15, top: 45, size: 2.7, delay: 0.3   },
  { left: 88, top: 55, size: 3.3, delay: 0.8   },
  { left: 5,  top: 78, size: 3.9, delay: 1.2   },
  { left: 95, top: 82, size: 2.1, delay: 0.6   },
  { left: 30, top: 88, size: 3.0, delay: 0.2   },
  { left: 65, top: 90, size: 2.4, delay: 1.5   },
  { left: 50, top: 5,  size: 4.2, delay: 0.9   },
  { left: 22, top: 18, size: 1.8, delay: 0.4   },
  { left: 80, top: 35, size: 3.0, delay: 1.1   },
  { left: 42, top: 72, size: 2.1, delay: 0.7   },
  { left: 60, top: 15, size: 3.3, delay: 1.3   },
  { left: 18, top: 65, size: 2.7, delay: 0.15  },
  { left: 72, top: 68, size: 3.6, delay: 0.95  },
];

// 8-pointed star polygon (cx=64, cy=64, outerR=52, innerR=22) in a 128×128 viewBox
const STAR_8 =
  "64,12 72.47,43.68 100.77,27.23 84.32,55.53 " +
  "116,64 84.32,72.47 100.77,100.77 72.47,84.32 " +
  "64,116 55.53,84.32 27.23,100.77 43.68,72.47 " +
  "12,64 43.68,55.53 27.23,27.23 55.53,43.68";

// 8 outer tip positions on the star (angle in degrees from 12 o'clock, CW)
const STAR_TIPS = [0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
  const rad = (deg - 90) * (Math.PI / 180);
  return {
    cx: +(64 + 52 * Math.cos(rad)).toFixed(2),
    cy: +(64 + 52 * Math.sin(rad)).toFixed(2),
  };
});

// UAE flag palette: red · green · white · night
const FLAG_STRIPES = [
  { color: "#EF3340", h: 32 },
  { color: "#009A44", h: 24 },
  { color: "#F5EED6", h: 24 },
  { color: "#1B2A4A", h: 32, bordered: true },
];

export default function Loading() {
  return (
    <MotionConfig reducedMotion="user">
      <div
        className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
        style={{ background: "linear-gradient(160deg, #0F1F3D 0%, #0A1628 65%, #07101E 100%)" }}
        role="status"
        aria-live="polite"
      >
        {/* ── Background: Islamic geometric lattice + radial vignette ────────── */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden>
          <defs>
            <pattern id="lp-lattice" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <line x1="0"  y1="30" x2="60" y2="30" stroke="#C8A951" strokeWidth="0.35" />
              <line x1="30" y1="0"  x2="30" y2="60" stroke="#C8A951" strokeWidth="0.35" />
              <line x1="0"  y1="0"  x2="60" y2="60" stroke="#C8A951" strokeWidth="0.25" />
              <line x1="60" y1="0"  x2="0"  y2="60" stroke="#C8A951" strokeWidth="0.25" />
              {/* Small 8-pointed star tile */}
              <polygon
                points="30,6 34,21.5 47,15 39.5,27 52,30 39.5,33 47,45 34,38.5 30,54 26,38.5 13,45 20.5,33 8,30 20.5,27 13,15 26,21.5"
                fill="none"
                stroke="#C8A951"
                strokeWidth="0.45"
              />
              <circle cx="30" cy="30" r="1.2" fill="#C8A951" fillOpacity="0.7" />
            </pattern>
            <radialGradient id="lp-vignette" cx="50%" cy="50%" r="70%">
              <stop offset="0%"   stopColor="#0A1628" stopOpacity="0"    />
              <stop offset="100%" stopColor="#07101E" stopOpacity="0.88" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#lp-lattice)" opacity="0.07" />
          <rect width="100%" height="100%" fill="url(#lp-vignette)" />
        </svg>

        {/* ── Twinkling star field ─────────────────────────────────────────── */}
        {STARS.map((s, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full pointer-events-none"
            style={{ left: `${s.left}%`, top: `${s.top}%`, width: s.size, height: s.size, background: "#F5EED6" }}
            animate={{ opacity: [0.12, 0.8, 0.12], scale: [1, 1.6, 1] }}
            transition={{ duration: 2.5 + s.delay * 0.6, delay: s.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}

        {/* ── Main content column ──────────────────────────────────────────── */}
        <div className="relative z-10 flex flex-col items-center" style={{ gap: "1.75rem" }}>

          {/* ── Tri-ring spinner ──────────────────────────────────────────── */}
          <div className="relative" style={{ width: 180, height: 180 }}>

            {/* Ring 1 – 12-dot clock face, slow clockwise */}
            <motion.div
              className="absolute inset-0"
              animate={{ rotate: 360 }}
              transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
            >
              <svg viewBox="0 0 180 180" className="w-full h-full">
                <defs>
                  <filter id="lp-dot-glow">
                    <feGaussianBlur stdDeviation="2" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>
                <circle cx="90" cy="90" r="84" fill="none" stroke="#C8A951" strokeWidth="0.5" strokeOpacity="0.2" />
                {Array.from({ length: 12 }).map((_, i) => {
                  const rad = (i * 30 - 90) * (Math.PI / 180);
                  const major = i % 3 === 0;
                  return (
                    <circle
                      key={i}
                      cx={90 + 84 * Math.cos(rad)}
                      cy={90 + 84 * Math.sin(rad)}
                      r={major ? 4 : 2}
                      fill={major ? "#F4D97A" : "#C8A951"}
                      opacity={major ? 1 : 0.5}
                      filter={major ? "url(#lp-dot-glow)" : undefined}
                    />
                  );
                })}
              </svg>
            </motion.div>

            {/* Ring 2 – 8-pointed star, slow counter-clockwise */}
            <motion.div
              className="absolute"
              style={{ inset: 22 }}
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            >
              <svg viewBox="0 0 128 128" className="w-full h-full">
                <defs>
                  <linearGradient id="lp-star-g" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%"   stopColor="#F4D97A" />
                    <stop offset="50%"  stopColor="#C8A951" />
                    <stop offset="100%" stopColor="#F4D97A" />
                  </linearGradient>
                  <filter id="lp-star-glow">
                    <feGaussianBlur stdDeviation="2.5" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>
                <polygon
                  points={STAR_8}
                  fill="rgba(200,169,81,0.07)"
                  stroke="url(#lp-star-g)"
                  strokeWidth="1.8"
                  filter="url(#lp-star-glow)"
                />
                {STAR_TIPS.map((p, i) => (
                  <circle key={i} cx={p.cx} cy={p.cy} r="2.5" fill="#F4D97A" opacity="0.9" />
                ))}
              </svg>
            </motion.div>

            {/* Ring 3 – fast scanning arc (CW), creates "lock-on" feel */}
            <motion.div
              className="absolute inset-0"
              animate={{ rotate: 360 }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "linear" }}
            >
              <svg viewBox="0 0 180 180" className="w-full h-full">
                {/* Quarter-arc from 12 o'clock → 3 o'clock */}
                <path
                  d="M 90 6 A 84 84 0 0 1 174 90"
                  fill="none"
                  stroke="#F4D97A"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeOpacity="0.8"
                />
              </svg>
            </motion.div>

            {/* Inner orb – pulsing gold gem */}
            <motion.div
              className="absolute"
              style={{ inset: 66 }}
              animate={{ scale: [0.93, 1.1, 0.93], opacity: [0.75, 1, 0.75] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg viewBox="0 0 48 48" className="w-full h-full">
                <defs>
                  <radialGradient id="lp-orb-g" cx="40%" cy="35%">
                    <stop offset="0%"   stopColor="#ffffff" stopOpacity="0.95" />
                    <stop offset="30%"  stopColor="#F4D97A" />
                    <stop offset="70%"  stopColor="#C8A951" />
                    <stop offset="100%" stopColor="rgba(200,169,81,0.05)" />
                  </radialGradient>
                  <filter id="lp-orb-glow">
                    <feGaussianBlur stdDeviation="5" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>
                <circle cx="24" cy="24" r="22" fill="url(#lp-orb-g)" filter="url(#lp-orb-glow)" />
                <circle cx="24" cy="24" r="7"  fill="#F4D97A" />
                <circle cx="21" cy="21" r="2.5" fill="white" opacity="0.7" />
              </svg>
            </motion.div>
          </div>

          {/* ── UAE flag accent bars ─────────────────────────────────────── */}
          <motion.div
            className="flex items-center gap-1.5"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {FLAG_STRIPES.map((s, i) => (
              <div
                key={i}
                style={{
                  width: 3,
                  height: s.h,
                  borderRadius: 2,
                  background: s.color,
                  border: s.bordered ? "1px solid rgba(200,169,81,0.45)" : undefined,
                }}
              />
            ))}
          </motion.div>

          {/* ── Arabic title + English sub ──────────────────────────────── */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <p
              className="font-arabic text-[2.4rem] leading-none"
              dir="rtl"
              style={{
                color: "#F4D97A",
                textShadow: "0 0 28px rgba(244,217,122,0.5), 0 2px 12px rgba(0,0,0,0.8)",
              }}
            >
              رحلة المعرفة
            </p>
            <p
              className="font-display text-[9px] tracking-[0.55em] uppercase mt-2"
              style={{ color: "rgba(245,238,214,0.45)" }}
            >
              Journey of Knowledge
            </p>
          </motion.div>

          {/* ── Gamification XP shimmer bar ──────────────────────────────── */}
          <motion.div
            className="flex flex-col items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <p
              className="font-display text-[8px] tracking-[0.4em] uppercase"
              style={{ color: "rgba(200,169,81,0.5)" }}
            >
              Loading Adventure
            </p>
            <div
              className="relative overflow-hidden rounded-full"
              style={{
                width: 216,
                height: 4,
                background: "rgba(200,169,81,0.12)",
                border: "1px solid rgba(200,169,81,0.18)",
              }}
            >
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{
                  width: "40%",
                  background:
                    "linear-gradient(90deg, transparent, #C8A951, #F4D97A, rgba(255,255,255,0.55), #F4D97A, #C8A951, transparent)",
                }}
                animate={{ x: ["-100%", "350%"] }}
                transition={{ duration: 1.7, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>

          {/* ── Bouncing dots ────────────────────────────────────────────── */}
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.82 }}
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="rounded-full"
                style={{ width: 5, height: 5, background: "#C8A951" }}
                animate={{ y: [0, -5, 0], opacity: [0.35, 1, 0.35] }}
                transition={{ duration: 0.9, delay: i * 0.18, repeat: Infinity, ease: "easeInOut" }}
              />
            ))}
          </motion.div>
        </div>

        <span className="sr-only">Loading — Rihlat Al Ma'rifah, please wait</span>
      </div>
    </MotionConfig>
  );
}
