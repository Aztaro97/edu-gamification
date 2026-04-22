"use client";

import { GeometryDefs } from "./GeometryDefs";
import { Header } from "./Header";
import React from "react";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="min-h-screen relative flex flex-col"
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
        <rect width="100%" height="100%" fill="url(#mashrabiya)" opacity="0.08" />
      </svg>

      <div className="relative max-w-[1440px] mx-auto px-6 pb-16 w-full flex-1 flex flex-col">
        <Header />

        <div className="mt-6">
          {children}
        </div>

        <footer className="mt-8 flex items-center justify-between text-[10px] text-[#F5EED6]/40 uppercase tracking-[0.3em] flex-wrap gap-2">
          <span>وطني الإمارات · My UAE</span>
          <span>Learn · Grow · Lead</span>
          <span>Ver 1.0 · © 2026</span>
        </footer>
      </div>
    </div>
  );
}
