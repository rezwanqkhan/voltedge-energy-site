# VoltEdge Energy — Industrial IoT Energy Management Platform

[![Next.js 16+](https://img.shields.io/badge/Next.js-16.x-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.x-black?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Zod](https://img.shields.io/badge/Zod-3.x-3068b7?style=for-the-badge&logo=zod&logoColor=white)](https://zod.dev/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-black?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

A modern, visually impressive public-facing website for **VoltEdge Energy**, an industrial IoT energy management company selling precision submeters, smart DIN-rail gateways, and cloud-native analytics to industrial and commercial clients.

---

## 🌐 Live Deployment & Links

- **Live Vercel URL:** [https://voltedge-energy-site.vercel.app](https://voltedge-energy-site.vercel.app) *(Deploy on Vercel to activate)*
- **GitHub Repository:** [https://github.com/rezwanqkhan/voltedge-energy-site](https://github.com/rezwanqkhan/voltedge-energy-site)

---

## 🎯 Deliverables & Pages Built

Built for the **Full Stack Web Developer Intern Technical Assessment**:

| Page / Component | Deliverables & Feature Highlights | Status |
| :--- | :--- | :--- |
| **Home Page (`/`)** | Hero section with dynamic headline, real-time interactive telemetry console switcher (Main Substation Bus A, Robotics Line 3, HVAC Chiller Plant), live kW offset simulation, 4 value proposition stats (32% cost savings, 1,240+ facilities, 99.98% uptime, 48k tCO₂e), compact 2x2 product showcase, enterprise capabilities, and CTA banner. | ✅ Complete |
| **Products Page (`/products`)** | Complete industrial IoT catalog with descriptions, Lucide vector icons, category filter tabs (Hardware, Gateways, Software), spec highlight pills, and expandable technical specification sheets (Modbus RTU/TCP, LoRaWAN, DIN-rail mounting, accuracy classes). | ✅ Complete |
| **About Page (`/about`)** | Company mission, vision, core operational sectors (Automotive, Data Centers, Logistics), leadership and systems architects bios, and international compliance standard badges (ISO 50001, IEC 62443, CE, RoHS, UL). | ✅ Complete |
| **Contact Page (`/contact`)** | Working engineering consultation console with **Zod** schema validation (client-side + server-side Next.js Route Handler), instant inline error feedback, loading and success states, Munich headquarters info, and enterprise SLA guarantees. | ✅ Complete |
| **API Route Handler (`/api/contact`)** | Server-side validation endpoint processing inquiries with latency simulation and schema verification. | ✅ Complete |
| **AI Energy Copilot Widget** | Floating bottom-left interactive industrial assistant with direct engineering hotline (`+49 89 123 4567`), 2x2 clickable inquiry cards, domain-aware technical answers, and instant quote shortcuts. | ✅ Complete |
| **Smart Scroll-to-Top Dial** | Floating bottom-right circular energy dial that smoothly fills up as the user scrolls, providing one-click smooth scroll back to top. | ✅ Complete |

---

## 🎨 Design System & Aesthetics

### 1. Borderless Organic Depth & Multi-Layered Shadows
- **No Corner Lines or Cliché AI Box Borders:** Eliminated artificial corner strokes and harsh outlines (`border: none`).
- **Multi-Layered Elevation Shadows:** Surfaces use deep multi-tiered drop shadows (`0 20px 45px -12px rgba(0,0,0,0.8), 0 4px 16px -4px rgba(0,0,0,0.6)`) to naturally float above the background with high physical contrast.
- **Natural Top Light Catch:** Subtle `inset 0 1px 0 rgba(255, 255, 255, 0.08)` simulates realistic glass reflection along the top surface.

### 2. Multi-Tone Energy Glow & Color Spectrum
- **Ambient Lighting Mesh:** Radial background mesh with vivid emerald (`#34d399`, `#10b981`), electric cyan (`#06b6d4`), and warm solar amber (`#f59e0b`) accents.
- **High-Contrast Readability:** All text optimized with `text-slate-200` and pure white titles for effortless legibility across all ambient lighting conditions.
- **Zero Emojis:** Strictly standard-grade Lucide vector icons (`Zap`, `Router`, `Layers`, `ClipboardCheck`, `PhoneCall`, etc.) for authentic B2B industrial appeal.

### 3. Smooth Animations & Micro-Interactions (Framer Motion)
- **Viewport Scroll Reveals:** Smooth staggered entrance animations with spring physics.
- **Intelligent Navbar Navigation:** Soft rounded-full pill navbar with animated active indicator (`layoutId="navbar-pill"`), supporting direct route navigation to dedicated pages and scroll-spy position tracking on the homepage.
- **Dynamic Telemetry Simulation:** Live sub-second kW jitter and interactive probe selector displaying real-time power metrics across facility circuits.

---

## 🛠️ Tech Stack & Dependencies

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **Language:** [TypeScript](https://www.typescriptlang.org/) (Strict type safety)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/) (Pure vector icons, zero emojis)
- **Schema Validation:** [Zod](https://zod.dev/) (Client & server API route)
- **Deployment:** [Vercel](https://vercel.com/)

---

## 🚀 Running Locally

### 1. Clone the repository
```bash
git clone https://github.com/your-username/energy-management-site.git
cd energy-management-site
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for production
```bash
npm run build
npm run start
```

---

## 🔍 SEO & Metadata Architecture

- **Dedicated Page Metadata:** Each page (`/`, `/products`, `/about`, `/contact`) features custom `<title>`, `<meta name="description">`, and **Open Graph** tags configured for social sharing and search engines.
- **Semantic HTML5:** Full accessibility hierarchy using `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, and `<footer>`.
- **Performance Optimized:** Fonts loaded via `next/font` (`Inter` and `JetBrains Mono`) with `display: swap`.

---

## 📄 License & Attribution

Built for the Full Stack Web Developer Technical Assessment. All rights reserved © VoltEdge Energy GmbH.
