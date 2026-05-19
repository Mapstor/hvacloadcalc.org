# 11 — Monetization

## Strategy summary

Display advertising only. No affiliate marketing (ever). No lead-gen. No sponsored content. No paid placements.

Two providers in sequence:

1. **Google AdSense** from approval through ~50k monthly sessions
2. **Raptive** (formerly CafeMedia / AdThrive) from 50k+ sessions through scale

Both providers serve display ads in the same content slots. The transition is technical, not strategic.

---

## Why display-only

1. **Editorial independence** — no commercial incentive to recommend specific products, brands, or contractors
2. **AdSense friendliness** — easier approval, fewer policy edge cases than affiliate-heavy sites
3. **AI citation friendliness** — LLMs discount affiliate-laden content; we avoid that signal entirely
4. **Reader trust** — methodology-transparent site loses credibility if every page has "buy this on Amazon" links
5. **Operational simplicity** — no affiliate disclosures to manage, no link rot, no Amazon API integrations
6. **Strategic clarity** — Manager-grade rule: when in doubt, optimize for traffic volume + reader trust, not per-click revenue

---

## Ad placement specification

### Article pages

```
─────────────────────────────
[ Breadcrumbs ]

# H1 Title
By Jonathan S. | Reviewed [date]

[KeyTakeaways]
─────────────────────────────
[ AD SLOT 1 — Top banner ]
─────────────────────────────

Intro paragraph 1
Intro paragraph 2

[Table of Contents]

## H2 Section 1
Body content...

─────────────────────────────
[ AD SLOT 2 — In-content #1 ]
─────────────────────────────

## H2 Section 2
Body content...

## H2 Section 3
Body content...

─────────────────────────────
[ AD SLOT 3 — In-content #2 ]
─────────────────────────────

## H2 Section 4...

## FAQ
[FAQ items]

─────────────────────────────
[ AD SLOT 4 — End of content ]
─────────────────────────────

[Related Articles]
[Sources]
[Author Byline]
[Footer]
```

**Max 4 ads per article page.**

Desktop adds:
- Right sidebar: 1 sticky ad slot (only if article >2,000 words)

### Calculator pages

```
[ Breadcrumbs ]
# H1 — calculator name
By Jonathan S.
[Planning-grade disclaimer]
─────────────────────────────
[ CALCULATOR WIDGET — NO ADS INSIDE ]
─────────────────────────────

[KeyTakeaways]

Intro paragraph

[Worked Example]
[Methodology]

─────────────────────────────
[ AD SLOT 1 — Below methodology ]
─────────────────────────────

## H2 explanations of inputs
Body content...

─────────────────────────────
[ AD SLOT 2 — Mid-content ]
─────────────────────────────

[Examples Grid]
[FAQ]
[Related Tools]
[Sources]
```

**Max 2 ads per calculator page.** Calculator widgets and methodology callouts must remain ad-free.

### Hub pages

```
[ Breadcrumbs ]
# H1 — hub name
Intro paragraph
[Hub Grid of spokes]
─────────────────────────────
[ AD SLOT 1 — After hub grid ]
─────────────────────────────
## Where to start
[FAQ if present]
[Related Hubs]
```

**Max 1 ad on hub pages.**

### Glossary pages

```
[ Breadcrumbs ]
# H1 — Term
Definition sentence 1
Definition sentence 2
[Methodology if applicable]
## How it's used
## Typical values
## Related terms
─────────────────────────────
[ AD SLOT 1 — End of content ]
─────────────────────────────
[Sources]
```

**Max 1 ad on glossary pages.**

### Pages with NO ads (ever)

- `/` (homepage) — no ads, keeps it brand-clean
- `/about/`
- `/methodology/`
- `/editorial-standards/`
- `/sources/`
- `/corrections/`
- `/privacy/`
- `/terms/`
- `/disclaimer/`
- `/contact/`
- `/authors/jonathan-s/`
- `/404` (the not-found page)

These pages are AdSense-policy-clean (no controversial content) and ad-free because they're trust-building pages. Ads detract.

---

## Ad placement HARD rules

**Never place ads in these locations:**

1. Inside a calculator widget
2. Inside a `<Methodology>` callout
3. Inside a `<KeyTakeaways>` component
4. Inside a `<Callout>` of any kind
5. Inside an FAQ item (above or below the answer, never within)
6. Inside a `<DataTable>`
7. In the header navigation
8. Between an H2 and the first paragraph of its section (creates layout shift)
9. Within the first 100 words of the article body (LCP concern)
10. Above the H1
11. Below the last paragraph but above the FAQ (interrupts flow)
12. Between an SVG and its caption
13. In any modal or overlay
14. On legal pages (per list above)

**Ad density rule**: minimum 600 words of content between any two ads. If an article is shorter than 1,200 words, max 2 ads (intro + end).

---

## AdSense implementation (Wave 1, post-approval)

### Account setup
- Single AdSense account (clean Google account)
- Publisher ID stored in `.env.local` as `NEXT_PUBLIC_ADSENSE_PUBLISHER_ID`
- Code added to root layout (`app/layout.tsx`) once approved

### Auto ads vs manual placement
- **Start with manual placements** (defined above) — gives us control and matches the documented IA
- **Auto ads disabled** unless we have a specific reason
- Manual ad slots use `<ins class="adsbygoogle">` with proper sizes

### Ad slot configuration
- All slots use responsive (auto-sized) ad units
- Lazy-load below-the-fold ads to protect LCP
- All ad slots have `min-height` set to prevent CLS

```tsx
// components/ads/AdSlot.tsx
'use client';

import { useEffect } from 'react';

interface Props {
  slotId: string;
  format?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
  responsive?: boolean;
}

export function AdSlot({ slotId, format = 'auto', responsive = true }: Props) {
  useEffect(() => {
    try {
      (window as any).adsbygoogle = (window as any).adsbygoogle || [];
      (window as any).adsbygoogle.push({});
    } catch (e) {
      // Silently handle ad loading errors
    }
  }, []);

  return (
    <ins
      className="adsbygoogle block"
      style={{ minHeight: 280 }}
      data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID}
      data-ad-slot={slotId}
      data-ad-format={format}
      data-full-width-responsive={responsive ? 'true' : 'false'}
    />
  );
}
```

### Privacy compliance
- AdSense uses cookies and may personalize ads
- Privacy policy disclosure is mandatory — already in `/privacy/`
- Cookie consent banner: NOT required for US-only target; if EU traffic grows, add consent banner per GDPR

---

## Raptive transition (~50k sessions)

### Eligibility check
Raptive requires:
- 50k+ monthly sessions (sustained for at least 30 days)
- Primarily US/CA/UK/AU traffic
- Original content
- No policy violations
- Quality content (they vet manually)

Our site meets these by Quarter 3-4 if traffic projections hold.

### Application process
1. Apply via [raptive.com/publishers](https://raptive.com/publishers/)
2. Raptive team reviews site for content quality and traffic legitimacy
3. Approval: typically 5-10 business days
4. Onboarding call: configure ad placements with their team

### Implementation differences vs AdSense
- Raptive provides their own ad management script
- Replaces direct AdSense integration
- AdSense account stays linked as remnant inventory (Raptive often uses AdSense for fill)
- Header bidding handled by Raptive (more competitive bids, higher RPMs)
- Reporting moves to Raptive dashboard

### Code change (when transitioning)
- Remove AdSense script from `<head>`
- Replace `<AdSlot />` components with Raptive's `<RaptiveAd />` equivalent
- Update privacy policy to reference Raptive
- Test thoroughly: ad density, layout shift, Core Web Vitals

### Revenue expectations
AdSense typical RPM for HVAC content: $5-15
Raptive typical RPM for similar content: $20-40+

At 50k sessions:
- AdSense: $250-$750/month
- Raptive: $1,000-$2,000/month

At 200k sessions (Year 1 target):
- Raptive: $4,000-$8,000/month

These are estimates. Actual results depend on traffic quality, seasonality, and ad fill rates.

---

## Performance protection

Ads can hurt Core Web Vitals (LCP, CLS, INP). Mitigations:

### LCP protection
- No ads above the fold on the homepage
- First ad on article pages is below the H1 + KeyTakeaways block, not above
- Top banner ad slot has min-height reserved (no shift when ad loads)
- Lazy load all ads below the fold

### CLS protection
- Every ad slot has `min-height` set in CSS
- Use responsive ad units that fit defined containers
- Never let an ad push content down after page load

### INP protection
- AdSense script loads async, doesn't block main thread
- Defer non-critical ad initialization
- Monitor with Web Vitals data; pull placements that cause INP regressions

### Monitoring
- Vercel Speed Insights for ongoing Web Vitals
- Lighthouse CI in build pipeline
- Manually check Web Vitals quarterly with real ads loaded

---

## Reporting and analytics

### Revenue tracking
- AdSense / Raptive dashboards (provider-native)
- Monthly review of:
  - RPM (revenue per mille)
  - Top-earning URLs
  - Click-through rates (CTR)
  - Page-level revenue
- Use insights to inform content strategy (which topics earn most)

### Traffic tracking
- Vercel Analytics (privacy-friendly, no cookies) — Tier 1 source
- Google Search Console — for SEO/index health
- Optional: Google Analytics 4 if cross-cutting metrics needed

### Content performance correlation
- Quarterly review: which articles drive most ad revenue?
- Use top performers to inform Wave 3 article topics
- Avoid low-CPC topics that drain editorial effort without commensurate revenue

---

## Compliance and policy review

### Quarterly review
- Scan AdSense / Raptive policy updates
- Audit ad placements against current rules
- Check for any new content that might violate ad-side policies
- Verify no inadvertent affiliate links or sponsored content has crept in

### Annual review
- Full compliance audit against `09-legal-footer.md` and this document
- Verify privacy policy still accurate
- Check that all required disclaimers remain visible
- Validate no policy violations in archived content

---

## What we're NOT doing (to stay focused)

- No native advertising
- No sponsored content or "sponsored by X" articles
- No affiliate links (Amazon, Impact, ShareASale, etc.)
- No lead generation forms / installer referral programs
- No email list monetization
- No paywalled premium content
- No subscriptions
- No merchandise
- No PDF "premium guides" for sale
- No course sales
- No coaching offerings
- No "build my site for me" services

These are all viable monetization plays for some sites. They're not viable for ours given the strategic positioning.

---

## When to revisit

This monetization strategy is locked unless one of these happens:

1. AdSense materially changes its policy in a way that hurts us
2. Raptive shuts down or merges (would force a re-evaluation)
3. Traffic exceeds 1M monthly sessions and we have leverage to negotiate direct deals
4. Display advertising as a category fundamentally changes (e.g., third-party cookies fully blocked, ad-blocker adoption reaches catastrophic levels)

If any of these happen, document the trigger here and re-strategize. Otherwise, the plan above is the plan.
