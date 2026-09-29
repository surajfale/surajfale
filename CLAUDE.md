# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This repo is two things at once:

1. **Suraj Fale's GitHub profile README** (`README.md`, shown on github.com/surajfale from `main`).
2. **The portfolio website** (https://surajfale.netlify.app): a React + TypeScript + Material-UI SPA with a neon/cyberpunk aesthetic.

Suraj is a Principal Engineer positioned as a **Big Data & Streaming specialist: Apache Spark and Apache Kafka, in Scala and Java**, with a focus on system design and distributed systems, while exploring Generative AI & Prompt Engineering.

## Technology Stack

- **Framework:** React 18 with TypeScript (strict)
- **Routing:** React Router v7 (`BrowserRouter`)
- **Build Tool:** Vite 6
- **Package Manager:** pnpm 8+ (required; `packageManager: pnpm@8.15.0`)
- **UI Library:** Material-UI (MUI) v5 + MUI icons
- **Styling:** Emotion (CSS-in-JS via `sx`), plus global CSS in `src/index.css`
- **Fonts:** Lexend Mega (headings/buttons) and Space Mono (body), loaded from Google Fonts in `index.css`
- **Linting:** ESLint 9 with flat config (`eslint.config.js`, not .eslintrc)
- **Deployment:** Netlify

## Project Structure

```
src/
├── pages/                 # Routes (see App.tsx)
│   ├── Home.tsx           # "/"          Hero → About → Projects → Writing → Socials → Footer
│   ├── Apps.tsx           # "/apps"      All projects, category filter, card/list toggle
│   ├── AppDetail.tsx      # "/apps/:slug" Project detail, features, screenshots
│   └── NotFound.tsx       # "*"
├── components/
│   ├── Hero.tsx           # Name/title (DecryptText scramble), tagline, LinkedIn/GitHub CTAs
│   ├── About.tsx          # Summary, tech marquees (Core Technologies / Currently Exploring), 3 highlight cards
│   ├── Projects.tsx       # 2 featured projects (TiltCard) + "View All Apps"
│   ├── Writing.tsx        # Latest posts from dev.to / Medium / LinkedIn
│   ├── Socials.tsx        # LinkedIn/GitHub emphasized, others secondary
│   ├── Footer.tsx
│   ├── SectionHeading.tsx # Eyebrow + title + glow bar used by every section
│   ├── Reveal.tsx         # IntersectionObserver fade/slide-in wrapper
│   ├── TiltCard.tsx       # 3D mouse-tilt + glow wrapper for cards
│   ├── DecryptText.tsx    # Text scramble effect
│   ├── NeuralBackground.tsx # Fixed canvas particle network (global)
│   ├── CustomCursor.tsx   # Dot + trailing ring cursor (fine pointers only, global)
│   ├── CommandPalette.tsx # ⌘K / Ctrl+K palette (global)
│   ├── SystemHUD.tsx      # Bottom-right HUD: section + scroll progress (md+ only, global)
│   ├── ThemeToggle.tsx    # Fixed light/dark toggle
│   └── ErrorBoundary.tsx
├── content/
│   ├── profile.ts         # Single source of truth: profile, highlights, socials, projects
│   ├── writing.ts         # Merges generated feeds + hand-pinned LinkedIn posts
│   └── writing.generated.json # Written by scripts/fetch-writing.mjs — do not hand-edit
├── hooks/
│   ├── useReducedMotion.ts # prefers-reduced-motion as reactive state
│   └── usePageMeta.ts     # Per-route title/description/OG/Twitter meta
├── utils/categories.ts    # Project category derivation + filtering
├── theme.ts               # MUI light/dark themes + glow and motion helpers
├── index.css              # Fonts, marquee/glitch keyframes, global reduced-motion rule
├── App.tsx                # ThemeProvider, global effects, router
└── main.tsx
scripts/
├── fetch-writing.mjs      # Build-time dev.to + Medium fetch → writing.generated.json (never throws)
└── generate-llms-txt.mjs  # profile.ts → llms.txt + public/llms.txt
```

## Common Commands

```bash
pnpm install        # Install dependencies
pnpm dev            # Dev server at http://localhost:5173
pnpm build          # fetch-writing → generate-llms-txt → tsc → vite build
pnpm preview        # Preview production build
pnpm lint           # ESLint (max-warnings 0)
pnpm sync:writing   # Refresh writing.generated.json only
pnpm sync:llms      # Regenerate llms.txt from profile.ts only

netlify deploy      # Deploy preview (requires Netlify CLI)
netlify deploy --prod
```

## Key Architecture Decisions

**Content Management:**
- All site content lives in `src/content/profile.ts` (typed by `Profile`, `Project`, `SocialLink`, `CareerHighlight`)
- Profile data: name, title, tagline, about, highlights (3 cards: Principal Engineer, Java Certification, Continuous Learning), socials (8), projects (5)
- Projects carry a `slug` used by `/apps/:slug`; `Projects.tsx` features the first 2
- `llms.txt` / `public/llms.txt` are generated from `profile.ts`: after editing profile content run `pnpm sync:llms` (the build also does it)
- Writing feed: dev.to and Medium are fetched at build time; LinkedIn posts are pinned by hand in `writing.ts` (no public API)
- Core technologies emphasized: Apache Spark, Apache Kafka (platforms) with Scala, Java (languages), plus Cloud Technologies
- No personal contact information (email, phone, location) per privacy requirements

**Theme System (`src/theme.ts`):**
- Neon/cyberpunk palette. Dark: background `#050511`, primary neon cyan `#00F0FF`, secondary neon purple `#BC13FE`. Light: background `#F0F2F5`, primary deep cyan `#00767F` (WCAG AA as text), secondary `#7000FF`. Accents: red `#FF003C`, yellow `#FDF500`
- Glassmorphism via MUI overrides: semi-transparent `paper` + `backdropFilter: blur(10px)` on Card/Paper/AppBar
- Mode persisted in `localStorage` (`theme-mode`), defaulting to system preference. `index.html` sets `data-theme-mode` before first paint to avoid a flash; `App.tsx` keeps it in sync
- Shared helpers — use these instead of hand-writing values:
  - `glowShadow(color, opacity, blur)` / `glowText(...)` for neon glows
  - `motion` tokens: `easeOut` `cubic-bezier(0.23, 1, 0.32, 1)`, `easeInOut` `cubic-bezier(0.77, 0, 0.175, 1)`, `press` 160ms, `base` 240ms
  - `transitionFor(['transform', 'box-shadow'], duration?, easing?)` builds a transition string
  - `hoverOnly` media query key (`(hover: hover) and (pointer: fine)`) for hover lifts/glows
  - `fullViewportHeight` spreads `minHeight: 100vh` with a `100svh` override

**Global effects (mounted in `App.tsx`):** `NeuralBackground`, `CustomCursor`, `CommandPalette`, `SystemHUD`, `ThemeToggle`. All motion-heavy ones return `null` under reduced motion; the cursor also skips coarse pointers.

## Motion & Interaction Rules

- **Never `transition: all`** — list properties with `transitionFor`
- **Gate hover movement/glow behind `hoverOnly`** so taps on touch devices don't leave elements stuck in hover. Plain color changes may stay ungated
- Pressable elements get `:active` feedback (`scale(0.95–0.97)`); combine with the hover lift under `&:hover:active`
- Entrances/hover use `motion.easeOut`; on-screen movement uses `motion.easeInOut`; UI transitions stay under 300ms (Reveal uses 350ms, fine for scroll reveals)
- Keyboard-summoned UI is instant: the command palette has `transitionDuration={0}`
- Use `fullViewportHeight` instead of `100vh`
- Animate `transform`/`opacity`, not layout properties
- Respect reduced motion: JS via `useReducedMotion()`; CSS via the global rule in `index.css`

## Accessibility Requirements

- Semantic HTML (`main`, `section`, `footer`, one `h1` per page via `SectionHeading component="h1"` or Hero)
- ARIA labels on icon buttons and links
- Keyboard navigation and visible focus indicators
- Alt text for images
- External links: `target="_blank"` and `rel="noopener noreferrer"`
- WCAG AA contrast in both themes (why light-mode primary is `#00767F`, not neon cyan)

## README / GitHub Profile

- `README.md` uses **CRLF line endings** — preserve them when editing (write with CRLF or re-convert), or the diff rewrites every line
- Layout: headline → core-stack badges (Spark, Kafka, Scala, Java) → social badges → About → Tech Stack (Big Data & Streaming, Languages, Frameworks, Tools) → Experience → Featured Projects → Stats → Certifications → Connect
- Badges are shields.io with Simple Icons slugs (`apachespark`, `apachekafka`, `scala`, `openjdk`); `for-the-badge` for core items, `flat-square` for secondary

## Portfolio Content Focus

- Headline positioning: "Big Data & Streaming (Apache Spark, Apache Kafka) in Scala & Java" — keep README headline and `profile.ts` tagline in sync, then run `pnpm sync:llms`
- Core languages: Scala, Java (core strengths in README); Python and JavaScript are "Also Proficient"
- Technologies: Apache Spark, Apache Kafka (featured prominently, own "Big Data & Streaming" README section)
- Never pair a language with a platform as peers (e.g. "Scala & Kafka"): platforms are Spark/Kafka, languages are Scala/Java
- Current focus: Generative AI, Prompt Engineering, LLM integration
- Projects (5): Git Commit MCP Server, Notes & Tasks Web Application, Rusty Clipboard, Voice Enabled Grocery App, Developer Tools Collection

## Deployment

- Netlify auto-deploys on push to `main`
- `netlify.toml`: Node 20, pnpm 8.15.0, `pnpm run build`, publish `dist`
- SPA fallback redirect (`/*` → `/index.html`), security headers, immutable caching for `/assets/*`
