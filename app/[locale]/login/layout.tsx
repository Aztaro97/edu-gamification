import { ThemeProvider } from "@/components/ThemeProvider";
import { GeometryDefs } from "@/features/game/components/GeometryDefs";
import { routing } from "@/i18n/routing";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";

export default async function LoginLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "ar")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <div
          dir={locale === "ar" ? "rtl" : "ltr"}
          className="min-h-screen flex items-center justify-center relative"
          style={{
            background:
              "radial-gradient(ellipse at 70% 10%, #1B2A4A 0%, #0A1628 55%, #050C18 100%)",
          }}
        >
          <GeometryDefs />
          <svg
            className="fixed inset-0 pointer-events-none"
            width="100%"
            height="100%"
            aria-hidden
            focusable="false"
          >
            <rect
              width="100%"
              height="100%"
              fill="url(#mashrabiya)"
              opacity="0.06"
            />
          </svg>
          <div className="relative w-full max-w-sm px-6 py-12">
            {children}
          </div>
        </div>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
