"use client";

import {
  Joyride,
  STATUS,
  type EventData,
  type Step,
  type TooltipRenderProps,
} from "react-joyride";
import { useLocale, useTranslations } from "next-intl";
import { useMemo } from "react";

/* ─── Custom Tooltip ──────────────────────────────────────────────────────── */

function TourTooltip({
  backProps,
  index,
  isLastStep,
  primaryProps,
  skipProps,
  step,
  size,
  tooltipProps,
}: TooltipRenderProps) {
  const t = useTranslations("tour");
  const locale = useLocale();
  const isAr = locale === "ar";

  const fontDisplay = isAr ? "'Tajawal', sans-serif" : "'Cinzel', serif";
  const fontBody = isAr ? "'Tajawal', sans-serif" : "inherit";
  const letterSpacing = isAr ? "normal" : "0.12em";
  const textTransform: React.CSSProperties["textTransform"] = isAr ? "none" : "uppercase";

  return (
    <div
      {...tooltipProps}
      dir={isAr ? "rtl" : "ltr"}
      style={{
        background: "linear-gradient(135deg, #1B2A4A 0%, #0A1628 100%)",
        border: "1px solid rgba(244,217,122,0.5)",
        borderRadius: 16,
        boxShadow:
          "0 0 60px rgba(200,169,81,0.2), 0 20px 40px rgba(0,0,0,0.6)",
        width: 320,
        padding: "22px 24px 20px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Corner accent */}
      <span
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          right: isAr ? "auto" : 0,
          left: isAr ? 0 : "auto",
          width: 44,
          height: 44,
          borderTopRightRadius: isAr ? 0 : 16,
          borderTopLeftRadius: isAr ? 16 : 0,
          background: "rgba(244,217,122,0.05)",
          borderBottom: "1px solid rgba(244,217,122,0.12)",
          borderLeft: isAr ? "none" : "1px solid rgba(244,217,122,0.12)",
          borderRight: isAr ? "1px solid rgba(244,217,122,0.12)" : "none",
        }}
      />

      {/* Step kicker */}
      <p
        style={{
          margin: "0 0 6px",
          fontFamily: "'Cinzel', serif",
          fontSize: 9,
          letterSpacing: "0.3em",
          color: "#C8A951",
          textTransform: "uppercase",
        }}
      >
        {index + 1} · {size}
      </p>

      {/* Title */}
      {step.title && (
        <h2
          style={{
            margin: "0 0 10px",
            fontFamily: fontDisplay,
            fontSize: 17,
            fontWeight: 700,
            color: "#F4D97A",
            lineHeight: 1.3,
          }}
        >
          {step.title}
        </h2>
      )}

      {/* Body */}
      <p
        style={{
          margin: "0 0 18px",
          fontSize: 13,
          color: "rgba(245,238,214,0.82)",
          lineHeight: 1.65,
          fontFamily: fontBody,
        }}
      >
        {step.content}
      </p>

      {/* Progress dots */}
      <div
        style={{
          display: "flex",
          gap: 4,
          marginBottom: 18,
          justifyContent: isAr ? "flex-end" : "flex-start",
        }}
      >
        {Array.from({ length: size }).map((_, i) => (
          <span
            key={i}
            style={{
              display: "block",
              width: i === index ? 20 : 6,
              height: 6,
              borderRadius: 3,
              background:
                i === index
                  ? "linear-gradient(90deg, #F4D97A, #C8A951)"
                  : "rgba(244,217,122,0.18)",
              transition: "width 0.3s ease",
            }}
          />
        ))}
      </div>

      {/* Action row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: isAr ? "row-reverse" : "row",
        }}
      >
        {/* Skip */}
        {!isLastStep ? (
          <button
            {...skipProps}
            style={{
              background: "transparent",
              border: "none",
              padding: 0,
              color: "rgba(200,169,81,0.45)",
              fontSize: 10,
              cursor: "pointer",
              fontFamily: fontDisplay,
              letterSpacing,
              textTransform,
            }}
          >
            {t("skip")}
          </button>
        ) : (
          <span />
        )}

        <div style={{ display: "flex", gap: 8 }}>
          {/* Back */}
          {index > 0 && (
            <button
              {...backProps}
              style={{
                background: "transparent",
                border: "1px solid rgba(200,169,81,0.35)",
                borderRadius: 8,
                padding: "7px 14px",
                color: "#C8A951",
                fontSize: 10,
                cursor: "pointer",
                fontFamily: fontDisplay,
                letterSpacing,
                textTransform,
              }}
            >
              {t("back")}
            </button>
          )}

          {/* Next / Finish */}
          <button
            {...primaryProps}
            style={{
              background: "linear-gradient(180deg, #F4D97A 0%, #C8A951 100%)",
              border: "none",
              borderRadius: 8,
              padding: "7px 20px",
              color: "#0A1628",
              fontSize: 10,
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: fontDisplay,
              letterSpacing,
              textTransform,
            }}
          >
            {isLastStep ? t("finish") : t("next")}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── AppTour ─────────────────────────────────────────────────────────────── */

interface AppTourProps {
  run: boolean;
  onFinish: () => void;
}

export function AppTour({ run, onFinish }: AppTourProps) {
  const t = useTranslations("tour");

  const steps = useMemo<Step[]>(
    () => [
      {
        target: "body",
        placement: "center",
        skipBeacon: true,
        title: t("step0.title"),
        content: t("step0.content"),
      },
      {
        target: "#tour-ribbon",
        placement: "bottom",
        skipBeacon: true,
        title: t("step1.title"),
        content: t("step1.content"),
      },
      {
        target: "#tour-player",
        placement: "auto",
        skipBeacon: true,
        title: t("step2.title"),
        content: t("step2.content"),
      },
      {
        target: "#tour-map",
        placement: "auto",
        skipBeacon: true,
        title: t("step3.title"),
        content: t("step3.content"),
      },
      {
        target: "#tour-daily",
        placement: "auto",
        skipBeacon: true,
        title: t("step4.title"),
        content: t("step4.content"),
      },
      {
        target: "#tour-lesson",
        placement: "auto",
        skipBeacon: true,
        title: t("step5.title"),
        content: t("step5.content"),
      },
      {
        target: "#tour-leaderboard",
        placement: "auto",
        skipBeacon: true,
        title: t("step6.title"),
        content: t("step6.content"),
      },
    ],
    [t],
  );

  const handleEvent = (data: EventData) => {
    if (data.status === STATUS.FINISHED || data.status === STATUS.SKIPPED) {
      onFinish();
    }
  };

  return (
    <Joyride
      run={run}
      steps={steps}
      continuous
      scrollToFirstStep
      onEvent={handleEvent}
      tooltipComponent={TourTooltip}
      locale={{
        back: t("back"),
        close: t("finish"),
        last: t("finish"),
        next: t("next"),
        skip: t("skip"),
      }}
      options={{
        buttons: ["back", "primary", "skip"],
        overlayClickAction: false,
        overlayColor: "rgba(5,12,24,0.72)",
        primaryColor: "#F4D97A",
        arrowColor: "#1B2A4A",
        spotlightRadius: 12,
        zIndex: 10000,
      }}
      styles={{
        beaconInner: {
          backgroundColor: "#C8A951",
        },
        beaconOuter: {
          backgroundColor: "rgba(244,217,122,0.08)",
          borderColor: "#F4D97A",
        },
      }}
    />
  );
}
