# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
pnpm dev          # Start dev server
pnpm build        # Production build
pnpm start        # Start production server
pnpm lint         # Run ESLint
```

No test runner is configured. Check `package.json` before assuming one exists.

## Architecture

### Routing & i18n

All pages live under `app/[locale]/`. The middleware (`middleware.ts`) uses `next-intl` to detect locale and redirect. Supported locales: `en`, `ar` (English is default). Always use the locale-aware navigation exports from `@/i18n/navigation` (not Next.js's `Link`/`redirect` directly) — these handle locale prefixing automatically.

Translation strings live in `messages/en.json` and `messages/ar.json`. Every UI string needs both language versions. Arabic content fields are named with an `Ar` suffix (e.g., `qAr`, `choicesAr`).

### State Management

All game state (XP, completed lessons, badges, streaks) is managed in `features/game/GameContext.tsx` and persisted to `localStorage` — there is no backend API for game progress. The context delays rendering until the client mounts to avoid hydration mismatches; always check for the `mounted` flag pattern when adding new state.

Access state via the `useGame()` hook. Mutations go through context methods (`completeLesson()`, `completeDaily()`, `resetProgress()`), never directly.

### Feature Structure

```
features/game/
├── GameContext.tsx   # All game state + useGame hook
├── GameApp.tsx       # Root layout orchestrator (12-col responsive grid)
├── types.ts          # Shared types (Lesson, Badge, Player, Question, etc.)
├── data.ts           # Static content: lessons, questions, players, badges
└── components/       # Presentational components
```

Lesson progression is linear: lesson N unlocks only after N-1 is completed. XP reward per lesson = `lesson.xp + correctAnswers * 10`. Badge requirements are checked against the full game state object.

### Auth

Auth uses `better-auth` with a PostgreSQL backend (`pg` driver). The auth handler is at `app/api/auth/[...all]/route.ts`. Client-side auth utilities are in `lib/auth-client.ts`, server-side in `lib/auth.ts`. Requires a running PostgreSQL instance and `DATABASE_URL` env var.

### Styling

Tailwind CSS v4 with PostCSS. Use the `cn()` utility from `@/lib/utils` (wraps `clsx` + `tailwind-merge`) for conditional class merging. Component primitives come from Radix UI; shadcn/ui conventions apply (`components.json` is configured). Theming via `next-themes` — three modes: system, light, dark.

**Fonts:** Cinzel (display/headings), Tajawal (Arabic text), Geist Sans (body), Geist Mono (code). All exposed as CSS variables.
