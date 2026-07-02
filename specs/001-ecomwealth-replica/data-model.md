# Data Model: Ecom Wealth Replica Page

**Branch**: `001-ecomwealth-replica` | **Phase 1**

This feature is a static frontend page. There is no database or API. The "data model" here describes the **content structure** and **component props** used to render the page.

---

## Content Entities

### SuccessStory

Represents a written client success story.

| Field      | Type   | Description                            |
|------------|--------|----------------------------------------|
| name       | string | Client name (e.g., "Jackson H.")       |
| headline   | string | Short headline (e.g., "$140,000 in 9 months") |
| quote      | string | Full testimonial text                  |
| timeframe  | string | Duration (e.g., "9 months")            |
| figure     | string | Revenue/profit figure (e.g., "$140,000") |
| avatarUrl? | string | Optional profile image URL             |

**Validation**: All fields required except `avatarUrl`. `figure` and `timeframe` must be non-empty for compliance.

---

### StatCard (Partner Results)

Represents a single stat in "Inside Look at Partner Store Results".

| Field  | Type   | Description                              |
|--------|--------|------------------------------------------|
| figure | string | Amount (e.g., "$47,000", "$8,477")       |
| label  | string | Timeframe/context (e.g., "in 6 months")  |
| type?  | 'revenue' \| 'profit' | Optional for styling       |

**Validation**: `figure` and `label` required.

---

### FAQItem

Represents a single FAQ question and answer.

| Field   | Type   | Description           |
|---------|--------|-----------------------|
| question| string | FAQ question text     |
| answer  | string | FAQ answer text       |
| id      | string | Unique ID for accordion (e.g., "faq-1") |

**Validation**: All fields required.

---

### TeamDepartment (Optional)

For "Our Team 20+ Experts" section.

| Field  | Type   | Description                    |
|--------|--------|--------------------------------|
| name   | string | Department name                |
| description | string | Brief role description     |

---

### VideoTestimonial

For "Real Client Experiences" video embeds.

| Field    | Type   | Description                    |
|----------|--------|--------------------------------|
| youtubeId| string | YouTube embed ID               |
| title    | string | Accessible title for iframe    |

---

## Page Section Order (Structural)

The page renders sections in this order (matches Ecom Wealth Automation reference):

1. **TopNav** — Logo, phone, email
2. **Hero** — Headline, subhead, "100% Done-For-You", video, Apply CTA
3. **TrustStrip** — Limited partnerships, No Profit No Payment guarantee
4. **FeaturedOn** — Placeholder for logos
5. **RealClientExperiences** — Video testimonials + written success stories
6. **PartnerStoreResults** — Stat cards + disclaimer
7. **ProofSection** — "Proof that this system changes lives" + 4 success stories
8. **TeamSection** — 20+ experts, departments
9. **GuaranteeSection** — Risk-Free Buy-Back Guarantee
10. **MarketContext** — Global e-commerce revenue (e.g., $8.15T 2026)
11. **ApplyCTA** — "See If You Qualify" + note about selectivity
12. **FAQ** — Accordion with 8+ items
13. **Footer** — Disclaimers, links, copyright

---

## Component Interfaces (TypeScript)

```ts
// Example — not exhaustive
interface HeroProps {
  headline: string;
  subhead: string;
  doneForYouText: string;
  videoEmbedUrl: string;
  ctaText: string;
  onCtaClick: () => void;
}

interface FAQAccordionProps {
  items: FAQItem[];
  reducedMotion?: boolean;
}

interface StatCardProps {
  figure: string;
  label: string;
  type?: 'revenue' | 'profit';
}
```

---

## State (Client-Side Only)

| State       | Purpose                                |
|-------------|----------------------------------------|
| openFaqId   | Which FAQ item is expanded (accordion) |
| (none else) | All content is static; no form state   |

---

## No Persistence

- No API calls for page content
- No localStorage or sessionStorage for page data
- Calendly handles booking; redirect to `/thank-you` on success (existing flow)
