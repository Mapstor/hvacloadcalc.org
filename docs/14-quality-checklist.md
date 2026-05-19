# 14 — Quality Checklist

## Purpose

This is the master quality checklist. Every page passes through it before publication. It consolidates verification rules scattered across other docs (brand voice, content policy, SEO, schema, internal linking, etc.) into a single auditable pass.

Briefs include a per-article editorial gate that's article-specific. This document is the GLOBAL gate that applies to every page regardless of type.

---

## How to use this checklist

1. CC runs the checks after writing a page
2. Each checkbox must pass
3. Any failure blocks publication
4. Commit message includes a summary of the checklist pass/fail state
5. Scripts under `/scripts/` automate most checks

---

## Universal checks (apply to every page)

### Content
- [ ] Page has all components required by its `page_type` (per `04-content-policy.md`)
- [ ] No placeholder text ("Lorem ipsum", "TODO", "FIXME", "TK")
- [ ] No `[bracketed placeholder values]` left in published content
- [ ] No console.log or debugging statements
- [ ] Word count within tolerance specified in brief (typically ±10%)
- [ ] All "MUST cover" items from brief present
- [ ] No "MUST NOT do" items violated

### Voice and language
- [ ] No forbidden phrases from `01-brand-voice.md`:
  - "delve into", "in conclusion", "essentially" (>1×), "in the realm of", "navigate the", "myriad of", "tapestry of", "in today's world", "in the modern age", "the world of", "it's worth noting that", "needless to say", "first and foremost"
- [ ] Em-dash count: ≤3 across the whole article
- [ ] No three consecutive sentences starting with the same word
- [ ] No paragraph longer than 4 sentences
- [ ] Sentence variety: short (5-10 words) mixed with medium (15-25)
- [ ] No second-person plural ("we") except on `/about/`, `/methodology/`, `/editorial-standards/`
- [ ] No contractions in formal sections (callouts, methodology, FAQ)

### SEO meta
- [ ] One H1, matches frontmatter `h1`
- [ ] H1 length ≤65 characters
- [ ] Title tag length 50-65 characters
- [ ] Meta description length 150-160 characters
- [ ] All H2s match the brief outline (no extras, no missing)
- [ ] Heading hierarchy is sequential (no H2 → H4 skips)
- [ ] No emojis in headings
- [ ] No ALL CAPS in headings (except known abbreviations)

### Internal linking (per `05-internal-linking.md` minimums)
- [ ] Required minimum internal links met for page type
- [ ] At least one link to the parent hub (or breadcrumb up)
- [ ] At least 2-3 sibling links where applicable
- [ ] Calculator links present where brief specifies
- [ ] External links present (1-3 tier-1 minimum)
- [ ] All links use descriptive anchor text (no "click here", "read more", "learn more")
- [ ] No anchor text used twice for different URLs in the same article
- [ ] No link to a URL not in `03-sitemap.md`
- [ ] No `nofollow` on editorial citations
- [ ] No broken links (`scripts/validate-links.ts` passes)

### Schema / JSON-LD
- [ ] Required schema types present per `06-schema-jsonld.md`
- [ ] All JSON-LD blocks emit valid JSON (no trailing commas)
- [ ] `dateModified` matches frontmatter `last_reviewed`
- [ ] `dateModified` is ISO 8601
- [ ] All URLs absolute (https://hvacloadcalc.org/...)
- [ ] FAQPage schema present if `faq:` in frontmatter
- [ ] BreadcrumbList present for all non-homepage pages
- [ ] Validates at validator.schema.org (manual spot-check)
- [ ] Validates at search.google.com/test/rich-results (manual spot-check at launch)

### Sources and citations
- [ ] Every numeric claim has a `<SourceCite>` reference
- [ ] Every `<SourceCite>` resolves to an entry in frontmatter `sources:`
- [ ] No sources from forbidden categories (competitor calcs, contractor blogs as primary, AI content)
- [ ] At least one tier-1 source for any factual article
- [ ] Sources section renders all citations correctly

### Visual assets
- [ ] Hero SVG present (for article/calculator/hub pages)
- [ ] Inline SVGs in correct H2 sections per brief
- [ ] All SVGs have `viewBox`, `role="img"`, `aria-labelledby`, `<title>`, `<desc>`
- [ ] All SVGs scale responsively
- [ ] Color contrast meets WCAG AA (4.5:1 for text, 3:1 for large/UI)
- [ ] No stock photos
- [ ] No decorative AI imagery
- [ ] Photos (if any) have source attribution and license clarity
- [ ] All `<img>` and `<svg>` have alt text or `<title>`
- [ ] Captions present for inline figures with figure numbers

### Mobile / accessibility
- [ ] No horizontal scroll at 375px viewport
- [ ] All tables use `<DataTable>` component
- [ ] Tables scroll horizontally on overflow (no breaking layout)
- [ ] Touch targets ≥44×44 px
- [ ] Font size ≥16px base
- [ ] Page passes axe-core automated accessibility check
- [ ] Animations respect `prefers-reduced-motion`
- [ ] All interactive elements have visible focus indicators
- [ ] Tab order is logical
- [ ] Page is readable with screen reader (manual spot-check)

### Performance
- [ ] LCP ≤1.5s on slow 4G (Lighthouse mobile)
- [ ] CLS ≤0.05
- [ ] INP ≤100ms
- [ ] Total page weight ≤250KB
- [ ] Lighthouse Performance score ≥95 (mobile)
- [ ] Lighthouse SEO score = 100
- [ ] Lighthouse Accessibility score ≥95
- [ ] No layout shift caused by ads (when applicable)
- [ ] Below-the-fold images lazy-loaded

### Build / lint
- [ ] `pnpm run typecheck` passes
- [ ] `pnpm run lint` passes
- [ ] `pnpm run test` passes
- [ ] `pnpm run build` succeeds
- [ ] No TypeScript `any` introduced
- [ ] No unused imports or variables
- [ ] No console errors on production build
- [ ] No 404s referenced

### Final reading flow
- [ ] Read the page top to bottom on localhost:3007
- [ ] Skim H2s only — does the structure make sense in isolation?
- [ ] Open the page on mobile (or 375px in dev tools)
- [ ] Are any paragraphs harder to read than they should be?
- [ ] Does any sentence sound generic or AI-flavored? If yes, rewrite.
- [ ] Would a stressed homeowner actually understand this?
- [ ] Would a building scientist roll their eyes? If yes, fix it.

---

## Page-type-specific checks

### Article pages

- [ ] `<KeyTakeaways>` block present, 4-6 bullets
- [ ] `<TableOfContents>` present, auto-generated from H2s
- [ ] Intro is ≤3 paragraphs
- [ ] Body has 4-9 H2 sections
- [ ] FAQ has 5-10 items
- [ ] `<Sources>` section renders all citations
- [ ] `<AuthorByline>` present with "Reviewed [date]"
- [ ] `<RelatedArticles>` populated

### Calculator pages

- [ ] Planning-grade disclaimer above the fold (in `<Callout type="planning-grade">`)
- [ ] Calculator widget renders with default state on initial load
- [ ] Worked example below the widget explains the default state
- [ ] `<Methodology>` block present with formulas and sources
- [ ] All input fields have labels and units
- [ ] All output fields have labels and units
- [ ] All math runs client-side without errors (test in browser console)
- [ ] Calculator state is shareable via URL params (for examples grid links)
- [ ] `<ExamplesGrid>` populated with 12-20 pre-computed variant URLs
- [ ] `/examples/` sub-pages exist and resolve

### Glossary pages

- [ ] Term defined in first sentence, quotable standalone
- [ ] Second sentence: practical implication or formula
- [ ] H2 "How [term] is used in HVAC" present
- [ ] H2 "Typical values" or "Typical range" present
- [ ] H2 "Related terms" links to 3-5 other glossary entries
- [ ] DefinedTerm schema present
- [ ] Word count 300-600

### Hub pages

- [ ] `<HubGrid>` present with cards for every spoke
- [ ] H2 "Where to start" with recommended reading order
- [ ] H2 "Calculators" with relevant tool links
- [ ] Hub-level FAQ present
- [ ] Links to 1-2 sibling hubs
- [ ] CollectionPage schema

### Programmatic pages

- [ ] 600+ words of unique content
- [ ] Specific data for THIS variant above the fold
- [ ] Worked example for this specific variant (not generic)
- [ ] Distinct H1 per variant
- [ ] Distinct meta description per variant
- [ ] Canonical URL is the variant's own URL (self-canonical)
- [ ] At least 3 internal links to sibling variants
- [ ] At least 1 link to cornerstone article on the topic
- [ ] At least 1 link to relevant calculator
- [ ] Schema appropriate to type (Article or CollectionPage)

### Legal / footer pages

- [ ] Match exact wording specified in `09-legal-footer.md`
- [ ] "Last reviewed" date present at bottom
- [ ] Schema: WebPage
- [ ] No ads
- [ ] Linked from footer of every other page

### Homepage

- [ ] Hub navigation prominent
- [ ] Brand identity clear (logo, name, tagline)
- [ ] 1-2 paragraphs of orientation copy
- [ ] Featured articles or hubs (curated, not algorithmic)
- [ ] Featured calculators (3-5 top tools)
- [ ] No ads
- [ ] WebSite + Organization schema

---

## Automated validation

### Scripts

Located in `/scripts/`:

- **`validate-briefs.ts`**: Every brief file follows `_template.md` schema
  - Required frontmatter fields present
  - Brief Table of Contents valid
  - All sections present
  - Source IDs in citations match frontmatter sources
  - Internal link URLs are in `03-sitemap.md`

- **`validate-links.ts`**: All internal links resolve
  - Every `/url/` link points to a page in the sitemap
  - No 404s in build output
  - Anchor text rules respected (no "click here", etc.)
  - Per-page minimum link counts met

- **`check-content-policy.ts`**: Forbidden patterns scanner
  - No forbidden phrases from `01-brand-voice.md`
  - Em-dash count ≤3
  - No affiliate / lead-gen patterns
  - No professional credentials falsely claimed
  - No specific brand recommendations

- **`validate-schema.ts`** (TBD): All JSON-LD validates
  - Valid JSON syntax
  - Required fields per page type
  - Absolute URLs only

- **`validate-images.ts`** (TBD): All SVGs and images meet specs
  - SVG has viewBox + accessibility attrs
  - Color contrast meets WCAG AA
  - No raster images without alt text

### Build pipeline

`pnpm run validate:all` runs:
1. `pnpm run typecheck`
2. `pnpm run lint`
3. `pnpm run test`
4. `pnpm run validate:briefs`
5. `pnpm run validate:links`
6. `pnpm run validate:policy`

This is the CI gate on every commit and PR. Build fails if any step fails.

---

## Manual review steps (not automated)

These checks require human judgment:

### Pre-publication review
1. **Reading flow check**: read the page top-to-bottom
2. **AI-tell check**: does any sentence sound like ChatGPT? Rewrite.
3. **Tone check**: does the page match the brand voice? (calm, technical, no marketing fluff)
4. **Visual check**: do the SVGs actually teach something? Are they readable at thumbnail size?
5. **Mobile check**: open on phone or 375px viewport, scroll through
6. **Cross-reference check**: do facts in this article align with related articles on the site?

### Post-publication monitoring
1. **Search Console check**: Is the page being indexed? Any crawl errors?
2. **Real-user Web Vitals**: Are LCP/CLS/INP within targets after deployment?
3. **Ad placement check**: Are ads showing in correct locations? Any layout shift?
4. **Reader feedback**: Any corrections coming in via `/contact/`?

---

## Failure handling

When a check fails:

1. **Block publication** — don't commit if validation fails
2. **Fix the underlying issue** — don't suppress or skip the check
3. **Document** if the issue is recurring (consider updating brief template or content policy)
4. **Re-run validation** until clean

**Don't ship "good enough" if validation fails.** This site's authority depends on getting these things right consistently.

---

## Sample editorial gate (article-specific)

The brief specifies an article-specific checklist. Example from `01-heat-pump-aux-heat.md`:

```
## Editorial gate checklist

### Content completeness
- [ ] Word count between 2,160 and 2,640 (target 2,400, ±10%)
- [ ] All 9 H2 sections present, in the order specified
- [ ] All 10 FAQ items match frontmatter exactly (text and order)
- [ ] All 11 "MUST cover" items present in the body
- [ ] None of the 11 "MUST NOT do" items violated
- [ ] All 7 required data points cited with correct source ID

[...]
```

Article-specific gates COMPLEMENT this global checklist. Both must pass.

---

## Severity tiering (optional)

Not all failures are equal. Severity levels for triage:

**Severity 1 (blocks publication)**:
- Any policy violation (`04-content-policy.md`)
- Any schema invalid
- Any broken link
- Lighthouse Performance <90 (target 95)
- Accessibility issue (axe-core failure)
- TypeScript or build error

**Severity 2 (publishes with follow-up ticket)**:
- Sub-optimal meta description (still in range, but could be better)
- Image alt text could be improved
- Some keyword variants not naturally placed
- Internal link count meets minimum but could be higher

**Severity 3 (note for future improvement)**:
- Could use a better SVG diagram
- An additional FAQ item would help
- Article could be expanded with more context

CC focuses on getting to "no Severity 1 issues" and notes Severity 2/3 in the commit message for later.
