# VoltEdge Energy — Industrial IoT Energy Management Platform

> Precision edge telemetry, sub-second demand monitoring, and automated ISO 50001 compliance for mission-critical manufacturing, automotive, and data center facilities.

[![Next.js](https://img.shields.io/badge/Next.js-16.x_App_Router-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-00e5ff?style=for-the-badge&logo=tailwind-css&logoColor=black)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.x-black?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Zod](https://img.shields.io/badge/Zod-3.x-3068b7?style=for-the-badge&logo=zod&logoColor=white)](https://zod.dev/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-black?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

---

## 🌐 Live Deployment & Links

- **Live Vercel URL:** [https://voltedge-energy-site.vercel.app](https://voltedge-energy-site.vercel.app)
- **Repository:** [https://github.com/rezwanqkhan/voltedge-energy-site](https://github.com/rezwanqkhan/voltedge-energy-site)

---

## 🧭 Pages & Live Navigation

| Route | Page Name | Core Responsibilities |
| :--- | :--- | :--- |
| [`/`](https://voltedge-energy-site.vercel.app/) | **Home** | Hero telemetry console, value propositions, key hardware features, client proof, and deployment CTA |
| [`/products`](https://voltedge-energy-site.vercel.app/products) | **Products** | Comprehensive engineering catalog, interactive category filtering, technical `SpecTable` matrices, contextual quote routing |
| [`/about`](https://voltedge-energy-site.vercel.app/about) | **About** | Company mission, leadership team, ISO 50001 / IEC 62443 compliance standards, global office hubs |
| [`/contact`](https://voltedge-energy-site.vercel.app/contact) | **Contact** | Working RFQ consultation form with client & server Zod validation, auto-focus errors, honeypot spam protection |

---

## ✨ Features

- **Benefit-Led Industrial Architecture:** Crisp, jargon-free hero with benefit-led headline (*"Cut your peak energy costs by up to 32%"*), compact compliance pill, and dual CTA structure.
- **Truly Dynamic Edge Telemetry Card:** Live fluctuating load simulation across 4 plant circuits (Substation Bus A, Robotics Cell 3, HVAC Chiller 1, Cleanroom Air), reactive voltage/frequency indicators, circuit sparklines, and auto-pause when the tab is hidden (`document.visibilityState`) or reduced motion is enabled.
- **Alternating Section Rhythm on Home:**
  - Hero (Dark Navy)
  - Social Proof Strip with 6 fictional industrial wordmark logos (Light)
  - Compact Products Teaser without spec clutter (Light)
  - Viewport Count-Up Metrics (Dark)
  - High-Reliability Features & Edge Autonomy (Light)
  - Turnkey 14-Day Industrial Deployment Roadmap (Dark)
  - High-Impact Final CTA (Electric Cyan Accent)
- **Single Source of Truth Catalog (`src/lib/products.ts`):** Central typed catalog powering both the concise Home teaser and the comprehensive `/products` catalog with full technical spec tables, protocol compatibility, and blueprint icons.
- **Product-Aware Contextual CTAs:** "Request Quote" buttons automatically route to `/contact?product=<slug>`, where `useSearchParams()` pre-selects the product of interest seamlessly within a React `<Suspense>` boundary.
- **Deep-Link Anchor Navigation & Glow Highlighting:** `/products#edgegateway-x4` scrolls with `scroll-mt-28` to offset sticky navigation and triggers an animated highlight ring on the target product card.
- **Turnkey Contact Consultation Engine:** Client- and server-side Zod validation with real-time inline errors, auto-focus on first invalid input, hidden honeypot spam trap, and animated submission confirmation.
- **Enterprise Copilot & Ergonomics:** Compact AI inquiries modal with direct engineering contact numbers, rapid inquiry chips, and bottom-right scroll progress dial.
- **Strict Reduced-Motion Support:** All animations across Framer Motion, counter numbers, and live telemetry respect `prefers-reduced-motion: reduce`.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router, Turbopack, React 19)
- **Language:** [TypeScript](https://www.typescriptlang.org/) (Strict mode, zero `any` types)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) with `@theme` design tokens
- **Animation & Motion:** [Framer Motion 12](https://www.framer.com/motion/) (`layoutId`, `AnimatePresence`, `useReducedMotion`, `useInView`)
- **Typography:** `next/font/google` (`Inter` for body/headings and `JetBrains Mono` for telemetry and tabular figures)
- **Icons:** [Lucide React](https://lucide.dev/) (Strict vector iconography, zero emojis)
- **Validation:** [Zod 3](https://zod.dev/) (Shared client and API route schema)
- **Hosting & CI/CD:** [Vercel](https://vercel.com/) with Edge caching and dynamic OpenGraph generation

---

## 🚀 Running Locally

### Prerequisites
- Node.js 18.18+ or 20+
- npm 9+ (or pnpm / yarn)

### 1. Clone & Install
```bash
git clone https://github.com/rezwanqkhan/voltedge-energy-site.git
cd energy-site
npm install
```

### 2. Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Key variables:
- `NEXT_PUBLIC_SITE_URL`: Canonical URL for metadata and OpenGraph images (defaults to `https://voltedge-energy-site.vercel.app` or `http://localhost:3000` in dev).
- `RESEND_API_KEY`: *(Optional)* API key for automated customer email dispatch.
- `CONTACT_NOTIFICATION_EMAIL`: *(Optional)* Notification destination for inbound RFQs.

### 3. Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Quality Checks & Verification
```bash
# Type check without emitting files
npx tsc --noEmit

# Lint check for style and rules
npm run lint

# Production bundle compilation
npm run build

# Start production server
npm run start
```

---

## 📁 Project Structure

```
energy-site/
├── .env.example                  # Environment configuration template
├── README.md                     # Comprehensive documentation
├── package.json                  # Dependencies & execution scripts
├── tsconfig.json                 # TypeScript compiler configuration
├── next.config.ts                # Next.js App Router configuration
├── public/                       # Static assets & SVG icons
│   ├── images/                   # Product & illustrative photography
│   └── screenshots/              # Desktop and mobile UI captures
└── src/
    ├── app/                      # Next.js App Router pages & metadata
    │   ├── layout.tsx            # Global layout, fonts, JSON-LD Organization
    │   ├── template.tsx          # Fast page transition wrapper (Framer Motion)
    │   ├── page.tsx              # Home page with alternating rhythm
    │   ├── globals.css           # Tailwind v4 theme, tokens & utilities
    │   ├── opengraph-image.tsx   # Dynamic 1200x630 branded OpenGraph card
    │   ├── twitter-image.tsx     # Branded Twitter Summary Card
    │   ├── icon.tsx              # Dynamic SVG-rendered favicon
    │   ├── sitemap.ts            # XML Sitemap generation
    │   ├── robots.ts             # Search engine crawling policies
    │   ├── not-found.tsx         # 404 error experience
    │   ├── loading.tsx           # Route transition loading state
    │   ├── error.tsx             # Error boundary with reset trigger
    │   ├── products/
    │   │   └── page.tsx          # Interactive catalog with SpecTables & filter tabs
    │   ├── about/
    │   │   └── page.tsx          # Mission, values, milestone roadmap & fictional team
    │   ├── contact/
    │   │   └── page.tsx          # Product-aware RFQ form with Suspense boundary
    │   └── api/
    │       └── contact/
    │           └── route.ts      # Server-side Zod validation with honeypot guard
    ├── components/
    │   ├── layout/
    │   │   ├── Navbar.tsx        # Sticky header, animated layoutId indicator, drawer
    │   │   └── Footer.tsx        # Structured footer with direct deep links & badges
    │   ├── home/
    │   │   ├── LiveTelemetryDashboard.tsx  # Interactive live power walk console
    │   │   ├── DeploymentTimeline.tsx      # Turnkey 14-day horizontal/vertical steps
    │   │   └── SocialProofSection.tsx      # Fictional client marquee & case studies
    │   └── ui/
    │       ├── Button.tsx        # Accessible interactive button with micro-tap
    │       ├── Card.tsx          # Dark and light surface card primitives
    │       ├── Section.tsx       # Semantic section container (dark/light/accent)
    │       ├── SectionHeading.tsx# Fluid eyebrow, title, and subtitle block
    │       ├── Badge.tsx         # Compact status pill with optional pulse dot
    │       ├── StatCard.tsx      # Viewport count-up metric display
    │       ├── SpecTable.tsx     # Tabular mono spec matrix with zebra striping
    │       ├── Reveal.tsx        # Staggered reveal components with reduced-motion
    │       ├── ScrollReveal.tsx  # Viewport intersection wrapper
    │       ├── ScrollToTop.tsx   # Circular scroll indicator dial
    │       └── FloatingContactWidget.tsx # Industrial copilot assistant modal
    ├── lib/
    │   ├── products.ts           # Single source of truth product specifications
    │   ├── utils.ts              # Class name merging utility (clsx / twMerge)
    │   └── validations/
    │       └── contact.ts        # Shared Zod contact schema
    └── types/
        └── index.ts              # Central TypeScript interfaces & types
```

---

## 🎨 Design Decisions

### 1. Unified Accent Palette & Surface Hierarchy
- **Single Accent Color:** **Electric Cyan (`#00e5ff`)** was selected to project modern industrial IoT authority. Accent color usage is strictly reserved for:
  - Primary CTAs
  - Active telemetry values & frequency indicators
  - Interactive hover and active focus rings
  - Highlighting key metrics
- **Surfaces:** Dark surfaces (`#060c18` / `#0d172a`) alternate with neutral light surfaces (`#f8fafc` / `#ffffff`) to establish visual rhythm on the Home page, avoiding visual fatigue.

### 2. Typography & Tabular Numerals
- **Inter (Sans):** Provides crisp legibility for headings and body copy across all screen resolutions.
- **JetBrains Mono (Monospace):** Loaded via `next/font` for all telemetry values, electrical specifications, tolerances, and timeline dates. Styled with `font-variant-numeric: tabular-nums` to prevent layout jitter during real-time number fluctuations.

### 3. Separation of Concerns: Home vs. Products
- **Home Page:** Purpose-built for high-level executive decision makers (VP of Operations, Plant Directors). Features concise benefit statements, live telemetry demonstration, social proof, and a 14-day deployment timeline. Spec bullet lists are intentionally omitted.
- **Products Page:** Dedicated engineering catalog with category filtering (All / Hardware / Software), full technical `SpecTable` matrices (Modbus, LoRaWAN, DIN-rail mounting, accuracy classes), and direct datasheet download triggers.

### 4. Product-Aware CTAs & Deep Linking
- Every product card on both Home and Products routes provides contextual actions:
  - "Request Quote" routes to `/contact?product=<slug>`, where `useSearchParams()` (isolated inside a `<Suspense>` boundary) automatically pre-fills the inquiry dropdown.
  - "View details" links directly to the anchored section `/products#<slug>`, scrolling into position with `scroll-mt-28` to clear the sticky navbar and triggering an animated spotlight glow ring.

### 5. Animation Principles & Reduced Motion
- Micro-interactions are subtle: button taps scale down slightly (`0.97`), card hovers lift by `-4px` with a soft cyan glow.
- Viewport animations execute once (`viewport={{ once: true }}`) to prevent distracting repetitions during reading.
- `useReducedMotion()` from Framer Motion is integrated across all animated components, disabling number count-up loops and replacing sliding offsets with immediate opacity reveals for users with vestibular sensitivities.

### 6. Comprehensive SEO & Structured Data
- **Next.js Metadata API:** Custom titles, descriptions, canonical links, and OpenGraph/Twitter cards configured across every route using `%s | VoltEdge Energy`.
- **Dynamic OG Image:** Server-rendered 1200x630 banner generated in `app/opengraph-image.tsx` using Next.js Edge runtime.
- **JSON-LD Structured Data:**
  - `Organization` schema embedded in `app/layout.tsx`.
  - `ItemList` product catalog schema embedded in `app/products/page.tsx`.
- **Sitemap & Robots:** Autogenerated `sitemap.xml` and `robots.txt` ensuring complete search engine indexability.

---

## ♿ Accessibility & Performance

- **Tap Targets:** Every interactive element (buttons, links, drawer toggles, copilot trigger) meets or exceeds the WCAG AA minimum target size of **44x44px** on mobile viewports.
- **Color Contrast:** All text pairings against dark and light surfaces pass WCAG AA contrast standards (minimum 4.5:1 for body copy and 3:1 for large headings).
- **Keyboard Navigation:** Explicit visible focus rings (`focus-visible:ring-2 focus-visible:ring-accent`) on all interactive components. The mobile navigation drawer traps focus and listens for the `Escape` key to close.
- **Semantic Structure:** Strict heading hierarchy with exactly one `<h1>` per page.
- **Performance Targets:** Built to achieve **≥ 90** across Performance, Accessibility, Best Practices, and SEO on Google Lighthouse.

---

## 🚢 Deployment Notes

1. **Vercel Deploy:** Import the repository into the Vercel dashboard with framework preset set to **Next.js**.
2. **Environment Configuration:** In Vercel Project Settings > Environment Variables, configure:
   ```
   NEXT_PUBLIC_SITE_URL=https://your-custom-domain.com
   ```
3. **Build Command:** `next build` (zero warnings or type errors).

---

## 🔮 Possible Future Improvements

1. **Interactive Single-Line Diagram Configurator:** A graphical drag-and-drop tool allowing plant engineers to calculate the exact bill of materials (BOM) needed for their substation topology.
2. **Live WebSocket Telemetry Demo:** Replace the realistic random-walk client simulation with an active public WebSocket stream connected to a demo DIN-rail test bench.
3. **Automated Resend Inbound Routing:** Wire the Next.js Route Handler directly into Resend to route inbound RFQs to regional sales engineers based on country code.
4. **Multilingual Localization (i18n):** German and French translations to support Central European manufacturing hubs.

---

## 📄 License & Attribution

All rights reserved © VoltEdge Energy Inc. Fictional trademarks, client wordmarks, and case studies are generated strictly for demonstrative purposes.
