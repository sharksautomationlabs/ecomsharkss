# Component Interfaces: Ecom Wealth Replica

**Branch**: `001-ecomwealth-replica` | **Phase 1**

This document defines the props and behavioral contracts for components used on the replica page. There are **no API contracts** — the page is static and uses Calendly (external) for the Apply CTA.

---

## Section Components

### HeroSection

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| headline | string | Yes | Main hero headline |
| subhead | string | Yes | Supporting line (e.g., "We partner with qualified investors...") |
| doneForYouText | string | Yes | "100% Done-For-You. No Experience Required." |
| videoEmbedUrl | string | Yes | YouTube embed URL |
| videoTitle | string | Yes | Accessible title for iframe |
| ctaText | string | Yes | "See If You Qualify" / "Apply" |
| onCtaClick | () => void | Yes | Opens Calendly popup |

**Behavior**: Renders hero with background gradient, embedded video (lazy-loaded), and primary CTA. Uses `useInView` for scroll-triggered animations.

---

### TrustStrip

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| partnershipsText | string | Yes | Limited partnerships copy |
| guaranteeText | string | Yes | "No Profit, No Payment" or equivalent |

**Behavior**: Renders trust signals in a compact strip. No interaction.

---

### FeaturedOn

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| logos | { src: string; alt: string }[] | No | Logo URLs and alt text; empty = placeholder |

**Behavior**: Renders "Featured On" heading and logo grid. If `logos` empty, show placeholder slots or minimal structure.

---

### RealClientExperiences

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| videoTestimonials | { youtubeId: string; title: string }[] | Yes | At least 2 |
| successStories | SuccessStory[] | Yes | At least 4 |
| disclaimer | string | Yes | "Individual results vary" text |

**Behavior**: Renders video embeds (lazy) and success story cards. Includes disclaimer.

---

### PartnerStoreResults

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| stats | StatCard[] | Yes | 4–6 items |
| disclaimer | string | Yes | Results vary disclaimer |

**Behavior**: Renders stat cards in a grid. Includes disclaimer.

---

### TeamSection

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| heading | string | Yes | "Our Team Consists of 20+ Experts" |
| departments | { name: string; description: string }[] | Yes | Department list |

**Behavior**: Renders heading and department descriptions.

---

### GuaranteeSection

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| heading | string | Yes | "Risk-Free Buy-Back Guarantee" |
| body | string | Yes | Guarantee conditions |

**Behavior**: Renders guarantee with clear conditions.

---

### FAQAccordion

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| items | FAQItem[] | Yes | At least 8 |
| reducedMotion | boolean | No | From `useReducedMotion()` |

**Behavior**: Expandable accordion. Only one item open at a time. Respects reduced motion.

---

### ApplyCTA

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| ctaText | string | Yes | "See If You Qualify" |
| note | string | Yes | "We only select 5 investors per month" etc. |
| onCtaClick | () => void | Yes | Opens Calendly |

**Behavior**: Primary CTA button and supporting note. Triggers Calendly popup.

---

### EcomWealthFooter

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| disclaimers | string[] | Yes | Earnings, testimonials, risk, platform |
| copyright | string | Yes | "ECOM SHARKS © {year}" |
| links | { href: string; label: string }[] | Yes | Privacy, Contact |

**Behavior**: Renders footer with all legal copy and links. No interaction beyond links.
