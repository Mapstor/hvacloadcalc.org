# 02 — Tech Stack

## Stack summary (locked)

| Layer | Choice | Rationale |
|---|---|---|
| Framework | Next.js 15 App Router | Server components, streaming, native MDX, mature ecosystem |
| Language | TypeScript (strict) | Type safety across 480+ pages, no `any` |
| Content | MDX via `@next/mdx` | Native, no contentlayer (deprecated/flaky) |
| Styling | Tailwind CSS 3.4+ | No component library, pure utility classes |
| Components | Custom React + Tailwind | Lives in `/components/`, no shadcn |
| Hosting | Vercel | GitHub-connected, automatic deploys |
| Package manager | pnpm | Faster, deterministic, smaller node_modules |
| Node version | 20.x LTS | Vercel default, stable |
| Dev port | 3007 | `pnpm dev --port 3007` |

---

## Folder structure (locked)

```
hvacloadcalc/
├── CLAUDE.md
├── README.md
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
├── next.config.mjs
├── tailwind.config.ts
├── postcss.config.mjs
├── .env.example                    # template, no secrets
├── .gitignore
├── .eslintrc.json
├── .prettierrc
│
├── docs/                           # all planning files (read-only by CC during build)
│   └── *.md
│
├── content/                        # all briefs (read-only by CC during build)
│   ├── briefs/
│   │   ├── _template.md
│   │   ├── launch-15/
│   │   ├── wave-2/
│   │   ├── tools/
│   │   ├── programmatic-templates/
│   │   └── backlink-magnets/
│   └── README.md
│
├── data/                           # all JSON data, read by components
│   ├── ashrae-design-temps.json
│   ├── iecc-climate-zones.json
│   ├── noaa-degree-days.json
│   ├── neep-cold-climate.json
│   ├── states-us.json
│   ├── grille-sizes.json
│   ├── htm-tables.json
│   ├── r-value-recommendations.json
│   ├── btu-per-sqft-chart.json
│   └── README.md                   # schema docs for every JSON file
│
├── prompts/                        # CC execution prompts (read by CC, not deployed)
│   ├── 00-bootstrap.md
│   ├── 01-build-components.md
│   ├── 02-build-data-layer.md
│   ├── 03-build-legal-footer.md
│   ├── 04-build-launch-15.md
│   ├── 04a-launch-article-01.md
│   ├── 04b-launch-article-02.md
│   ├── ...
│   ├── 05-build-tools.md
│   ├── 06-build-programmatic.md
│   ├── 07-build-backlink-magnets.md
│   ├── 08-pre-launch-qa.md
│   └── 09-deploy-vercel.md
│
├── app/                            # Next.js App Router
│   ├── layout.tsx                  # root layout, fonts, metadata
│   ├── page.tsx                    # homepage
│   ├── globals.css                 # Tailwind + minimal global CSS
│   ├── sitemap.ts                  # dynamic sitemap.xml generator
│   ├── robots.ts                   # robots.txt generator
│   ├── not-found.tsx               # custom 404
│   │
│   ├── heat-pump/
│   │   ├── page.mdx                # /heat-pump/ hub page
│   │   ├── aux-heat/
│   │   │   ├── page.mdx
│   │   │   ├── meaning/page.mdx
│   │   │   ├── ecobee/page.mdx
│   │   │   └── ...
│   │   ├── cold-climate/
│   │   ├── sizing/
│   │   │   ├── page.mdx
│   │   │   └── [variant]/page.tsx  # programmatic
│   │   └── ...
│   │
│   ├── ac/
│   ├── furnace/
│   ├── manual-j/
│   ├── manual-s/
│   ├── manual-d/
│   ├── manual-t/
│   ├── building-science/
│   ├── glossary/
│   ├── tools/                      # all calculators
│   │   ├── page.tsx                # tools hub
│   │   ├── btu-calculator/
│   │   │   ├── page.tsx
│   │   │   └── examples/[variant]/page.tsx
│   │   ├── heat-pump-size-calculator/
│   │   └── ...
│   │
│   ├── about/page.mdx
│   ├── methodology/page.mdx
│   ├── editorial-standards/page.mdx
│   ├── sources/page.mdx
│   ├── corrections/page.mdx
│   ├── privacy/page.mdx
│   ├── terms/page.mdx
│   ├── disclaimer/page.mdx
│   ├── contact/page.tsx            # form, not MDX
│   ├── authors/jonathan-s/page.mdx
│   └── api/                        # only if absolutely necessary
│
├── components/                     # all React components
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Container.tsx
│   │   └── Sidebar.tsx
│   ├── article/
│   │   ├── ArticleHeader.tsx
│   │   ├── KeyTakeaways.tsx
│   │   ├── TableOfContents.tsx
│   │   ├── FAQ.tsx
│   │   ├── RelatedArticles.tsx
│   │   ├── Sources.tsx
│   │   ├── SourceCite.tsx
│   │   ├── AuthorByline.tsx
│   │   ├── Breadcrumbs.tsx
│   │   └── Callout.tsx
│   ├── calculator/
│   │   ├── CalculatorShell.tsx     # base wrapper, planning-grade callout
│   │   ├── CalculatorInput.tsx
│   │   ├── CalculatorOutput.tsx
│   │   ├── Methodology.tsx
│   │   ├── WorkedExample.tsx
│   │   └── ExamplesGrid.tsx
│   ├── data/
│   │   └── DataTable.tsx           # responsive sortable table
│   ├── svg/
│   │   ├── HeroSVG.tsx             # base wrapper for hero SVGs
│   │   ├── InlineSVG.tsx           # base wrapper for inline SVGs
│   │   ├── tokens.ts               # color tokens, etc.
│   │   └── [individual SVG components — see 15-svg-design-system.md]
│   ├── hub/
│   │   ├── HubGrid.tsx
│   │   └── HubCard.tsx
│   └── seo/
│       ├── JsonLdArticle.tsx
│       ├── JsonLdBreadcrumb.tsx
│       ├── JsonLdFAQ.tsx
│       ├── JsonLdCalculator.tsx
│       ├── JsonLdGlossary.tsx
│       └── JsonLdHub.tsx
│
├── lib/                            # pure utility functions, all unit-testable
│   ├── calculators/                # one file per calculator's math
│   │   ├── btu-room-size.ts
│   │   ├── heat-pump-size.ts
│   │   ├── balance-point.ts
│   │   ├── ach.ts
│   │   ├── fuel-use-load.ts
│   │   ├── duct-size.ts
│   │   └── ...
│   ├── data-loaders/
│   │   ├── ashrae.ts               # typed loaders for each JSON file
│   │   ├── climate-zones.ts
│   │   ├── neep.ts
│   │   └── ...
│   ├── seo/
│   │   ├── metadata.ts             # generateMetadata helpers
│   │   └── schema.ts               # JSON-LD builders
│   ├── content/
│   │   ├── frontmatter.ts          # MDX frontmatter parser + validator
│   │   └── reading-time.ts
│   ├── slugify.ts
│   ├── format.ts                   # number/unit formatting (BTU, °F, etc.)
│   └── constants.ts
│
├── public/
│   ├── og-images/                  # generated OG images per page
│   ├── authors/
│   │   └── jonathan-s.jpg
│   ├── favicon.ico
│   ├── logo.svg
│   ├── apple-touch-icon.png
│   └── robots.txt                  # if static, else generated
│
├── styles/                         # only if global CSS beyond Tailwind needed
│   └── mdx.css                     # typography overrides for MDX content
│
├── tests/                          # unit tests for calculator math + utilities
│   ├── calculators/
│   │   ├── btu-room-size.test.ts
│   │   ├── balance-point.test.ts
│   │   └── ...
│   ├── data-loaders/
│   └── seo/
│
└── scripts/                        # build-time scripts
    ├── generate-og-images.ts       # OG image generation
    ├── validate-briefs.ts          # checks all briefs against template
    ├── validate-links.ts           # internal link resolver
    └── check-content-policy.ts     # forbidden phrase scanner
```

---

## package.json (canonical version)

```json
{
  "name": "hvacloadcalc",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --port 3007",
    "build": "next build",
    "start": "next start --port 3007",
    "lint": "next lint",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "test:watch": "vitest",
    "validate:briefs": "tsx scripts/validate-briefs.ts",
    "validate:links": "tsx scripts/validate-links.ts",
    "validate:policy": "tsx scripts/check-content-policy.ts",
    "validate:all": "pnpm run typecheck && pnpm run lint && pnpm run test && pnpm run validate:briefs && pnpm run validate:links && pnpm run validate:policy",
    "og:generate": "tsx scripts/generate-og-images.ts"
  },
  "dependencies": {
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "@next/mdx": "^15.0.0",
    "@mdx-js/loader": "^3.0.0",
    "@mdx-js/react": "^3.0.0",
    "gray-matter": "^4.0.3",
    "reading-time": "^1.5.0",
    "rehype-slug": "^6.0.0",
    "rehype-autolink-headings": "^7.0.0",
    "remark-gfm": "^4.0.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "@types/mdx": "^2.0.0",
    "typescript": "^5.5.0",
    "tailwindcss": "^3.4.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0",
    "eslint": "^9.0.0",
    "eslint-config-next": "^15.0.0",
    "prettier": "^3.3.0",
    "prettier-plugin-tailwindcss": "^0.6.0",
    "vitest": "^2.0.0",
    "@vitejs/plugin-react": "^4.3.0",
    "tsx": "^4.0.0",
    "satori": "^0.10.0",
    "satori-html": "^0.3.0",
    "@resvg/resvg-js": "^2.6.0"
  },
  "engines": {
    "node": "20.x"
  }
}
```

**Do not add dependencies** without updating this doc. Specifically forbidden additions:
- `shadcn/ui` (using custom Tailwind components instead)
- `contentlayer` (using @next/mdx natively)
- `framer-motion` (CSS animations only)
- `react-icons` (custom SVG only)
- Any analytics library beyond what Vercel provides out of the box
- Any UI component library

---

## next.config.mjs

```js
import createMDX from '@next/mdx';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkGfm from 'remark-gfm';

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'mdx'],
  reactStrictMode: true,
  poweredByHeader: false,
  trailingSlash: true,  // all URLs end in / for consistency
  experimental: {
    mdxRs: false,  // use JS MDX for plugin compatibility
  },
  async redirects() {
    return [
      // any production redirects go here, populated as needed
    ];
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'append', properties: { className: ['header-anchor'] } }],
    ],
  },
});

export default withMDX(nextConfig);
```

---

## tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./*"],
      "@/components/*": ["./components/*"],
      "@/lib/*": ["./lib/*"],
      "@/data/*": ["./data/*"]
    },
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", "**/*.mdx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

**Strict mode is non-negotiable.** No `any`. Use `unknown` + narrowing.

---

## tailwind.config.ts

```ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.mdx',
  ],
  theme: {
    extend: {
      colors: {
        // Brand tokens — see 15-svg-design-system.md for canonical palette
        brand: {
          DEFAULT: '#1e40af',  // primary blue
          accent: '#0891b2',   // cyan accent
        },
        ink: {
          900: '#0f172a',
          700: '#334155',
          500: '#64748b',
          300: '#cbd5e1',
          100: '#f1f5f9',
        },
        warn: '#d97706',       // amber for callouts
        danger: '#dc2626',     // red for warnings
        good: '#059669',       // green for "normal" states
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
      },
      maxWidth: {
        prose: '68ch',         // article body max-width
        wide: '76rem',         // hub pages, calculators
      },
      typography: ({ theme }: any) => ({
        DEFAULT: {
          css: {
            color: theme('colors.ink.700'),
            maxWidth: '68ch',
            // ... typography customization, see styles/mdx.css for overrides
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

export default config;
```

---

## Environment variables

`.env.example` (commit this; never commit `.env.local`):

```
NEXT_PUBLIC_SITE_URL=https://hvacloadcalc.org
NEXT_PUBLIC_SITE_NAME=hvacloadcalc.org
NEXT_PUBLIC_ADSENSE_PUBLISHER_ID=  # populated post-approval
```

Vercel project env:
- Same vars as above, populated with production values
- No secrets needed at launch — Raptive integration adds more post-approval

---

## Dependency policy

- **Pin major versions in package.json**, use caret (`^`) for minor/patch
- **No unpinned `latest`**
- **Quarterly dependency review** — run `pnpm outdated`, update non-breaking
- **No new dependencies without explicit approval in a doc update**
- **No experimental flags** in `next.config.mjs` unless documented here with reason

---

## Build modes

| Page type | Build mode | Reason |
|---|---|---|
| Articles | Static export (SSG) | Content is stable, max performance |
| Calculator pages | SSG with worked example | Default state SSR'd, client interactivity layered |
| Calculator examples | SSG per variant URL | Pre-computed, crawlable, long-tail SEO |
| Programmatic pages | SSG per data row | Built at compile time, no runtime cost |
| Hub pages | SSG | Static |
| Glossary | SSG | Static |
| Homepage | SSG | Static |
| Methodology, About, etc. | SSG | Static |
| Contact form | SSG shell + serverless action | Form post handled by Vercel function |
| Sitemap, robots.txt | Generated at build time | Reflects current sitemap.ts logic |

**No ISR**, no dynamic routes that hit external APIs at runtime. If a calculator needs live data (e.g., NEEP database refresh), it's a build-time data fetch in `scripts/` that updates the JSON in `/data/`.

---

## Performance budgets

Every page must meet:

- **LCP ≤ 1.5s** on slow 4G (Vercel Speed Insights)
- **CLS ≤ 0.05**
- **INP ≤ 100ms**
- **Total page weight ≤ 250 KB** (HTML + CSS + JS + critical SVG)
- **Lighthouse Performance ≥ 95** on mobile
- **Lighthouse SEO ≥ 100**
- **Lighthouse Accessibility ≥ 95**

These are CC's exit criteria for any page. If a page fails these in build-time Lighthouse CI, the build fails.

---

## Code style

- **ESLint**: extends `next/core-web-vitals` + custom rules
- **Prettier**: 2-space indent, single quotes, semi-colons, trailing commas
- **Imports**: sorted (built-in → third-party → `@/` paths → relative)
- **Components**: PascalCase filenames, default export the component, named exports for sub-components/types
- **Functions**: camelCase, descriptive names, no abbreviations beyond standard (HVAC, BTU, SEER are fine)
- **Constants**: SCREAMING_SNAKE_CASE in `lib/constants.ts`
- **Types**: PascalCase, suffix `Type` only when there's name collision
- **No barrel exports** (`index.ts` re-exports) — import directly from source files

---

## Commit convention

- One logical change per commit
- Subject line ≤72 chars
- Imperative mood ("Add", not "Added")
- No `Co-Authored-By: Claude` trailers
- No emoji in commits
- Conventional Commits style optional; prefer clarity over convention
- Reference brief by slug if commit is content: `Add aux-heat article (brief 01)`

---

## CI/CD

- **GitHub Actions**: on every push to `main` and PR
  - `pnpm install --frozen-lockfile`
  - `pnpm run validate:all` (typecheck + lint + test + brief validation + link validation + policy check)
  - `pnpm run build`
- **Vercel**: auto-deploys `main` to production after CI green
- **Preview deploys**: every PR gets a preview URL
- **No manual deploys** from local

---

## Local dev workflow

```bash
# First time
pnpm install
cp .env.example .env.local
pnpm dev  # opens at http://localhost:3007

# Before commit
pnpm run validate:all

# Before pushing a content batch
pnpm run validate:briefs  # ensures all briefs follow _template.md schema
```
