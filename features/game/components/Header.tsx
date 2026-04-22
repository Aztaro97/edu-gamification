import { MashrabiyaBand } from "./MashrabiyaBand";

type HeaderIconName = "book" | "map" | "trophy";

export function Header() {
  return (
    <header className="relative">
      <div className="flex items-center justify-between gap-4 py-4 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="relative" style={{ width: 52, height: 52 }}>
            <svg
              width="52"
              height="52"
              viewBox="0 0 52 52"
              aria-hidden
              focusable="false"
            >
              <polygon
                points="26,2 32,8 40,6 42,14 50,20 46,28 50,36 42,40 40,48 32,46 26,50 20,46 12,48 10,40 2,36 6,28 2,20 10,14 12,6 20,8"
                fill="url(#goldGrad)"
                stroke="#F4D97A"
                strokeWidth="1"
              />
              <circle
                cx="26"
                cy="26"
                r="14"
                fill="#0A1628"
                stroke="#F4D97A"
                strokeWidth="1"
              />
              <g transform="translate(26 26)">
                <path
                  d="M-8 -2 C -4 -6, 0 -6, 0 -2 M0 -2 C 0 -6, 4 -6, 8 -2"
                  stroke="#F4D97A"
                  strokeWidth="1.4"
                  fill="none"
                  strokeLinecap="round"
                />
                <path d="M-2 -1 L 0 4 L 2 -1 Z" fill="#F4D97A" />
              </g>
            </svg>
          </div>
          <div>
            <div className="font-display text-[10px] tracking-[0.3em] uppercase text-[#C8A951]">
              Ministry of Education · UAE
            </div>
            <div className="flex items-baseline gap-3">
              <h1 className="font-display text-xl font-bold text-white">
                Rihlat Al Ma&apos;rifah
              </h1>
              <span className="font-arabic text-xl text-[#F4D97A]" dir="rtl">
                رحلة المعرفة
              </span>
            </div>
            <div className="text-[11px] text-[#F5EED6]/60">
              Journey of Knowledge · Grade 4 · The Human Body
            </div>
          </div>
        </div>
        <nav aria-label="Primary" className="flex items-center gap-2">
          <HeaderPill icon="book" label="Curriculum" labelAr="المنهج" />
          <HeaderPill icon="map" label="Map" labelAr="الخريطة" active />
          <HeaderPill icon="trophy" label="Rewards" labelAr="الجوائز" />
        </nav>
      </div>
      <MashrabiyaBand opacity={0.5} />
    </header>
  );
}

interface HeaderPillProps {
  icon: HeaderIconName;
  label: string;
  labelAr: string;
  active?: boolean;
}

function HeaderPill({ icon, label, labelAr, active = false }: HeaderPillProps) {
  return (
    <button
      type="button"
      aria-pressed={active}
      className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs cursor-pointer transition-colors duration-200 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4D97A]/60"
      style={{
        background: active ? "rgba(244,217,122,0.12)" : "transparent",
        border: `1px solid ${
          active ? "rgba(244,217,122,0.5)" : "rgba(200,169,81,0.2)"
        }`,
        color: active ? "#F4D97A" : "#F5EED6",
      }}
    >
      <HeaderIcon name={icon} />
      <span className="font-display tracking-wider uppercase">{label}</span>
      <span className="font-arabic opacity-70" dir="rtl">
        {labelAr}
      </span>
    </button>
  );
}

function HeaderIcon({ name }: { name: HeaderIconName }) {
  const p = {
    width: 14,
    height: 14,
    viewBox: "0 0 14 14",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    focusable: false as const,
  };
  if (name === "book") {
    return (
      <svg {...p}>
        <path d="M2 2 H6 C7 2, 7 3, 7 3 V12 C7 11, 6 11, 6 11 H2 Z M12 2 H8 C7 2, 7 3, 7 3 V12 C7 11, 8 11, 8 11 H12 Z" />
      </svg>
    );
  }
  if (name === "map") {
    return (
      <svg {...p}>
        <path d="M1 3 L5 2 L9 4 L13 3 V11 L9 12 L5 10 L1 11 Z M5 2 V10 M9 4 V12" />
      </svg>
    );
  }
  return (
    <svg {...p}>
      <path d="M4 2 H10 V6 C10 8, 8 9, 7 9 C 6 9, 4 8, 4 6 Z M4 4 H2 V5 C2 6, 3 7, 4 7 M10 4 H12 V5 C12 6, 11 7, 10 7 M7 9 V11 M5 12 H9" />
    </svg>
  );
}
