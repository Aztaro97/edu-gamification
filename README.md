# Edu-gamification

A bilingual (English/Arabic) gamified learning platform for Grade 4 science — built with Next.js 16, React 19, TypeScript, and Tailwind CSS v4. Designed with UAE Ministry of Education branding and Islamic geometric design elements.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Architecture](#architecture)
  - [Routing & i18n](#routing--i18n)
  - [Authentication](#authentication)
  - [Game State](#game-state)
  - [Lesson & Content System](#lesson--content-system)
  - [Styling & Theming](#styling--theming)
- [Feature Reference](#feature-reference)
- [Deployment](#deployment)

---

## Overview

edu-gamification is an interactive educational journey through human body lessons. Students earn XP, unlock lessons sequentially, collect badges, maintain streaks, and compete on a leaderboard — all without a backend for game data (state lives in `localStorage`).

**Key capabilities:**

- Bilingual UI — English and Arabic with full RTL support
- Gamified progression: XP, levels, badges, streaks, leaderboard
- Quiz engine: MCQ and True/False with per-answer feedback
- Protected routes with server-side session validation
- Dark / light / system theme modes
- UAE design system — AE Gold, AE Black, AE Red, AE Green

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| UI | React 19, Tailwind CSS v4, shadcn/ui, Radix UI |
| Auth | better-auth 1.6 (email/password, PostgreSQL) |
| Database | PostgreSQL via Neon (`pg` driver) |
| i18n | next-intl 4 (`en`, `ar`) |
| Theming | next-themes |
| Icons | Lucide React |
| Language | TypeScript 5 (strict mode) |
| Package Manager | pnpm |

---

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm
- PostgreSQL database (e.g. [Neon](https://neon.tech))

### Installation

```bash
git clone <repo-url>
cd gamification-ui
pnpm install
```

### Configure environment

Copy the example below to `.env.local` and fill in your values (see [Environment Variables](#environment-variables)).

### Initialize the database

better-auth will auto-migrate its required tables on first run. Ensure `POSTGRES_URL` points to a valid database.

### Run the dev server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) — it redirects to `/en` automatically.

### Other commands

```bash
pnpm build     # Production build
pnpm start     # Start production server
pnpm lint      # Run ESLint
```

> No test runner is configured. Check `package.json` before assuming one exists.

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `POSTGRES_URL` | Yes | Full PostgreSQL connection string (e.g. Neon) |
| `BETTER_AUTH_SECRET` | Yes | 32-byte hex secret for auth encryption |
| `BETTER_AUTH_URL` | Yes (dev) | Auth base URL — `http://localhost:3000` for local dev |
| `NEXT_PUBLIC_APP_URL` | Prod | Client-side auth base URL — your production domain |
| `VERCEL_URL` | Auto | Set by Vercel, used for trusted origins |
| `VERCEL_ENV` | Auto | Set by Vercel (`production` / `preview`) |
| `VERCEL_PROJECT_PRODUCTION_URL` | Auto | Set by Vercel for production trusted origins |

**`.env.local` example:**

```env
POSTGRES_URL=postgresql://user:password@host/dbname?sslmode=require
BETTER_AUTH_SECRET=your-32-byte-hex-secret-here
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

> On Vercel, `VERCEL_URL`, `VERCEL_ENV`, and `VERCEL_PROJECT_PRODUCTION_URL` are injected automatically. Only `POSTGRES_URL`, `BETTER_AUTH_SECRET`, and `NEXT_PUBLIC_APP_URL` need to be set manually in the Vercel dashboard.

---

## Project Structure

```
gamification-ui/
├── app/
│   ├── layout.tsx                  # Root layout (fonts, metadata)
│   ├── page.tsx                    # Redirects / → /en
│   ├── globals.css                 # Tailwind v4 + UAE design tokens
│   ├── [locale]/
│   │   ├── (home)/                 # Protected routes (require session)
│   │   │   ├── layout.tsx          # Session check + providers
│   │   │   ├── page.tsx            # Game dashboard
│   │   │   ├── lesson/[id]/        # Quiz page
│   │   │   ├── daily/              # Daily challenge
│   │   │   ├── results/[id]/       # Lesson completion screen
│   │   │   ├── profile/            # Player stats
│   │   │   └── rewards/            # Badge collection
│   │   └── (auth)/
│   │       └── login/              # Login page (public)
│   └── api/
│       └── auth/[...all]/          # better-auth handler
├── features/
│   └── game/
│       ├── GameContext.tsx         # All game state + useGame() hook
│       ├── GameApp.tsx             # Root game layout (12-col grid)
│       ├── types.ts                # Shared TypeScript types
│       ├── data.ts                 # Static content (lessons, questions, badges)
│       ├── index.ts                # Public exports
│       └── components/             # Game UI components
├── components/
│   ├── ThemeProvider.tsx
│   ├── Navbar.tsx
│   ├── Sidebar.tsx
│   └── ui/                         # shadcn/ui primitives
├── lib/
│   ├── auth.ts                     # better-auth server config
│   ├── auth-client.ts              # better-auth client wrapper
│   └── utils.ts                    # cn() utility
├── i18n/
│   ├── routing.ts                  # Locale config
│   ├── request.ts                  # i18n request handler
│   └── navigation.ts               # Locale-aware Link, redirect, useRouter
├── messages/
│   ├── en.json                     # English translations
│   └── ar.json                     # Arabic translations
├── config/
│   └── nav.ts                      # Navigation link definitions
├── proxy.ts                        # Middleware (auth + i18n)
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── components.json                 # shadcn/ui config
└── CLAUDE.md                       # Developer guidance
```

---

## Architecture

### Routing & i18n

All pages live under `app/[locale]/`. Supported locales: `en` (default), `ar`.

- Middleware in `proxy.ts` handles locale detection and redirection via `next-intl`.
- **Always** use the locale-aware navigation exports from `@/i18n/navigation` — not Next.js `Link` or `redirect` directly. These handle locale prefixing automatically.
- Translation strings live in `messages/en.json` and `messages/ar.json`. Every UI string needs both language versions.
- Arabic content fields use an `Ar` suffix (e.g. `titleAr`, `choicesAr`, `descriptionAr`).

### Authentication

Auth is handled by **better-auth** backed by PostgreSQL.

| File | Purpose |
|---|---|
| `lib/auth.ts` | Server config: DB connection pool, trusted origins, field mappings |
| `lib/auth-client.ts` | Client-side `createAuthClient` |
| `app/api/auth/[...all]/route.ts` | Catch-all route → `toNextJsHandler(auth.handler)` |
| `proxy.ts` | Middleware that protects all routes except `/login` and `/api/auth/*` |
| `app/[locale]/(home)/layout.tsx` | Server-side session check — redirects to login if none |

**Session flow:**

1. User submits email/password on `/login`.
2. better-auth sets a session cookie.
3. The `(home)` layout server component calls `auth.api.getSession()` — unauthenticated requests are redirected to `/{locale}/login`.
4. All auth endpoints live under `/api/auth/*`.

**Trusted origins** are built dynamically from `BETTER_AUTH_URL`, `VERCEL_URL`, `NEXT_PUBLIC_APP_URL`, and `VERCEL_PROJECT_PRODUCTION_URL`.

### Game State

All game state is managed in `features/game/GameContext.tsx` and persisted to `localStorage`. There is **no backend API for game progress**.

**State shape:**

```typescript
{
  xp: number                         // Total experience points
  completedLessons: number[]         // Lesson IDs completed
  lessonStars: Record<number, number> // Stars per lesson (0–3)
  activeLesson: number | null        // Currently active lesson
  streak: number                     // Day streak counter
  badges: string[]                   // Earned badge IDs
  dailyCompleted: boolean            // Daily challenge done today
  leaderboardRank: number            // Leaderboard position
}
```

**Computed values** (derived from `xp`): `level`, `xpIntoLevel`, `xpForLevel`, `nextThreshold`.

**Context methods:**

| Method | Description |
|---|---|
| `completeLesson(id, correctCount, total)` | Awards XP + stars, unlocks next lesson |
| `completeDaily(bonusXp)` | Marks daily done, awards bonus XP |
| `resetProgress()` | Clears all progress back to default |
| `getLessonState(id)` | Returns `'completed' \| 'active' \| 'unlocked' \| 'locked'` |

**Hydration:** The context delays rendering until the client mounts to avoid hydration mismatches. Always check for the `mounted` flag pattern when adding new state.

Access state via `useGame()`. Never mutate state directly — always go through context methods.

### Lesson & Content System

All content lives in `features/game/data.ts` as static TypeScript arrays.

**Lesson progression is strictly linear** — lesson N unlocks only after N-1 is completed.

**XP formula:** `lesson.xp + correctAnswers * 10`

**Star formula:** 100% correct = 3 stars, ≥80% = 2 stars, ≥60% = 1 star, below = 0.

**Question types:**

- `mcq` — Multiple choice (4 options A/B/C/D), fully bilingual including `choicesAr` and `explanationAr`
- `tf` — True/False, bilingual

**Badge system:**

Badges have a `req` trigger (e.g. `completedLessons`, `totalStars`, `streak`, `xp`) and a `threshold` value. The context checks badge requirements after each state update.

### Styling & Theming

- **Tailwind CSS v4** with PostCSS (`@tailwindcss/postcss`).
- Use `cn()` from `@/lib/utils` (wraps `clsx` + `tailwind-merge`) for conditional class merging.
- Component primitives come from Radix UI; shadcn/ui conventions apply.
- Theming via `next-themes` — three modes: system, light, dark.

**UAE Design System colors (CSS variables):**

| Token | Value | Usage |
|---|---|---|
| `--ae-gold` | `#CBA344` | Primary accent, XP bars, badges |
| `--ae-black` | `#1B1D21` | Neutral dark backgrounds |
| `--ae-red` | `#D83731` | Errors, danger |
| `--ae-green` | `#3F8E50` | Success, correct answers |

**Fonts (CSS variables):**

| Variable | Font | Usage |
|---|---|---|
| `--font-display` | Cinzel | Headings, display text |
| `--font-arabic` | Tajawal | Arabic content |
| `--font-sans` | Geist Sans | Body text |
| `--font-mono` | Geist Mono | Code |

---

## Feature Reference

### Game Components (`features/game/components/`)

| Component | Description |
|---|---|
| `GameApp.tsx` | Root 12-column responsive grid orchestrator |
| `AppShell.tsx` | Container with header/footer slots |
| `Header.tsx` | Top navigation with locale/theme toggles |
| `PlayerPanel.tsx` | XP bar, level, streak, badge collection |
| `Leaderboard.tsx` | Weekly top-5 leaderboard + player rank |
| `LessonCard.tsx` | Lesson preview card with CTA |
| `JourneyRibbon.tsx` | Horizontal lesson progression ribbon |
| `DailyChallenge.tsx` | Daily bonus challenge widget |
| `PathMap.tsx` | Visual lesson path/journey map |
| `Badge.tsx` | Badge display with Islamic geometric marks |
| `MashrabiyaBand.tsx` | Islamic geometric pattern band |
| `ArchFrame.tsx` | Traditional arch frame decoration |
| `LevelMedal.tsx` | Level indicator medal |
| `StreakFlame.tsx` | Streak fire animation |
| `Stars.tsx` | Star rating display (0–3) |
| `Avatar.tsx` | Player avatar with initials/color |
| `StartButton.tsx` | Lesson start CTA button |
| `LessonIcon.tsx` | Icon per lesson system type |

### Login Feature (`features/login/`)

| File | Description |
|---|---|
| `LoginForm.tsx` | Email/password form, calls better-auth client |

---

## Deployment

### Vercel (recommended)

1. Push to GitHub and connect to Vercel.
2. Add environment variables in the Vercel dashboard:
   - `POSTGRES_URL`
   - `BETTER_AUTH_SECRET`
   - `NEXT_PUBLIC_APP_URL` (your production domain, e.g. `https://your-app.vercel.app`)
3. `VERCEL_URL`, `VERCEL_ENV`, `VERCEL_PROJECT_PRODUCTION_URL` are injected automatically.
4. Deploy — better-auth auto-migrates database tables on first request.

### Auth redirect loop fix

If you see a login → home → login redirect loop on production:

- Ensure `NEXT_PUBLIC_APP_URL` is set to your exact production URL (no trailing slash).
- Ensure `BETTER_AUTH_SECRET` is a stable 32-byte hex string — changing it invalidates all sessions.
- Ensure `POSTGRES_URL` is reachable from the Vercel region your app is deployed to.
- The middleware in `proxy.ts` validates sessions server-side; cookie `Same-Site` and `Secure` settings are automatically configured by better-auth for production (`HTTPS`).

---

## Contributing

1. Branch from `main`.
2. Run `pnpm lint` before pushing.
3. Follow the conventions in `CLAUDE.md`.
4. Use locale-aware navigation from `@/i18n/navigation`.
5. Every new UI string must be added to both `messages/en.json` and `messages/ar.json`.
