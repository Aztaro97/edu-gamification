import type { Metadata } from "next";
import { Inter, Roboto, Roboto_Mono, Noto_Kufi_Arabic } from "next/font/google";
import "./globals.css";

// UAE Design System — English body font (Inter)
const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

// UAE Design System — English display/heading font (Roboto)
const roboto = Roboto({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "800"],
  display: "swap",
});

const robotoMono = Roboto_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

// UAE Design System — Arabic primary font (Noto Kufi Arabic)
const notoKufiArabic = Noto_Kufi_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rihlat Al Ma'rifah — Journey of Knowledge",
  description:
    "UAE Ministry of Education gamified learning — Grade 4 Human Body journey.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      className={`${inter.variable} ${robotoMono.variable} ${roboto.variable} ${notoKufiArabic.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
