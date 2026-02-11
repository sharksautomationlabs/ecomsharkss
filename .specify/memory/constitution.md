# ECOM SHARKS Constitution

## Core Principles

### I. Next.js App Router First
All pages and routing use the **Next.js 15 App Router** (`app/` directory). Server Components are the default; add `'use client'` only when the component requires browser APIs, state, effects, or event handlers. Never use the Pages Router. Route segments use **kebab-case** (`ecommerce-automation`, `privacy-policy`). Each route lives in `app/<route>/page.tsx`.

### II. Performance as a Feature
Performance is not an afterthought — it is a core product requirement. Every change must respect these budgets:
- **Largest Contentful Paint (LCP)** < 2.5s on mobile
- **Cumulative Layout Shift (CLS)** < 0.1
- **First Input Delay (FID)** < 100ms
- Use `next/dynamic` for heavy components (`Testimonials`, `ImageGallery`, `Pricing`)
- Use `optimizePackageImports` for `framer-motion` and `lucide-react`
- Lazy-load videos and off-screen media via Intersection Observer
- Prefer `next/image` with WebP/AVIF for all raster images
- Never add blocking third-party scripts to the critical path; use `next/script` with `afterInteractive` or `lazyOnload` strategy

### III. Component Architecture
- **Functional components only** — no class components
- **One component per file**, named in **PascalCase** (`Header.tsx`, `CurrentOffer.tsx`)
- Components live in `app/components/`; platform-specific headers share a naming pattern (`AmazonHeader`, `ShopifyHeader`, `WalmartHeader`, `TikTokHeader`)
- Use `React.memo` for expensive pure components that receive stable props
- Default exports for page and component files
- Co-locate component-specific logic; extract shared logic to `app/utils/`

### IV. Tailwind-Only Styling
- **Tailwind CSS 4** is the sole styling system — no CSS Modules, styled-components, or inline CSS objects
- Custom animations and keyframes live in `app/globals.css`
- Brand palette must be consistent:
  - Primary: `#35c4dd` (teal/cyan)
  - Dark backgrounds: `#063f4a`, `#052126`, `#2c2420`
  - Light accent: `#bef4fe`
- Typography: **Barlow** and **Barlow Condensed** via `next/font/google`
- Use CSS custom properties (`--background`, `--foreground`, `--font-barlow`, `--font-barlow-condensed`) for theme values
- Respect dark mode via `prefers-color-scheme` media query

### V. Animation Standards
- Use **Framer Motion** for all interactive and scroll-based animations
- Shared animation variants (`fadeInUp`, `fadeInLeft`, `staggerContainer`, etc.) live in `app/utils/animations.ts` — reuse before creating new ones
- Trigger scroll animations via `react-intersection-observer` (`useInView`)
- Keep animations subtle and purposeful; avoid decorative motion that harms performance
- Respect `prefers-reduced-motion` — disable or simplify animations for users who request it

### VI. State Management — Keep It Simple
- Use **local React state** (`useState`, `useEffect`) — no global state libraries
- No Redux, Zustand, or Context unless a clear cross-cutting need arises (and is documented via ADR)
- Form state is managed within the form component
- Ephemeral client data (spam protection, rate limits) may use `localStorage`

### VII. Security & Secrets
- **Never** hardcode API keys, tokens, or secrets in source code
- All secrets go in `.env` / `.env.local` (git-ignored)
- Client-exposed env vars must be prefixed with `NEXT_PUBLIC_`
- Server-only secrets (`RETELL_API_KEY`, `RETELL_AGENT_ID`, `RETELL_FROM_NUMBER`) must never leak to the client
- Security headers (`X-Content-Type-Options`, `X-Frame-Options`, `X-XSS-Protection`) are enforced in `next.config.ts`
- Spam protection (honeypot fields, rate limiting, suspicious content checks) must be maintained on all public forms

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router) | 15.x |
| React | React | 19.x |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS | 4.x |
| Animations | Framer Motion | 12.x |
| Icons | Lucide React | latest |
| Email | EmailJS (`@emailjs/browser`) | latest |
| AI Calls | Retell SDK | latest |
| Analytics | Meta Pixel, Microsoft Clarity | — |
| Scheduling | Calendly (external embed) | — |

## Project Structure

```
ecomsharkss/
├── app/
│   ├── layout.tsx            # Root layout (fonts, metadata, analytics scripts)
│   ├── page.tsx              # Home page
│   ├── globals.css           # Tailwind imports + custom keyframes
│   ├── api/                  # API routes (server-only)
│   │   └── retell/call/route.ts
│   ├── components/           # Shared UI components (PascalCase)
│   ├── utils/                # Utilities & helpers (camelCase)
│   ├── about/page.tsx
│   ├── amazon/page.tsx
│   ├── contact/page.tsx
│   ├── ecommerce-automation/page.tsx
│   ├── identity/page.tsx
│   ├── privacy-policy/page.tsx
│   ├── shopify/page.tsx
│   ├── thank-you/page.tsx
│   ├── tiktok/page.tsx
│   └── walmart/page.tsx
├── public/                   # Static assets (favicons, robots.txt, sitemap.xml)
├── next.config.ts
├── tsconfig.json
├── postcss.config.mjs
├── .eslintrc.json
└── package.json
```

## Naming Conventions

| Element | Convention | Examples |
|---------|-----------|----------|
| Components | PascalCase files & exports | `Header.tsx`, `CurrentOffer.tsx` |
| Utility files | camelCase | `emailjs.ts`, `spamProtection.ts` |
| Route folders | kebab-case | `privacy-policy/`, `ecommerce-automation/` |
| Functions | camelCase | `sendContactEmail()`, `initiateRetellCall()` |
| Constants | UPPER_SNAKE_CASE | `RETELL_API_KEY` |
| CSS classes | Tailwind utilities only | `bg-[#063f4a] text-white` |

## Import Conventions

- **Path alias**: `@/*` maps to project root (configured in `tsconfig.json`)
- Prefer `@/app/components/Header` over `../components/Header` for cross-directory imports
- Use relative imports only within the same directory
- Next.js built-ins: `next/image`, `next/link`, `next/font/google`, `next/script`, `next/dynamic`
- Group imports: (1) React/Next, (2) third-party, (3) internal (`@/`)

## API Route Standards

- API routes live in `app/api/` and export named HTTP method handlers (`POST`, `GET`, etc.)
- Return `NextResponse.json()` with appropriate status codes
- Wrap all logic in `try/catch` — return `{ success: false, message }` on error
- Validate request body before processing
- Server-only — never import API route code into client components

## Error Handling

- **API routes**: `try/catch` → `NextResponse.json({ success, message }, { status })` 
- **Client utilities**: return `{ success: boolean, message: string }` shape
- **Form submissions**: surface errors via `submitStatus: { type: 'success' | 'error', message }`
- **Development mode**: simulated responses are acceptable (e.g., EmailJS dev bypass) but must be clearly gated behind `process.env.NODE_ENV === 'development'`

## Lead Capture Flow

The primary business flow is: **Visitor → Form → EmailJS notification → Retell AI call (US/CA numbers)**
- EmailJS sends the notification email (non-blocking)
- Retell initiates an AI follow-up call for valid US/Canada phone numbers
- Both services are fire-and-forget; form submission must succeed even if either fails
- Spam protection (honeypot, rate limits, content checks) runs before any external call

## Quality Gates

- `next lint` must pass with zero errors before any merge
- ESLint config extends `next/core-web-vitals` and `next/typescript`
- `@typescript-eslint/no-unused-vars` is a warning — clean up before shipping
- No `any` types in new code (existing `any` suppressions are grandfathered)
- Lighthouse performance score must remain ≥ 90 on key landing pages

## Governance

- This constitution is the authoritative source for project standards
- Amendments require documentation, team review, and version bump
- All PRs and code reviews must verify compliance with these principles
- Architectural decisions that deviate from this constitution must be recorded via ADR (`/sp.adr`)

**Version**: 1.0.0 | **Ratified**: 2026-02-12 | **Last Amended**: 2026-02-12
