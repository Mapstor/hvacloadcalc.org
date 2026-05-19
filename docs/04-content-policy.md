# 04 — Content Policy

## Scope

This document governs every article, calculator page, glossary entry, hub page, and programmatic page on the site. Read it before writing any content. Violations get caught at editorial review and require regeneration — so build it in from the start.

It complements `01-brand-voice.md` (how content sounds) by specifying what content must contain, must not contain, and how it must be structured.

---

## Required structure for article pages

Every article-type page (i.e., not calculator, not glossary, not programmatic template) has these components in this order:

```
1. <Breadcrumbs />                 — visual + JSON-LD
2. <ArticleHeader />               — H1, byline, date, reading time
3. <KeyTakeaways />                — 4-6 bullets, the TL;DR
4. Intro                            — max 3 paragraphs, hooks the reader
5. <TableOfContents />             — auto-generated from H2s, sticky on desktop
6. Main body                        — H2 sections (3-7 sections typical)
7. <FAQ />                          — 5-10 questions with FAQPage schema
8. <RelatedArticles />             — algorithmic, see 05-internal-linking.md
9. <Sources />                     — numbered citations, all <SourceCite> refs collected
10. <AuthorByline />               — Jonathan S. + last reviewed date
11. <Footer />                     — site-wide, includes methodology + disclaimer links
```

All 11 components are required. If a brief omits one, the brief is incomplete — flag it.

---

## Required structure for calculator pages

```
1. <Breadcrumbs />
2. <CalculatorHeader />            — H1, byline, planning-grade disclaimer above the fold
3. <CalculatorWidget />            — the SVG-illustrated tool itself, SSR with worked example
4. <KeyTakeaways />                — what this tool calculates, how to use it
5. Intro                            — 1 paragraph, max 3 sentences
6. <WorkedExample />               — shows the default-state calculation explained
7. <Methodology />                 — formula(s) used, with sources
8. Main body                        — H2 sections explaining the inputs, edge cases
9. <ExamplesGrid />                — 12-20 pre-computed example URLs (linkable)
10. <FAQ />
11. <RelatedTools />               — links to other calculators
12. <RelatedArticles />
13. <Sources />
14. <AuthorByline />
15. <Footer />
```

The methodology section is non-negotiable. AdSense reviewers and LLMs both look for it. Skip it and the calculator looks like a black box.

---

## Required structure for glossary pages

Glossary pages are short (300-600 words) and optimized for LLM citation:

```
1. <Breadcrumbs />
2. H1 — "Term Name (Abbreviation)"
3. One-sentence definition (standalone, quotable)
4. Second sentence: practical implication or formula
5. <Methodology /> if there's a formula
6. H2: How [term] is used in HVAC
7. H2: Typical values / range
8. H2: Related terms (cross-links)
9. <Sources />
10. <AuthorByline />
```

The first two sentences must work as a standalone definition that a chatbot could quote without further context.

---

## Required structure for hub pages

Hub pages (e.g., `/heat-pump/`, `/building-science/`) are navigation + light explainer:

```
1. <Breadcrumbs />
2. H1 + 1-paragraph intro to the hub topic
3. <HubGrid /> — visual cards linking to each spoke
4. H2: Where to start (recommended reading order)
5. H2: Calculators relevant to this hub
6. <FAQ /> covering hub-level questions
7. <RelatedHubs />
8. <Footer />
```

Hub pages are not deep articles. They orient the reader and pass authority to spokes.

---

## Required structure for programmatic pages

Programmatic pages (e.g., `/heat-pump/sizing/1500-sq-ft/`, `/manual-d/return-air-grille/20x20/`) are generated from a template + data row.

Each template lives in `content/briefs/programmatic-templates/` with its full spec.

Programmatic pages MUST have:
- Unique content above the fold (the specific data for this variant)
- Specific worked example for THIS variant (not generic)
- 600+ words of unique content (some sections common to template, but the body must vary meaningfully per variant)
- Distinct H1 and meta description per variant
- At least 3 internal links to related variants (sibling pattern)
- Canonical self-reference
- Schema.org markup appropriate to type

If a programmatic template can't produce 600+ words of meaningfully unique content, the template is wrong — flag it.

---

## Brief format

Every page on the site has a single comprehensive brief file. Briefs are detailed and can be 1,500+ lines. They include:

1. Identity + SEO metadata frontmatter
2. Full source list (frontmatter)
3. Internal link map (frontmatter)
4. SVG asset list (frontmatter)
5. FAQ list (frontmatter)
6. AI citation hooks (frontmatter)
7. Search intent prose
8. MUST cover / MUST NOT do lists
9. Required data points with source IDs
10. Required H2 outline with per-section spec
11. Technical depth section (formulas, edge cases, numeric ranges)
12. Per-keyword mapping (every secondary keyword → which H2 it appears in)
13. Internal link anchor text spec (exact wording for every link)
14. Schema.org JSON-LD shape for this specific article
15. Prose anchors (opening hook + one anchor paragraph for voice calibration)
16. Drafting notes
17. Editorial gate checklist

See `_template.md` for the full schema. See `launch-15/01-heat-pump-aux-heat.md` for a complete worked example.

---

## Sourcing rules

### Tiered source hierarchy

Use sources in this priority order. Lower-tier sources may complement higher-tier but never substitute:

**Tier 1 (gold standard)**:
- ACCA Manuals (J, S, D, T, N) — paywalled standards, cite by title and section
- ASHRAE Handbook of Fundamentals + ASHRAE 169 (climate zones)
- ANSI/IECC building codes
- NEEP Cold Climate Heat Pump Specification + database
- US DOE / EIA / EnergyStar.gov
- NOAA / NWS for climate data
- AHRI directory (ahridirectory.org)
- ENERGY STAR program data

**Tier 2 (peer-reviewed / authority)**:
- LBNL (Lawrence Berkeley) publications
- ORNL (Oak Ridge) publications
- ACEEE reports
- DOE Building America program documents
- State energy office publications (MassCEC, NYSERDA, NREL, etc.)
- Peer-reviewed journals (ASHRAE Journal, Energy and Buildings, etc.)

**Tier 3 (acceptable for context)**:
- Building science publications: GreenBuildingAdvisor, Energy Vanguard, Building Science Corporation
- Established trade publications: ACHR News, Contracting Business, JLC
- Equipment manufacturer technical data sheets (not marketing pages)

**Forbidden as primary sources**:
- Competitor calculator sites (Cool Calc, AutoHVAC, ServiceTitan, Calculator.net, etc.)
- HVAC contractor blog posts (unless the contractor is a recognized expert with broader citations)
- Wikipedia (may be linked for definitional context but never as the authority on technical claims)
- AI-generated content from any source
- Reddit / Quora / forums (may be referenced for "people commonly ask X" framing but never as fact source)

### When a claim needs a source

Cite a source for:
- Any specific numeric value (R-values, design temps, BTU loads, efficiency ratings)
- Any normative standard ("Manual J requires...")
- Any historical claim (regulatory dates, code revisions)
- Any quoted statistic (electricity rates, market share, average costs)
- Any claim about manufacturer specifications

You do not need a source for:
- Physical laws and basic thermodynamics (heat flows from hot to cold, etc.)
- Mathematical relationships (1 ton = 12,000 BTU/hr)
- Common-knowledge HVAC terminology (after first definition)

### Citation mechanics

Use the `<SourceCite>` component inline:

```jsx
The 99% heating design temperature for Denver, CO is 4°F<SourceCite id="ashrae-2021-denver" />.
```

The `id` references an entry in the article's frontmatter sources array:

```yaml
sources:
  - id: ashrae-2021-denver
    title: "ASHRAE Handbook of Fundamentals 2021, Climatic Design Conditions, Denver CO"
    publisher: "ASHRAE"
    year: 2021
    url: "https://www.ashrae.org/..."
    accessed: "2026-05-18"
    tier: 1
```

The `<Sources />` component renders these at the end of the article as a numbered bibliography.

---

## What CANNOT be claimed on the site

These are hard limits. Violating any creates legal, regulatory, or trust risk:

### Professional credentials
- Cannot claim ACCA certification or approval
- Cannot claim the site is "ACCA-approved Manual J software"
- Cannot claim Jonathan or the site is a licensed contractor
- Cannot claim Jonathan or the site is a professional engineer
- Cannot claim the site provides engineering services

### Calculator output framing
- Cannot describe outputs as "Manual J calculation" without qualifier — must say "Manual J-style estimate" or "planning-grade approximation"
- Cannot describe outputs as "permit-ready"
- Cannot describe outputs as "professional load calculations"
- Cannot claim accuracy of ±5% or any specific tolerance
- Must include planning-grade disclaimer above the fold on every calculator

### Safety-critical guidance
- Cannot give step-by-step refrigerant work instructions
- Cannot give step-by-step electrical/wiring instructions for HVAC equipment
- Cannot give gas line installation/modification instructions
- Cannot diagnose specific equipment failures requiring physical inspection
- General educational explanation of how systems work is fine; do-it-yourself repair guidance for safety-critical work is not

### Bias and monetization
- Cannot recommend specific brands as "the best" in a category-leading way (general guidance is fine: "look for variable-speed compressors in cold climates")
- **No affiliate marketing on this site, ever.** No Amazon affiliate, no installer lead-gen, no sponsored placements. Display ads (Raptive/AdSense) only.
- Cannot accept paid placement in articles
- Cannot promote any specific contractor, installer, or service provider

---

## Required disclaimers

### Calculator pages — above the fold

Every calculator page must show this disclaimer above the calculator widget, in a styled `<Callout type="planning-grade">`:

> **Planning-grade estimate.** This calculator provides educational estimates based on industry-standard methodology. Results are not a substitute for an ACCA Manual J load calculation performed by a licensed HVAC contractor. Do not use for permit submission or equipment specification.

This wording is fixed. Do not edit it per page.

### Glossary pages — bottom

> Definitions are educational. Industry usage of HVAC terminology can vary; always confirm specific meanings in the relevant ACCA, ASHRAE, or AHRI standard for professional applications.

### Site-wide footer

> hvacloadcalc.org provides educational information about residential HVAC systems. Content is not professional engineering advice. Consult a licensed HVAC contractor for system design, equipment specification, and permit-grade load calculations.

---

## Image and visual policy

(Detailed rules in `12-image-policy.md`. Summary here.)

- **No stock photos.** Ever. Not on hero sections, not in articles, not on /about.
- **No decorative AI images.** No "robot servicing AC unit" filler art.
- **SVG-first.** Every diagram, chart, illustration is hand-crafted SVG.
- **Photos allowed only when**: documenting a specific physical thing (real photo of a NFRC sticker, real photo of a return air grille, real photo of a thermostat aux heat indicator). Source must be cited.
- **Calculator illustrations**: always SVG, see `15-svg-design-system.md`.
- **Author photo (Jonathan S.)**: one AI-generated headshot, neutral, used everywhere consistently. See `08-author-bio-jonathan.md`.

---

## AI citation hooks

To maximize LLM citation, every article should include:

### One "definitional sentence" per H2 section

A sentence that defines the section topic in 1-2 lines, quotable in isolation. LLMs extract these for quick answers.

Example (in a section "How aux heat differs from emergency heat"):
> Auxiliary heat activates automatically when the heat pump alone cannot meet demand; emergency heat is a manual override that locks out the compressor entirely and runs only the resistance strips.

### One "specific value" claim per major concept

LLMs love concrete numbers paired with conditions. Include them.

Example:
> A typical 5 kW auxiliary heat strip costs $0.80 per hour to run at the 2024 US average electricity rate of $0.16/kWh.

### One "decision framework" per how-to topic

LLMs cite decision frameworks well. Provide them in clean structured form:

> Aux heat usage is normal when: outdoor temperature is below the system's balance point, the unit is recovering from a defrost cycle, or setback recovery is in progress. Aux heat is a warning sign when: it runs during mild weather, runs continuously, or runs without a thermostat call for stage 2.

---

## Article hygiene checklist

Before any article ships, verify:

- [ ] One H1, matching brief
- [ ] All required components present (see structure above)
- [ ] Word count within ±10% of brief target
- [ ] Every "MUST cover" item from brief addressed
- [ ] All "MUST NOT do" items avoided
- [ ] No forbidden phrases (see `01-brand-voice.md`)
- [ ] Em-dash count ≤3
- [ ] Every numeric claim has `<SourceCite>` or is in a forbidden-source-required category (basic physics, math)
- [ ] At least 2 internal article links, 1 calculator link, 1 external authoritative source
- [ ] FAQ has 5+ items, JSON-LD schema correct
- [ ] All internal links resolve (no 404s)
- [ ] Meta description 150-160 chars, unique
- [ ] Schema.org JSON-LD validates (use schema.org validator)
- [ ] Reading flow: open the page, scan H2s — does the structure make sense?
- [ ] Mobile preview at 375px width — no horizontal scroll, no broken layouts
- [ ] `<KeyTakeaways>` present and accurate
- [ ] Sources list at bottom, all `<SourceCite>` refs resolved
- [ ] AuthorByline + last reviewed date
- [ ] Planning-grade disclaimer present on calculator pages

If any checkbox fails, do not ship. Fix it.
