import type { Metadata } from 'next';
import { Sora, Inter } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import './reviews.css';

const sora = Sora({
  variable: '--font-sora',
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  display: 'swap',
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Client Reviews & Video Testimonials | ECOM SHARKS',
  description:
    'Real, verifiable reviews from ECOM SHARKS clients on Clutch, Bark and Reviews.io — plus video testimonials. See the proof before you start.',
};

const PLATFORM_LINKS = {
  clutch: 'https://clutch.co/profile/ecom-sharkss',
  bark: 'https://www.bark.com/en/ca/company/ecom-sharkss/bvoaVv/',
  reviewsIo: 'https://www.reviews.io/company-reviews/store/www.ecomsharkss.com',
} as const;

const WRITTEN_REVIEWS = [
  {
    quote: '“They paid attention to details that made everyday shopping easier.”',
    body: 'Eyewear store build with prescription selection and checkout optimization. Reported faster load times, more mobile purchases, fewer abandoned carts, and steady order growth after launch.',
    initials: 'PL',
    name: 'Preston Lee',
    role: 'Store Owner · Eyewear Retailer',
  },
  {
    quote: '“The process felt structured — they knew the next steps without follow-ups.”',
    body: 'Full store setup for a personal care brand: listings, backend order systems, product research, and marketing. Saw consistent traffic and orders within the first few weeks.',
    initials: 'NP',
    name: 'Nash S. Porter',
    role: 'Owner · Personal Care Retailer',
  },
  {
    quote: '“Proactive communication and attention to detail truly set them apart.”',
    body: 'End-to-end ecommerce build with product sourcing and dropshipping integration. Launched on time with improved site speed and early consistent sales.',
    initials: 'CS',
    name: 'Crosby L. Sullivan',
    role: 'Head of Product Marketing · Consumer Goods',
  },
  {
    quote: '“Quick turnaround and commitment to quality — smooth and stress-free.”',
    body: 'Sustainable footwear store: theme customization, product research, payments, and SEO. Delivered a launch-ready platform with strong engagement from day one.',
    initials: 'OP',
    name: 'Orson S. Pierce',
    role: 'Product Designer · Footwear Brand',
  },
  {
    quote: '“Strong expertise in building and scaling e-commerce stores.”',
    body: 'Subscription meal-kit platform with dropshipping setup and supplier integration. Reported better loading speeds, engagement, and early traffic and sales.',
    initials: 'MS',
    name: 'Malachi M. Stone',
    role: 'Manager · Meal Kit Service',
  },
  {
    quote: '“Higher conversion rates and a smoother checkout than our previous setup.”',
    body: 'Shopify build for a bedding brand: catalog organization, checkout optimization, and performance work. Launched on schedule with reduced bounce rates.',
    initials: 'ZC',
    name: 'Zayden A. Cole',
    role: 'E-Commerce Manager · Sleep Products',
  },
  {
    quote: '“They combine creative design with real technical expertise.”',
    body: 'Home essentials store with full ecommerce capability, analytics, and post-launch training. Better UX, engagement, and operational efficiency after launch.',
    initials: 'LM',
    name: 'Lucas L. Morgan',
    role: 'Manager · Home Essentials Retailer',
  },
  {
    quote: '“Responsiveness and proactive problem-solving made the whole process seamless.”',
    body: 'High-converting cosmetics store with secure payments and order management. Reported increased sales, longer sessions, and stronger organic visibility.',
    initials: 'GS',
    name: 'Grant Sterling',
    role: 'Manager · Cosmetics Brand',
  },
  {
    quote: '“They aligned visual branding with performance-focused functionality.”',
    body: 'Full redesign for a sleep products company: UI/UX restructure, checkout flow, tracking. Improved conversions, mobile sales, and online revenue growth.',
    initials: 'MC',
    name: 'Mitchell M. Crane',
    role: 'Designer · Sleep Products Company',
  },
] as const;

export default function ReviewsPage() {
  return (
    <div className={`reviews-page ${sora.variable} ${inter.variable}`}>
      {/* ================= HERO ================= */}
      <header className="hero">
        <nav className="top-nav">
          <div className="wrap">
            <Link href="/" aria-label="ECOM SHARKS home">
              <Image src="/images/quote-logo.png" alt="ECOM SHARKS logo" width={110} height={80} style={{ objectFit: 'contain' }} priority />
            </Link>
            <Link href="/" className="back">← Back to Home</Link>
          </div>
        </nav>
        <div className="wrap hero-grid">
          <div>
            <span className="eyebrow">Client Reviews &amp; Proof</span>
            <h1>
              Still Not Sure About Us? <em>You Shouldn&apos;t Take Our Word For It.</em>
            </h1>
            <p className="lead">
              Every claim on this page is verifiable on independent platforms we don&apos;t control — Clutch, Bark and
              Reviews.io. Read the reviews, watch our clients speak on camera, then decide for yourself.
            </p>
            <div className="hero-cta">
              <a className="btn btn-teal" href="#videos">▶&nbsp; Watch Client Videos</a>
              <a className="btn btn-ghost" href="#platforms">Verify Us Independently</a>
            </div>
          </div>
          <div className="proof-card">
            <div className="big">
              4.7<span style={{ fontSize: '1.6rem', color: 'var(--muted)' }}>/5</span>
            </div>
            <div className="stars">★★★★★</div>
            <div className="sub">Overall rating on Clutch — from verified, interviewed clients</div>
            <div className="proof-rows">
              <div className="proof-row"><span>Quality of work</span><b>4.9 / 5</b></div>
              <div className="proof-row"><span>Value for cost</span><b>5.0 / 5</b></div>
              <div className="proof-row"><span>On-time delivery</span><b>4.7 / 5</b></div>
              <div className="proof-row"><span>Willing to refer us</span><b>4.7 / 5</b></div>
            </div>
          </div>
        </div>
      </header>

      {/* ================= TRUST STRIP ================= */}
      <div className="strip">
        <div className="wrap">
          <a className="badge" href={PLATFORM_LINKS.clutch} target="_blank" rel="noopener noreferrer">
            <div>
              <div className="p-name">Clutch</div>
              <div className="p-meta">4.7 ★ · 10 verified reviews</div>
            </div>
            <span className="go">→</span>
          </a>
          <a className="badge" href={PLATFORM_LINKS.bark} target="_blank" rel="noopener noreferrer">
            <div>
              <div className="p-name">Bark</div>
              <div className="p-meta">Verified business profile</div>
            </div>
            <span className="go">→</span>
          </a>
          <a className="badge" href={PLATFORM_LINKS.reviewsIo} target="_blank" rel="noopener noreferrer">
            <div>
              <div className="p-name">Reviews.io</div>
              <div className="p-meta">Independent store reviews</div>
            </div>
            <span className="go">→</span>
          </a>
        </div>
      </div>

      {/* ================= FEARS / OBJECTIONS ================= */}
      <section className="fears">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">We Know Why You&apos;re Hesitating</span>
            <h2>The Fears That Stop People From Starting — Answered With Receipts</h2>
            <p>
              You&apos;ve probably seen ecommerce &quot;agencies&quot; that overpromise and disappear. That fear is
              healthy. Here&apos;s how our actual clients answered it.
            </p>
          </div>
          <div className="fear-grid">
            <div className="fear">
              <div className="doubt">What if I hand over money and never see results?&rdquo;</div>
              <h3>Clients report measurable outcomes — not vague promises</h3>
              <p>
                Across our Clutch reviews, clients describe faster load times, more mobile purchases, fewer abandoned
                carts, and steady order growth in the first weeks after launch. And if the numbers matter most: earn
                $4,000 in your first 30 days or we work for free.
              </p>
            </div>
            <div className="fear">
              <div className="doubt">I&apos;ve been burned before. Agencies vanish once they&apos;re paid.&rdquo;</div>
              <h3>Verified clients rate our communication again and again</h3>
              <p>
                The most repeated theme in independent reviews is responsiveness — regular updates, quick revisions,
                and a team that knew the next step without being chased. Reviewers scored on-time delivery 4.7/5 on
                Clutch.
              </p>
            </div>
            <div className="fear">
              <div className="doubt">I know nothing about ecommerce. I&apos;ll get lost.&rdquo;</div>
              <h3>We&apos;re built for beginners — everything under one roof</h3>
              <p>
                Store setup, product research, listings, payments, marketing — handled end-to-end. One reviewer put it
                simply: they never had to deal with multiple vendors, and the process felt structured from day one.
              </p>
            </div>
            <div className="fear">
              <div className="doubt">How do I know these reviews aren&apos;t written by you?&rdquo;</div>
              <h3>They live on platforms we can&apos;t edit</h3>
              <p>
                Clutch verifies reviewers and publishes full project details — budgets, timelines, ratings. Bark and
                Reviews.io are equally independent. Every badge above links straight to the source. Go check.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= VIDEO TESTIMONIALS ================= */}
      <section className="videos" id="videos">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">Hear It From Them</span>
            <h2>Real Clients. Real Faces. On Camera.</h2>
            <p>
              Anyone can type a review. It takes a genuinely happy client to sit in front of a camera and talk about
              their results.
            </p>
          </div>
          <div className="video-grid">
            <div className="video-card">
              <div className="video-frame">
                <video controls preload="metadata" playsInline>
                  <source src="/videos/review-video-1.mp4" type="video/mp4" />
                  Your browser does not support video playback.
                </video>
              </div>
              <div className="video-info">
                <h3>Verified Client</h3>
                <span>Ecommerce Automation Client · On-camera review</span>
              </div>
            </div>
            <div className="video-card">
              <div className="video-frame">
                <video controls preload="metadata" playsInline>
                  <source src="/videos/review-video-2.mp4" type="video/mp4" />
                  Your browser does not support video playback.
                </video>
              </div>
              <div className="video-info">
                <h3>Verified Client</h3>
                <span>Ecommerce Automation Client · On-camera review</span>
              </div>
            </div>
          </div>
          <div className="video-note">
            🎥{' '}
            <span>
              These are unscripted client recordings. <b>No actors, no paid endorsements.</b>
            </span>
          </div>
        </div>
      </section>

      {/* ================= PLATFORM SCORES ================= */}
      <section className="scores" id="platforms">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">Don&apos;t Trust — Verify</span>
            <h2>Our Ratings Across Independent Platforms</h2>
            <p>
              Every card below opens the live profile in a new tab. We can&apos;t edit or delete a single review on any
              of these sites.
            </p>
          </div>
          <div className="score-grid">
            <a className="score" href={PLATFORM_LINKS.clutch} target="_blank" rel="noopener noreferrer">
              <div className="num">4.7</div>
              <div className="stars">★★★★★</div>
              <div className="plat">Clutch</div>
              <div className="cnt">10 verified project reviews</div>
              <span className="verify">Verify on Clutch →</span>
            </a>
            <a className="score" href={PLATFORM_LINKS.bark} target="_blank" rel="noopener noreferrer">
              <div className="num">★</div>
              <div className="stars">★★★★★</div>
              <div className="plat">Bark</div>
              <div className="cnt">Verified business profile</div>
              <span className="verify">Verify on Bark →</span>
            </a>
            <a className="score" href={PLATFORM_LINKS.reviewsIo} target="_blank" rel="noopener noreferrer">
              <div className="num">★</div>
              <div className="stars">★★★★★</div>
              <div className="plat">Reviews.io</div>
              <div className="cnt">Independent store reviews</div>
              <span className="verify">Verify on Reviews.io →</span>
            </a>
          </div>
          <div className="breakdown">
            <div className="bd"><b>4.9</b><span>Quality (Clutch)</span></div>
            <div className="bd"><b>5.0</b><span>Cost / Value (Clutch)</span></div>
            <div className="bd"><b>4.7</b><span>Schedule (Clutch)</span></div>
            <div className="bd"><b>4.7</b><span>Willing to Refer (Clutch)</span></div>
          </div>
        </div>
      </section>

      {/* ================= WRITTEN REVIEWS ================= */}
      <section className="reviews">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">In Their Words</span>
            <h2>What Verified Clients Said</h2>
            <p>
              Highlights from independently verified reviews. Full versions — including project budgets and timelines —
              are on the platforms linked above.
            </p>
          </div>
          <div className="review-grid">
            {WRITTEN_REVIEWS.map((review) => (
              <div className="review" key={review.name}>
                <div className="top">
                  <span className="stars">★★★★★</span>
                  <span className="src">Clutch · Verified</span>
                </div>
                <blockquote>{review.quote}</blockquote>
                <p>{review.body}</p>
                <div className="who">
                  <div className="avatar">{review.initials}</div>
                  <div>
                    <b>{review.name}</b>
                    <span>{review.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= GUARANTEE CTA ================= */}
      <section className="cta">
        <div className="wrap">
          <span className="eyebrow" style={{ justifyContent: 'center', display: 'flex' }}>Zero-Risk Start</span>
          <h2>
            Earn <em>$4,000 in 30 Days</em> — Or We Work For Free
          </h2>
          <p>
            You&apos;ve seen the reviews. You&apos;ve heard the clients. The only risk left is staying where you are.
            Book a free consultation with a senior consultant and get a clear, honest plan before you spend a dollar.
          </p>
          <div className="btn-row">
            <a className="btn btn-teal" href="tel:+17133377701">📞 Call (713) 337-7701</a>
            <Link className="btn btn-ghost" href="/contact">Claim Your Free Consultation</Link>
          </div>
          <div className="fine">No pressure. No obligation. Just a real conversation about whether ecommerce fits your goals.</div>
        </div>
      </section>
    </div>
  );
}
