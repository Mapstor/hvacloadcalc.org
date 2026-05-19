# Content Brief Template — Deep Schema

This is the canonical brief schema for hvacloadcalc.org. Every page on the site has a brief that follows this exact structure. Briefs are detailed and can be 1,500+ lines.

Claude Code reads the brief, then writes the page in one pass. The brief is the contract between planning and execution — overspecified is better than underspecified.

**Do not modify this template without updating every existing brief.**

---

## How to use this template

1. Copy this file to the appropriate folder under `content/briefs/`
2. Rename to match the slug (e.g., `01-heat-pump-aux-heat.md`)
3. Fill out every section. If a section doesn't apply, explicitly mark `N/A` with a one-sentence reason.
4. Verify the brief passes the "Brief quality checklist" at the bottom before passing to CC
5. CC reads the brief and writes the page in one pass

---

## Brief structure (17 components)

A complete brief has these components in this order:

### Frontmatter (YAML)
1. **Identity** — slug, url, page_type, hub, parent_title, brief_version
2. **SEO metadata** — title, meta_description, h1, canonical, og_*, twitter_card
3. **Target keywords** — primary keyword with volume/CPC/competition + secondary keywords list with per-keyword intent classification
4. **Content specs** — word count target + tolerance, reading time
5. **Schema.org** — schema_types, dates
6. **Author** — always `jonathan-s`
7. **Sources** — full source list with id, title, publisher, year, url, accessed date, tier, used_for
8. **Internal links** — hub link, sibling links, calculator links, related articles, external authoritative links (each with anchor text and placement spec)
9. **SVG assets** — hero SVG + inline SVGs with full descriptions, viewBox, alt text
10. **FAQ** — 5-10 question/answer pairs
11. **AI citation hooks** — definitional quotes, specific values, decision frameworks

### Body sections (Markdown after frontmatter)
12. **Brief Table of Contents** — anchor links to each section below
13. **Search intent** — 2-3 paragraphs describing the reader's emotional and informational state
14. **MUST cover** — checklist of required content topics
15. **MUST NOT do** — checklist of forbidden content patterns
16. **Required data points** — table mapping each claim to its source ID and the H2 section it appears in
17. **Required H2 outline** — section-by-section spec with target word counts and sub-bullet content
18. **Technical depth specification** — formulas, edge cases, numeric ranges per H2 section
19. **Per-keyword paragraph mapping** — every secondary keyword → which H2 it lives in + approximate placement
20. **Internal linking spec** — exact anchor text and context sentence for every outbound link
21. **Schema.org JSON-LD shape** — full JSON-LD blocks (Article, BreadcrumbList, FAQPage etc.)
22. **Prose anchors** — opening hook (exact text) + one anchor paragraph from the hardest section (exact text)
23. **Drafting notes** — opening hook recommendation, tone calibration, specific phrasings, length pacing
24. **Editorial gate checklist** — full pre-ship verification list

---

## Full template

Copy this YAML frontmatter as-is. Fill in every field. Do not delete fields you don't need — leave them empty or use `N/A`.

```yaml
---
# ============================================================
# IDENTITY
# ============================================================
slug: [url-slug-here]
url: [/full/url/path/]
page_type: [article | calculator | glossary | hub | programmatic]
hub: [/parent-hub-url/]
parent_title: [Parent Hub Display Name]
brief_version: 1
brief_last_updated: YYYY-MM-DD

# ============================================================
# SEO METADATA
# ============================================================
title: "[60-65 char SEO title with target keyword]"
title_length: 0  # computed length, must be ≤65
meta_description: "[150-160 char meta description with target keyword and benefit]"
meta_description_length: 0  # computed length, must be 150-160
h1: "[H1 text, can differ from title]"
canonical: [self-canonical URL, usually same as url]
og_image: [path to OG image or "auto-generate"]
og_title: "[OG title, can match or differ from page title]"
og_description: "[OG description, can match or differ from meta description]"
twitter_card: summary_large_image

# ============================================================
# TARGET KEYWORDS (from clustered KW data, sorted by volume)
# ============================================================
target_keyword: "[primary keyword]"
target_volume: 0
target_cpc: 0.00
target_competition: [Low | Medium | High]
target_competition_index: 0  # 0-100 from KW Planner

secondary_keywords:
  - { keyword: "[kw1]", volume: 0, cpc: 0.00, intent: "[definition|troubleshoot|configure|shopping|comparison]" }
  # ... 10-30 secondary keywords expected

total_targeted_volume: 0  # sum of target + all secondary

# ============================================================
# CONTENT SPECS
# ============================================================
word_count_target: 0
word_count_tolerance_pct: 10
word_count_min: 0  # target × 0.9
word_count_max: 0  # target × 1.1
reading_time_target_min: 0  # word_count / 250
reading_time_target_max: 0  # word_count / 200

# ============================================================
# SCHEMA.ORG
# ============================================================
schema_types: [Article, FAQPage, BreadcrumbList]  # adjust per page_type
last_reviewed: YYYY-MM-DD
date_published: YYYY-MM-DD

# ============================================================
# AUTHOR
# ============================================================
author: jonathan-s  # always jonathan-s — see 08-author-bio-jonathan.md

# ============================================================
# SOURCES (used by <SourceCite> and <Sources /> components)
# ============================================================
sources:
  - id: [short-id]
    title: "[Source title]"
    publisher: "[Publisher]"
    year: YYYY
    url: "[https://...]"
    accessed: YYYY-MM-DD
    tier: [1 | 2 | 3]  # see 04-content-policy.md sourcing tiers
    used_for: "[brief description of which claims this source supports]"
  # min 3 sources per article, 5+ preferred

# ============================================================
# INTERNAL LINKS
# ============================================================
internal_links:
  hub_link:
    url: [/parent-hub-url/]
    anchor_text: "[descriptive anchor]"
    placement: "[which H2 section or paragraph]"

  parent_breadcrumb:
    - { url: /, label: "Home" }
    - { url: /hub/, label: "Hub Name" }
    - { url: /hub/page/, label: "Page Title" }

  sibling_links:
    - { url: /sibling-1/, anchor: "[descriptive anchor]", placement: "[where it goes]" }
    # ... 4-8 sibling links typical

  calculator_links:
    - { url: /tools/relevant-calc/, anchor: "[descriptive anchor]", placement: "[where it goes]" }
    # 1-3 calculator links typical

  related_articles:
    - { url: /related/, anchor: "[descriptive anchor]", placement: "[where it goes]" }
    # 3-5 related articles typical

  external_authoritative_links:
    - { url: "[https://...]", anchor: "[descriptive anchor]", context: "[brief context]" }
    # 3+ external links to tier-1 sources

# ============================================================
# IMAGES / SVG ASSETS
# ============================================================
hero_svg:
  filename: hero-[slug].svg
  viewBox: "0 0 1200 600"
  description: |
    [Multi-line detailed description of what the hero SVG shows.
    Include every labeled element, color hints, layout, and what it teaches the reader.]
  placement: hero, above H1
  alt_text: "[Concise alt text, ≤125 chars, describes content not appearance]"

inline_svgs:
  - filename: [name].svg
    viewBox: "0 0 800 500"
    description: |
      [Detailed description matching the hero SVG style.]
    placement: [Which H2 section, where in the section]
    alt_text: "[Alt text]"
  # ... 2-5 inline SVGs typical per article

# ============================================================
# FAQ (for FAQPage schema; will become <FAQ /> component)
# ============================================================
faq:
  - q: "[Question 1]"
    a: |
      [Answer 1, 2-4 sentences. Quotable in isolation.
      Should answer the question fully — readers may not click through to article body.]
  # ... 5-10 FAQ items, 8-10 preferred for FAQPage schema strength

# ============================================================
# AI CITATION HOOKS
# ============================================================
ai_citation_hooks:
  definitional_quotes:
    - "[Quotable definitional sentence 1, complete on its own]"
    - "[Quotable definitional sentence 2]"
    # 3-5 definitional quotes

  specific_values:
    - "[Specific numeric claim with conditions and source implied]"
    - "[Another specific value]"
    # 3-5 specific value claims

  decision_frameworks:
    - "[Structured decision framework: when X is true, do Y. When Z is true, do W.]"
    # 2-3 decision frameworks
---
```

---

## Body sections (after the frontmatter)

```markdown
# Brief Table of Contents

Use these anchors when reviewing the brief sections you care about.

1. [Search intent](#search-intent)
2. [MUST cover](#must-cover)
3. [MUST NOT do](#must-not-do)
4. [Required data points](#required-data-points)
5. [Required H2 outline](#required-h2-outline)
6. [Technical depth specification](#technical-depth)
7. [Per-keyword paragraph mapping](#per-keyword-mapping)
8. [Internal linking spec](#internal-linking-spec)
9. [Schema.org JSON-LD shape](#schema-shape)
10. [Prose anchors (voice calibration)](#prose-anchors)
11. [Drafting notes](#drafting-notes)
12. [Editorial gate checklist](#editorial-gate)

---

## Search intent

[2-3 paragraphs. Cover: who is searching, what emotional state they're in, what they need to leave the page understanding. Cross-reference the keyword cluster to identify sub-intents the article must serve.]

## MUST cover

- [ ] [Required topic 1]
- [ ] [Required topic 2]
- ... [8-15 items typical for a 2,000+ word article]

## MUST NOT do

- [ ] [Anti-pattern 1]
- [ ] [Anti-pattern 2]
- ... [Include legal/safety boundaries, brand bias, scope creep]

## Required data points

Every claim below MUST appear in the article, sourced exactly to the listed source ID.

| Claim | Source ID | H2 section |
|---|---|---|
| [Specific data point 1] | `[source-id]` | [section number/name] |
| [Specific data point 2] | `[source-id]` | [section number/name] |
| ... | | |

## Required H2 outline

[Number of] H2 sections, in this order. Target words per section noted; total target [word count] words excluding FAQ.

### H2 1 — [Section title]
**Target: [N] words**

- [Sub-bullet of what to cover]
- [Sub-bullet]
- [Reference any SVGs that appear in this section]

### H2 2 — [Section title]
**Target: [N] words**

[... same format for each H2]

## Technical depth specification

[For each section that has technical content, spell out:
- Formulas (in code blocks if applicable)
- Edge cases
- Numeric ranges with sources
- Optional depth that can be included if word count allows]

## Per-keyword paragraph mapping

Every secondary keyword from the cluster must appear in natural prose somewhere in the article. This table maps each keyword to where it appears.

| Keyword | H2 section | Approximate placement |
|---|---|---|
| [primary] | All | Throughout |
| [secondary 1] | [section] | "[Example sentence using the keyword]" |
| ... | | |

**Rule**: keyword variants should NOT feel jammed in. If a placement reads awkwardly, drop that variant. Coverage of ~80% of variants in natural prose is the target.

## Internal linking spec

Every internal link uses the exact anchor text specified. Do not vary anchor text.

### Outbound internal links

| URL | Anchor text | H2 section | Context sentence |
|---|---|---|---|
| [/url/] | "[anchor]" | [section] | "[Sentence containing the link in context]" |
| ... | | | |

### Inbound internal links TO this article

When other articles get written, they should link to this article using one of these anchors:

- "[anchor variant 1]"
- "[anchor variant 2]"
- ... [3-5 acceptable inbound anchors]

### External link spec

[N] external links required, all to tier-1 sources:

| URL | Anchor text | H2 section |
|---|---|---|
| [https://...] | "[anchor]" | [section] |
| ... | | |

External links use `rel="noopener"` (no nofollow — these are editorial citations).

## Schema.org JSON-LD shape

The page emits [N] JSON-LD blocks in the `<head>`.

### Block 1: [Type]

```json
{
  "@context": "https://schema.org",
  "@type": "[Type]",
  ...
}
```

[Include full JSON-LD for each schema type listed in frontmatter. Generic templates for Article + BreadcrumbList + FAQPage are in 06-schema-jsonld.md — reference but customize per article.]

## Prose anchors (voice calibration)

Two prose samples below. These are the ONLY drafted prose CC should match exactly. The rest of the article CC writes fresh, calibrated to these.

### Opening hook (use exactly, do not rewrite)

> [Drafted opening, 2-3 paragraphs, ~150 words. This is the article's first impression. Validate reader state, define topic, preview structure.]

[Brief note on what this opening hook accomplishes and why CC should match the rhythm.]

### Anchor paragraph — [Section name], opening (use exactly)

> [Drafted paragraph from the HARDEST section of the article — usually one that introduces a counterintuitive concept or requires precise nuance. ~120 words.]

[Brief note on what makes this paragraph the calibration reference for the article's tone.]

## Drafting notes

**Opening**: use the exact prose anchor above. Don't paraphrase.

**Tone**: [Specific tone calibration for this article — e.g., "calm for stressed readers" or "rigorous for technical readers"]

**Visualization placement**:
- [Where each SVG goes]

**Specific phrases worth keeping** (use these exact forms in the article body):
- "[Quotable sentence 1]"
- "[Quotable sentence 2]"

**Specific phrases to avoid**:
- [List article-specific anti-patterns, in addition to the global forbidden phrases]

**Length pacing**:
[Notes on how to distribute words across sections]

**Sentence rhythm reminder**:
- Average 14-18 words per sentence
- Mix short with medium
- Vary openings — never three consecutive sentences starting with the same word
- Paragraphs max 4 sentences, sweet spot 2-3

**Mobile preview**:
- All tables use `<DataTable>` component
- All SVGs have viewBox and scale to width
- Code blocks must wrap or scroll horizontally

## Editorial gate checklist

CC outputs each checkbox state in the commit message or PR description.

### Content completeness
- [ ] Word count within tolerance
- [ ] All H2 sections present, in specified order
- [ ] All FAQ items match frontmatter exactly
- [ ] All "MUST cover" items present in body
- [ ] None of the "MUST NOT do" items violated
- [ ] All required data points cited with correct source ID

### Voice / language
- [ ] No forbidden phrases from `01-brand-voice.md`
- [ ] Em-dash count ≤3
- [ ] Article-specific phrase budget respected
- [ ] No paragraph longer than 4 sentences
- [ ] No three consecutive sentences starting with the same word
- [ ] Opening hook matches prose anchor exactly
- [ ] Anchor paragraph matches prose anchor exactly

### SEO / structure
- [ ] Exactly one H1, matches frontmatter
- [ ] H1 length ≤65 chars
- [ ] Meta description 150-160 chars
- [ ] All H2s match required outline
- [ ] All keyword variants appear in natural prose

### Internal linking
- [ ] All outbound internal links present with exact anchor text
- [ ] All external links present with exact anchor text
- [ ] No phantom URLs
- [ ] No `nofollow` on editorial citations
- [ ] No duplicate anchor texts → different URLs

### Schema / JSON-LD
- [ ] All JSON-LD blocks present and validate at schema.org validator
- [ ] All blocks emit valid JSON (no trailing commas)
- [ ] `dateModified` matches frontmatter

### SVGs
- [ ] Hero SVG present, accessible
- [ ] All inline SVGs in correct H2 sections
- [ ] All SVGs have viewBox
- [ ] All SVGs scale responsively
- [ ] Color contrast meets WCAG AA

### Mobile / accessibility
- [ ] No horizontal scroll at 375px
- [ ] All tables use `<DataTable>` component
- [ ] All links have descriptive text
- [ ] Heading hierarchy sequential
- [ ] Page passes axe-core check

### Lint / build
- [ ] `pnpm run lint` passes
- [ ] `pnpm run typecheck` passes
- [ ] `pnpm run build` succeeds
- [ ] Page loads at localhost:3007 without errors

### Final reading flow
- [ ] Read top to bottom on localhost:3007
- [ ] Skim H2s — does structure make sense in isolation?
- [ ] Any paragraphs harder to read than they should be?
- [ ] Any sentence sound generic/AI-flavored? If yes, rewrite.

If any checkbox fails, do not declare complete. Fix it.
```

---

## Brief quality checklist

A brief is ready to hand to CC when:

- [ ] Every frontmatter field is filled (not just present — actually filled)
- [ ] Target keyword has confirmed search volume from the clustered KW data
- [ ] Secondary keywords are real (from the KW data, not invented)
- [ ] At least 3 sources, mostly tier 1 or tier 2 (tier 3 needs justification)
- [ ] Internal link targets are URLs that exist or are scheduled in the sitemap
- [ ] FAQ items match real reader questions (search intent rationale stated)
- [ ] AI citation hooks are crafted, not generic
- [ ] "MUST cover" list is specific, not vague
- [ ] "MUST NOT do" list addresses the specific risks for this topic
- [ ] H2 outline is locked with per-section word targets
- [ ] Technical depth section is filled with actual formulas/ranges, not placeholders
- [ ] Per-keyword mapping table covers all secondary keywords
- [ ] Internal linking spec gives exact anchor text per link
- [ ] Schema JSON-LD shape is filled with article-specific values
- [ ] Prose anchors (opening hook + one anchor paragraph) are drafted, not placeholder text
- [ ] Drafting notes specify article-specific tone calibration

If any of these fails, the brief is not done. Finishing the brief before CC starts saves 5x the time of fixing the article after.
