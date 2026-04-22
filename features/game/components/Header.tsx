"use client";

import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { authClient } from "@/lib/auth-client";
import { useLocale, useTranslations } from "next-intl";
import { useGame } from "../GameContext";
import { MashrabiyaBand } from "./MashrabiyaBand";

type HeaderIconName = "book" | "map" | "trophy" | "user" | "sun";

export function Header() {
  const pathname = usePathname();
  const { xp } = useGame();
  const t = useTranslations("header");
  const locale = useLocale();
  const router = useRouter();

  function switchLocale() {
    const next = locale === "en" ? "ar" : "en";
    router.replace(pathname, { locale: next });
  }

  async function handleSignOut() {
    await authClient.signOut();
    router.push("/login");
  }

  return (
    <header className="relative">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 py-4">
        <div className="flex items-start sm:items-center gap-3">
         <Link href="/" >
          <div className="relative shrink-0 w-[44px] h-[44px] sm:w-[52px] sm:h-[52px]">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 52 52"
              aria-hidden
              focusable="false"
            >
              <defs>
                <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#F4D97A" />
                  <stop offset="100%" stopColor="#C8A951" />
                </linearGradient>
              </defs>
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
         </Link>
          <div className="min-w-0">
            <div className="font-display text-[8px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.3em] uppercase text-[#C8A951] truncate">
              {t("ministry")}
            </div>
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mt-1 sm:mt-0">
              <h1
                className={`font-bold text-white ${
                  locale === "ar"
                    ? "font-arabic text-lg sm:text-xl"
                    : "font-display text-lg sm:text-xl"
                }`}
                dir={locale === "ar" ? "rtl" : undefined}
              >
                {t("title")}
              </h1>
            </div>
            <div className="text-[10px] sm:text-[11px] text-[#F5EED6]/60 truncate mt-0.5 sm:mt-0">
              {t("subtitle")}
            </div>
          </div>
        </div>

        <nav
          aria-label="Primary"
          className="flex items-center gap-2 flex-wrap"
        >
          <HeaderPill
            href="/"
            icon="map"
            label={t("nav.journey")}
            active={pathname === "/"}
            locale={locale}
          />
          <HeaderPill
            href="/profile"
            icon="user"
            label={t("nav.profile")}
            active={pathname === "/profile"}
            locale={locale}
          />
          <HeaderPill
            href="/rewards"
            icon="trophy"
            label={t("nav.rewards")}
            active={pathname === "/rewards"}
            locale={locale}
          />
          <HeaderPill
            href="/daily"
            icon="sun"
            label={t("nav.daily")}
            active={pathname === "/daily"}
            locale={locale}
          />

          {/* XP badge */}
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-full"
            style={{
              background:
                "linear-gradient(90deg, rgba(244,217,122,0.18), rgba(239,51,64,0.12))",
              border: "1px solid rgba(244,217,122,0.5)",
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              aria-hidden
              focusable="false"
            >
              <polygon
                points="7,1 9,5 13,5 10,8 11,13 7,10 3,13 4,8 1,5 5,5"
                fill="#F4D97A"
              />
            </svg>
            <span className="font-display text-[#F4D97A] font-bold tabular-nums text-xs">
              {xp.toLocaleString()}
            </span>
            <span className="text-[9px] text-[#F5EED6]/70 uppercase tracking-wider">
              XP
            </span>
          </div>

          {/* Language toggle */}
          <button
            onClick={switchLocale}
            aria-label="Switch language"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs cursor-pointer transition-all duration-200 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4D97A]/60"
            style={{
              background: "rgba(200,169,81,0.12)",
              border: "1px solid rgba(200,169,81,0.4)",
              color: "#F4D97A",
            }}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              aria-hidden
            >
              <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2" />
              <path
                d="M6 1 C4.5 3 4.5 9 6 11 M6 1 C7.5 3 7.5 9 6 11"
                stroke="currentColor"
                strokeWidth="1.2"
              />
              <path d="M1 6 H11" stroke="currentColor" strokeWidth="1.2" />
            </svg>
            <span
              className={locale === "ar" ? "font-sans" : "font-arabic"}
            >
              {t("langToggle")}
            </span>
          </button>

          {/* Logout */}
          <button
            onClick={handleSignOut}
            aria-label="Sign out"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs cursor-pointer transition-all duration-200 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400/60"
            style={{
              background: "rgba(255,94,107,0.08)",
              border: "1px solid rgba(255,94,107,0.3)",
              color: "#FF5E6B",
            }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M4.5 6H11M8.5 3.5L11 6l-2.5 2.5" />
              <path d="M7 1.5H2A.5.5 0 0 0 1.5 2v8a.5.5 0 0 0 .5.5h5" />
            </svg>
            <span className={locale === "ar" ? "font-arabic tracking-normal" : "font-display tracking-wider uppercase"}>
              {t("signOut")}
            </span>
          </button>
        </nav>
      </div>
      <MashrabiyaBand opacity={0.5} />
    </header>
  );
}

interface HeaderPillProps {
  href: string;
  icon: HeaderIconName;
  label: string;
  active?: boolean;
  locale: string;
}

function HeaderPill({ href, icon, label, active = false, locale }: HeaderPillProps) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs cursor-pointer transition-colors duration-200 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4D97A]/60 whitespace-nowrap"
      style={{
        background: active ? "rgba(244,217,122,0.12)" : "transparent",
        border: `1px solid ${
          active ? "rgba(244,217,122,0.5)" : "rgba(200,169,81,0.2)"
        }`,
        color: active ? "#F4D97A" : "#F5EED6",
      }}
    >
      <HeaderIcon name={icon} />
      <span
        className={locale === "ar" ? "font-arabic tracking-normal" : "font-display tracking-wider uppercase"}
        dir={locale === "ar" ? "rtl" : undefined}
      >
        {label}
      </span>
    </Link>
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
  if (name === "user") {
    return (
      <svg {...p}>
        <path d="M7 7 C 8.65685 7 10 5.65685 10 4 C 10 2.34315 8.65685 1 7 1 C 5.34315 1 4 2.34315 4 4 C 4 5.65685 5.34315 7 7 7 Z" />
        <path d="M1 13 C 1 10.5 4 9 7 9 C 10 9 13 10.5 13 13" />
      </svg>
    );
  }
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
  if (name === "sun") {
    return (
      <svg {...p}>
        <circle cx="7" cy="7" r="2.5" />
        <path d="M7 1 V2 M7 12 V13 M1 7 H2 M12 7 H13 M2.5 2.5 L3.5 3.5 M10.5 10.5 L11.5 11.5 M2.5 11.5 L3.5 10.5 M10.5 3.5 L11.5 2.5" />
      </svg>
    );
  }
  return (
    <svg {...p}>
      <path d="M4 2 H10 V6 C10 8, 8 9, 7 9 C 6 9, 4 8, 4 6 Z M4 4 H2 V5 C2 6, 3 7, 4 7 M10 4 H12 V5 C12 6, 11 7, 10 7 M7 9 V11 M5 12 H9" />
    </svg>
  );
}
