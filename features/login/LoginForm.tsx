"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { authClient } from "@/lib/auth-client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface LoginFormProps {
  locale: string;
}

export function LoginForm({ locale }: LoginFormProps) {
  const t = useTranslations("auth");
  const router = useRouter();
  const isAr = locale === "ar";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error: signInError } = await authClient.signIn.email({
      email,
      password,
    });

    if (signInError) {
      setError(t("invalidCredentials"));
      setLoading(false);
      return;
    }

    router.push("/");
    router.refresh();
  }

  return (
    <div
      className="rounded-xl px-8 py-10 flex flex-col gap-6"
      style={{
        background: "rgba(10, 22, 40, 0.85)",
        border: "1px solid rgba(200, 169, 81, 0.3)",
        boxShadow:
          "0 0 40px rgba(200,169,81,0.08), inset 0 1px 0 rgba(200,169,81,0.1)",
      }}
    >
      {/* Logo */}
      <div className="flex flex-col items-center gap-3">
        <svg
          width="52"
          height="52"
          viewBox="0 0 52 52"
          aria-hidden
          focusable="false"
        >
          <defs>
            <linearGradient id="lgLogin" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#F4D97A" />
              <stop offset="100%" stopColor="#C8A951" />
            </linearGradient>
          </defs>
          <polygon
            points="26,2 32,8 40,6 42,14 50,20 46,28 50,36 42,40 40,48 32,46 26,50 20,46 12,48 10,40 2,36 6,28 2,20 10,14 12,6 20,8"
            fill="url(#lgLogin)"
            stroke="#F4D97A"
            strokeWidth="1"
          />
          <circle cx="26" cy="26" r="14" fill="#0A1628" stroke="#F4D97A" strokeWidth="1" />
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

        <div className="text-center">
          <p
            className="text-[9px] tracking-[0.3em] uppercase"
            style={{ color: "#C8A951" }}
          >
            {t("ministry")}
          </p>
          <h1
            className={cn(
              "mt-1 font-bold text-white text-xl leading-tight",
              isAr ? "font-arabic" : "font-display"
            )}
          >
            {t("title")}
          </h1>
          <p className="mt-1 text-[11px]" style={{ color: "rgba(245,238,214,0.5)" }}>
            {t("subtitle")}
          </p>
        </div>
      </div>

      {/* Divider */}
      <div
        className="h-px w-full"
        style={{ background: "rgba(200,169,81,0.2)" }}
      />

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        <div className="flex flex-col gap-1.5">
          <Label
            htmlFor="email"
            className={cn(
              "text-xs uppercase tracking-wider",
              isAr ? "font-arabic tracking-normal" : "font-display"
            )}
            style={{ color: "rgba(245,238,214,0.7)" }}
          >
            {t("emailLabel")}
          </Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("emailPlaceholder")}
            disabled={loading}
            className="bg-[#0A1628] border-[rgba(200,169,81,0.3)] text-[#F5EED6] placeholder:text-[#F5EED6]/30 focus-visible:ring-[#C8A951]/50 focus-visible:border-[#C8A951]/60 h-11"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label
            htmlFor="password"
            className={cn(
              "text-xs uppercase tracking-wider",
              isAr ? "font-arabic tracking-normal" : "font-display"
            )}
            style={{ color: "rgba(245,238,214,0.7)" }}
          >
            {t("passwordLabel")}
          </Label>
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t("passwordPlaceholder")}
            disabled={loading}
            className="bg-[#0A1628] border-[rgba(200,169,81,0.3)] text-[#F5EED6] placeholder:text-[#F5EED6]/30 focus-visible:ring-[#C8A951]/50 focus-visible:border-[#C8A951]/60 h-11"
          />
        </div>

        {error && (
          <p
            className="text-xs text-center px-3 py-2 rounded-md"
            style={{
              color: "#FF5E6B",
              background: "rgba(255,94,107,0.08)",
              border: "1px solid rgba(255,94,107,0.2)",
            }}
            role="alert"
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading || !email || !password}
          className={cn(
            "mt-1 h-11 w-full rounded-lg font-bold text-sm tracking-widest uppercase transition-all duration-200",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4D97A]/60",
            isAr ? "font-arabic tracking-normal" : "font-display"
          )}
          style={{
            background:
              "linear-gradient(135deg, #F4D97A 0%, #C8A951 50%, #8A6A1E 100%)",
            color: "#0A1628",
            boxShadow: "0 2px 16px rgba(200,169,81,0.3)",
          }}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="animate-spin"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                aria-hidden
              >
                <circle
                  cx="7"
                  cy="7"
                  r="5.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeDasharray="20 14"
                />
              </svg>
              {t("signingIn")}
            </span>
          ) : (
            t("signIn")
          )}
        </button>
      </form>
    </div>
  );
}
