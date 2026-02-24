# Research: Ecom Wealth Replica Page

**Branch**: `001-ecomwealth-replica` | **Phase 0**

## Decisions

### 1. Target Route

**Decision**: Replace `/ecomautomation` with the new replica page.

**Rationale**: The spec says "Target page is `/ecomautomation`" in Assumptions. The existing `/ecomautomation` has a different structure (4-step confirmation flow); the replica will fully replace it with the Ecom Wealth Automation structure. The `/ecommerce-automation` page uses shared components (ThankYouHeader, EcommerceAutomationExperts) and serves a different entry point; we keep it unchanged unless product decides to consolidate later.

**Alternatives considered**:
- Replace `/ecommerce-automation` instead — rejected; spec and assumptions point to ecomautomation.
- Create a new route `/ecom-wealth` — rejected; spec says replace existing page.

---

### 2. Component Architecture

**Decision**: Single page component at `app/ecomautomation/page.tsx` with extracted sections as local components or shared components in `app/components/` where reuse makes sense (e.g., FAQ accordion, stat cards).

**Rationale**: ECOM SHARKS constitution requires components in `app/components/`, functional components, default exports. The reference site has many distinct sections; extracting each to a component improves maintainability. Sections unique to this page (e.g., HeroEcomWealth, PartnerResults, SuccessStories) can live inline or in a feature folder like `app/components/ecomwealth/` if the page becomes large.

**Alternatives considered**:
- All-in-one page — acceptable for MVP but harder to maintain.
- Full component library per section — overkill; only extract when logic/UI is reusable.

---

### 3. FAQ Accordion Pattern

**Decision**: Use a simple expandable accordion with `useState` for open index. Respect `prefers-reduced-motion` by disabling or simplifying animation.

**Rationale**: Spec requires expandable accordion for FAQ. Framer Motion supports `useReducedMotion()`; we can skip or simplify animations when user prefers reduced motion. No external accordion library needed; lightweight implementation with Tailwind + Framer Motion.

**Alternatives considered**:
- Radix UI Accordion — adds dependency; constitution prefers minimal deps.
- Plain collapsed sections — acceptable but accordion UX is preferred per reference site.

---

### 4. Video Lazy Loading

**Decision**: Use existing `useVideoLazyLoading` hook from `app/utils/videoLazyLoading.ts` (or equivalent) with Intersection Observer to lazy-load video embeds when in view.

**Rationale**: Constitution mandates "Lazy-load videos via Intersection Observer". The thank-you page already uses `useVideoLazyLoading`; we reuse the same pattern for YouTube iframes. Add `loading="lazy"` and poster/placeholder for native video if used.

**Alternatives considered**:
- Load all videos on mount — violates performance goals.
- Third-party lazy-load library — unnecessary; Intersection Observer is built-in.

---

### 5. Calendly Integration for Apply CTA

**Decision**: Use `Calendly.initPopupWidget({ url: 'https://calendly.com/ecomsharkss-info/30min' })` on CTA click, matching existing components (CallProcess, StrategyCall, etc.).

**Rationale**: Spec says "Calendly or existing booking flow will be used". The codebase already uses this pattern in 20+ components. CalendlyScript is loaded in layout; we call `initPopupWidget` when user clicks "See If You Qualify" / "Apply".

**Alternatives considered**:
- Inline Calendly widget — reference site uses inline in some places; popup is simpler for multiple CTAs.
- Custom form — out of scope; no new backend.

---

### 6. "Featured On" Section

**Decision**: Build a placeholder structure (heading + slots for logos) that can accept assets later. If no assets provided, show a minimal "As seen on" bar with placeholder or omit until client provides logos.

**Rationale**: Spec says "if assets are available; otherwise a placeholder structure". We implement the layout and leave image slots; client can add logos via `public/images/featured/` when ready.

**Alternatives considered**:
- Hardcode placeholder logos — avoid; use neutral placeholder or omit.
- Skip section entirely — spec requires structure; placeholder satisfies FR-005.

---

### 7. Content Data Structure

**Decision**: Define section content as TypeScript constants/objects in the page or a dedicated `ecomwealthContent.ts` file. No CMS or API; static content only.

**Rationale**: No database per constitution. Content will be adapted from reference site and ECOM SHARKS messaging. Centralizing in a content file makes copy updates easier.

**Alternatives considered**:
- JSON file — valid; TS provides better typing.
- Inline in JSX — fine for small pages; content file scales better for 8+ sections.
