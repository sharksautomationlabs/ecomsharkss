# Quickstart: Ecom Wealth Replica Page

**Branch**: `001-ecomwealth-replica` | **Target**: `/ecomautomation`

## Prerequisites

- Node.js 18+
- npm (or pnpm/yarn)

## Setup

```bash
# From repo root
npm install
```

## Run Development Server

```bash
npm run dev
```

Then open: **http://localhost:3000/ecomautomation**

## Verify Page Structure

After implementation, the page should have these sections in order:

1. Top nav (logo, phone, email)
2. Hero (headline, video, Apply CTA)
3. Trust strip (partnerships, guarantee)
4. Featured On (placeholder or logos)
5. Real Client Experiences (videos + success stories)
6. Inside Look at Partner Store Results (stat cards)
7. Proof / Success Stories (4 written stories)
8. Our Team 20+ Experts
9. Risk-Free Buy-Back Guarantee
10. Market context
11. Apply CTA
12. FAQ
13. Footer

## Test Apply CTA

Click "See If You Qualify" or "Apply". Calendly popup should open with URL:

`https://calendly.com/ecomsharkss-info/30min`

## Test Accessibility

- Use keyboard only: Tab through CTAs and FAQ items; Enter to expand/collapse
- Check contrast: Text on brand colors must meet WCAG AA
- Reduced motion: Set OS preference and verify FAQ/animations respect it

## Lint

```bash
npm run lint
```

Must pass with zero errors.

## Build

```bash
npm run build
```

Verify `/ecomautomation` builds without errors.
