# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This repo is two things at once:

1. **Suraj Fale's GitHub profile README** (`README.md`, shown on github.com/surajfale from `main`).
2. **The portfolio website** (https://surajfale.netlify.app): a React + TypeScript + Tailwind CSS + Framer Motion SPA in a **Refined Neo-Brutalist Bento** style, dark only.

Suraj is a Principal Engineer positioned as a **Big Data & Streaming specialist: Apache Spark and Apache Kafka, in Scala and Java**, with a focus on system design and distributed systems, while exploring Generative AI & Prompt Engineering.

## Technology Stack

- **Framework:** React 19 with TypeScript 6.0 (strict)
- **Routing:** React Router v7 (`BrowserRouter`)
- **Build Tool:** Vite 8 (Rolldown bundler)
- **Runtime:** Node 24 LTS for dev and build only (`engines: >=24`, `.nvmrc`, Netlify `NODE_VERSION`); the deployed site is static
- **Package Manager:** pnpm 8+ (required; `packageManager: pnpm@8.15.0`)
- **Styling:** Tailwind CSS v4 via `@tailwindcss/vite`. No `tailwind.config`: tokens are CSS-first in the `@theme` block of `src/index.css`
- **Motion:** Framer Motion (`framer-motion`), globally wrapped in `<MotionConfig reducedMotion="user">`
- **Icons:** Phosphor (`@phosphor-icons/react`, `*Icon` export names). `IconContext` in `App.tsx` sets one site-wide weight and `size: '1em'`, so size icons with text classes (`text-lg`). Decorative icons get `aria-hidden`
- **Fonts:** Syne (display headings), Plus Jakarta Sans (body), IBM Plex Mono (technical metadata), via a Google Fonts `<link>` in `index.html`
- **Linting:** ESLint 10 with flat config (`eslint.config.js`, not .eslintrc); `eslint-plugin-react-hooks` 7 includes the React Compiler rules (e.g. no `setState` directly in an effect); `react-refresh/only-export-components` means component files export only components (put helpers in `src/utils` or `src/lib`)
- **Deployment:** Netlify

## Project Structure

```
src/
├── pages/                  # Routes (see App.tsx). Each renders <main id="main" class="grid grid-cols-12 gap-4">
│   ├── Home.tsx            # "/"           Hero, About, Track, Featured, Writing, Stack matrix, project tiles
│   ├── Apps.tsx            # "/apps"       Category filter + grid/list toggle (persisted, allowlisted)
│   ├── AppDetail.tsx       # "/apps/:slug" Title + spec sheet, screenshots, features, architecture notes, prev/next
│   └── NotFound.tsx        # "*" and unknown slugs (`what="app"`)
├── components/
│   ├── bento/Bento.tsx     # Static tile: `bento` surface, optional scroll reveal. Does NOT lift
│   ├── bento/BentoLink.tsx # Whole-tile link: lift + hard red shadow (internal `to` or external `href`)
│   ├── ActionLink.tsx      # Button-shaped link/button: `tone="signal"` (red CTA) or `"ghost"`; `square` for icon-only
│   ├── Nav.tsx             # Sticky bar; Signal Red active indicator (layoutId slide); scroll-spy on Home
│   ├── FooterRow.tsx       # Compact footer/socials bento row (every page)
│   ├── CommandPalette.tsx  # ⌘K / Ctrl+K, ARIA combobox + listbox, instant open
│   ├── ScrollManager.tsx   # Scroll to top on route change, smooth-scroll to #hash targets
│   ├── ProjectTile.tsx     # Project card (compact on Home, `withImage` on /apps)
│   ├── ArchitectureNotes.tsx # Parses `**Heading:**` / `•` notes into a hairline mini-grid (JSX only)
│   ├── Tag.tsx             # Mono tech tag (bone outline, never red)
│   ├── ErrorBoundary.tsx   # Plain fallback, no motion components
│   └── home/               # HeroCard, AboutCards, FeaturedProject, WritingTile, StackMatrix
├── content/
│   ├── profile.ts          # Single source of truth: profile, highlights, socials, stack matrix, projects
│   ├── writing.ts          # Merges generated feeds + hand-pinned LinkedIn posts; `getLatestPosts`
│   └── writing.generated.json # Written by scripts/fetch-writing.mjs — do not hand-edit
├── hooks/
│   ├── useActiveSection.ts # IntersectionObserver scroll-spy for the nav
│   └── usePageMeta.ts      # Per-route title/description/OG/Twitter meta
├── lib/
│   ├── tokens.ts           # COLORS mirror of @theme + motion presets (lift, reveal, easings)
│   ├── socialIcons.ts      # profile.ts icon keys → Phosphor icons
│   └── cn.ts               # class-name joiner
├── utils/categories.ts, utils/projects.ts  # category derivation/filtering, `hasLiveTarget`
├── index.css               # Tailwind import, @theme tokens, base styles, `bento` + `meta` utilities
├── App.tsx                 # MotionConfig, IconContext, router, Nav, palette, footer
└── main.tsx
scripts/
├── fetch-writing.mjs      # Build-time dev.to + Medium fetch → writing.generated.json (never throws)
├── generate-llms-txt.mjs  # profile.ts → llms.txt + public/llms.txt
└── check-csp.mjs          # Post-build: inline <script> hashes must be in the netlify.toml CSP
```

## Common Commands

```bash
pnpm install        # Install dependencies
pnpm dev            # Dev server at http://localhost:5173
pnpm build          # fetch-writing → generate-llms-txt → tsc → vite build → check-csp
pnpm preview        # Preview production build
pnpm lint           # ESLint (max-warnings 0)
pnpm sync:writing   # Refresh writing.generated.json only
pnpm sync:llms      # Regenerate llms.txt from profile.ts only

netlify deploy      # Deploy preview (requires Netlify CLI)
netlify deploy --prod
```

## Key Architecture Decisions

**Content Management:**
- All site content lives in `src/content/profile.ts` (typed by `Profile`, `Project`, `SocialLink`, `CareerHighlight`, `StackGroup`)
- Profile data: name, title, tagline, about, highlights (3), socials (8), `stack` (rows of the capabilities matrix: domain, depth `Core | Proficient | Exploring`, items, note), projects (5)
- Projects carry a `slug` used by `/apps/:slug`. Home features **the first project** as the 2-column Featured Systems card and lists the rest as tiles, so reorder `projects` to change what's featured
- "View Live Project" only renders when `hasLiveTarget(project)` (a `liveUrl` distinct from `sourceUrl`)
- `llms.txt` / `public/llms.txt` are generated from `profile.ts`: after editing profile content run `pnpm sync:llms` (the build also does it)
- Writing feed: dev.to and Medium are fetched at build time; LinkedIn posts are pinned by hand in `writing.ts` (no public API). With fewer than 3 posts the Writing tile drops to one row and the stack matrix goes full width (`Home.tsx`), so the grid never shows a stretched empty tile
- No personal contact information (email, phone, location) per privacy requirements

**Color architecture: strict 60-30-10 (`src/index.css` `@theme`, mirrored in `src/lib/tokens.ts`):**
- **60% canvas:** Obsidian `#0E0E10` page (`bg-canvas`), `#16161A` bento interiors (`bg-card`)
- **30% structure & type:** Warm Bone `#E8E3D8` (`text-bone`, borders), secondary copy `#A39E93` (`text-bone-muted`)
- **10% Signal Red `#FF2D2D` (`signal`), only for:** (1) the primary "View Live Project" CTA, (2) active navigation indicators (nav, /apps category filter, palette selection), (3) hard hover shadows `4px 4px 0px #FF2D2D`. Never errors, status badges, tags, focus rings or form outlines
- Tailwind's default palette, radii and shadows are **reset** (`--color-*: initial` etc.), so only these tokens generate classes. Don't re-add stock colors
- Text on Signal Red is Obsidian (`text-canvas`, 5.2:1); Bone on red is 2.9:1 and fails AA. Focus rings are bone
- The 25% bone border is ~2:1, fine for decorative card edges but too faint for inputs; inputs use bone at 60%+

**Bento system:**
- 12-column grid, `gap-4` (16px gutters), container `max-w-[1320px]`; radius `rounded-bento` (8px) outside, `rounded-inner` (4px) inside
- `bento` utility = `#16161A` fill + `1.5px` bone border at 25% that snaps to 100% on hover/focus-within
- `meta` utility = IBM Plex Mono, 12px, uppercase, tracked, muted: the "technical annotation" voice
- Asymmetric layout on lg (Hero 8×2 beside About/Track 4; Featured 8 beside Writing 4×2; Stack 8; 4× project tiles 3); 6/6 at md; single column below. Keep DOM order = reading order (no `grid-flow-dense`)
- No cards inside cards: nested regions use hairline mini-grids (`gap-px` over a `bg-bone/25` backing), see `StackMatrix` and `ArchitectureNotes`

## Upgrade Gotchas

- **TypeScript is pinned `~6.0`**: `typescript-eslint` supports `typescript <6.1.0`, and its parser can't run on TS 7 (native compiler) yet
- **Tailwind v4**: config is CSS (`@theme`, `@utility`), not JS. Conflicting utilities on one element (e.g. `px-4` + `px-0`) resolve by stylesheet order, not class order, so expose a prop (`pad`, `square`) instead of passing an override class
- **Vite 8 CJS interop**: with `"type": "module"`, default imports from CommonJS packages follow Node semantics. A CJS-only dependency can build cleanly and still render a blank page, so check a `vite preview` build in a browser after dependency changes (the dev server pre-bundles and hides it)
- **Code splitting**: Rolldown has no object-form `manualChunks`; chunks are `build.rolldownOptions.output.codeSplitting.groups` in `vite.config.ts` (`icons`, `motion`, `react`)
- **Phosphor bundle cost**: each icon module ships all six weights (~2.3 kB each). Fine at ~35 icons; if the icon count grows a lot, inline single-weight SVGs from `@phosphor-icons/core` instead

## Motion & Interaction Rules

- **Lift = clickable.** Interactive tiles/buttons (`BentoLink`, `ActionLink`) use the `lift` variants in `lib/tokens.ts`: hover → `translate(-2px, -2px)` + `4px 4px 0px #FF2D2D`; press → slam back flat (0,0, no shadow). The red CTA casts a bone shadow (`liftOnSignal`). Static `Bento` tiles never lift; they only snap their border
- Framer Motion's `whileHover` ignores touch, so hover lifts are already gated to real pointers. CSS-only hover movement must still use `hover:` with care (color changes are fine)
- Never `transition: all`; animate `transform`/`opacity`/`box-shadow`/`border-color` only, never layout properties
- Easing: `EASE_OUT` `cubic-bezier(0.23, 1, 0.32, 1)` for entrances, hovers and presses; `EASE_IN_OUT` `cubic-bezier(0.77, 0, 0.175, 1)` for on-screen movement (nav indicator slide). UI interactions ≤ 240ms; scroll reveals 350ms
- Scroll reveals (`reveal` preset) run once via `whileInView`; never on above-the-fold tiles (hero row uses `reveal={false}`), never via raw scroll listeners
- Keyboard-summoned UI is instant: the command palette has no open/close transition
- Reduced motion: `MotionConfig reducedMotion="user"` drops transforms (lifts, reveals, slides) and keeps opacity/color; CSS transitions are neutralized by the global rule in `index.css`

## Accessibility Requirements

- Semantic HTML (`main`, `section`, `header`, `nav`, `footer`), exactly one `h1` per page (Hero, page header card, or 404)
- Skip link to `#main`; `aria-labelledby` on bento sections; `aria-current` on the active nav link
- ARIA labels on icon-only buttons and links; decorative icons `aria-hidden`
- Keyboard navigation with visible bone focus rings (`:focus-visible` in `index.css`)
- Alt text for images (empty `alt` when the adjacent title already names the project)
- External links: `target="_blank"` and `rel="noopener noreferrer"`; `window.open` passes `'noopener,noreferrer'`
- WCAG AA contrast: bone 14:1+, muted bone 6.8:1 on cards, Obsidian-on-red 5.2:1
- Check 390px wide: no horizontal overflow (verified by the Playwright pass)

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
- `netlify.toml`: Node 24 (LTS), pnpm 8.15.0, `pnpm run build`, publish `dist`
- SPA fallback redirect (`/*` → `/index.html`), security headers, immutable caching for `/assets/*`
- `PNPM_FLAGS = "--frozen-lockfile"`: a stale `pnpm-lock.yaml` fails the deploy

## Security Rules

- **CSP lives in `netlify.toml`** and is strict: no inline `<script>` or `<style>` ships, so `script-src` and `style-src` carry no hashes and no `'unsafe-inline'`. Tailwind compiles to a linked stylesheet; React `style` props and Framer Motion write through the CSSOM, which CSP allows. Don't add an inline `<style>`/`style=""` attribute to `index.html`. If you add an inline script, add its `sha256-` to the CSP (`scripts/check-csp.mjs` fails `pnpm build` until you do). New third-party origins (scripts, fonts, images, `fetch`) need a matching directive
- Check CSP changes with a `vite preview`-style server that sends the `netlify.toml` headers, in a real browser, looking for console CSP violations
- Feed URLs from `scripts/fetch-writing.mjs` pass `safePostUrl` (https + platform host allowlist) before reaching `href`; keep any new feed source behind the same check
- Validate `localStorage` values against an allowlist; never cast them, and wrap access in try/catch (it throws when storage is blocked)
- No `dangerouslySetInnerHTML` / `innerHTML`: render feed text as JSX
- `.claude/settings.local.json` is per-user and git-ignored; shared agent permissions go in `.claude/settings.json`
