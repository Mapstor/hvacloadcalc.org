# 17 — Editorial Review Gates

## Purpose

Claude Code (CC) doesn't get to declare a build "complete" and move on. Every major build phase ends at a gate where CC pauses, the user verifies the work on `localhost:3007`, and only after explicit approval does CC proceed to the next phase.

This document defines the 10 gates and what CC does at each one.

The point: catch issues 5 articles in, not 50 articles in. Catch architectural mistakes after the foundation but before the bulk of the build.

---

## How gates work

1. CC completes the work specified for a phase
2. CC commits all changes and pushes to a feature branch
3. CC runs `pnpm run validate:all` and reports the result
4. CC writes a structured summary in the commit/PR description (see template below)
5. CC stops and explicitly tells the user "Phase X is ready for editorial review at localhost:3007. Please verify and approve before Phase X+1."
6. CC does NOT proceed until the user replies with approval
7. If the user reports issues, CC fixes them and re-presents at the same gate

### Why this matters

Without gates, CC can churn through hundreds of pages with a subtle drift from intent — wrong tone, wrong link patterns, off-spec schema. Catching that after Phase 7 means undoing 200 hours of work.

Gates are at most every 5-10 hours of CC work. Even if a phase takes longer, gates fire on schedule.

---

## The 10 gates

### Gate 1: Foundation (Wave 0 complete)

**Before this gate, CC has**:
- Initialized the repo with Next.js 15 + TypeScript + Tailwind + MDX
- Built the layout components (Header, Footer, Container)
- Built the legal pages (`/about/`, `/privacy/`, `/terms/`, `/disclaimer/`, `/methodology/`, `/editorial-standards/`, `/sources/`, `/corrections/`)
- Built the contact form page (`/contact/`)
- Built the author page (`/authors/jonathan-s/`)
- Built hub page shells for `/heat-pump/`, `/ac/`, `/furnace/`, `/manual-j/`, `/manual-s/`, `/manual-d/`, `/manual-t/`, `/building-science/`, `/tools/`, `/glossary/`
- Built the homepage
- Configured Vercel deployment
- Set up GitHub Actions CI

**At this gate, user verifies**:
- [ ] Site loads at `http://localhost:3007/`
- [ ] All hub pages return 200 with skeleton content
- [ ] All footer links work
- [ ] All legal pages have full content from `09-legal-footer.md`
- [ ] Contact form submits (test it)
- [ ] Header navigation works on mobile
- [ ] Footer is visible on every page
- [ ] No console errors
- [ ] Lighthouse audit passes on the homepage (Performance ≥95, SEO 100, Accessibility ≥95)

**Approve and proceed to**: Gate 2 (Components ready)

---

### Gate 2: Components ready (article scaffolding done)

**Before this gate, CC has**:
- Built `<ArticleHeader>`, `<KeyTakeaways>`, `<TableOfContents>`, `<FAQ>`, `<RelatedArticles>`, `<Sources>`, `<SourceCite>`, `<AuthorByline>`, `<Breadcrumbs>`, `<Callout>`, `<DataTable>`
- Built `<JsonLdArticle>`, `<JsonLdBreadcrumb>`, `<JsonLdFAQ>` schema components
- Built `<HubGrid>` and `<HubCard>`
- Built SVG primitives (`<SvgWrapper>`, `<ChartGrid>`, `<ChartAxis>`, `<DataSeries>`, `<Annotation>`)
- Implemented the design tokens (`components/svg/tokens.ts`)
- Implemented `<Footer>` with all required links per `09-legal-footer.md`
- Implemented breadcrumb rendering driven by URL structure

**At this gate, user verifies**:
- [ ] Component library renders without errors on a test page
- [ ] All components have TypeScript types
- [ ] Schema components emit valid JSON-LD (manually validate one or two)
- [ ] Mobile responsive at 375px
- [ ] Color palette matches `15-svg-design-system.md`
- [ ] Typography matches `01-brand-voice.md` and Tailwind config

**Approve and proceed to**: Gate 3 (Data layer ready)

---

### Gate 3: Data layer ready

**Before this gate, CC has**:
- Created `/data/` directory with seed JSON files for: `ashrae-design-temps.json`, `iecc-climate-zones.json`, `states-us.json`, `electricity-rates.json`, `r-value-recommendations.json` (minimum)
- Built typed loaders in `lib/data-loaders/` for each JSON file
- Written unit tests for each loader in `tests/data-loaders/`
- Documented each file's schema per `13-data-sources.md`

**At this gate, user verifies**:
- [ ] All loaders pass their unit tests
- [ ] JSON files have proper `metadata` blocks with source, year, accessed date, tier
- [ ] Loaders return typed results (no `any`)
- [ ] At least 1 sample component uses a loader and renders data correctly
- [ ] Data file schemas match docs

**Approve and proceed to**: Gate 4 (First article published)

---

### Gate 4: First article complete (article 1 of 15)

**Before this gate, CC has**:
- Read brief `content/briefs/launch-15/01-heat-pump-aux-heat.md` end-to-end
- Written the full article at `/heat-pump/aux-heat/` page.mdx
- Built any new components the article requires (e.g., `<BalancePointChart>` SVG)
- Built the 4-5 SVGs specified in the brief
- Implemented FAQ from frontmatter
- Implemented all `<SourceCite>` references
- Run the brief's editorial gate checklist (the 30+ items)
- Run `pnpm run validate:all`

**At this gate, user verifies (this is the most important gate)**:
- [ ] **READ THE WHOLE ARTICLE** at `http://localhost:3007/heat-pump/aux-heat/`
- [ ] Tone matches `01-brand-voice.md` (no AI-tells, no marketing fluff)
- [ ] Opening hook matches the prose anchor from the brief exactly
- [ ] Balance-point paragraph matches the prose anchor exactly
- [ ] All 9 H2 sections present and well-paced
- [ ] All SVGs render correctly and teach the concept
- [ ] All 18 keyword variants appear naturally in prose (spot-check 4-5)
- [ ] All 15 outbound internal links present with correct anchor text
- [ ] All FAQ items match the brief
- [ ] JSON-LD validates at validator.schema.org
- [ ] Article reads well on mobile at 375px
- [ ] No forbidden phrases
- [ ] Em-dash count ≤3

**This is the CALIBRATION gate.** If article 1 is right, articles 2-15 follow the same pattern.

If issues are found, CC fixes them, then re-presents. Iterate until article 1 is approved.

**Approve and proceed to**: Gate 5 (Articles 2-5 complete)

---

### Gate 5: Articles 2-5 complete

**Before this gate, CC has**:
- Written briefs 02-05 to deep-brief depth (matching `_template.md`)
- Built articles 02, 03, 04, 05 following the calibration set by article 1
- All 4 articles pass their per-brief editorial gates
- All 4 articles pass `pnpm run validate:all`

**At this gate, user verifies**:
- [ ] Skim each of the 4 new articles (don't need to read top-to-bottom)
- [ ] Tone consistent with article 1
- [ ] No AI-tell phrases (spot-check)
- [ ] Internal links between articles work
- [ ] FAQ schemas all validate
- [ ] Hub navigation now shows real article links

**Approve and proceed to**: Gate 6 (Articles 6-10 complete)

---

### Gate 6: Articles 6-10 complete

**Before this gate, CC has**:
- Briefs 06-10 written
- Articles 06-10 built per briefs
- All gates passed

**At this gate, user verifies**:
- [ ] Spot-check 2 of the 5 new articles
- [ ] Cross-link health: random article links resolve
- [ ] Sitemap reflects all 10 published articles

**Approve and proceed to**: Gate 7 (Articles 11-15 complete; Wave 1 done)

---

### Gate 7: Wave 1 complete (all 15 launch articles)

**Before this gate, CC has**:
- Briefs 11-15 written
- Articles 11-15 built
- ALL 15 launch articles indexed in sitemap.xml
- AdSense readiness checklist verified (see `10-adsense-readiness.md`)

**At this gate, user verifies**:
- [ ] Sample 3 random articles from the full 15 — quality consistent
- [ ] Hub pages now show full spoke lists, not skeletons
- [ ] Internal link graph passes validation (no orphans, no broken links)
- [ ] Sitemap.xml has all 15 articles
- [ ] Robots.txt allows indexing
- [ ] All Lighthouse audits pass on a sample of 5 articles
- [ ] Footer is visible and complete on every article
- [ ] FAQ schemas validate at Google Rich Results Test for a sample of 5

**Approve and proceed to**: AdSense application (separate, not a build gate)

After AdSense approval (1-14 days), continue to Gate 8.

---

### Gate 8: Tools wave complete (Wave 2)

**Before this gate, CC has**:
- Built all 21 calculator pages per `16-calculator-architecture.md`
- Built calculator math in `lib/calculators/` with full unit tests
- Built example sub-pages (12-20 per calculator = 250-420 total)
- Implemented Methodology, WorkedExample, ExamplesGrid components
- Verified planning-grade disclaimers above the fold on every calculator

**At this gate, user verifies**:
- [ ] Test 5 random calculators on mobile — inputs work, results update, no layout shift
- [ ] Spot-check 2 example sub-pages — they render with their specific data
- [ ] All calculators link from at least one Wave 1 article
- [ ] All calculator unit tests pass
- [ ] No calculator widget has horizontal scroll at 375px
- [ ] All calculators have the planning-grade disclaimer

**Approve and proceed to**: Gate 9 (Wave 3 articles complete)

---

### Gate 9: Wave 3 secondary articles complete

**Before this gate, CC has**:
- Built ~30-50 secondary articles across heat pump, AC, furnace, manual-J/S/D/T, and building science clusters
- Built ~50 glossary terms
- Wave 3 sitemap entries indexed

**At this gate, user verifies**:
- [ ] Spot-check 3 secondary articles for consistency with Wave 1 quality
- [ ] Glossary cross-links work (each term links to 3-5 others)
- [ ] DefinedTerm schemas validate
- [ ] Hub pages now feel "complete" (full spoke lists)
- [ ] No orphan pages

**Approve and proceed to**: Gate 10 (Wave 4 programmatic + Wave 5 backlink magnets)

---

### Gate 10: Final build (programmatic + backlink magnets)

**Before this gate, CC has**:
- Built all 8 programmatic templates per `03-sitemap.md`
- Generated ~400 programmatic variant pages
- Built all 10 backlink magnets per Wave 5
- Verified all 600+ words unique content per programmatic page

**At this gate, user verifies**:
- [ ] Spot-check 5 random programmatic pages — they have unique content, not just data swaps
- [ ] All programmatic templates have a sitemap entry that lists all variants
- [ ] Backlink magnets render correctly with their interactive elements
- [ ] Final site link graph is healthy (no orphans, no broken links, no 404s)
- [ ] Final Lighthouse audit on sample of 10 random pages — all pass thresholds

**Approve and**: launch to production / continue ongoing content.

---

## Gate commit message template

When CC submits work at a gate, the commit/PR description uses this template:

```markdown
## Phase X complete — ready for review

### What was built
- [Bullet list of items completed]

### Validation summary
- `pnpm run validate:all`: PASS / FAIL with details
- `pnpm run test`: X tests passing, 0 failing
- `pnpm run build`: PASS / FAIL
- Lighthouse spot-check on [URL]: Performance X, SEO X, Accessibility X

### Editorial gate (per page or aggregate)
- [List each major checklist item with PASS / FAIL / N/A]

### Open items / known issues
- [If any Severity 2 or 3 items exist, list them here]

### Review request
Please verify at `http://localhost:3007/[relevant-url]` and approve before Phase X+1.

Specific verification asks:
- [Any specific things the user should check that aren't in the standard gate verification]
```

The user reads this, opens the relevant URL(s) on localhost:3007, and either approves or specifies fixes.

---

## What CC does NOT do at gates

- CC does NOT proceed without explicit user approval
- CC does NOT claim "good enough" or skip checklist items
- CC does NOT make subjective tone/structure decisions silently — flags them in the commit message
- CC does NOT batch-commit multiple phases worth of work
- CC does NOT skip the build/lint/test/validation passes before requesting review

---

## What the user does at gates

- User opens the relevant URLs on localhost:3007
- User reads/reviews/clicks/scrolls the pages
- User runs Lighthouse if needed for new page types
- User checks mobile preview
- User either approves with "proceed" or specifies what needs fixing
- User keeps the next phase's brief/prompt files ready

---

## Recovery from a failed gate

If a gate fails because of an issue:

1. User specifies what's wrong (text issue, structural issue, schema issue, etc.)
2. CC acknowledges and fixes
3. CC re-runs validation
4. CC re-submits at the same gate (don't advance until the gate passes)
5. If the fix reveals a docs gap (e.g., the brief template was missing a section), update the docs FIRST, then propagate the fix

Don't let a gate failure slip through to the next phase. Each phase's correctness depends on the previous phase being right.

---

## Gates summary table

| Gate | Phase | What's done | Critical verification |
|---|---|---|---|
| 1 | Wave 0 — Foundation | Layout, legal, hubs, deploy | Site loads, all footer pages substantive |
| 2 | Components | Article + schema + SVG components | Renders without errors, types clean |
| 3 | Data layer | JSON files + loaders + tests | Loaders typed and tested |
| 4 | Article 1 | First launch article | **CALIBRATION** — tone, links, schema all correct |
| 5 | Articles 2-5 | Next 4 articles | Consistency with article 1 |
| 6 | Articles 6-10 | Next 5 articles | Quality consistent |
| 7 | Wave 1 complete | All 15 launch articles | AdSense-ready |
| 8 | Wave 2 — Tools | All 21 calculators + examples | Calculators work, planning-grade disclaimers |
| 9 | Wave 3 — Secondary | Secondary articles + glossary | Hub pages complete, link graph healthy |
| 10 | Wave 4 + 5 — Final | Programmatic + backlink magnets | Unique content per variant, ready for production |

Total time across all gates: estimated 80-150 hours of CC work + 5-15 hours of user verification time, spread across 6-12 weeks depending on pace.
