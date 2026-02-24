# Tasks: Ecom Wealth Replica Page

**Input**: Design documents from `/specs/001-ecomwealth-replica/`  
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Tests**: Not requested in spec — manual QA per quickstart.md

**Organization**: Tasks grouped by user story for independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: User story (US1–US7)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Content structure and placeholder assets

- [x] T001 Create content types and placeholder data in `app/utils/ecomwealthContent.ts` (SuccessStory, StatCard, FAQItem, video testimonials, team departments, FAQ items)
- [x] T002 [P] Create `public/images/featured/` directory for Featured On logos (empty; client adds later)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Base page scaffold with TopNav; MUST complete before any user story

- [x] T003 Scaffold `app/ecomautomation/page.tsx` with `'use client'`, TopNav (logo, phone, email), layout wrapper, and section placeholders in correct order per data-model.md

**Checkpoint**: Base page loads at /ecomautomation with TopNav; section placeholders ready

---

## Phase 3: User Story 1 - Visitor Lands and Understands Value Proposition (Priority: P1) 🎯 MVP

**Goal**: Hero section with headline, "100% Done-For-You", embedded video (lazy-loaded), and Apply CTA opening Calendly

**Independent Test**: Load /ecomautomation; hero visible in <2.5s; video and CTA present; CTA opens Calendly popup

- [x] T004 [US1] Implement Hero section in `app/ecomautomation/page.tsx` with headline, subhead, "100% Done-For-You. No Experience Required.", and brand colors
- [x] T005 [US1] Add YouTube video embed (lazy-loaded via Intersection Observer) in hero section in `app/ecomautomation/page.tsx`
- [x] T006 [US1] Add primary CTA button ("See If You Qualify") in hero that calls `Calendly.initPopupWidget({ url: 'https://calendly.com/ecomsharkss-info/30min' })` in `app/ecomautomation/page.tsx`

**Checkpoint**: Hero delivers value proposition; CTA opens Calendly; LCP < 2.5s

---

## Phase 4: User Story 2 - Visitor Sees Social Proof and Guarantees (Priority: P1)

**Goal**: Trust strip (limited partnerships, No Profit No Payment guarantee) and Featured On placeholder

**Independent Test**: Scroll past hero; see partnerships copy, guarantee, Featured On structure

- [x] T007 [P] [US2] Implement TrustStrip section (limited partnerships, No Profit No Payment guarantee) in `app/ecomautomation/page.tsx`
- [x] T008 [P] [US2] Implement FeaturedOn section with placeholder structure (heading + logo slots) in `app/ecomautomation/page.tsx`

**Checkpoint**: Trust signals visible; Featured On layout ready for logos

---

## Phase 5: User Story 3 - Visitor Experiences Real Client Stories (Priority: P1)

**Goal**: Real Client Experiences section with 2+ video testimonials, 4+ written success stories, disclaimer

**Independent Test**: Scroll to testimonials; see videos and 4 success stories with names/figures; disclaimer present

- [x] T009 [US3] Implement RealClientExperiences section with video testimonial embeds (lazy-loaded) in `app/ecomautomation/page.tsx`
- [x] T010 [US3] Add 4+ written success stories (SuccessStory cards with name, headline, quote, figure, timeframe) and disclaimer in `app/ecomautomation/page.tsx`

**Checkpoint**: Video and written testimonials visible; disclaimer shown

---

## Phase 6: User Story 4 - Visitor Sees Partner Store Results (Priority: P2)

**Goal**: Inside Look at Partner Store Results section with 4–6 stat cards and disclaimer

**Independent Test**: Scroll to results section; see 4–6 stat cards; disclaimer present

- [x] T011 [US4] Implement PartnerStoreResults section with 4–6 StatCards and disclaimer in `app/ecomautomation/page.tsx`

**Checkpoint**: Stat cards visible; disclaimer shown

---

## Phase 7: User Story 5 - Visitor Learns About Team and Guarantee (Priority: P2)

**Goal**: Our Team 20+ Experts section and Risk-Free Buy-Back Guarantee section

**Independent Test**: Scroll to team and guarantee; see department roles and guarantee conditions

- [x] T012 [P] [US5] Implement TeamSection ("Our Team Consists of 20+ Experts", department list) in `app/ecomautomation/page.tsx`
- [x] T013 [P] [US5] Implement GuaranteeSection (Risk-Free Buy-Back Guarantee, conditions) in `app/ecomautomation/page.tsx`

**Checkpoint**: Team and guarantee sections visible

---

## Phase 8: User Story 6 - Visitor Can Apply and Get Answers from FAQ (Priority: P2)

**Goal**: FAQ accordion (8+ items) and Apply CTA; CTA opens Calendly

**Independent Test**: Click Apply CTA → Calendly opens; expand FAQ items; see 8+ questions with answers

- [x] T014 [US6] Create `app/components/EcomWealthFAQ.tsx` with accordion (useState openFaqId, useReducedMotion, 8+ FAQItem)
- [x] T015 [US6] Add EcomWealthFAQ and ApplyCTA section ("See If You Qualify", note about selectivity) to `app/ecomautomation/page.tsx` with Calendly popup handler

**Checkpoint**: FAQ accordion works; Apply CTA opens Calendly

---

## Phase 9: User Story 7 - Visitor Sees Market Context and Footer (Priority: P3)

**Goal**: Market context (e.g., $8.15T 2026) and footer with disclaimers, links, copyright

**Independent Test**: Scroll to bottom; see market stats; footer has earnings/testimonials/risk/platform disclaimers, Privacy/Contact links, copyright

- [x] T016 [P] [US7] Implement MarketContext section (global e-commerce revenue projection) in `app/ecomautomation/page.tsx`
- [x] T017 [P] [US7] Implement EcomWealthFooter (disclaimers, copyright, Privacy/Contact links) in `app/ecomautomation/page.tsx`

**Checkpoint**: Market and footer visible; all disclaimers present

---

## Phase 10: Polish & Cross-Cutting Concerns

**Purpose**: Responsiveness, accessibility, performance, lint

- [x] T018 Ensure all sections are responsive (320px–1920px, no horizontal scroll) and CTAs are tappable in `app/ecomautomation/page.tsx` and `app/components/EcomWealthFAQ.tsx`
- [x] T019 Add `prefers-reduced-motion` handling (useReducedMotion in FAQ, simplify/skip animations) in `app/components/EcomWealthFAQ.tsx` and hero/scroll animations in `app/ecomautomation/page.tsx`
- [x] T020 [P] Run `next lint` and fix any errors in modified files
- [x] T021 Run quickstart.md validation (load /ecomautomation, verify section order, test CTA, check LCP/CLS)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies — start immediately
- **Phase 2 (Foundational)**: Depends on Phase 1 — BLOCKS all user stories
- **Phase 3–9 (User Stories)**: Depend on Phase 2; can proceed sequentially (P1→P2→P3) or in parallel if staffed
- **Phase 10 (Polish)**: Depends on all user story phases

### User Story Dependencies

- **US1**: After Phase 2 — no other story dependency
- **US2**: After Phase 2 — no other story dependency
- **US3**: After Phase 2 — no other story dependency
- **US4**: After Phase 2 — no other story dependency
- **US5**: After Phase 2 — no other story dependency
- **US6**: After Phase 2 — no other story dependency
- **US7**: After Phase 2 — no other story dependency

### Parallel Opportunities

- T001 and T002 can run in parallel
- T007 and T008 (US2) can run in parallel
- T012 and T013 (US5) can run in parallel
- T016 and T017 (US7) can run in parallel
- T020 can run in parallel with T018, T019

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Phase 1: Setup
2. Phase 2: Foundational
3. Phase 3: User Story 1
4. **STOP and VALIDATE**: Hero visible, CTA opens Calendly, LCP < 2.5s
5. Deploy/demo if ready

### Incremental Delivery

1. Setup + Foundational → base page
2. US1 → Hero + CTA (MVP)
3. US2 → Trust + Featured On
4. US3 → Testimonials
5. US4 → Partner results
6. US5 → Team + Guarantee
7. US6 → FAQ + Apply CTA
8. US7 → Market + Footer
9. Polish → Responsiveness, a11y, lint

---

## Notes

- [P] tasks = different files or non-blocking
- [Story] label maps task to user story for traceability
- Each user story independently testable
- Commit after each task or logical group
- Reuse `app/utils/videoLazyLoading.ts` and `app/utils/animations.ts` where applicable
