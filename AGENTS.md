<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Wanderlust Platform — Engineering Rules & Conventions

This document defines the permanent architectural, engineering, and code-quality rules for the Wanderlust travel discovery platform. All engineers and AI agents working on this codebase must adhere strictly to these principles.

---

## 1. Product & Architectural Principles

- **Commercial Quality**: Code must be written as a serious commercial product. Maintainability and clarity always take precedence over clever or obscure implementations.
- **Stateless by Default**: Keep application layers stateless wherever possible to allow effortless horizontal scaling.
- **No Premature Complexity**: Do NOT introduce microservices, message queues, Docker/Kubernetes requirements, Redis caching, or GraphQL unless proven necessary by measurable traffic and business scale.
- **Isolated Domain Boundaries**: Keep database access (`src/lib/db.ts`), SEO logic (`src/lib/seo.ts`), domain types (`src/types/`), and UI components (`src/components/`) strictly decoupled.

---

## 2. Server Components vs. Client Components

- **Server Components by Default**: All components, layouts, and page routes in `src/app/` are Server Components unless direct browser interactivity is strictly required.
- **Client Components (`"use client"`)**:
  - Restrict `"use client"` solely to leaf components requiring DOM events, client React state (`useState`, `useEffect`), or browser APIs (e.g., `SearchInput.tsx`, mobile menu in `Navigation.tsx`).
  - Never place database queries or secret keys in Client Components.
  - Do NOT make SEO-critical markup or text content dependent on client-side JavaScript execution.

---

## 3. SEO Architecture & Requirements

- **First-Class Requirement**: Every public page MUST produce valid, unique, and compelling metadata.
- **Centralized Metadata Generator**: Always use `generatePageMetadata()` in `src/lib/seo.ts` rather than ad-hoc inline metadata definitions.
- **JSON-LD Structured Data**: Pages representing entities (Destinations, Places, Articles, Breadcrumbs) must output valid Schema.org structured data using the helpers in `src/lib/seo.ts` (`buildWebSiteJsonLd`, `buildPlaceJsonLd`, `buildArticleJsonLd`, `buildBreadcrumbJsonLd`).
- **Canonical URLs & Robots**: Every page must define its canonical URL. Internal search and non-public utility routes must include `robots: { index: false, follow: true }`.
- **Semantic Hierarchy**: Exactly one `<h1>` per page. Heading hierarchy (`<h2>`, `<h3>`) must reflect semantic document structure, not visual font sizing (use `<Heading size="..." as="h2">`).

---

## 4. Performance Standards

- **Core Web Vitals Targets**:
  - **LCP** (Largest Contentful Paint) < 2.5s
  - **INP** (Interaction to Next Paint) < 200ms
  - **CLS** (Cumulative Layout Shift) < 0.1
- **Next.js Image Component**: Always use `next/image` with explicit `width`/`height` or `fill` with `sizes` to prevent layout shifts.
- **Zero Heavy UI Dependencies**: Avoid heavyweight UI component libraries or monolithic icon packs. Prefer clean, modular SVG icons and Tailwind utilities.

---

## 5. Accessibility (a11y) Standards

- **WCAG 2.1 AA Compliance**: Ensure high contrast ratios across all text surfaces (amber accents on dark backgrounds, stone-700+ on white backgrounds).
- **Keyboard Navigation & Skip Link**: Maintain the skip-to-main-content anchor in `src/app/layout.tsx`. All interactive buttons and links must provide visible `:focus-visible` outlines.
- **Screen Reader Support**: Use semantic tags (`<nav>`, `<main>`, `<header>`, `<footer>`, `<article>`, `<section>`). Provide descriptive `aria-label` attributes for icon buttons and navigation toggles.
- **Reduced Motion**: Respect `prefers-reduced-motion` at the CSS level as configured in `src/app/globals.css`.

---

## 6. TypeScript & Code Strictness

- **Strict Mode**: `tsconfig.json` runs in strict mode. No `any` types; all entity models and component props must be fully typed.
- **Presentation vs. Database Types**: Presentation components must consume types from `src/types/index.ts`, never raw Prisma generated types directly.
- **File & Symbol Naming**:
  - React components: PascalCase (e.g., `ImageCard.tsx`, `Navigation.tsx`).
  - Utilities and config: camelCase (e.g., `seo.ts`, `site.ts`).
  - Routes: kebab-case directory names with Next.js conventions (`page.tsx`, `layout.tsx`).

---

## 7. Database & Prisma Conventions

- **Geographic Hierarchy**: The primary entity model is the geographic hierarchy:
  `Country` → `Region` → `Destination` → `Place`
- **Naming**: Model names in PascalCase, database table mappings in lowercase plural with `@@map("table_name")`, column mappings with `@map("snake_case")`.
- **Relational Integrity**: Foreign keys, unique constraints on slugs and codes, and compound indexes must be declared explicitly.
- **Connection Singleton**: Always access Prisma via `src/lib/db.ts` to prevent connection pool exhaustion during Next.js Hot Module Replacement (HMR).

---

## 8. Security Guidelines

- **Zero Secret Exposure**: Never expose private API keys, database credentials, or auth secrets to client bundles. Prefix only public values with `NEXT_PUBLIC_`.
- **Environment Isolation**: Maintain `.env.example` with documented keys and placeholder values. Real secrets belong exclusively in local, uncommitted `.env` or deployment environment secret managers.
- **Input Sanitization**: Treat all search parameters and user inputs as untrusted. Use Prisma's parameterized queries to avoid SQL injection.
