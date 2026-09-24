# Wanderlust Platform — Travel Discovery Engine

> A high-performance, SEO-first travel discovery platform built with Next.js App Router, React 19, TypeScript, Tailwind CSS, and Prisma ORM.

---

## 1. Overview & Long-Term Vision

The **Wanderlust Platform** is designed around an organic discovery funnel:
$$\text{Editorial Content} \longrightarrow \text{Organic Search Traffic} \longrightarrow \text{Destination Exploration} \longrightarrow \text{Trip Planning} \longrightarrow \text{Partner/Affiliate Revenue}$$

Unlike traditional booking engines or generic travel blogs, the core architecture is organized around an immutable geographic model:
$$\textbf{Country} \longrightarrow \textbf{Region / State} \longrightarrow \textbf{Destination / City} \longrightarrow \textbf{Place / Landmark}$$

Content (editorial guides, curated itineraries, photography, and logistical advice) connects directly to these geographical nodes to maximize topical authority and SEO crawlability.

---

## 2. Technology Stack & Key Versions

| Layer | Technology | Version | Purpose |
|---|---|---|---|
| **Framework** | Next.js (App Router) | 16.3.6 | Hybrid Server Components, static generation & SEO routes |
| **UI Library** | React | 19.2.8 | Server-rendered declarative UI |
| **Language** | TypeScript | 5.x | Strict end-to-end type safety |
| **Styling** | Tailwind CSS | 4.x | Utility-first design system with zero-runtime CSS |
| **ORM** | Prisma ORM | 6.19.3 | Relational database modeling, migrations & seeding |
| **Database** | PostgreSQL | 15+ (target) | Relational database with geographic relations |
| **Fonts** | Google Fonts (`next/font`) | - | Inter (Sans) & Playfair Display (Editorial Serif) |

---

## 3. Project Architecture

```
wanderlust-platform/
├── prisma/
│   ├── schema.prisma        # Complete relational schema (14 models)
│   └── seed.ts              # Idempotent seed script (India -> Himachal -> Manali -> Places)
├── public/                  # Static assets & SVG icons
├── src/
│   ├── app/                 # Next.js App Router (Server Components by default)
│   │   ├── destinations/    # /destinations, /[country], /[country]/[region]
│   │   ├── places/          # /places, /[slug]
│   │   ├── travel-guides/   # /travel-guides, /[slug]
│   │   ├── itineraries/     # /itineraries, /[slug]
│   │   ├── things-to-do/    # /things-to-do, /[slug]
│   │   ├── search/          # /search discovery route
│   │   ├── globals.css      # Design tokens, fonts & accessibility reset
│   │   ├── layout.tsx       # Root layout with SEO metadata & navigation
│   │   ├── page.tsx         # Foundation homepage showcase
│   │   ├── robots.ts        # Dynamic robots.txt metadata route
│   │   └── sitemap.ts       # Dynamic sitemap.xml generator
│   ├── components/
│   │   ├── layout/          # Navigation, Footer
│   │   └── ui/              # Button, Container, Section, Heading, Card, ImageCard, Badge, Input, SearchInput, Breadcrumb
│   ├── config/              # Site-wide constants & route maps (site.ts)
│   ├── lib/                 # Core utilities (db.ts singleton, seo.ts, images.ts, utils.ts)
│   └── types/               # Domain TypeScript interfaces decoupled from ORM
├── .env.example             # Documented environment variables template
├── AGENTS.md                # Permanent engineering conventions & code quality rules
├── package.json             # Scripts & dependency definitions
└── tsconfig.json            # Strict TypeScript configuration
```

---

## 4. Local Development & Setup

### Prerequisites
- **Node.js**: v20.18.0 or higher
- **npm**: 10.x or higher
- **PostgreSQL**: Local instance or remote URL (optional during UI/SEO inspection)

### Installation
```bash
# 1. Clone repository and install dependencies
cd wanderlust-platform
npm install

# 2. Configure environment variables
cp .env.example .env
# Edit DATABASE_URL in .env with your PostgreSQL credentials

# 3. Generate Prisma client
npx prisma generate
```

### Database Setup & Seeding
```bash
# Validate Prisma schema
npx prisma validate

# Run database migrations (requires live PostgreSQL connection)
npx prisma migrate dev --name init

# Seed database with sample hierarchy (India -> HP -> Manali)
npx prisma db seed
```

### Running the Application
```bash
# Start development server
npm run dev

# Run type check & production build
npm run build

# Start production server
npm run start
```
The application will be accessible at [http://localhost:3000](http://localhost:3000).

---

## 5. Architectural Decisions (Foundation Phase)

1. **Server Components as the Baseline**: Over 90% of the platform consists of Server Components. Client Components (`"use client"`) are strictly confined to interactive leaf nodes (e.g., search input, mobile navigation toggle).
2. **First-Class SEO**: Page metadata (`title`, `description`, `canonical`, `openGraph`, `twitter`) and JSON-LD structured data (`WebSite`, `BreadcrumbList`, `Place`, `Article`) are generated via centralized helpers in `src/lib/seo.ts`.
3. **Decoupled Domain Types**: Presentation components consume domain interfaces from `src/types/index.ts` rather than coupling UI directly to Prisma schema models.
4. **Accessible Micro-Interactions**: Hover cards use CSS hardware-accelerated transitions; all interactive elements respect `prefers-reduced-motion`.
