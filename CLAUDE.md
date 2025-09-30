# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a modern single-page portfolio website for Suraj Fale built with React, TypeScript, and Material-UI. The site showcases professional experience (Bank of America, Scala/Kafka/Spark specialist), projects with live demos, and social links with emphasis on LinkedIn and GitHub. The portfolio highlights expertise in distributed systems and exploration of Generative AI & Prompt Engineering.

## Technology Stack

- **Framework:** React 18 with TypeScript
- **Build Tool:** Vite 5
- **Package Manager:** pnpm 8+ (required)
- **UI Library:** Material-UI (MUI) v5
- **Styling:** Emotion (CSS-in-JS)
- **Linting:** ESLint 9 with flat config (eslint.config.js)
- **Deployment:** Netlify

## Project Structure

```
src/
├── components/        # React components
│   ├── Hero.tsx      # Hero section with CTAs
│   ├── About.tsx     # Career highlights
│   ├── Projects.tsx  # Project showcase
│   ├── Socials.tsx   # Social media links
│   ├── Footer.tsx    # Footer
│   └── ThemeToggle.tsx # Dark mode toggle
├── content/
│   └── profile.ts    # Centralized content configuration
├── App.tsx           # Main app with theme provider
├── theme.ts          # MUI theme configuration (light/dark)
└── main.tsx          # Entry point
```

## Common Commands

```bash
# Development
pnpm install        # Install dependencies
pnpm dev            # Start dev server at http://localhost:5173
pnpm build          # Build for production
pnpm preview        # Preview production build

# Code Quality
pnpm lint           # Run ESLint

# Deployment
netlify deploy      # Deploy to Netlify (requires Netlify CLI)
netlify deploy --prod  # Deploy to production
```

## Key Architecture Decisions

**Content Management:**
- All content centralized in `src/content/profile.ts` with TypeScript interfaces
- Profile data includes: name, title, tagline, about, highlights (3 cards), socials (6 platforms), projects (2 featured)
- Core technologies emphasized: Scala, Apache Kafka, Apache Spark, Cloud Technologies
- Currently exploring: Generative AI, Prompt Engineering, LLM Integration, Containerization, Orchestration
- No personal contact information (email, phone, location) per privacy requirements

**Theme System:**
- Custom light/dark themes via MUI ThemeProvider (`src/theme.ts`)
- Theme persisted in localStorage with system preference detection
- Primary: LinkedIn blue (#0077B5), Secondary: GitHub dark (#24292E)
- Modern gradient accents throughout (purple-pink, pink-red, blue-cyan)
- WCAG AA compliant color contrast ratios

**Component Architecture:**
- Single-page application with scroll sections (Hero → About → Projects → Socials → Footer)
- **About section**: Modern glassmorphism design with gradient-filled icon circles, interactive hover effects, chip-based tech stack display
- **Hero**: Gradient background with animated circles, prominent LinkedIn/GitHub CTAs
- **Projects**: Cards with live preview buttons, tech tags, thumbnail placeholders
- **Socials**: LinkedIn/GitHub emphasized (larger), other platforms secondary
- **Footer**: Centered layout with animated heart icon

**Styling Patterns:**
- Extensive use of gradient backgrounds and gradient text (backgroundClip: 'text')
- Glassmorphism effects: semi-transparent backgrounds with backdrop blur
- Smooth transitions with cubic-bezier easing
- Hover effects: translateY, scale, rotate, shadow changes
- Respects `prefers-reduced-motion` for accessibility

**Deployment:**
- Netlify auto-deployment on push to main
- Configuration in `netlify.toml` (Node 20, pnpm 8.15.0)
- SPA redirect rules and security headers configured
- Build: TypeScript compilation → Vite bundling → dist/

## Making Content Changes

Edit `src/content/profile.ts` to update:
- **Personal info**: name, title, tagline (includes core tech + Gen AI exploration)
- **About text**: Background, specialization, technologies used
- **Highlights** (3 cards): Bank of America role, Java certification, continuous learning
- **Projects** (2 featured): Voice Grocery App, Dev Tools Collection (liveUrl, sourceUrl, tech stack)
- **Socials** (6 platforms): LinkedIn/GitHub (emphasized: true), Stack Overflow, Facebook, Instagram, Snapchat

**Important**: The About component breaks down the about text into:
1. Opening statement with gradient "Bank of America"
2. Passion badge with sparkle icon
3. "Core Technologies" section with gradient-filled chips
4. "Currently Exploring" section with outlined chips (fills on hover)

## Styling and Theming

**Color System:**
- Primary: LinkedIn blue (#0077B5) - CTAs, accents
- Secondary: GitHub dark (#24292E) - buttons, text
- Gradients: Purple-pink, pink-red, blue-cyan for highlights
- Background: Subtle gradients (light → white, dark → darker)

**Modern Design Elements:**
- Gradient text using backgroundClip + WebkitTextFillColor: transparent
- Glassmorphism: rgba backgrounds with backdropFilter: blur(10px)
- Circular gradient-filled icon containers (80x80px) with box-shadow
- Top accent bars on cards (4px gradient strip, full opacity on hover)
- Interactive chips with gradient fills/outlines

**Animation Patterns:**
- Cards: translateY(-12px) scale(1.02) on hover
- Icons: scale(1.1) rotate(5deg) on parent hover
- Transitions: 0.4s cubic-bezier(0.4, 0, 0.2, 1)
- Heartbeat animation on footer heart icon
- Respects prefers-reduced-motion

## Accessibility Requirements

All components implement:
- Semantic HTML elements
- ARIA labels for icon buttons and links
- Keyboard navigation support
- Visible focus indicators
- Alt text for images
- External links open in new tabs with `rel="noopener noreferrer"`

## Development Notes

**Code Standards:**
- TypeScript strict mode enabled
- ESLint 9 with flat config (eslint.config.js, not .eslintrc)
- All external links: `target="_blank"` and `rel="noopener noreferrer"`
- Components: Mobile-first responsive design
- No personal contact info anywhere in code

**Portfolio Content Focus:**
- Core expertise: Scala, Java, Python (core strengths in README)
- Technologies: Apache Kafka, Apache Spark (featured prominently)
- Current focus: Generative AI, Prompt Engineering, LLM integration
- Company: Bank of America (distributed systems)
- Projects: 2 live demos (Voice Grocery App, Dev Tools)

**Design Philosophy:**
- Modern, gradient-heavy aesthetic
- Visual hierarchy through size, color, animation
- Scannable content (chips, badges, cards vs long paragraphs)
- Glassmorphism and depth through shadows/blur
- Smooth, delightful interactions
