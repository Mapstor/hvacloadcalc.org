# hvacloadcalc.org — Planning Package

**Status:** Complete and locked, ready for Claude Code execution.
**Date:** 2026-05-18
**Scope:** 20 operations docs + 15 launch-article deep briefs (~13,300 lines of brief content)

## What's in this package

### 1. `CLAUDE.md` (project root)
The Claude Code orientation file. Lives at the project root in the actual repo. Tells CC the project's purpose, gated workflow, where briefs live, dev port (3007), affiliate ban, author persona, and the propose→approve→apply→verify loop. This is the FIRST file CC reads in every session.

### 2. `_brief-template.md`
The canonical brief schema. Every launch-15 brief follows this 17-section format (identity, SEO metadata, keywords, content specs, schema, author, sources, internal links, SVG assets, FAQ, AI citation hooks, search intent, MUST cover, MUST NOT do, required data points, H2 outline, technical depth, per-keyword mapping, internal linking spec, JSON-LD shape, prose anchors, drafting notes, 30+ item editorial gate). Use this template for any post-launch articles.

### 3. `docs/` — 18 operations/strategy documents
The full strategy + tech + content + monetization + legal foundation. Read these BEFORE any brief if you need context on a decision.

| File | Purpose |
|------|---------|
| `00-strategy.md` | Site mission, monetization path (AdSense → Raptive at 50k), no-affiliate policy, target metrics |
| `01-brand-voice.md` | Tone, forbidden phrases, em-dash limits, "Jonathan S." voice calibration |
| `02-tech-stack.md` | Next.js 15 App Router + MDX + Tailwind + Vercel + pnpm + Node 20; port 3007; folder structure |
| `03-sitemap.md` | URL architecture, hub-and-spoke topology, all top-level routes |
| `04-content-policy.md` | What we publish, what we don't, no-affiliate enforcement |
| `05-internal-linking.md` | Internal linking rules, anchor text conventions, hub-spoke patterns |
| `06-schema-jsonld.md` | Schema.org types we use, JSON-LD templates |
| `07-seo-onpage.md` | Title/meta/H1 conventions, breadcrumb structure |
| `08-author-bio-jonathan.md` | Jonathan S. persona spec, what's said and not said |
| `09-legal-footer.md` | Privacy policy, terms, cookies, AdSense disclosure |
| `10-adsense-readiness.md` | AdSense application requirements, ad placement zones |
| `11-monetization.md` | AdSense early, Raptive transition at 50k, no affiliates ever |
| `12-image-policy.md` | Hand-crafted SVG only, no stock, no AI-generated imagery |
| `13-data-sources.md` | Tier-1 (ACCA, ASHRAE, DOE, EPA, ICC) and Tier-2 source list |
| `14-quality-checklist.md` | Pre-publish gates across content/SEO/code/accessibility |
| `15-svg-design-system.md` | SVG palette, typography, viewBox conventions |
| `16-calculator-architecture.md` | Calculator Option C (SSR + client-side + /examples/), state management |
| `17-editorial-review-gates.md` | Pre-deploy review steps, brand voice check, schema validation |

### 4. `launch-15-briefs/` — 15 deep article briefs

All briefs are at full depth (~700-1,050 lines each), totaling ~13,300 lines / 13,300+ words of specifications.

| # | Slug | Target KW | Monthly Vol | Brief Lines | Strategic Role |
|---|------|-----------|-------------|-------------|---------------|
| 01 | `heat-pump-aux-heat` | heat pump aux heat | 6,600 | 946 | Calibration reference; auxiliary heat hub |
| 02 | `seasonal-performance-factor` | SPF | 27,100 | 700 | Heat pump performance metric |
| 03 | `manual-j` | manual j | 2,400 | 887 | Cornerstone methodology hub |
| 04 | `ac-short-cycling` | ac short cycling | 1,600 | 888 | High-CPC ($21.56) troubleshooting |
| 05 | `wet-bulb-temperature` | wet bulb temperature | 18,100 | 895 | Psychrometric fundamental |
| 06 | `heat-pump-defrost-cycle` | defrost cycle | 2,900 | 901 | Direct link target from brief 01 |
| 07 | `heat-pump-sizing` | heat pump sizing | 3,600 | 870 | Sizing methodology hub |
| 08 | `attic-r-value` | attic r value | 4,400 | 928 | Building science cornerstone |
| 09 | `u-factor-windows` | u factor windows | 1,300 | 887 | Fenestration methodology |
| 10 | `hers-index` | HERS index | 2,400 | 867 | Performance score reference |
| 11 | `return-air-sizing` | return air sizing | 880 | 908 | Manual D programmatic seed |
| 12 | `garage-mini-split` | mini split for garage | 6,600 | 971 | High-volume sizing query |
| 13 | `verify-manual-j` | verify manual j | 320 | 910 | Methodology / backlink magnet / E-E-A-T |
| 14 | `aux-heat-meaning` | aux heat meaning | 1,600 | 828 | Simpler companion to brief 01 (brand-specific) |
| 15 | `ac-btu-chart` | ac btu chart | 880 | 937 | Programmatic seed (sq-ft child pages) |

**Total target cluster volume:** ~80k+ direct keyword volume, ~250k+ including all secondary keywords across all briefs.

**Realistic launch traffic at 6-month maturity:** 50-150k/month organic.

## How to use this for CC execution

Each brief is a contract. CC reads a brief, produces the article + assets, then verifies against the brief's editorial gate checklist.

### Suggested CC execution flow (for next session)

1. **Bootstrap** — initialize Next.js 15 project, install dependencies, set up MDX
2. **Build base layout** — header, footer, breadcrumb component, JSON-LD helpers
3. **Build legal pages** — privacy, terms, cookies (per `docs/09-legal-footer.md`)
4. **Build author page** — Jonathan S. bio (per `docs/08-author-bio-jonathan.md`)
5. **Build hub pages** — /heat-pump/, /ac/, /building-science/, /manual-j/, /manual-d/, /methodology/, /tools/
6. **Build launch-15 articles** — one per session, brief → MDX + SVG assets → editorial gate → ship
7. **Build calculators referenced in briefs** — Manual J, BTU, HERS estimator, etc. (per `docs/16-calculator-architecture.md`)
8. **Pre-launch QA** — quality checklist (`docs/14-quality-checklist.md`)
9. **Deploy to Vercel**

### CC prompts (NOT yet written)
The actual prompt files that drive each CC session aren't included here. They would live in `/prompts/` in the real repo. If you want, the next session can produce them.

## Key locked decisions (do NOT drift from these)

- **Domain:** hvacloadcalc.org
- **Stack:** Next.js 15 App Router + TypeScript strict + @next/mdx + Tailwind + Vercel + pnpm + Node 20 LTS
- **Dev port:** 3007
- **Author persona:** "Jonathan S." (no real-name, location, or credentials)
- **NO affiliate marketing EVER** (hardcoded across multiple docs)
- **Calculator architecture:** Option C — SSR default state + worked example + client-side interactivity + separate `/examples/` URLs
- **Visuals:** hand-crafted SVG only; no stock photos, no AI imagery
- **Monetization:** AdSense early → Raptive at 50k sessions
- **Brief depth:** all 15 launch briefs at full depth (~700-1,050 lines)

## Brief format

Each brief contains:

1. YAML frontmatter (identity, SEO metadata, keywords, content specs, schema types, author, sources with tier markings, internal links spec, SVG asset specs, FAQ array, AI citation hooks)
2. Search intent analysis (cohorts and what serves each)
3. MUST cover / MUST NOT do (15+ items each)
4. Required data points table (source → claim → section)
5. H2 outline with per-section word targets
6. Technical depth specification (formulas, math, specifics)
7. Per-keyword paragraph mapping (where each target KW appears)
8. Internal linking spec table (URL + exact anchor + context sentence)
9. Schema.org JSON-LD shape (3-4 blocks with full JSON)
10. Prose anchors (opening hook + one anchor paragraph drafted exactly, for voice calibration)
11. Drafting notes (tone, phrase keepers, phrase avoiders, length pacing, mobile preview)
12. Editorial gate checklist (30+ items spanning content/voice/SEO/links/schema/SVG/mobile/lint/build/final-read)

## Next session can begin

- Producing CC execution prompts (the `/prompts/` files)
- Beginning actual CC implementation with brief 01 as the calibration reference

The planning phase is complete. Brief 01 sets the depth and quality bar; briefs 02-15 are consistent in structure and rigor.
