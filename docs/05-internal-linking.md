# 05 — Internal Linking

## Why internal linking is its own document

Internal linking is the single most under-executed SEO lever on most sites. CC will not link consistently across 480 pages without an explicit matrix. This doc supplies it.

The rules here are enforced by `scripts/validate-links.ts`. Briefs specify per-article linking, but the rules below are the floor.

---

## Three principles

1. **Every page links to its hub and siblings.** No orphans.
2. **Every link uses descriptive anchor text.** Never "click here", "this article", "read more", "learn more", "find out".
3. **Every link must serve the reader, not the algorithm.** If a link doesn't help the reader, don't add it.

---

## The hub-spoke-glossary topology

```
                  /
                  │
        ┌─────────┼─────────┬─────────┬─────────┐
        │         │         │         │         │
   /heat-pump/  /ac/   /furnace/  /tools/  /building-science/
        │         │         │         │         │
       spokes    spokes    spokes   tools     spokes
        │         │         │         │         │
       glossary terms cross-linked throughout
        │
        └── /manual-j/, /manual-s/, /manual-d/, /manual-t/ (methodology hubs)
```

Every URL in the site falls into one of:
- **Homepage** (`/`): links to all top-level hubs
- **Hub page**: links to all direct spokes + 1-2 sibling hubs
- **Spoke article**: links to its hub + 3-5 sibling spokes + 1-2 calculator pages + 3-5 glossary terms it references
- **Calculator page**: links to methodology page + 3-5 related articles + 2-3 related calculators
- **Glossary page**: links to 3-5 related glossary terms + the canonical article on the topic
- **Programmatic page**: links to its template hub + 3-5 sibling variants + 1 anchor article
- **Backlink magnet**: links to whatever supports its argument; built to attract inbound links primarily

---

## Required minimum links per page type

| Page type | Min internal article links | Min calc links | Min glossary links | Min external (tier 1) |
|---|---|---|---|---|
| Cornerstone article (2,000+ words) | 5 | 2 | 3 | 3 |
| Standard article (1,000-2,000 words) | 3 | 1 | 2 | 2 |
| Short article (<1,000 words) | 2 | 1 | 1 | 1 |
| Calculator page | 5 | 2 | 2 | 2 |
| Glossary page | 3 | 1 | 3 | 1 |
| Hub page | (links to all spokes) | (links to all relevant tools) | 5 | 2 |
| Programmatic page | 3 | 1 | 2 | 1 |

These are MINIMUMS. Briefs may specify more. Validation script enforces these floors.

---

## Anchor text rules

### Allowed anchor text patterns

✓ Descriptive nouns or noun phrases that describe the destination:
- "balance point calculator"
- "Manual J load calculation methodology"
- "heat pump short cycling diagnostics"
- "DOE heat pump systems overview"

✓ Action phrases when natural:
- "configure aux heat on Ecobee thermostats"
- "size your system with the heat pump calculator"

✓ Specific concept names:
- "seasonal performance factor (SPF)"
- "the NEEP cold-climate specification"

### Forbidden anchor text patterns

✗ Generic CTAs:
- "click here"
- "read more"
- "learn more"
- "find out"
- "this article"
- "this page"
- "this calculator"
- "here"
- "more info"

✗ Pure URL or domain references:
- "energy.gov"
- "hvacloadcalc.org/heat-pump"

✗ Naked keyword stuffing:
- "best heat pump sizing calculator free online" (overstuffed)
- "heat pump heat pump aux heat" (repetitive)

✗ Identical anchor text reused for different URLs in the same article:
- If `/heat-pump/sizing/` uses anchor "heat pump sizing guide", no other URL in the same article can use that exact anchor

### Anchor text variation rules across the site

Across the whole site, each destination URL should be linked with varied (but related) anchor texts. This is natural-looking and helps avoid over-optimization signals.

For each major article, the brief specifies the canonical anchor text for inbound links. Other articles linking in should use one of the 3-5 acceptable variants listed in the brief.

Example for `/heat-pump/aux-heat/`:
- "auxiliary heat explained" (canonical)
- "what auxiliary heat does"
- "how aux heat works on a heat pump"
- "the role of auxiliary heat"
- "aux heat behavior"

---

## The link placement rules

### Where to place internal links in an article

1. **Intro paragraph**: 0-1 links, only if a hub link helps orient the reader
2. **Body H2 sections**: 1-3 links per H2, naturally embedded in prose
3. **At the end of a deep technical explanation**: link to the deeper article on that sub-topic ("for the full breakdown of X, see Y")
4. **In the FAQ answers**: 0-1 links per answer max — answers should be standalone for FAQ schema
5. **Related Articles section**: 4-6 algorithmic links, separate from inline links

### Where NOT to place links

✗ Multiple consecutive sentences with links (looks spammy)
✗ Inside `<KeyTakeaways>` bullets (keep it scannable)
✗ Inside H2/H3 headings (poor UX, accessibility issue)
✗ Inside the `<Methodology>` callout (focus on the math)
✗ More than one link per sentence

### Link density target

For a 2,000-word article: 8-15 internal links total across the body. More than 20 looks SEO-engineered.

---

## The hub linking matrix

Every spoke article must link UP to its hub at least once. Hubs link DOWN to every spoke.

### `/heat-pump/` hub linking

**Down**: links to all heat-pump spokes (aux-heat, cold-climate, types, performance, troubleshooting, sizing, mini-split sub-hub)

**Up**: links to homepage in breadcrumb only

**Lateral**: links to `/ac/` and `/furnace/` once each (for cross-hub navigation)

### `/ac/` hub linking

**Down**: all ac spokes (sizing, short-cycling, btu-chart, oversized-problems, etc.)

**Lateral**: `/heat-pump/` (for users considering heat pump replacement), `/tools/ac-size-calculator/`

### `/manual-j/` hub linking

**Down**: all manual-j sub-articles (8th-edition, by-hand, software, example, cost, vs-rule-of-thumb, htm, verify-contractor-report)

**Lateral**: `/manual-s/`, `/manual-d/`, `/manual-t/` (sibling methodology hubs), `/tools/manual-j-calculator/`

### `/building-science/` hub linking

**Down**: all building-science spokes (r-value, u-factor, psychrometrics, infiltration, climate-zones, design-temperature, internal-gains, energy-audit)

**Lateral**: `/manual-j/` (load calc methodology depends on building science), `/tools/` (relevant calculators)

### `/tools/` hub linking

**Down**: all 21 calculator pages

**Lateral**: `/methodology/` (sitewide methodology page)

---

## The sibling linking patterns

Articles within the same H1-hub link to each other in specific patterns.

### Within `/heat-pump/aux-heat/*` cluster

Each sub-article links to:
- Parent `/heat-pump/aux-heat/`
- 2-3 other `/heat-pump/aux-heat/*` siblings (Ecobee, Nest, Honeywell, emergency-heat-difference, meaning)
- `/heat-pump/` hub
- 1 calculator: `/tools/balance-point-calculator/`
- 1 related cluster: `/heat-pump/cold-climate/balance-point/`

### Within `/heat-pump/cold-climate/*` cluster

Each sub-article links to:
- Parent `/heat-pump/cold-climate/`
- 2-3 sibling sub-articles (balance-point, defrost-cycle, how-cold-can-they-work, neep-database)
- `/heat-pump/` hub
- 1 calculator: `/tools/balance-point-calculator/` or `/tools/heat-pump-size-calculator/`

### Within `/building-science/r-value/*` cluster

Each sub-article links to:
- Parent `/building-science/r-value/`
- 2-3 siblings (walls, attic, crawlspace, basement, vs-u-value)
- `/building-science/` hub
- `/glossary/r-value/`
- 1 calculator: `/tools/r-value-calculator/`

### Within programmatic clusters

Each programmatic page links to:
- Its template hub (e.g., `/heat-pump/sizing/`)
- 3 sibling variants (e.g., `/heat-pump/sizing/1200-sq-ft/` links to 1000, 1500, 2000 sqft variants)
- 1 cornerstone article on the topic
- 1 calculator

---

## The calculator-to-article linking pattern

Every calculator page links to:
- The methodology page that explains its math (could be `/methodology/` for sitewide, or a specific article)
- 3-5 related articles that provide context (e.g., heat-pump-size-calculator links to /heat-pump/sizing/, /heat-pump/aux-heat/, /heat-pump/cold-climate/, /manual-j/)
- 2-3 related calculators
- Its `/examples/` sub-pages

Every relevant article links to:
- The primary calculator for that topic (in body, naturally)
- 1-2 secondary calculators if the topic touches multiple calc areas

---

## The glossary linking pattern

Every glossary term page links to:
- 3-5 related glossary terms
- The canonical article on that topic (e.g., `/glossary/balance-point/` links to `/heat-pump/cold-climate/balance-point/`)
- 1 calculator that uses the concept

Every article should link to glossary terms on **first mention** of each technical term, not every mention.

Example: in an article about heat pumps, the first mention of "COP" links to `/glossary/cop/`. Subsequent mentions of COP are plain text.

This is enforced by `auto-link-first-mention` plugin behavior: a build-time scan flags articles that link to a glossary term more than once or that mention a term without ever linking.

---

## External link strategy

### Tier 1 external links (preferred)

Always link to these when supporting a claim:

- `energy.gov` (DOE)
- `eia.gov` (EIA)
- `energystar.gov`
- `acca.org`
- `ashrae.org`
- `neep.org`
- `ahridirectory.org`
- `iccsafe.org` (IECC)
- `lbl.gov` (LBNL)
- `ornl.gov` (ORNL)
- `nrel.gov`
- `noaa.gov`

### Tier 2 (acceptable for context)

- `greenbuildingadvisor.com`
- `energyvanguard.com`
- `buildingscience.com`
- `aceee.org`
- State energy office sites (`masscec.com`, `nyserda.ny.gov`, etc.)

### Tier 3 (limited use)

- Manufacturer technical documentation pages (NOT marketing pages)
- ACHR News, JLC, Contracting Business for specific articles

### Never link to

- Competitor calculator sites (Cool Calc, AutoHVAC, ServiceTitan, Calculator.net, etc.)
- HVAC contractor blogs (unless author is recognized expert with broader citations)
- Wikipedia (allowed for definitional context but only as last-resort source)
- Reddit / Quora / forums
- AI-generated content sources

### External link attributes

- `rel="noopener"` — always
- `rel="nofollow"` — NEVER on editorial citations to tier 1/2/3 sources (these are authority signals; treat them like citations)
- `target="_blank"` — optional, brief should specify per article

---

## Link checking automation

`scripts/validate-links.ts` runs on every build and checks:

1. Every internal link resolves to a real page in the sitemap
2. No links to phantom URLs (URLs not in `03-sitemap.md`)
3. No forbidden anchor texts ("click here", etc.)
4. Per-page minimum link counts met
5. No anchor text used twice for different URLs in the same article
6. No `nofollow` on editorial citations
7. Hub→spoke and spoke→hub links present
8. Glossary term first-mention auto-linking honored

Build fails if any check fails.

---

## Common mistakes to avoid

**Mistake 1**: Linking to a page that hasn't been built yet.
**Fix**: Use the sitemap doc as the source of truth. If a URL is in the sitemap but not yet built, the link still goes in the article (it'll resolve when the page lands). Validation script handles this gracefully if the brief is marked as referencing future content.

**Mistake 2**: Using the same anchor text for multiple links.
**Fix**: Vary anchor text. Briefs specify exact anchor text per link; follow it.

**Mistake 3**: Linking the same destination URL multiple times in one article.
**Fix**: Link to each destination URL exactly once per article. The first mention gets the link; later references are plain text.

**Mistake 4**: Linking too aggressively in the intro.
**Fix**: Intro paragraphs should have 0-1 links, max. The hub link can go in the intro; everything else waits for the body.

**Mistake 5**: Forgetting to link UP to the hub.
**Fix**: Every spoke article must contain at least one inline link to its hub URL, plus the breadcrumb.

**Mistake 6**: Using forbidden generic anchor text out of habit.
**Fix**: Validation script catches "click here" and friends; rewrite before commit.
