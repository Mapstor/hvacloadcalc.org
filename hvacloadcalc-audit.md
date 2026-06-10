# HVACLoadCalc.org — Deep-Dive Audit
**Date:** June 10, 2026 · **Scope:** Live site (homepage, /authors/jonathan-s/, /editorial-standards/) + external verification of the 25C tax-credit claim · **Goal:** Raptive/AdSense readiness (pre-application) + SERP + AI visibility

---

## 1. Executive summary

This is the best-architected site in the portfolio — by a wide margin. Source-tier system, inline citations, corrections log, six-stage review gates, planning-grade-vs-permit-grade honesty, explicit "we never claim ACCA approval or engineering credentials" hard rules, quote-extractable definitions built for AI citation. The trust infrastructure that hvacbase fakes, this site actually built.

Which makes the two real problems stand out sharply:

1. **The entire trust architecture is fronted by a fabricated person.** "Jonathan Stowe" has a 2,500-word author page with detailed first-person autobiography — three contractor quotes of 2.5/3.5/4 tons for "his own home," months of reading primary sources, "8–15 hours of editorial work" per article. Every byline, the editorial standards ("All content is written by Jonathan Stowe"), and the site's accountability promise route through him. If he isn't real, the site's central claim — *every claim is defensible* — is fronted by an indefensible one. **Resolution chosen by the operator: keep the byline as a *disclosed pseudonym*, delete all invented autobiography, and re-anchor trust in the site's verifiable mechanisms (see B1).**
2. **The homepage's flagship money claim is factually wrong.** The "2026 federal incentive stack" card and the federal-programs table both list the IRA §25C credit ("up to $2,000") as a live 2026 program. Congress set an expiration of December 31, 2025 for the 25C credit when it passed the One Big Beautiful Bill Act in July, and as of December 31, 2025 the credit has expired, meaning homeowners making improvements in the 2026 tax year generally cannot claim it. The site cites IRS FS-2022-40 — a fact sheet superseded by the wind-down guidance. On a site whose tagline is "every claim cites a primary source," this is the worst possible error, and the site's own quote-extractable design means LLMs will lift it verbatim.

Both are fully fixable before the site ever faces an ad-partner reviewer — which is exactly why to fix them now, pre-application, rather than post-decline like the other four domains.

---

## 2. BLOCKERS

### B1. Fabricated author persona with invented autobiography
**Evidence:** /authors/jonathan-s/ — "I am a homeowner who got tired of contradictory HVAC contractor quotes during a system upgrade… Three contractors visited; three different tonnage recommendations came back — 2.5 tons, 3.5 tons, and 4 tons for the same house… I picked equipment that matched what the actual Manual J indicated." Plus per-article labor claims ("8–15 hours of editorial work… across 2–4 sessions"), "my specific climate," "Last reviewed 2026-05-30." /editorial-standards/: "All content is written by Jonathan Stowe." Homepage: "Written by Jonathan Stowe."
**Why it's the #1 risk:**
- This is not a neutral byline — it's specific, checkable, fictional testimony. The persona has no photo, no LinkedIn, no employment history, no social presence. Ad-partner reviewers, journalists (you want this site cited!), and increasingly Google's quality systems check exactly this. A site that stakes everything on accountability cannot survive its accountable party being discovered as invented — and the discovery taints the genuinely excellent sourcing behind it.
- **Cross-site exposure:** the slug is /authors/jonathan-s/ — the same "Jonathan S." pen name used elsewhere in the portfolio in unrelated niches. The sites already share a visible fingerprint (the identical google-site-verification token appears on hvacbase, simplemaplab, and here). One person "authoring" demographics, HVAC, and mapping sites is a network footprint any motivated checker can assemble in ten minutes.
**Fix — DECISION MADE: disclosed pseudonym (operator chooses not to publish his real name on this site):**
The byline "Jonathan Stowe" stays; the *fiction* goes. A disclosed pen name is legitimate; invented testimony is not. Concretely:
1. **Disclose the pseudonym** on the author page and About, one plain sentence near the top: "Jonathan Stowe is the pen name of the site's independent operator and sole researcher, a developer based in the EU. A pen name is used for privacy; everything else on this page is literally true and checkable." Mirror a short version in /editorial-standards/ ("All content is written under the disclosed pen name Jonathan Stowe").
2. **Delete every invented autobiographical claim:** the three-contractor-quotes anecdote (2.5/3.5/4 tons), "my own home," "my specific climate," any implication of a US residence, and the "8–15 hours of editorial work" labor narrative (restate truthfully or cut — see B2). Rule: under a pseudonym, zero first-person experience claims that didn't actually happen to the operator. Pseudonymity protects identity; it never licenses fiction.
3. **Rewrite the Background section around what is true and stronger for it:** the operator builds data-driven reference tools, observed that the HVAC calculator space splits into rule-of-thumb sites, paywalled contractor software, and manufacturer marketing (the landscape analysis is real and keepable), and built this site by reading the primary standards. Keep intact: the research approach, scope-and-limits, "research rigor, not engineering authority" framing, and the corrections process — they need no fictional person to work.
4. **Re-anchor accountability in verifiable mechanisms instead of biography:** the trust claim becomes "you don't need to know who I am — every claim cites a primary source you can check, and the corrections log is public." The site was already architected for exactly this; lean into it. (Optional strengthener for later: name the d.o.o. as publisher in the imprint, and/or credit a real, named licensed-HVAC technical reviewer per article — either upgrade works without exposing the operator's name.)
5. **JSON-LD:** keep `Person` "Jonathan Stowe" as `author` but do not attach fabricated credentials; add `Organization` publisher. No invented `alumniOf`/`jobTitle` fields.
6. **De-fingerprint the pen name across the portfolio:** "Jonathan S."/"Jonathan Stowe" must not also author demographics/mapping sites in unrelated niches — one pseudonym per niche, each disclosed. Audit where the name appears portfolio-wide and rename elsewhere; the shared google-site-verification token already links the sites, so a cross-niche shared author is the remaining unravel-thread.

### B2. No AI-assistance disclosure — worse, an implied false production story
**Evidence:** The elaborate /editorial-standards/ page covers source tiers, six review stages, accessibility gates, even forbidden phrases ("em-dash overuse is a marketing-content tell") — but never says how the prose is produced. Combined with the persona's hand-crafted-hours claims, the page constructs a false human-production narrative rather than merely omitting one.
**Fix:** Port the simplemaplab AI-disclosure section (which names the AI tooling, separates AI from the data path, and commits to human fact-check before publication) into /editorial-standards/ as stage-2 documentation, written under the disclosed pen name: "Prose is drafted with AI assistance against committed brief documents, then fact-checked against the cited primary sources and edited before publication; AI is not in the data path of the calculators or data tables." This pairs naturally with the pseudonym disclosure (B1.1) — together they make the production story fully honest while keeping the operator private. Replace the "8–15 hours of editorial work" claim with a truthful description of the review effort or drop the hour figure entirely.

### B3. The 25C claim — wrong on the homepage, on a tax topic
**Evidence:** Homepage card "2026 federal incentive stack (qualifying heat pump install): IRA §25C tax credit — Up to $2,000," and the "Federal HVAC programs the site tracks" table listing 25C among 2026 programs, citing IRS Fact Sheet FS-2022-40. The combined "$5,000–$15,000 out-of-pocket reduction" figure builds on it.
**Reality:** IRS guidance under the One Big Beautiful Bill (FS-2025-05) confirms Section 25C is available only through the end of 2025; after December 31, 2025, improvements like qualified HVAC are no longer eligible. Installations completed in 2026 or later cannot claim it; only 2025-or-earlier installs can still claim it on their 2025 return.
**Fix:**
1. Rewrite the incentive card and programs table: 25C expired Dec 31, 2025 (cite the current IRS FAQ/FS-2025-05, not FS-2022-40); what remains in 2026 is the state-administered DOE Home Energy Rebates (HEEHRA/HEAR) where state funds are still flowing — verify per-program status — plus state/utility rebates. Recompute or remove the combined-stack figure.
2. Sweep every page for 25C/§25C/"tax credit" mentions (the heat-pump hub advertises "2026 federal incentives" in its description — likely infected).
3. Add a regression rule to the editorial gates: any claim citing an IRS/DOE document gets an annual "is this document still current law?" check with the verification date printed on-page. This error happened *despite* primary-source citation because the cited primary source went stale — the gate must check currency, not just existence.
4. Apply the same sweep to hvacbase (its /heat-pump-tax-credits-2026 and /seer-rating-tax-credits pages are almost certainly wrong the same way).

### B4. Canonical/host mismatch on every page
**Evidence:** The site serves on `www.hvacloadcalc.org` (all internal links, and the apex 301s to www), but every sampled page's canonical declares the **apex**: `https://hvacloadcalc.org/`, `https://hvacloadcalc.org/authors/jonathan-s/`, `https://hvacloadcalc.org/editorial-standards/`. So every canonical points at a URL that redirects back to the page — a circular signal that wastes crawl equity and can produce "Duplicate, Google chose different canonical" states on a young site that needs every indexing advantage.
**Fix:** Pick www (matches internal links), set canonical host accordingly in the Next config/metadata helper, confirm sitemap URLs match, keep the apex→www 301. One-line fix, sitewide effect.

---

## 3. RISKS

### R1. Verify the calculator-validation claim before a reviewer does
/methodology/how-we-verify-manual-j/ and the homepage claim validation "against ACCA reference cases, **side-by-side with ACCA-approved software output**, with documented accuracy bands." That's a checkable claim of the best kind — *if the comparison data is published*. If the side-by-side runs weren't actually done, this is a B1-class fabrication hiding in the methodology; if they were, put the tables on the page (inputs, this site's output, approved-software output, delta). Same verified-or-omitted rule the site preaches.

### R2. Pre-monetization compliance package
No ad code is live yet (no AdSense account meta — unlike the sibling sites), which means the privacy/consent layer can be built right the first time: port the simplemaplab privacy-policy structure (ad vendors, advertising cookies, GDPR + named CMP, opt-outs) *before* the application, and confirm /privacy/, /terms/, /disclaimer/ have correct per-page canonicals (B4) and metadata. Given four sibling declines under the same publisher fingerprint, this site should apply only after the identity migration (B1) is complete portfolio-wide — a reviewer who connects it to the declined network sees either the same fake-author pattern (decline #5) or evidence the publisher cleaned house.

### R3. Hardcoded inventory counts
"15 in-depth articles," "11 reference hubs," "61 worked-example URLs," "60+ glossary terms" — accurate today, but they're hardcoded in at least three places (homepage, author page, tools hub) and will rot exactly the way hvacbase's 339-vs-355 did. Wire them to build-time constants now, while the site is small.

### R4. Stale-claim half-life beyond taxes
The same currency problem that hit 25C applies to: the R-410A→R-454B/R-32 transition status, DOE minimum-efficiency phase-ins ("AFUE 95% (2028 phase-in)"), NEEP CCASHP spec version (v4.0), and EIA price tables. Add each to the annual-review checklist with the source-document version pinned on-page ("NEEP CCASHP v4.0, accessed 2026-05"). The site already prints last-reviewed dates — extend the discipline to source versions.

### R5. Worked-example URL fan-out (61 URLs)
Five calculators × worked-example pages is a reasonable pattern *if* each example page shows distinct inputs, distinct outputs, and distinct prose explaining why the configuration differs. Sixty-one thin variants of "here's the calculator with numbers pre-filled" would be the one scaled-content surface on an otherwise hand-built site. CC should audit the example pages for differentiation and noindex/merge the weak ones.

---

## 4. What is already excellent — protect at all costs

- **The honesty architecture:** "intentionally not ACCA-approved" with the reason stated; planning-grade vs permit-grade distinction repeated everywhere it matters; "never claim engineering credentials" as a written hard rule; no contractor directory and no equipment picks, with the *reasons* documented. This is the strongest E-E-A-T construction in the portfolio.
- **Source-tier system + inline SourceCite + /sources/ bibliography + /corrections/ public log** — exactly what reviewers, raters, and citing journalists want to find.
- **AI-visibility design done right:** quote-extractable definitions, KeyTakeaways blocks, sourced data tables with provenance lines, climate-zone reference card. (No llms.txt gimmicks — correct.) Once B3 is fixed, this site is the portfolio's best LLM-citation candidate.
- **Editorial gates that encode your hard-won lessons:** schema validation stage, mobile/a11y stage, forbidden-phrase list, paragraph limits, committed brief documents. This is the template the *rest* of the portfolio should import — it's the CC-skill version of everything the other four audits asked for.
- **The "structurally broken landscape" positioning** (rule-of-thumb sites / paywalled contractor software / biased manufacturers / this site as the fourth category) — honest, accurate, and fair to competitors.

---

## 5. Prioritized action plan (CC-ready)

**Phase 1 — Truth fixes (1 session, do before anything else)**
1. 25C sweep: rewrite homepage incentive card + programs table against current IRS guidance (FS-2025-05 / IRS 25C FAQ page); grep every page for 25C/tax-credit mentions; recompute the incentive-stack figure; add source-currency checks to the editorial gates (B3).
2. Canonical host fix: www everywhere — metadata helper, sitemap, verify with a crawl (B4).

**Phase 2 — Pseudonym disclosure + de-fictionalization (1 session, coordinate portfolio-wide)**
3. Author page rewrite under the disclosed pen name: add the pseudonym-disclosure sentence; delete the three-quotes anecdote, "my own home," US-residence implications, and labor-hour claims; rewrite Background around the true builder-researcher story; keep research approach, scope-and-limits, corrections sections intact (B1.1–B1.4). Draft copy for the new disclosure block:
   > *"Jonathan Stowe" is a pen name. The site is researched, written, and maintained by a single independent operator — a developer based in the EU — who uses a pseudonym for personal privacy. Nothing else on this page is fictional: the research method, the sourcing standards, the scope limits, and the corrections log are all literally true and independently checkable. The site's accountability does not rest on the author's identity; it rests on the primary-source citation behind every claim and the public corrections record.*
4. Mirror one-line disclosure in /editorial-standards/ ("written under the disclosed pen name…") and add the AI-assistance disclosure there (B2). Update JSON-LD per B1.5 — no slug change or 301 needed since the byline stays.
5. Portfolio de-fingerprinting: grep all repos for "Jonathan S"/"Jonathan Stowe"; rename or remove the persona on every non-HVAC site so the pen name exists in exactly one niche (B1.6).
6. Verify or publish the side-by-side validation data on the methodology page (R1).

**Phase 3 — Pre-application hardening (1 session)**
7. Privacy/terms rebuild on the simplemaplab template with CMP, ad vendors, GDPR (R2).
8. Build-time inventory counts (R3); source-version pinning for time-sensitive claims (R4).
9. Worked-example differentiation audit across the 61 URLs (R5).

**Then apply** — after the pseudonym disclosure and de-fictionalization have shipped here, the pen name has been de-fingerprinted across the portfolio, and ideally after at least one declined sibling has been re-approved, so the network this site visibly belongs to reads as cleaned-up rather than pattern-matched.

---

## 6. Bottom line

The other four audits were about adding honesty to sites that lacked it. This one is the opposite: the honesty system is already built and genuinely best-in-class — but it has fabricated testimony behind the byline and one expired law on the front page. The decision is made: keep "Jonathan Stowe" as a **disclosed pseudonym**, strip every invented experience claim, and re-anchor trust in the verifiable mechanisms the site already has. Do that plus the 25C fix, and hvacloadcalc.org isn't just approvable; it's the template the rest of the portfolio should be rebuilt from. I'd strongly consider extracting its editorial-standards page, source-tier system, and review gates into a shared CC skill — it already encodes nearly every fix the previous four reports prescribed.
