# Implementation Plan: Ecom Wealth Replica Page

**Branch**: `001-ecomwealth-replica` | **Date**: 2025-02-22 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `/specs/001-ecomwealth-replica/spec.md`

## Summary

Replace the `/ecomautomation` page with a design replica of [Ecom Wealth Automation](https://www.ecomwealthautomation.com/), using ECOM SHARKS brand colors (#35c4dd, #063f4a, #052126, #2c2420, #bef4fe) and Barlow fonts. All sections (hero, trust strip, testimonials, partner results, team, guarantee, FAQ, footer) will be rebuilt to match the reference layout while remaining a static Next.js page with Calendly integration for the Apply CTA.

## Technical Context

**Language/Version**: TypeScript 5  
**Primary Dependencies**: Next.js 15, React 19, Tailwind CSS 4, Framer Motion 12, Lucide React  
**Storage**: N/A (static content only)  
**Testing**: Manual QA, `next lint`  
**Target Platform**: Web (responsive 320px–1920px)  
**Project Type**: Web (Next.js App Router)  
**Performance Goals**: LCP < 2.5s, CLS < 0.1, FID < 100ms  
**Constraints**: No database, no auth; Calendly for booking  
**Scale/Scope**: Single landing page (~13 sections)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Gate | Status | Notes |
|------|--------|-------|
| Tech Stack (Next.js 15, React 19, TS 5, Tailwind 4, Framer Motion) | ✅ Pass | Matches constitution |
| App Router only | ✅ Pass | Uses `app/ecomautomation/page.tsx` |
| Server Components by default; `use client` only when needed | ✅ Pass | Page uses `'use client'` for animations, FAQ state |
| Components in `app/components/` | ✅ Pass | Extracted components follow this |
| Route in kebab-case | ✅ Pass | `/ecomautomation` |
| LCP < 2.5s, CLS < 0.1 | ✅ Pass | Lazy-load videos, no layout shift |
| Tailwind only, brand colors, Barlow fonts | ✅ Pass | All styling per constitution |
| `next lint` must pass | ✅ Pass | No exceptions |

**Result**: All gates pass. No violations.

## Project Structure

### Documentation (this feature)

```text
specs/001-ecomwealth-replica/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 (component-interfaces.md)
└── tasks.md             # Created by /sp.tasks
```

### Source Code

```text
app/
├── ecomautomation/
│   └── page.tsx         # Main replica page (replaces existing)
├── components/
│   ├── EcomWealthHero.tsx        # Hero section (optional extract)
│   ├── EcomWealthFAQ.tsx         # FAQ accordion
│   └── [other shared components as needed]
├── utils/
│   ├── videoLazyLoading.ts       # Existing; reuse for video lazy load
│   └── animations.ts             # Existing; reuse variants
public/
└── images/
    └── featured/                 # Placeholder for "Featured On" logos
```

**Structure Decision**: Single page at `app/ecomautomation/page.tsx`. Extract FAQ accordion and other reusable sections to `app/components/` when they exceed ~50 lines or need reuse. No new API routes or backend.

## Phase 0 Output: research.md

See [research.md](./research.md) for decisions on:
- Target route: `/ecomautomation`
- Component architecture
- FAQ accordion pattern
- Video lazy loading
- Calendly integration
- Featured On placeholder
- Content data structure

## Phase 1 Output

- [data-model.md](./data-model.md) — Content entities, section order, component interfaces  
- [contracts/component-interfaces.md](./contracts/component-interfaces.md) — Props and behavior for each section  
- [quickstart.md](./quickstart.md) — Dev setup and verification steps  
