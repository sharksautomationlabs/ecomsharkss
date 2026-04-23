// Content for Ecom Wealth Replica page
// Adapted for Aain ali brand; structure matches ecomwealthautomation.com

export interface SuccessStory {
  name: string;
  headline: string;
  quote: string;
  timeframe: string;
  figure: string;
  avatarUrl?: string;
}

export interface StatCard {
  figure: string;
  label: string;
  type?: 'revenue' | 'profit';
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface VideoTestimonial {
  youtubeId: string;
  title: string;
}

export interface Review {
  name: string;
  stars: number;
  quote: string;
}

export interface TeamDepartment {
  name: string;
  description: string;
}

export interface CaseStudy {
  name: string;
  figure: string;
  timeframe: string;
  quote: string;
  storeName: string;
  landingPageUrl: string;
  heroImage: string;
  productImages: string[];
}

export const heroContent = {
  headlineLine1: 'A Fully Managed eCommerce Business —',
  headlineLine2: 'Live in as',
  headlineTagline: '14 Days (or less)',
  subhead: 'We partner with qualified investors to build and manage automated eCommerce stores — leveraging USA suppliers and proven systems to launch high-performing online businesses.',
  doneForYouText: '100% Done-For-You. No Experience Required.',
  videoPrompt: 'Watch this quick video 👇',
  applyBelowLine1: 'Apply below to explore this exclusive partnership opportunity with our',
  applyBelowLine2: 'management team 👇',
  ctaText: 'See If You Qualify',
  videoEmbedUrl: 'https://www.youtube.com/embed/bigJBm1x1qE',
  videoTitle: 'Aain ali - Fully Managed E-Commerce Business',
};

export const trustStripContent = {
  partnershipsText: 'Limited partners each month—backed by our performance-aligned guarantee',
  guaranteeText: 'If your store doesn\'t generate more than your initial investment, we\'ll work until it does — making this a risk-free opportunity.',
};

export const featuredOnLogos: { src: string; alt: string }[] = [];

export const fakeReviews: Review[] = [
  { name: 'Sarah M.', stars: 5, quote: 'Incredible experience! The team set up my store in 2 weeks. Already seeing sales.' },
  { name: 'David K.', stars: 5, quote: 'Finally a hands-off solution that actually works. Best decision I\'ve made.' },
  { name: 'Jennifer L.', stars: 5, quote: 'Professional, transparent, and delivers on their promises. Highly recommend!' },
  { name: 'Michael R.', stars: 5, quote: 'From zero to $8K in the first month. The support team is amazing.' },
  { name: 'Emily T.', stars: 5, quote: 'No inventory, no stress. Exactly what I needed as a busy parent.' },
  { name: 'James P.', stars: 5, quote: 'Aain ali built and runs my store completely. I just check the dashboard weekly. Game changer.' },
];

export const videoTestimonials: VideoTestimonial[] = [
  { youtubeId: 'PkzqxZQwK_E', title: 'Client testimonial - How to get the most out of our call' },
  { youtubeId: '3kE6P9VgPuc', title: 'Client results - How our clients hit $4,000+ per month' },
];

export const successStories: SuccessStory[] = [
  {
    name: 'Jackson H.',
    headline: '$140,000 in Sales His First 9 Months',
    quote: 'When I started with Aain ali, I didn\'t know what to expect. I just wanted something that could grow quietly in the background while I kept my full-time job. The team handled everything, the store build, suppliers, order fulfilment and within a week, I saw my first sale. Nine months later my store had passed $140,000 in total sales. Watching that happen without managing the store myself was surreal.',
    timeframe: '9 months',
    figure: '$140,000',
  },
  {
    name: 'Sienna B.',
    headline: '$0 To Over $75,000 In Sales In 7 Months',
    quote: 'I\'m a mom of two, and I\'d tried every side hustle that promised flexibility. When I partnered with Aain ali, their team built my store from scratch and kept me updated each week. By month seven my store had cleared $75,000 in sales. Now the profits pay for family vacations and give me breathing room every month.',
    timeframe: '7 months',
    figure: '$75,000',
  },
  {
    name: 'Mike N.',
    headline: 'From Debt To Buying His Mom Her Dream Car',
    quote: 'I joined Aain ali after seeing a friend\'s results. In just six months, my store produced around $45,000 in sales. Enough for me to clear my remaining debt and surprise my mom with the car she\'d always wanted. The best part is how hands-off it\'s been. The team handles every moving part.',
    timeframe: '6 months',
    figure: '$45,000',
  },
  {
    name: 'Ethan T.',
    headline: '$45,000 in Sales in His First 6 Months',
    quote: 'I wanted something I could invest in that didn\'t rely on guessing the stock market. Partnering with Aain ali was exactly what I was looking for. Within the first few weeks, I started seeing sales roll in. Over six months, my store reached around $45,000 in total sales.',
    timeframe: '6 months',
    figure: '$45,000',
  },
];

export const statCards: StatCard[] = [
  { figure: '$47,000', label: 'in Just 6 Months', type: 'revenue' },
  { figure: '$8,477', label: 'Revenue In 30 Days', type: 'revenue' },
  { figure: '$10,000', label: 'Revenue In 30 Days', type: 'revenue' },
  { figure: '$5,408', label: 'Profit In Just 3 Days', type: 'profit' },
  { figure: '$8,911', label: 'Revenue In 1 Week', type: 'revenue' },
];

export const caseStudies: CaseStudy[] = [
  {
    name: 'Marcus J.',
    figure: '$47,000',
    timeframe: '6 months',
    quote: 'I invested with Aain ali while keeping my day job. Within 6 months my store had generated $47,000 in revenue. Zero inventory, zero hassle.',
    storeName: 'HomeStyle Essentials',
    landingPageUrl: 'homestyle-essentials.store',
    heroImage: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=280&fit=crop',
    productImages: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=200&h=200&fit=crop',
    ],
  },
  {
    name: 'Nina S.',
    figure: '$8,477',
    timeframe: '30 days',
    quote: 'First month in and I saw $8,477 in revenue. The team handles everything — I just approve decisions and watch the numbers grow.',
    storeName: 'TechGear Pro Shop',
    landingPageUrl: 'techgearpro.com',
    heroImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=280&fit=crop',
    productImages: [
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop',
    ],
  },
  {
    name: 'Robert K.',
    figure: '$10,000',
    timeframe: '30 days',
    quote: 'As a complete beginner, I had no idea what to expect. Aain ali built my store and within 30 days I had over $10K in sales.',
    storeName: 'Outdoor Living Co',
    landingPageUrl: 'outdoorlivingco.store',
    heroImage: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&h=280&fit=crop',
    productImages: [
      'https://images.unsplash.com/photo-1570651962463-0e8216032292?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1559526324-593bc073d938?w=200&h=200&fit=crop',
    ],
  },
  {
    name: 'Amanda W.',
    figure: '$5,408',
    timeframe: '3 days',
    quote: 'Unbelievable — $5,408 profit in just 3 days after my store went live. The system really works. Hands-off and profitable.',
    storeName: 'FitLife Gear Store',
    landingPageUrl: 'fitlifegear.store',
    heroImage: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&h=280&fit=crop',
    productImages: [
      'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1576678927484-cc907957088c?w=200&h=200&fit=crop',
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=200&h=200&fit=crop',
    ],
  },
];

export const resultsDisclaimer = 'A glimpse into the sales activity clients have experienced using our fully managed, zero-inventory system. Individual results vary.';

export const proofDisclaimer = 'These client stories reflect their personal experiences and individual results. They are examples and not guarantees of future performance. Results vary based on factors such as store activation timeline, available capital, product selection, market conditions, and client involvement. Your results may differ.';

export const teamDepartments: TeamDepartment[] = [
  { name: 'Product intelligence', description: 'Find offers with real demand' },
  { name: 'Supplier partnerships', description: 'Reliable USA-first sourcing' },
  { name: 'Listing production', description: 'Pages built to convert' },
  { name: 'Fulfillment ops', description: 'Fast, accurate shipping' },
  { name: 'Customer care', description: 'Support that protects your brand' },
  { name: 'Growth & performance', description: 'Track, tune, and scale what works' },
];

export const guaranteeContent = {
  heading: 'Performance-Aligned Guarantee',
  body: 'If your store doesn\'t generate more than your initial investment, we\'ll buy it back and cover the difference — making this a completely risk-free investment opportunity.',
};

export const marketContent = {
  heading: 'E-commerce will top $8.15 trillion by 2026',
  subheading: 'The channel is massive—execution decides who wins',
};

export const applyCtaContent = {
  ctaText: 'See If You Qualify',
  note: 'Note: We are very selective about who we partner with. We only select to partner with 5 investors per month. This will only take a few seconds of your time.',
};

export const precallFaqItems: FAQItem[] = [
  { id: 'precall-1', question: 'Is This Legit or Just Another Scam?', answer: 'Aain ali is a real e-commerce management company. We build and operate stores for qualified partners. We are transparent about our process, fees, and what you can expect. You own your store; we manage operations.' },
  { id: 'precall-2', question: 'How Do I Know This Is a Real Service, Not Just a Course?', answer: 'We provide a fully done-for-you service. Our team builds your store, sources products, handles listings, fulfillment, and customer service. You receive a live, operating store—not just training or course materials.' },
  { id: 'precall-3', question: 'Why Should I Trust You?', answer: 'We operate with full transparency. Our team has years of experience in e-commerce. We share real client results, offer clear contracts, and our incentives are aligned—we only succeed when your store succeeds.' },
  { id: 'precall-4', question: 'What Does the Upfront Capital Actually Cover?', answer: 'Your investment covers store setup, product research, supplier relationships, listing creation, and initial operational costs. We outline all costs clearly before you commit.' },
  { id: 'precall-5', question: 'Where Does My Investment Go?', answer: 'Your investment goes directly toward building and launching your store: platform fees, product sourcing, professional listing creation, and our operational infrastructure. We are transparent about where every dollar goes.' },
  { id: 'precall-6', question: 'How Do I Know You\'re Motivated to Make My Store Work?', answer: 'Our revenue is tied to your store\'s success. We have skin in the game. Our performance assurance and ongoing support show we are committed to delivering results.' },
  { id: 'precall-7', question: 'What Are Realistic Profit Expectations?', answer: 'Results vary based on capital, product selection, and market conditions. We share case studies of client results, but we do not guarantee specific returns. Many clients see sales within the first few weeks.' },
  { id: 'precall-8', question: 'When Will I Actually Start Seeing Profits?', answer: 'Many clients see their first sale within 1-2 weeks of their store going live. Profits build over time as the store gains traction. We provide regular updates so you can track progress.' },
  { id: 'precall-9', question: 'How Does This Compare to Real Estate or Stocks?', answer: 'Unlike stocks or real estate, you own an operating business. You have direct visibility into sales, inventory, and operations. It\'s hands-off in that we run it, but you retain full ownership.' },
  { id: 'precall-10', question: 'How Long Does It Take to Get Started?', answer: 'Typically 14-30 days from our initial call to a live store. We handle setup, product sourcing, and listing creation. You approve key decisions and we execute.' },
  { id: 'precall-11', question: 'What\'s Involved in the Setup and Research Phase?', answer: 'We research profitable niches, source USA suppliers, create optimized listings, and configure your store. You review and approve. No technical work required from you.' },
  { id: 'precall-12', question: 'What Are My Responsibilities as the Store Owner?', answer: 'You approve major decisions (product selection, suppliers), review weekly performance updates, and ensure your payment/account details are in order. We handle day-to-day operations.' },
  { id: 'precall-13', question: 'How Much Time Do I Actually Have to Spend on This?', answer: 'Most partners spend 30-60 minutes per week reviewing updates and approving occasional decisions. It\'s designed to be passive—we run the store; you monitor results.' },
  { id: 'precall-14', question: 'Do I Really Own the Store?', answer: 'Yes. The store is registered in your name. You own the business, the revenue, and the assets. We manage operations under our agreement.' },
  { id: 'precall-15', question: 'Will I Still Have Visibility and Control?', answer: 'Absolutely. You get dashboard access, weekly reports, and direct communication with your account manager. You approve key decisions and can review everything at any time.' },
  { id: 'precall-16', question: 'Is There Any Guarantee?', answer: 'Yes. We offer a performance assurance. If your store does not meet agreed benchmarks within the timeframe, we continue managing at no extra cost until it does. Full details are provided during your call.' },
  { id: 'precall-17', question: 'How Well Are Current Clients Doing?', answer: 'We share anonymized case studies and results with qualified applicants. Many clients have seen significant revenue within their first 6-12 months. Individual results vary.' },
  { id: 'precall-18', question: 'How Many Clients Do You Manage?', answer: 'We are selective and work with a limited number of partners to ensure quality. Our team is structured to give each store the attention it needs to succeed.' },
];

export const faqItems: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'What Is Aain ali?',
    answer: 'Aain ali builds, launches, and manages fully done-for-you eCommerce stores. We handle everything—from store setup and supplier sourcing to daily operations, order fulfillment, customer service, and ongoing scaling—so you can earn hands-off without buying inventory upfront or needing eCommerce experience.',
  },
  {
    id: 'faq-2',
    question: 'Do I Need Any Experience?',
    answer: 'No experience is required. Our team manages 100% of the store\'s operations. Your role is simply approving decisions and reviewing performance updates. We\'ve helped complete beginners, busy professionals, and business owners successfully launch automated stores.',
  },
  {
    id: 'faq-3',
    question: 'How Much Time Will I Need To Invest?',
    answer: 'Most clients spend 30–60 minutes per week reviewing updates or approving small decisions. We handle product research, listings, fulfillment, customer service, and optimization. It\'s designed to be as passive and hands-off as possible.',
  },
  {
    id: 'faq-4',
    question: 'How Long Will It Take to Start Seeing Results?',
    answer: 'Many clients begin seeing sales within the first 1-2 weeks after their store goes live. Early traction varies based on seasonality, supplier availability, and account performance. Our onboarding is built to get your store active quickly.',
  },
  {
    id: 'faq-5',
    question: 'Do I need to buy inventory upfront?',
    answer: 'No, you never purchase inventory upfront. With our model, your customers pay for the product before the supplier ships it. This removes risk and allows your store to scale without major upfront costs.',
  },
  {
    id: 'faq-6',
    question: 'How hands-off is this for me?',
    answer: 'Extremely hands-off. We manage product research, supplier relations, order fulfillment, shipment tracking, customer service, and account health. You simply monitor results and enjoy the growth.',
  },
  {
    id: 'faq-7',
    question: 'Is there a guarantee?',
    answer: 'Yes — we offer a performance assurance. If your store does not generate at least your initial investment in net profit within the agreed timeframe, we continue managing it at no additional cost until it does. This keeps our incentives fully aligned with yours.',
  },
  {
    id: 'faq-8',
    question: 'What makes this different from traditional dropshipping?',
    answer: 'Traditional dropshipping requires daily order processing, customer service, ad spend, and a lot of manual work. Our system removes all of that — no ads, no inventory, no order handling, and no technical setup. You get a fully managed backend team operating your business for you.',
  },
];

export const footerContent = {
  copyright: `Aain ali © ${new Date().getFullYear()}. All Rights Reserved.`,
  links: [
    { href: '/privacy-policy', label: 'Privacy Policy' },
    { href: '/contact', label: 'Contact Us' },
  ],
  disclaimers: [
    'Aain ali provides e-commerce management services and business opportunities. We do not offer a "get rich quick" program or guaranteed money-making system. Success depends on economic uncertainties, market conditions, and platform-specific policies. Testimonials on this page are from real clients. The results you see are not typical. Individual results may vary. Past performance does not guarantee future outcomes.',
    'All materials are the intellectual property of Aain ali and are protected by copyright. Aain ali may refer to or link to third-party content or services and is not responsible for such content.',
    'This site is not part of or endorsed by Facebook™, Meta Platforms Inc., Google™, YouTube™, Amazon™, TikTok™, Shopify™, or Walmart™. All trademarks belong to their respective owners.',
  ],
};
