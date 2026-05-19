# 06 — Schema.org JSON-LD

## Why schema matters here

Three audiences read JSON-LD:
1. **Search engines** (Google, Bing) — for rich results, knowledge graph, FAQ snippets
2. **LLMs** (Claude, GPT, Perplexity, Gemini) — for citation extraction and topic understanding
3. **Accessibility/parser tools** — for structured page understanding

This site over-invests in schema because all three matter for our strategy. Schema is implemented through dedicated React components (`<JsonLdArticle>`, `<JsonLdFAQ>`, etc.) that emit script tags in `<head>`.

---

## Schema rules

1. **Every page emits at least 2 schema blocks**: a primary type (Article, WebApplication, DefinedTerm, etc.) and `BreadcrumbList`.
2. **JSON-LD only**, never microdata or RDFa. We use `<script type="application/ld+json">`.
3. **All blocks validate** at validator.schema.org and rich-results-test before commit.
4. **No trailing commas** (kills JSON-LD parsing in some validators).
5. **Use absolute URLs**, not relative paths. Prepend `NEXT_PUBLIC_SITE_URL`.
6. **Use ISO 8601 dates**: `2026-05-18T00:00:00Z`.
7. **Components are the source**, not handwritten JSON-LD in MDX. CC writes the component once, every page uses it.

---

## Per-page-type schema map

| Page type | Required schemas | Optional schemas |
|---|---|---|
| Article (standard) | `Article`, `BreadcrumbList`, `FAQPage` (if has FAQ) | `WebSite` (homepage only) |
| Calculator page | `WebApplication`, `SoftwareApplication`, `BreadcrumbList`, `FAQPage` | `HowTo` (if methodology has steps) |
| Glossary page | `DefinedTerm`, `BreadcrumbList` | — |
| Hub page | `CollectionPage`, `BreadcrumbList`, `FAQPage` | `ItemList` |
| Author page | `Person`, `BreadcrumbList` | — |
| Methodology page | `WebPage`, `BreadcrumbList` | — |
| Homepage | `WebSite`, `Organization`, `BreadcrumbList` (just home) | `SearchAction` |
| Programmatic page | `Article` or `CollectionPage`, `BreadcrumbList` | varies per template |

---

## Templates per type

### Article (standard editorial)

Component: `<JsonLdArticle />` in `components/seo/JsonLdArticle.tsx`

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "{frontmatter.h1}",
  "alternativeHeadline": "{frontmatter.title}",
  "description": "{frontmatter.meta_description}",
  "image": [
    "{NEXT_PUBLIC_SITE_URL}/og-images/{slug}.png"
  ],
  "datePublished": "{frontmatter.date_published}T00:00:00Z",
  "dateModified": "{frontmatter.last_reviewed}T00:00:00Z",
  "author": {
    "@type": "Person",
    "name": "Jonathan S.",
    "url": "{NEXT_PUBLIC_SITE_URL}/authors/jonathan-s/"
  },
  "publisher": {
    "@type": "Organization",
    "name": "hvacloadcalc.org",
    "url": "{NEXT_PUBLIC_SITE_URL}/",
    "logo": {
      "@type": "ImageObject",
      "url": "{NEXT_PUBLIC_SITE_URL}/logo.png",
      "width": 600,
      "height": 60
    }
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "{NEXT_PUBLIC_SITE_URL}{frontmatter.url}"
  },
  "articleSection": "{frontmatter.parent_title}",
  "wordCount": "{computed_word_count}",
  "keywords": "{frontmatter.target_keyword},{join(frontmatter.secondary_keywords)}",
  "citation": "{array of source URLs from frontmatter.sources}",
  "inLanguage": "en-US"
}
```

### BreadcrumbList (every page except homepage)

Component: `<JsonLdBreadcrumb />` in `components/seo/JsonLdBreadcrumb.tsx`

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "{NEXT_PUBLIC_SITE_URL}/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "{hub.name}",
      "item": "{NEXT_PUBLIC_SITE_URL}{hub.url}"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "{currentPage.name}"
    }
  ]
}
```

Notes:
- The final breadcrumb item has no `item` URL (it's the current page)
- Up to 4 levels deep maximum

### FAQPage (article + calculator pages with FAQ)

Component: `<JsonLdFAQ />` in `components/seo/JsonLdFAQ.tsx`

Generates from frontmatter `faq:` array:

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "{faq[0].q}",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "{faq[0].a}"
      }
    }
    // ... one entry per FAQ item
  ]
}
```

Notes:
- Answer text uses the FULL answer from frontmatter, not truncated
- HTML in answers gets stripped to plain text for the schema
- 5+ items recommended for rich result eligibility

### WebApplication + SoftwareApplication (calculator pages)

Component: `<JsonLdCalculator />` in `components/seo/JsonLdCalculator.tsx`

```json
[
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "{frontmatter.h1}",
    "url": "{NEXT_PUBLIC_SITE_URL}{frontmatter.url}",
    "applicationCategory": "UtilitiesApplication",
    "applicationSubCategory": "HVAC Calculator",
    "operatingSystem": "Any",
    "browserRequirements": "Requires JavaScript",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "{frontmatter.meta_description}",
    "datePublished": "{frontmatter.date_published}T00:00:00Z",
    "author": {
      "@type": "Person",
      "name": "Jonathan S.",
      "url": "{NEXT_PUBLIC_SITE_URL}/authors/jonathan-s/"
    },
    "publisher": {
      "@type": "Organization",
      "name": "hvacloadcalc.org",
      "url": "{NEXT_PUBLIC_SITE_URL}/"
    },
    "isAccessibleForFree": true,
    "inLanguage": "en-US"
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "{frontmatter.h1}",
    "url": "{NEXT_PUBLIC_SITE_URL}{frontmatter.url}",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  }
]
```

Emit both as a single `@graph` block:

```json
{
  "@context": "https://schema.org",
  "@graph": [
    { /* WebApplication */ },
    { /* SoftwareApplication */ }
  ]
}
```

### DefinedTerm (glossary pages)

Component: `<JsonLdGlossary />` in `components/seo/JsonLdGlossary.tsx`

```json
{
  "@context": "https://schema.org",
  "@type": "DefinedTerm",
  "name": "{frontmatter.term}",
  "alternateName": ["{frontmatter.abbreviation}", "{any synonyms}"],
  "description": "{first sentence of glossary entry}",
  "termCode": "{abbreviation or short code}",
  "inDefinedTermSet": {
    "@type": "DefinedTermSet",
    "name": "hvacloadcalc.org HVAC Glossary",
    "url": "{NEXT_PUBLIC_SITE_URL}/glossary/"
  },
  "url": "{NEXT_PUBLIC_SITE_URL}{frontmatter.url}",
  "subjectOf": {
    "@type": "WebPage",
    "url": "{NEXT_PUBLIC_SITE_URL}{frontmatter.url}"
  }
}
```

### CollectionPage (hub pages)

Component: `<JsonLdHub />` in `components/seo/JsonLdHub.tsx`

```json
{
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "{frontmatter.h1}",
  "url": "{NEXT_PUBLIC_SITE_URL}{frontmatter.url}",
  "description": "{frontmatter.meta_description}",
  "mainEntity": {
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "url": "{spoke[0].url}",
        "name": "{spoke[0].title}"
      }
      // ... one per spoke
    ]
  },
  "author": {
    "@type": "Person",
    "name": "Jonathan S.",
    "url": "{NEXT_PUBLIC_SITE_URL}/authors/jonathan-s/"
  },
  "publisher": {
    "@type": "Organization",
    "name": "hvacloadcalc.org",
    "url": "{NEXT_PUBLIC_SITE_URL}/"
  }
}
```

### Person (author page)

Component: emitted from `/authors/jonathan-s/page.mdx` via `<JsonLdPerson />`

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Jonathan S.",
  "url": "{NEXT_PUBLIC_SITE_URL}/authors/jonathan-s/",
  "image": "{NEXT_PUBLIC_SITE_URL}/authors/jonathan-s.jpg",
  "description": "{bio short version from 08-author-bio-jonathan.md}",
  "knowsAbout": [
    "Residential HVAC sizing",
    "ACCA Manual J load calculation",
    "Heat pump systems",
    "Building science",
    "Energy efficiency"
  ],
  "worksFor": {
    "@type": "Organization",
    "name": "hvacloadcalc.org",
    "url": "{NEXT_PUBLIC_SITE_URL}/"
  }
}
```

### WebSite (homepage only)

Component: `<JsonLdWebsite />` rendered only on `/`

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "hvacloadcalc.org",
  "url": "{NEXT_PUBLIC_SITE_URL}/",
  "description": "Educational HVAC reference covering load calculation, heat pump sizing, and building science.",
  "inLanguage": "en-US",
  "publisher": {
    "@type": "Organization",
    "name": "hvacloadcalc.org",
    "url": "{NEXT_PUBLIC_SITE_URL}/",
    "logo": {
      "@type": "ImageObject",
      "url": "{NEXT_PUBLIC_SITE_URL}/logo.png"
    }
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "{NEXT_PUBLIC_SITE_URL}/search?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
}
```

(Only emit `SearchAction` if site search is implemented; v1 launch may skip.)

### Organization (homepage + linked from publisher refs)

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "hvacloadcalc.org",
  "url": "{NEXT_PUBLIC_SITE_URL}/",
  "logo": "{NEXT_PUBLIC_SITE_URL}/logo.png",
  "description": "Educational HVAC reference site. Free calculators and methodology-transparent guides on heat pump sizing, load calculation, and building science.",
  "foundingDate": "2026",
  "knowsAbout": [
    "HVAC",
    "Residential air conditioning",
    "Heat pump systems",
    "ACCA Manual J",
    "Building science",
    "Energy efficiency"
  ]
}
```

---

## Component-level conventions

### Where each component lives

```
components/seo/
├── JsonLdArticle.tsx
├── JsonLdBreadcrumb.tsx
├── JsonLdFAQ.tsx
├── JsonLdCalculator.tsx
├── JsonLdGlossary.tsx
├── JsonLdHub.tsx
├── JsonLdPerson.tsx
├── JsonLdWebsite.tsx
├── JsonLdOrganization.tsx
└── types.ts  # shared TypeScript types
```

### Component signature pattern

```tsx
// components/seo/JsonLdArticle.tsx
import type { ArticleFrontmatter } from './types';

interface Props {
  frontmatter: ArticleFrontmatter;
  wordCount: number;
}

export function JsonLdArticle({ frontmatter, wordCount }: Props) {
  const json = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: frontmatter.h1,
    // ... build the object
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
```

Key rules:
- Use `dangerouslySetInnerHTML` (correct for script tags with JSON)
- Stringify, don't pretty-print (smaller payload)
- Never include `null` or `undefined` values — omit the key instead
- Validate the object shape with a TypeScript type guard before render

### Layout integration

Schema blocks are rendered in the page's metadata or layout, NOT inline in MDX content.

For MDX pages: schema is added via a `Layout` wrapper that reads frontmatter and emits the relevant schema components.

For TypeScript pages (calculators, programmatic): schema is added directly in the page component.

```tsx
// app/heat-pump/aux-heat/page.mdx
// (frontmatter handles metadata; schema components are auto-attached via Layout)

// For a calculator (page.tsx):
import { JsonLdCalculator } from '@/components/seo/JsonLdCalculator';
import { JsonLdBreadcrumb } from '@/components/seo/JsonLdBreadcrumb';
import { JsonLdFAQ } from '@/components/seo/JsonLdFAQ';

export default function BtuCalculatorPage() {
  return (
    <>
      <JsonLdCalculator frontmatter={frontmatter} />
      <JsonLdBreadcrumb breadcrumbs={breadcrumbs} />
      <JsonLdFAQ faqs={frontmatter.faq} />
      {/* page content */}
    </>
  );
}
```

---

## Validation

### Pre-commit checks

1. Every page renders valid JSON-LD (no syntax errors)
2. All required fields present per page type
3. URLs are absolute (start with https://)
4. Dates are ISO 8601
5. No `null` or `undefined` values in emitted JSON

Run with: `pnpm run validate:schema` (script TBD; for now, manual check at validator.schema.org and search.google.com/test/rich-results)

### Manual check at launch

After Wave 1 (launch 15) is built:
- Pick 5 article URLs, test each at https://search.google.com/test/rich-results
- Pick 3 calculator URLs, test each
- Pick the homepage, test
- All must show valid `Article` / `WebApplication` / `WebSite` schemas
- If any FAQPage schema fails, fix immediately (these are the biggest rich-result wins)

---

## Common mistakes

1. **Putting JSON-LD in MDX body** instead of a component. → Build it as a component.
2. **Forgetting to update `dateModified`** when an article is edited. → Frontmatter `last_reviewed` is the source of truth; always update it.
3. **Including raw HTML in FAQPage answer text.** → Strip to plain text in the component.
4. **Inconsistent `author` references** across schemas. → Always reference Jonathan S. with the canonical URL and name.
5. **Using relative URLs.** → Always prepend `NEXT_PUBLIC_SITE_URL`.
6. **Missing `image` field in Article schema** when an OG image exists. → Auto-generated OG images should populate this.
7. **Reusing the same `@id` across multiple pages.** → Each page's primary entity gets a unique `@id`.

---

## Out of scope

These schemas exist but are NOT used on this site:

- `Product` — not selling anything
- `Review` / `AggregateRating` — not reviewing products
- `Event` — no events
- `Recipe`, `Course`, `Job` — not applicable
- `LocalBusiness` — site is not a local business

If a future content type requires a new schema, add it to this document FIRST, then implement.
