# 07 — On-Page SEO

## Why this doc

This document specifies the on-page SEO rules every page must follow. These overlap with content policy and brand voice but consolidate the specifically search-engine-facing decisions in one place.

The rules here are enforced where possible by `scripts/validate-briefs.ts` and by build-time checks.

---

## Title tag rules

- **Length**: 50-65 characters, target 60
- **Must include**: target keyword (verbatim or close variant)
- **Format options**:
  - `[Topic]: [Specific Angle]` (preferred for articles)
  - `[Topic Word + 1] | [Site Name]` only on hub and homepage
  - `[How To/What Is] [Topic]` for explainer articles
- **No clickbait**: no "You'll never guess", "Top 10 secrets", "Mind-blown"
- **No ALL CAPS** except for known abbreviations (BTU, SEER, AFUE)
- **No trailing site name** on individual articles (saves 18 chars for keyword density)

### Examples

✓ Good:
- `Heat Pump Auxiliary Heat: What It Is and When It Should Run` (60 chars)
- `What Size Heat Pump Do I Need? Calculator and Sizing Guide` (58 chars)
- `Manual J Calculation Explained: Methodology and Example` (55 chars)

✗ Bad:
- `Heat Pump Auxiliary Heat | hvacloadcalc.org` (clutters site name on individual articles)
- `The Complete Ultimate Guide to Auxiliary Heat — Everything Homeowners Need to Know` (too long, generic)
- `AUX HEAT EXPLAINED!` (all caps, clickbaity)

---

## Meta description rules

- **Length**: 150-160 characters, target 155
- **Must include**: target keyword + secondary keyword if natural
- **Must communicate value**: what will the reader learn or be able to do?
- **No truncation**: must read as a complete thought, no mid-sentence cutoff at 155
- **Action-oriented**: "Learn", "Calculate", "Understand", "Find out", "Diagnose"
- **No keyword stuffing**: max 2 mentions of target keyword
- **No fake urgency**: no "Don't miss", "Last chance", "Limited time"

### Examples

✓ Good:
- `Auxiliary heat kicks in when your heat pump can't meet demand alone. Learn what triggers it, what it costs, and when constant aux heat signals a problem.` (157 chars)
- `Calculate the right heat pump size for your home. Free calculator with climate zone, square footage, and insulation factors. Manual J-style methodology.` (153 chars)

✗ Bad:
- `Heat pump aux heat is important. Click here to learn more about auxiliary heat in heat pumps. Aux heat aux heat heat pump.` (keyword stuffed, generic)
- `Everything you need to know about auxiliary heat.` (too short, no specifics)

---

## H1 rules

- **One H1 per page, always**
- **Length**: ≤65 characters, target 50
- **Must include**: target keyword (verbatim)
- **Can differ from title tag**: title is for SERP, H1 is for the reader
- **No site name in H1**
- **No "Welcome to..." or "Introduction to..."** unless it's a hub page

### When H1 differs from title

Title tag balances SERP visibility (must include keyword, must look clickable). H1 prioritizes reader experience.

Example:
- Title: `Heat Pump Auxiliary Heat: What It Is and When It Should Run`
- H1: `Heat Pump Auxiliary Heat Explained`

Title is more specific for SERP; H1 is cleaner for the reader who already clicked.

---

## H2/H3 hierarchy rules

- **Sequential heading levels**: no skipping (H2 → H4 is bad)
- **H2s for major sections**: 4-9 per article typical
- **H3s for sub-points within H2s**: optional, use only when needed for outline clarity
- **H4s rarely used**: only for very deep nested structure
- **No H5 or H6 in article content**
- **Each H2 includes target keyword variants where natural**, but never forced
- **Headings are statements or specific questions**, not generic ("Introduction", "Conclusion", "Overview" are forbidden as standalone)
- **Capitalization**: Title Case for H1 and H2, sentence case acceptable for H3
- **No emojis in headings**
- **No ALL CAPS in headings** except known abbreviations

### Examples

✓ Good:
- `## What Auxiliary Heat Actually Is`
- `## How Aux Heat Engages: The Mechanical Sequence`
- `## When Aux Heat Is a Problem`

✗ Bad:
- `## Introduction` (generic, forbidden)
- `## Let's Talk About Aux Heat` (conversational filler)
- `## Conclusion` (generic, forbidden)
- `## 🔥 AUX HEAT — EVERYTHING YOU NEED TO KNOW! 🔥` (emoji + caps)

---

## URL structure rules

- **Lowercase only**
- **Hyphens between words**, no underscores
- **No stop words removed**: keep "the", "of", "for" if natural ("heat-pump-for-1500-sq-ft" is fine)
- **Singular by default**: `/heat-pump/` not `/heat-pumps/`
- **Trailing slash always**: `/heat-pump/aux-heat/`
- **3-5 segments max from root**: deeper than `/category/sub/sub-sub/leaf/` is too deep
- **Programmatic patterns documented in 03-sitemap.md**
- **No dates, IDs, or query strings** in canonical URLs

---

## Internal linking from SEO perspective

(See `05-internal-linking.md` for full rules.)

Specifically for SEO:
- **Descriptive anchor text every time** (never "click here")
- **One link per destination per page** (don't link the same URL twice in one article)
- **Hub-spoke link density** is the topical authority signal — every spoke links to hub, hub links to every spoke

---

## External linking from SEO perspective

- **No `nofollow` on editorial citations** (tier 1-3 sources from `04-content-policy.md`)
- **`rel="noopener"` on all external links** (security best practice, not SEO-related but required)
- **Open in same tab by default** (`target="_blank"` only when brief specifies)
- **Anchor text describes the destination**, not just the domain

---

## Image SEO

(See `12-image-policy.md` for full rules.)

For SEO specifically:
- **Every `<img>` and `<svg>` has alt text** — content-describing, not appearance-describing
- **Alt text length**: 5-125 characters typical, ≤300 for complex diagrams
- **Filename describes content**: `balance-point-chart.svg` not `chart-1.svg`
- **Lazy load below-the-fold images** with `loading="lazy"` attribute
- **Width and height attributes set** to prevent CLS

### Alt text examples

✓ Good:
- `"Chart showing heat pump capacity declining and home heat loss rising as outdoor temperature drops"`
- `"NFRC label on a residential window showing U-factor, SHGC, and air leakage ratings"`

✗ Bad:
- `"chart"` (uninformative)
- `"Image of a beautiful chart showing the balance point"` (appearance, not content)
- `""` (empty alt is OK ONLY for decorative images, which we generally don't use)

---

## Meta tags (full list)

Every page emits these via Next.js Metadata API:

```ts
export const metadata: Metadata = {
  title: frontmatter.title,
  description: frontmatter.meta_description,
  canonical: `${SITE_URL}${frontmatter.url}`,
  openGraph: {
    title: frontmatter.og_title ?? frontmatter.title,
    description: frontmatter.og_description ?? frontmatter.meta_description,
    url: `${SITE_URL}${frontmatter.url}`,
    siteName: 'hvacloadcalc.org',
    images: [{
      url: `${SITE_URL}/og-images/${slug}.png`,
      width: 1200,
      height: 630,
      alt: frontmatter.og_alt ?? frontmatter.h1,
    }],
    locale: 'en_US',
    type: 'article',  // 'website' for homepage and hubs
    publishedTime: frontmatter.date_published,
    modifiedTime: frontmatter.last_reviewed,
    authors: ['Jonathan S.'],
  },
  twitter: {
    card: 'summary_large_image',
    title: frontmatter.og_title ?? frontmatter.title,
    description: frontmatter.og_description ?? frontmatter.meta_description,
    images: [`${SITE_URL}/og-images/${slug}.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  other: {
    'last-reviewed': frontmatter.last_reviewed,
  },
};
```

---

## OG image specs

- **Dimensions**: 1200×630 (standard OG ratio)
- **Format**: PNG (preferred) or JPG
- **File size**: ≤200 KB
- **Generated programmatically** via Satori (see `scripts/generate-og-images.ts`)
- **Template includes**:
  - Site logo (small, top-left)
  - Article H1 (large, center)
  - Category/hub name (small, top-right)
  - Author byline (small, bottom-left): "Jonathan S. — hvacloadcalc.org"
  - Optional: brand color accent stripe

OG images are auto-generated from the brief frontmatter. No hand-designed OG images for individual articles.

---

## Sitemap.xml rules

(See `03-sitemap.md` for the URL list.)

For SEO specifically:
- **Auto-generated at build time** from `app/sitemap.ts`
- **Includes `lastmod`** from frontmatter `last_reviewed`
- **Excludes legal pages** from prominent listing but keeps them indexable
- **Paginated if >50k URLs** (we're well under)
- **One sitemap per language** if site ever goes multi-lang (not v1 plan)

---

## Robots.txt rules

```
User-agent: *
Allow: /

Sitemap: https://hvacloadcalc.org/sitemap.xml
```

That's the entire file. No `Disallow` rules. No special bot handling.

If we later need to block specific bots or paths, add to this doc first, then implement.

---

## Page speed and Core Web Vitals

(See `02-tech-stack.md` for full performance budgets.)

Summary:
- LCP ≤ 1.5s on slow 4G
- CLS ≤ 0.05
- INP ≤ 100ms
- Total page weight ≤ 250 KB

Core Web Vitals are SEO-relevant. Every page must meet these or build fails.

---

## Mobile-friendly checks

- Viewport meta tag: `<meta name="viewport" content="width=device-width, initial-scale=1" />`
- Touch targets ≥ 44×44 px
- Font size base 16px minimum
- No horizontal scroll at 375px viewport
- Tables use `<DataTable>` component with horizontal scroll on overflow

---

## SERP feature optimization

The site targets these SERP features specifically:

### Featured snippets (paragraph answers)

For articles targeting "what is X" or "how does X work" queries:
- Include a clear definitional answer in the first 100 words
- Length: 50-80 words ideal for snippet extraction
- Use clear sentence structure (subject-verb-object)
- Avoid "we", "you" in the snippet candidate

### FAQ rich results

For articles with FAQPage schema:
- 5-10 questions
- Each answer 2-4 sentences
- Question phrasing matches actual user queries
- Schema validates at search.google.com/test/rich-results

### People Also Ask

Cover these question formats in FAQ:
- "What is..."
- "How does..."
- "Why does..."
- "When should..."
- "Can I..."
- "How much..."
- "What's the difference between..."

### Knowledge graph entities

Define key entities cleanly in glossary pages with DefinedTerm schema. Examples:
- BTU
- SEER
- HSPF
- Heat pump
- Manual J
- Climate zone

---

## SEO-related forbidden practices

- **No cloaking** — what users see is what bots see
- **No doorway pages** — every page has substantive unique content
- **No exact-match keyword stuffing** — natural prose only
- **No "SEO content" footer blocks** that hide low-quality keyword-stuffed text
- **No hidden text** (display:none, color:transparent on text content)
- **No reciprocal link schemes** with external sites
- **No paid link schemes**
- **No automated/spun content**

These are Google penalty territory. Avoid them all.

---

## Updates

When SEO guidance from Google changes (e.g., a Core Update affects best practices), update this document and the brief template. Do not change individual articles ad-hoc.
