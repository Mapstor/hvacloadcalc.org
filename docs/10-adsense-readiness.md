# 10 — AdSense Readiness

## Why this doc exists

AdSense approval is the gate between "site is live" and "site earns money." Approval is decided by a Google reviewer (with some automation) against a checklist that's not fully public, but the patterns are well-known. This document captures everything we need to do BEFORE applying, and what to avoid that could trigger rejection.

A rejection isn't fatal but costs 2-4 weeks per cycle. Get it right the first time.

---

## When to apply

**Do not apply before all of these are true:**

- [ ] All Wave 0 pages built and live (legal, about, methodology, etc.)
- [ ] All 15 Wave 1 articles published and indexed by Google
- [ ] Site has been live for at least 14 days
- [ ] Sitemap submitted to Google Search Console and at least 80% of submitted URLs are indexed
- [ ] Site has organic traffic (even small — 50+ unique visitors over 7 days is fine)
- [ ] All pages pass Lighthouse audits per `02-tech-stack.md` performance budgets
- [ ] All legal/footer pages link correctly from every page
- [ ] All disclaimers present per `09-legal-footer.md`
- [ ] No "lorem ipsum" or placeholder content anywhere
- [ ] No broken internal links (verified by `scripts/validate-links.ts`)
- [ ] No 404 errors in Search Console crawl report

The window of optimum readiness is: enough content to demonstrate site value, but BEFORE adding calculator pages (which AdSense reviewers sometimes flag as "thin tool pages"). Apply at this midpoint.

---

## Pre-application checklist (full)

### Content quality
- [ ] 15+ original articles, each 1,500+ words
- [ ] Every article passes the editorial gate in its brief
- [ ] No AI-generated content with AI-tell phrases (per `01-brand-voice.md`)
- [ ] Every article has a clear topic, structure, and conclusion
- [ ] No duplicate content across pages (canonical URLs handle redirects)
- [ ] No thin pages (<300 words) in the indexed set
- [ ] No "doorway pages" — every page has substantive unique content

### Site structure
- [ ] Clear navigation (header with hub links)
- [ ] Working footer with all required legal links
- [ ] Working breadcrumbs on every internal page
- [ ] Working internal search OR clear navigation to find any page
- [ ] Mobile-friendly (responsive, no horizontal scroll at 375px)
- [ ] HTTPS enforced
- [ ] No mixed-content errors
- [ ] Custom 404 page (not server default)

### Required pages present and substantive
- [ ] `/about/` — substantive, 400+ words, clearly explains what the site does
- [ ] `/privacy/` — comprehensive privacy policy
- [ ] `/terms/` — terms of use
- [ ] `/disclaimer/` — full disclaimer, prominent footer link
- [ ] `/contact/` — working contact form, real submission flow
- [ ] `/methodology/` — explains calculator math (even if calculators not yet built)
- [ ] `/editorial-standards/` — content creation/review process
- [ ] `/sources/` — bibliography of cited standards
- [ ] `/corrections/` — corrections policy (even if log is empty initially)
- [ ] `/authors/jonathan-s/` — author profile with bio, photo, articles list

### Technical SEO
- [ ] `robots.txt` allows Googlebot
- [ ] `sitemap.xml` exists, submitted to Search Console
- [ ] Meta tags on every page (title, description, canonical, OG, Twitter)
- [ ] Schema.org JSON-LD on every page per `06-schema-jsonld.md`
- [ ] No `noindex` on indexable pages
- [ ] No `disallow` blocking indexable content
- [ ] Core Web Vitals: LCP <2.5s, CLS <0.1, INP <200ms on all sampled pages
- [ ] No console errors on production pages
- [ ] No JavaScript errors blocking content

### Author / publisher identity
- [ ] Site clearly identifies itself (logo, name, footer copyright)
- [ ] Author bio is clear and consistent across pages
- [ ] Footer disclaimer about not being professional advice is present site-wide
- [ ] Real, working contact mechanism

### No prohibited content (AdSense policy compliance)
- [ ] No adult/sexual content
- [ ] No content promoting violence
- [ ] No content promoting illegal activity
- [ ] No content promoting controlled substances inappropriately
- [ ] No copyrighted content reproduced without permission
- [ ] No content that disparages individuals/companies
- [ ] No deceptive content (clickbait, fake claims)
- [ ] No "shocking" content (gore, etc.)
- [ ] No content promoting hatred or discrimination

### No prohibited monetization patterns
- [ ] No affiliate links (we don't have these — confirmed in policy)
- [ ] No paid placements
- [ ] No "click to claim free product" CTAs
- [ ] No artificially inflated content (no padding for ad space)
- [ ] No fake user reviews/testimonials
- [ ] No misleading claims about products

### Calculator pages (if any are live at apply time)
- [ ] Each calculator page has 600+ words of unique content
- [ ] Each calculator shows methodology, not just inputs and outputs
- [ ] Planning-grade disclaimer above the fold
- [ ] Each calculator linked from at least 3 article pages

**RECOMMENDATION**: do NOT have calculators live at AdSense application time. Apply with articles only. Add calculators after approval. AdSense reviewers occasionally flag tool-heavy sites as "thin." This is the single biggest risk-reducer.

---

## Site quality signals AdSense rewards

AdSense reviewers (and the algorithmic systems behind them) look for:

1. **Genuine content depth**: 1,500+ words with real information, not padding
2. **E-E-A-T signals**:
   - **Experience**: stated in bio, evident in content depth
   - **Expertise**: every claim sourced to authoritative material
   - **Authoritativeness**: cite-able content, professional layout
   - **Trustworthiness**: legal pages, contact info, corrections policy
3. **Original perspective**: not just rehashing competitors
4. **Functional site**: works on mobile, fast, no errors
5. **Consistent branding**: clear identity, professional design
6. **Reasonable site age**: 2-4 weeks of indexed content is typical minimum
7. **Some organic traffic**: even small amounts demonstrate legitimacy

We tick every one of these by design.

---

## Common rejection reasons (avoid)

### "Insufficient content"
The most common rejection. Triggered when:
- Fewer than ~15 substantive articles
- Articles are short (<800 words)
- Site is mostly tools without supporting content
- Site relies heavily on placeholder/skeleton pages

**Our mitigation**: 15 Wave 1 articles, each 1,500-3,000 words, before applying.

### "Site under construction"
Triggered when:
- "Coming soon" placeholders are visible
- Navigation links to broken pages
- Footer or legal pages incomplete
- Site has been live for less than a week

**Our mitigation**: Wave 0 completes ALL legal/footer/about pages before Wave 1 article publishing begins. No placeholders ever go live.

### "Navigation issues"
Triggered when:
- Pages are unreachable from the homepage within 3 clicks
- Internal links 404
- No clear hub navigation

**Our mitigation**: Hub-spoke architecture, internal linking validation, sitemap with all URLs.

### "Content quality / value to user"
Triggered when:
- Content reads as AI-generated boilerplate
- Articles don't have a clear take or perspective
- Claims aren't substantiated
- Topics covered superficially

**Our mitigation**: brand voice rules, sourcing policy, every article has clear takeaways and decision frameworks.

### "Site policies missing"
Triggered when:
- No privacy policy
- No terms
- No contact mechanism
- Inadequate disclaimer for the topic area

**Our mitigation**: Wave 0 includes all of these, substantively written.

### "Copyrighted content"
Triggered when:
- Articles paraphrase competitor content too closely
- Images are stock or unattributed
- Text appears to be scraped/spun

**Our mitigation**: Original writing, hand-crafted SVGs (no stock), explicit sourcing of all claims.

### "Risky/regulated topic insufficient handling"
HVAC overlaps with safety-critical work (electrical, gas, refrigerant). AdSense reviewers may scrutinize this.

**Our mitigation**: Explicit safety disclaimers, no DIY instructions for safety-critical work, professional consultation prompts throughout.

---

## Application process

1. **Sign up for AdSense** at adsense.google.com using a clean Google account
2. **Add the site URL** (https://hvacloadcalc.org)
3. **Add the AdSense code** to the site head section (auto-ads code snippet)
4. **Connect Google Analytics** (if used) and Google Search Console
5. **Submit for review**

Review typically takes 1-14 days. Result: approved, rejected with reason, or "more time needed."

If rejected, fix the cited issue, wait 1 week, and re-apply.

---

## Post-approval: ad implementation

After approval:

### Ad placement principles
- **Above the fold on articles**: 1 banner ad max (after the H1, before the intro)
- **In-content**: 1-2 ads max, between H2 sections (NOT in the middle of a paragraph or callout)
- **End of article**: 1 ad after the FAQ, before related articles
- **Sidebar**: 1 ad on desktop only, sticky if appropriate
- **Footer**: 0 ads

**Hard rules**:
- No ads inside calculator widgets
- No ads inside `<Methodology>` callouts
- No ads inside FAQ items
- No ads inside `<KeyTakeaways>`
- No ads on legal pages (`/privacy/`, `/terms/`, `/disclaimer/`)
- No more than 4 ads per article page total

### Auto ads vs manual placement
**Start with auto ads** (let AdSense decide placement). Monitor for layout shift issues and revenue. After 30 days of data, consider manual ad placements if auto-ads cause UX problems (CLS spikes, ad density issues).

### Raptive transition
At 50,000 sessions/month, apply to Raptive (the goal). Raptive pays significantly higher RPMs than direct AdSense.

Raptive requirements:
- 50k+ monthly sessions (last 30 days)
- Predominantly US/CA/UK/AU traffic
- Original content (not aggregated)
- No content policy violations

When Raptive integration replaces AdSense:
- Remove AdSense code
- Add Raptive's auto-ads code
- Update privacy policy with Raptive references
- Keep AdSense account as fallback (Raptive sometimes uses AdSense as remnant inventory)

---

## Monitoring post-approval

### First 30 days
- Check AdSense daily for policy notices
- Monitor Core Web Vitals (ads can hurt these)
- Check for layout shift caused by ads
- Verify ads don't appear in forbidden locations
- Confirm earnings are accruing (even small amounts)

### Ongoing
- Monthly AdSense policy compliance review
- Quarterly ad placement review (any UX issues?)
- Annual full audit against this checklist

---

## What NOT to do post-approval

- Don't click your own ads ever (terminates account immediately)
- Don't ask others to click ads
- Don't place ads on pages that violate AdSense content policy (we won't, but worth noting)
- Don't suddenly add hundreds of low-quality programmatic pages without quality control (we have a Wave 4 plan for this — it's quality-gated)
- Don't change site dramatically without re-checking compliance

---

## What to do if AdSense suspends or restricts the account

Rare with our setup but possible:

1. Read the violation notice carefully — Google specifies what's wrong
2. Fix the cited issue across the site
3. File an appeal through the AdSense Help center
4. Wait for review (typically 1-2 weeks)

Avoid panic responses. AdSense restrictions usually have a clear cause and a clear fix.
