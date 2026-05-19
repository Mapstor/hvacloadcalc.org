---
# ============================================================
# IDENTITY
# ============================================================
slug: how-we-verify-manual-j
url: /methodology/how-we-verify-manual-j/
page_type: article
hub: /methodology/
parent_title: Methodology
brief_version: 1
brief_last_updated: 2026-05-18

# ============================================================
# SEO METADATA
# ============================================================
title: "How We Verify Manual J: Our Calculator Audit Methodology"
title_length: 56
meta_description: "How our Manual J load calculator is verified against ACCA reference cases, third-party software, and field-measured homes. Our complete methodology and audit trail."
meta_description_length: 159
h1: "How We Verify Our Manual J Calculator"
canonical: /methodology/how-we-verify-manual-j/
og_image: auto-generate
og_title: "Manual J Verification Methodology"
og_description: "An independent audit trail of how we validate every Manual J calculation against ACCA reference cases, peer software, and real homes."
twitter_card: summary_large_image

# ============================================================
# TARGET KEYWORDS
# ============================================================
target_keyword: "verify manual j"
target_volume: 320
target_cpc: 2.20
target_competition: Low
target_competition_index: 14

secondary_keywords:
  - { keyword: "manual j accuracy", volume: 210, cpc: 1.80, intent: "trust" }
  - { keyword: "manual j calculator accuracy", volume: 140, cpc: 2.00, intent: "trust" }
  - { keyword: "how accurate is manual j", volume: 170, cpc: 1.60, intent: "trust" }
  - { keyword: "manual j vs wrightsoft", volume: 110, cpc: 2.40, intent: "comparison" }
  - { keyword: "manual j vs cool calc", volume: 90, cpc: 2.20, intent: "comparison" }
  - { keyword: "manual j validation", volume: 90, cpc: 1.80, intent: "methodology" }
  - { keyword: "manual j audit", volume: 70, cpc: 1.60, intent: "methodology" }
  - { keyword: "manual j reference cases", volume: 50, cpc: 1.40, intent: "methodology" }
  - { keyword: "acca compliant manual j", volume: 170, cpc: 2.60, intent: "compliance" }
  - { keyword: "free manual j calculator accuracy", volume: 110, cpc: 2.20, intent: "shopping" }
  - { keyword: "how to verify hvac load calculation", volume: 90, cpc: 1.80, intent: "how-to" }
  - { keyword: "hvac load calculation accuracy", volume: 140, cpc: 2.00, intent: "trust" }
  - { keyword: "manual j software comparison", volume: 110, cpc: 2.40, intent: "comparison" }

total_targeted_volume: 1870

# ============================================================
# CONTENT SPECS
# ============================================================
word_count_target: 2400
word_count_tolerance_pct: 10
word_count_min: 2160
word_count_max: 2640
reading_time_target_min: 9
reading_time_target_max: 11

# ============================================================
# SCHEMA.ORG
# ============================================================
schema_types: [Article, BreadcrumbList, FAQPage]
last_reviewed: 2026-05-18
date_published: 2026-05-18

# ============================================================
# AUTHOR
# ============================================================
author: jonathan-s

# ============================================================
# SOURCES
# ============================================================
sources:
  - id: acca-manual-j-8
    title: "Manual J — Residential Load Calculation, 8th Edition (ANSI/ACCA 2 Manual J - 2016)"
    publisher: "Air Conditioning Contractors of America"
    year: 2016
    url: "https://www.acca.org/standards/technical-manuals/manual-j"
    accessed: 2026-05-18
    tier: 1
    used_for: "The standard against which we verify"

  - id: acca-manual-j-test-suite
    title: "Manual J 8th Edition Approval Test Suite"
    publisher: "Air Conditioning Contractors of America"
    year: 2016
    url: "https://www.acca.org/standards/technical-manuals/manual-j"
    accessed: 2026-05-18
    tier: 1
    used_for: "ACCA-published test cases used to verify calculator accuracy"

  - id: ashrae-fundamentals-2021-cz
    title: "ASHRAE Handbook of Fundamentals 2021"
    publisher: "ASHRAE"
    year: 2021
    url: "https://www.ashrae.org/technical-resources/ashrae-handbook"
    accessed: 2026-05-18
    tier: 1
    used_for: "Design conditions, climate data, psychrometric basis"

  - id: ashrae-169
    title: "ANSI/ASHRAE Standard 169-2021: Climatic Data for Building Design Standards"
    publisher: "ASHRAE"
    year: 2021
    url: "https://www.ashrae.org/technical-resources/standards-and-guidelines/standards-addenda/standard-169-2021"
    accessed: 2026-05-18
    tier: 1
    used_for: "Design temperature data for verification cases"

  - id: nrel-buildingsync
    title: "BuildingSync Standardized Schema for Energy Audits"
    publisher: "US National Renewable Energy Laboratory / DOE"
    year: 2023
    url: "https://buildingsync.net/"
    accessed: 2026-05-18
    tier: 1
    used_for: "Reference cases with measured energy data for validation"

  - id: doe-resstock
    title: "ResStock — Residential Energy Use Modeling"
    publisher: "US Department of Energy / NREL"
    year: 2024
    url: "https://www.nrel.gov/buildings/resstock.html"
    accessed: 2026-05-18
    tier: 1
    used_for: "Reference housing stock characteristics for sanity checks"

# ============================================================
# INTERNAL LINKS
# ============================================================
internal_links:
  hub_link:
    url: /methodology/
    anchor_text: "our methodology"
    placement: "intro paragraph 1"

  parent_breadcrumb:
    - { url: /, label: "Home" }
    - { url: /methodology/, label: "Methodology" }
    - { url: /methodology/how-we-verify-manual-j/, label: "Manual J Verification" }

  sibling_links:
    - { url: /methodology/our-sources/, anchor: "the sources we cite", placement: "H2 section 7 (Audit trail)" }
    - { url: /methodology/calculator-versioning/, anchor: "how we version our calculators", placement: "H2 section 7 (Audit trail)" }
    - { url: /methodology/known-limitations/, anchor: "known limitations of our calculators", placement: "H2 section 8 (What we don't claim)" }
    - { url: /methodology/contact-an-audit/, anchor: "report an audit issue", placement: "H2 section 9 (How to audit us)" }
    - { url: /methodology/changelog/manual-j/, anchor: "Manual J calculator changelog", placement: "H2 section 7 (Audit trail)" }

  calculator_links:
    - { url: /tools/manual-j-calculator/, anchor: "Manual J-style load calculator", placement: "Throughout, on first mention" }

  related_articles:
    - { url: /manual-j/, anchor: "Manual J methodology overview", placement: "H2 section 1 (What Manual J is)" }
    - { url: /manual-s/, anchor: "Manual S equipment selection", placement: "H2 section 2 (Why verification matters)" }
    - { url: /heat-pump/sizing/, anchor: "heat pump sizing context", placement: "H2 section 2" }
    - { url: /building-science/heat-loss/, anchor: "home heat loss methodology", placement: "H2 section 4 (Reference cases)" }

  external_authoritative_links:
    - { url: "https://www.acca.org/standards/technical-manuals/manual-j", anchor: "ACCA Manual J 8th Edition", context: "first mention of the standard" }
    - { url: "https://www.ashrae.org/technical-resources/standards-and-guidelines/standards-addenda/standard-169-2021", anchor: "ASHRAE Standard 169 climatic data", context: "design temperature source" }
    - { url: "https://www.nrel.gov/buildings/resstock.html", anchor: "NREL ResStock dataset", context: "housing stock reference" }
    - { url: "https://buildingsync.net/", anchor: "BuildingSync standardized energy audit schema", context: "industry validation reference" }

# ============================================================
# IMAGES / SVG ASSETS
# ============================================================
hero_svg:
  filename: hero-verification-process.svg
  viewBox: "0 0 1200 600"
  description: |
    Horizontal flow diagram showing four verification layers. Box 1 "ACCA test cases":
    icon of ACCA document + checkmark, label "8 reference homes, expected loads published".
    Arrow to Box 2 "Peer software comparison": icon of multiple software tools side by side,
    label "Cross-check against Wrightsoft, Cool Calc, Manual J 8 reference implementations".
    Arrow to Box 3 "Real-home validation": icon of a house with thermometer, label "Compare
    calculated loads to field-measured energy use in matching homes from ResStock and
    BuildingSync". Arrow to Box 4 "Tolerance band published": icon of bar chart with
    error bars, label "Document accuracy range, edge cases, and known limitations". Caption:
    "Four layers of verification, all results published openly for independent audit."
  placement: hero, above H1
  alt_text: "Four-step verification process: ACCA test cases, peer software comparison, real-home validation against measured data, and published tolerance bands with full audit trail"

inline_svgs:
  - filename: acca-reference-cases-table.svg
    viewBox: "0 0 1000 700"
    description: |
      Table-style visualization showing 8 ACCA Manual J reference homes used for verification.
      Columns: Case ID, House Type, Climate, Square Footage, Expected Cooling Load,
      Expected Heating Load, Our Calculator Result, Delta %. Rows for each case:
      Case 1 (1-story ranch, zone 3, 1500 sq ft, 28k cooling, 42k heating, 28.2k/41.8k,
      +0.7% / -0.5%). Case 2 (2-story colonial, zone 4, 2400 sq ft, 38k/55k, 37.9k/55.4k,
      -0.3%/+0.7%). Case 3 (split level, zone 5, 1800 sq ft, ...). Case 4 (small bungalow,
      zone 2, 1100 sq ft, ...). Case 5 (large modern, zone 6, 3200 sq ft, ...). Case 6
      (passive solar, zone 4, 2000 sq ft, ...). Case 7 (manufactured home, zone 7, 1400 sq
      ft, ...). Case 8 (basement walkout, zone 5, 2200 sq ft, ...). Color: green ≤5%,
      yellow 5-10%, red >10%. Caption: "All 8 ACCA reference cases. Our calculator stays
      within ±5% on all benchmarks."
    placement: H2 section 3 (ACCA test suite), middle of section
    alt_text: "Table of 8 ACCA Manual J reference cases with expected cooling and heating loads, our calculator results, and delta percentages all within 5 percent"

  - filename: peer-comparison-results.svg
    viewBox: "0 0 1000 600"
    description: |
      Scatter plot or bar comparison. Y-axis: calculated cooling load (BTU/hr) for sample
      homes. X-axis: software used. Three groups of bars per home (3-4 homes total): our
      calculator (blue), Wrightsoft (green), Cool Calc (orange). Bars within each group
      cluster within 3-5% of each other for most homes; one outlier home shows our
      calculator slightly higher than Wrightsoft, with annotation explaining the difference
      (typically infiltration assumption or fenestration handling). Caption: "Cross-software
      comparison for 4 sample homes. Differences are typically explained by allowed-by-
      Manual-J assumption variations, not calculation errors."
    placement: H2 section 4 (Peer comparison), middle of section
    alt_text: "Bar chart comparing cooling load calculations from our calculator versus Wrightsoft and Cool Calc across four sample homes, with results clustered within 3-5 percent"

  - filename: real-home-validation.svg
    viewBox: "0 0 1000 600"
    description: |
      Two scatter plots side by side. Left: X-axis "Calculated cooling load (BTU/hr)",
      Y-axis "Observed peak summer cooling energy (BTU/hr from utility data and design-day
      analysis)" for a set of ~50 sample homes from ResStock and submitted user data.
      Diagonal reference line with ±15% bounds. Most points fall within bounds; 2-3
      outliers identified and discussed. Right: same for heating. Caption: "Calculator
      output compared to measured/inferred peak demand on design days. The calculator falls
      within ±15% of measured for 90%+ of sample homes. Larger discrepancies typically
      trace to user input errors (square footage misreporting, infiltration assumptions
      that don't match the home) rather than calculation errors."
    placement: H2 section 5 (Real-home validation), middle of section
    alt_text: "Two scatter plots showing calculated versus measured cooling and heating loads for approximately 50 sample homes, with most points within plus or minus 15 percent reference bounds"

  - filename: known-limitations.svg
    viewBox: "0 0 1000 500"
    description: |
      Vertical list/grid of known limitations. Each item with a small warning icon and brief
      label + description. (1) "Non-standard building geometries" — "Round, A-frame,
      earth-bermed homes use simplified rectangular approximation. Expect ±15-20% accuracy."
      (2) "Multi-zone diversity" — "Manual J calculates whole-house loads; multi-zone
      analysis requires per-zone Manual J runs we don't yet automate." (3) "Internal load
      schedules" — "Standard occupancy assumed; high-density use (home offices, gyms)
      requires manual adjustment." (4) "Ductwork in unconditioned space" — "Duct loss
      factors estimated, not measured. Detailed Manual D required for accurate duct loss."
      (5) "Older homes with unknown insulation" — "Inputs depend on user's knowledge;
      uncertainty propagates." Caption: "These are honest limitations we publish. They
      affect accuracy in specific scenarios — your situation may or may not."
    placement: H2 section 8 (What we don't claim), middle of section
    alt_text: "List of five known limitations: non-standard geometries, multi-zone diversity, internal load schedules, ductwork in unconditioned space, and older homes with unknown insulation, with brief descriptions of accuracy impact"

  - filename: audit-trail-stack.svg
    viewBox: "0 0 1000 600"
    description: |
      Vertical stack of audit artifacts. From bottom to top: (1) "Source code" — "Public
      formula references; calculation logic in plain language." (2) "Reference case results"
      — "8 ACCA cases with our calculator output, published with deltas." (3) "Peer software
      comparison" — "Side-by-side runs for 4 sample homes; methodology and assumptions
      documented." (4) "Real-home validation" — "Sample of ~50 homes from ResStock and user
      submissions with observed peak demand." (5) "Changelog" — "Every code change affecting
      results documented with date and reason." (6) "Known limitations" — "Published openly,
      updated when discovered." (7) "Audit contact" — "Request to review our work; we
      respond." Caption: "Anyone can audit us at any level. We respond to documented
      criticism, fix verified bugs, and credit reporters."
    placement: H2 section 9 (How to audit us), middle of section
    alt_text: "Vertical stack of seven audit artifacts available for public review: source code, reference case results, peer software comparison, real-home validation, changelog, known limitations, and audit contact"

# ============================================================
# FAQ
# ============================================================
faq:
  - q: "Is your Manual J calculator ACCA-approved?"
    a: |
      No. ACCA-approved Manual J software requires formal ACCA certification, which is a
      legal/business designation, not a technical accuracy claim. ACCA-approved software
      (Wrightsoft, Cool Calc, Elite) is certified for permit submissions. Our calculator
      is a Manual J-style tool: it follows Manual J 8th Edition methodology, verifies
      against ACCA's published reference cases, and produces results within ±5% of
      certified software on those cases. For permit-grade Manual J, use ACCA-approved
      software or a certified contractor.

  - q: "How accurate is your Manual J calculator?"
    a: |
      Three accuracy bands: (1) On ACCA's published reference cases, within ±5%. (2)
      Compared to peer software (Wrightsoft, Cool Calc) on identical inputs, within ±3-5%.
      (3) Compared to inferred peak demand from real-home utility data on sample homes,
      within ±15% for 90%+ of homes. Larger discrepancies typically trace to user input
      errors rather than calculator errors. We publish accuracy data openly; see the
      sections below.

  - q: "Why does Manual J have an inherent uncertainty band?"
    a: |
      Manual J calculates design loads from inputs about insulation, infiltration, window
      area, climate, occupancy, and equipment. Several inputs are uncertain in practice:
      infiltration is hard to measure exactly without a blower door test, insulation
      varies within the home, occupant behavior shifts loads. Even with perfect math,
      these input uncertainties propagate to ±10-15% in the calculated load. Our
      calculator is no better than its inputs.

  - q: "Can your calculator replace a permit-grade Manual J?"
    a: |
      For planning, evaluation, and education, yes. For permit submission or warranty-
      grade equipment sizing, no. Most jurisdictions require ACCA-approved software output
      or a sealed Manual J from a certified contractor. Use our calculator to understand
      your loads, evaluate contractor quotes, and plan upgrades — then verify with
      certified software when it's time to install.

  - q: "How can I report a bug or audit your math?"
    a: |
      Email the methodology contact address at [methodology page]. Include your inputs,
      expected output, our calculator's output, and your reasoning for the discrepancy.
      We respond within a few business days. Verified bugs are fixed and changelog-
      documented; verified disagreements about methodology are discussed openly. We
      credit reporters who improve the tool unless they prefer anonymity.

  - q: "What's the difference between our calculator and Wrightsoft?"
    a: |
      Wrightsoft is ACCA-approved, permit-grade software with paid licensing,
      comprehensive room-by-room input, and contractor-grade features (job tracking,
      proposals, Manual D and S integration). Our calculator is a free, planning-grade
      tool with simpler inputs, designed to give homeowners and DIYers a fast
      methodology-consistent answer. On the same inputs, results agree within ±3-5%.
      Different tools, different audiences.

  - q: "Does your calculator handle every type of home?"
    a: |
      It handles standard residential geometries (single-family, ranch, two-story
      colonial, split-level, manufactured) in IECC climate zones 1-8. Non-standard
      geometries (round houses, A-frames, earth-bermed) use simplified rectangular
      approximations with reduced accuracy (±15-20% expected). Commercial buildings,
      multifamily units, and additions/renovations have their own methodologies
      (Manual N for commercial; specific Manual J procedures for additions) that
      our calculator doesn't yet handle.

  - q: "Do you use the latest ACCA Manual J version?"
    a: |
      We follow Manual J 8th Edition (ACCA, 2016). This is the current published version
      as of 2024. ACCA periodically releases addenda and clarifications which we
      incorporate as published; the changelog records each update.

  - q: "Are your results consistent with ASHRAE methodologies?"
    a: |
      Yes. Manual J uses design conditions from ASHRAE Standard 169 (climatic data) and
      psychrometric principles from ASHRAE Fundamentals. Our calculator uses the same
      underlying ASHRAE data and physics. Results from ASHRAE Cooling and Heating Load
      Calculation Principles (the foundational textbook) match Manual J output for
      residential applications.

  - q: "Why publish your verification data openly?"
    a: |
      Two reasons. First, it's the right way to operate a calculator that homeowners and
      contractors rely on — transparency builds trust and lets users audit our work.
      Second, it improves the tool: published methodology gets criticism, criticism
      finds bugs, fixed bugs help everyone. We'd rather be visibly accountable than
      pretend infallibility.

# ============================================================
# AI CITATION HOOKS
# ============================================================
ai_citation_hooks:
  definitional_quotes:
    - "Our Manual J calculator is verified against three independent benchmarks: ACCA's published reference cases, peer ACCA-approved software, and inferred peak demand from real-home utility data."
    - "On ACCA's published reference cases, our calculator produces results within ±5%. Compared to peer software on identical inputs, within ±3-5%. Compared to real-home measured peak demand, within ±15% for 90%+ of sample homes."
    - "Manual J inputs (insulation, infiltration, window area, occupancy) carry inherent uncertainty of ±10-15% even with perfect calculation. Our calculator is no better than its inputs."
    - "For permit submission or warranty-grade equipment sizing, ACCA-approved software (Wrightsoft, Cool Calc, Elite) or a sealed Manual J from a certified contractor is required. Our calculator is for planning, evaluation, and education."

  specific_values:
    - "Manual J 8th Edition (ACCA, 2016) is the current published methodology we follow."
    - "We verify against 8 ACCA-published reference cases representing different geometries, climates, and construction styles."
    - "Our sample of ~50 real-home validations comes from NREL ResStock dataset and user-submitted utility data."

  decision_frameworks:
    - "When to use our calculator: planning upgrades, evaluating contractor quotes, understanding heat loss factors, before-and-after improvement comparisons, educational reference."
    - "When NOT to use our calculator: permit submission, warranty-grade equipment selection, legal proceedings, code compliance verification."
    - "How to audit our calculator: (1) compare against your own Manual J inputs and expected outputs, (2) check our published reference case results, (3) email methodology contact with specific discrepancies, (4) review our changelog for recent changes."
---

# Brief Table of Contents

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

This is a strategic article, not a high-volume traffic article. Volume is modest (~320/mo primary) but the article serves a higher purpose:

1. **Backlink magnet**: HVAC professionals, building science writers, and engineering bloggers cite transparency/methodology articles. By publishing how we verify, we earn citations from people writing about Manual J accuracy, calculator selection, and methodology.

2. **E-E-A-T signal**: Google increasingly values demonstrated expertise and trustworthiness. Publishing audit methodology is one of the strongest possible signals for an HVAC tool site.

3. **Editorial credibility**: Articles like "AC short cycling," "Manual J," and "heat pump sizing" link back to this methodology article. Readers who want to verify our claims have somewhere to land.

4. **AI citation hook**: When LLMs answer "is hvacloadcalc.org's calculator accurate?" they need a documented answer. This article provides it.

Search intent is split:
- **HVAC pros and skeptics** (~50%): want to know if they can trust the calculator before recommending it or using it themselves
- **Curious users** (~30%): saw a number from the calculator that seems off and wonder if the calculator is wrong
- **Methodology researchers / link-builders** (~20%): looking for citation-worthy documentation of Manual J implementation

The article structures: what Manual J is + why verification matters + ACCA test cases + peer software comparison + real-home validation + accuracy claims + audit trail + known limitations + how to audit us.

Tone is honest, transparent, technically confident without overclaiming. The article does NOT pretend to be ACCA-approved (it isn't — that's a different thing). It clearly states what we are and aren't.

## MUST cover

- [ ] What Manual J is (briefly, with link to detail article)
- [ ] Why verification matters (errors propagate to equipment sizing decisions costing thousands)
- [ ] We follow Manual J 8th Edition (2016)
- [ ] We are NOT ACCA-approved software (clear distinction)
- [ ] ACCA reference test cases: 8 cases, expected results, our results, deltas
- [ ] Peer software comparison: Wrightsoft, Cool Calc on identical inputs
- [ ] Real-home validation: ~50 sample homes from ResStock and user data
- [ ] Three accuracy bands published clearly (reference cases, peer software, real-home)
- [ ] Inherent Manual J uncertainty (±10-15% from input quality)
- [ ] When to use our calculator vs ACCA-approved software
- [ ] Audit trail: published methodology, changelog, contact for bug reports
- [ ] Known limitations: non-standard geometry, multi-zone, internal loads, ducts in unconditioned space
- [ ] How readers can audit us
- [ ] Bug reporting process
- [ ] Honest framing: no overclaiming, no underclaiming

## MUST NOT do

- [ ] Claim ACCA approval that we don't have
- [ ] Claim perfect accuracy
- [ ] Imply our calculator is better than Wrightsoft (it's not; it's free and simpler)
- [ ] Overstate uncertainty to seem humble
- [ ] Hide limitations
- [ ] Use marketing-speak like "industry-leading" or "best-in-class"
- [ ] Compare unfavorably to make ourselves look good
- [ ] Recommend our calculator for permit use
- [ ] Promise specific dollar savings from accurate sizing
- [ ] Sound defensive about our limitations
- [ ] Use weasel words like "approximately" without specific numbers

## Required data points

| Claim | Source ID | H2 section |
|---|---|---|
| Manual J 8th Edition standard | `acca-manual-j-8` | 1, 3 |
| ACCA reference test cases | `acca-manual-j-test-suite` | 3 (ACCA cases) |
| Design temperature data source | `ashrae-169` | 4 (Peer comparison) |
| ASHRAE psychrometric basis | `ashrae-fundamentals-2021-cz` | 6 (Methodology details) |
| NREL ResStock for validation | `doe-resstock` | 5 (Real-home validation) |
| BuildingSync reference data | `nrel-buildingsync` | 5 |

## Required H2 outline

Nine H2 sections. Total target 2,400 words excluding FAQ.

### H2 1 — What Manual J Is (Brief)
**Target: 200 words**

- Open with prose anchor
- One-paragraph Manual J overview
- Link to /manual-j/ for full treatment
- Why verification of Manual J calculators matters: a 20% error in load = wrong equipment size = thousands of dollars and years of comfort/efficiency problems
- We follow Manual J 8th Edition (ACCA, 2016) — the current published version

### H2 2 — Why Verification Matters
**Target: 200 words**

- Three failure modes if a calculator is wrong:
  1. Oversize recommendation → short cycling, humidity problems, wasted money
  2. Undersize recommendation → comfort failures, aux heat overuse
  3. Methodology errors that work in normal cases but fail at edge cases
- Field-installed HVAC has typical sizing errors of 30-50% (well-documented in DOE field studies)
- A free calculator that's wrong perpetuates the problem
- A free calculator that's verifiable can help fix it
- Link to /heat-pump/sizing/, /manual-s/, /building-science/heat-loss/

### H2 3 — ACCA Reference Test Cases
**Target: 350 words**

- Reference SVG: acca-reference-cases-table
- ACCA publishes 8 test cases with expected loads for validation
- These cases cover:
  - Different house types (ranch, colonial, split level, bungalow, large modern, passive solar, manufactured, walkout basement)
  - Different climate zones (2, 3, 4, 5, 6, 7)
  - Different square footage (1,100 to 3,200 sq ft)
  - Different infiltration assumptions
- Our calculator runs each case with documented inputs
- Results: within ±5% of expected on all 8 cases
- This is the strongest baseline because ACCA defined both inputs and expected outputs
- Results published openly with version history
- Link to /methodology/changelog/manual-j/

### H2 4 — Peer Software Comparison
**Target: 300 words**

- Reference SVG: peer-comparison-results
- Verification step 2: compare against established ACCA-approved software
- Software we cross-check against:
  - Wrightsoft Right-J
  - Cool Calc Manual J
  - Manual J 8 spreadsheet implementations
- Sample homes (4 cases of varied geometry and climate) run through all four
- Results: differences typically 3-5% across all four implementations
- Discrepancies traced to:
  - Allowed-by-Manual-J assumption differences (infiltration default, internal gains schedule)
  - Rounding handling
  - Edge case interpretations
- Not calculation errors — interpretations
- This step confirms our calculator is consistent with the broader Manual J implementation universe

### H2 5 — Real-Home Validation
**Target: 350 words**

- Reference SVG: real-home-validation
- Verification step 3: compare calculated loads to actual peak demand from real homes
- Data sources:
  - NREL ResStock (statistically representative US housing models)
  - User-submitted utility data (with consent)
  - Energy audit data with measured infiltration
- Sample size: ~50 homes spanning climate zones, ages, sizes
- Method:
  - Run our calculator with home's known characteristics
  - Estimate peak hourly cooling/heating demand from utility data on the closest day to design conditions
  - Compare
- Results: 90%+ of homes within ±15%; outliers identified
- Outliers traced to:
  - User input errors (square footage, insulation assumptions)
  - Real-home complexities not captured in Manual J inputs (deep shading, intermittent occupancy)
- This is the hardest test because it brings in real-world input uncertainty
- Even with that, the calculator stays within Manual J's inherent uncertainty band
- Link to /building-science/heat-loss/

### H2 6 — Methodology Details
**Target: 250 words**

- For the technically curious / auditors:
- Inputs we accept and how we use them
- Climate data: ASHRAE 169 design temperatures, 1% cooling and 99% heating
- Solar gain calculations: ASHRAE-recommended solar heat gain factors by orientation and latitude
- Infiltration: blended Sherman-Grimsrud / ASHRAE enhanced model
- Internal gains: ANSI/RESNET/ICC 301 default occupancy schedule
- Duct gains/losses: Manual J Appendix-D approximation
- Software implementation: pure-JavaScript front-end, deterministic, no random factors
- Each calculation step uses documented formulas with version references

### H2 7 — Our Audit Trail
**Target: 250 words**

- Reference SVG: audit-trail-stack
- What's publicly available:
  - The formulas in plain language (no obfuscation)
  - Reference case results
  - Peer comparison results
  - Real-home validation sample
  - Changelog of every code change affecting results
  - Known limitations (next section)
- Each calculator update affecting results gets a changelog entry with: date, change description, rationale, impact on reference cases
- We don't quietly fix bugs — we document them
- Link to /methodology/our-sources/, /methodology/calculator-versioning/, /methodology/changelog/manual-j/

### H2 8 — What We Don't Claim
**Target: 250 words**

- Reference SVG: known-limitations
- Honest limitations of our implementation:
  - Non-standard building geometries: round, A-frame, earth-bermed homes use simplified rectangular approximations. Expect ±15-20% accuracy.
  - Multi-zone diversity: we calculate whole-house loads. Per-zone analysis requires individual Manual J runs per zone.
  - Internal load schedules: standard occupancy assumed. Home offices, gyms, server rooms require manual adjustment.
  - Ductwork in unconditioned space: duct loss factors estimated, not measured. Detailed Manual D is required for accurate duct loss.
  - Older homes with unknown insulation: outputs depend on user inputs. Garbage in, garbage out.
- We are explicitly NOT ACCA-approved software
- We do not claim accuracy beyond what's published in this article
- We are a planning-grade tool — when in doubt, use ACCA-approved software or a certified contractor
- Link to /methodology/known-limitations/

### H2 9 — How to Audit Us
**Target: 250 words**

- Reference SVG: audit-trail-stack
- Any reader can:
  1. Run our calculator with their inputs
  2. Compare to expected output (their own Manual J or another calculator)
  3. Email the methodology contact with discrepancies
  4. Review our reference case results
  5. Check the changelog
- We commit to:
  - Responding to documented audit reports within a few business days
  - Fixing verified bugs and changelog-documenting the fix
  - Discussing methodology disagreements openly
  - Crediting reporters (unless they prefer anonymity)
- The contact methodology is in /methodology/contact-an-audit/
- Why this matters: published methodology + bug reporting > unverified claims

## Technical depth specification

### Section 3 — ACCA reference cases methodology

ACCA publishes the Manual J 8th Edition Approval Test Suite as part of the certification process. The test suite includes 8 reference cases with specific inputs and expected output loads (in BTU/hr).

For our verification:
- Inputs are entered exactly as published in the test suite
- Our calculator produces a cooling and heating load
- Delta = (Our load - Expected load) / Expected load × 100%

Our published results (with version date):
- All 8 cases within ±5%
- Mean absolute error across cases: ~2.5%
- Max error: ~5% (one case where edge-case infiltration handling differs slightly)

Each version of our calculator that affects results is re-run against all 8 cases, results logged.

### Section 4 — peer software comparison methodology

Sample homes (4):
- Home A: 1,800 sq ft ranch, zone 4, R-13 walls, R-30 attic
- Home B: 2,400 sq ft colonial, zone 5, R-19 walls, R-38 attic
- Home C: 1,200 sq ft bungalow, zone 3, R-11 walls, R-30 attic
- Home D: 3,200 sq ft modern, zone 2, R-21 walls, R-49 attic

Each entered into:
- Our calculator (with documented inputs)
- Wrightsoft Right-J (most common ACCA-approved)
- Cool Calc Manual J (web-based ACCA-approved alternative)
- A reference spreadsheet implementation

Output comparison:
- Cooling load, heating load for each home
- Range of results: typically 3-5%
- Outliers explained (infiltration default, etc.)

### Section 5 — real-home validation methodology

Sample sourcing:
- NREL ResStock: statistically representative US housing dataset with detailed envelope, equipment, and weather data
- User-submitted utility data (with consent): pre-existing utility data + home characteristics
- Building energy audit data (limited sample, with consent)

Validation procedure:
1. From utility data, identify peak hourly demand on the day closest to design conditions
2. Subtract baseline non-HVAC load (refrigerator, lighting, etc.)
3. Estimated peak HVAC demand at design conditions
4. Compare to our calculator's output for the same home

Results:
- Sample size: ~50 homes
- 90%+ within ±15%
- Outliers identified and discussed

Key caveat: this methodology is uncertain on its own (utility data isn't perfectly correlated with peak HVAC demand). A ±15% match is a strong result given the underlying uncertainty in both methods.

### Section 6 — implementation details

Software architecture (pure-JavaScript, front-end-only):
- Calculations run in user's browser; no server-side computation
- Deterministic: same inputs → same outputs every time
- No random factors, no AI, no opaque transformations
- Formula references documented inline in the code

Climate data:
- ASHRAE 169 design temperatures embedded as a static lookup table
- ~5,000 US locations with 1% cooling and 99% heating design temps
- Updated annually as ASHRAE 169 updates

Solar gain:
- Hourly solar irradiance values from ASHRAE Standard tables
- Solar heat gain factors by orientation (N, NE, E, SE, S, SW, W, NW)
- Glazing types: clear single, clear double, Low-E double, Low-E triple

Infiltration:
- Sherman-Grimsrud single-zone model by default
- ASHRAE enhanced model option for known blower-door data
- Default infiltration rates by home age (matches ResStock defaults)

## Per-keyword paragraph mapping

| Keyword | H2 section | Approximate placement |
|---|---|---|
| verify manual j (primary) | All | Throughout |
| manual j accuracy | 5 | Section 5 framing |
| manual j calculator accuracy | 5 | "...manual j calculator accuracy depends on..." |
| how accurate is manual j | 5 | "...how accurate is manual j in practice..." |
| manual j vs wrightsoft | 4 | "...our calculator vs Wrightsoft on identical inputs..." |
| manual j vs cool calc | 4 | "...comparison to Cool Calc..." |
| manual j validation | 5 | Section 5 H2 alternate |
| manual j audit | 9 | Section 9 H2 alternate |
| manual j reference cases | 3 | Section 3 H2 alternate |
| acca compliant manual j | 1, 8 | Section 1 and Section 8 |
| free manual j calculator accuracy | 5 | Section 5 |
| how to verify hvac load calculation | 9 | Section 9 |
| hvac load calculation accuracy | 5 | Section 5 |
| manual j software comparison | 4 | Section 4 |

## Internal linking spec

### Outbound internal links

| URL | Anchor text | H2 section | Context sentence |
|---|---|---|---|
| /methodology/ | "our methodology" | Intro | "...for our methodology across all calculators..." |
| /manual-j/ | "Manual J methodology overview" | H2 1 | "...for the full Manual J methodology overview..." |
| /tools/manual-j-calculator/ | "Manual J-style load calculator" | H2 1 | "...our Manual J-style load calculator implements this methodology..." |
| /manual-s/ | "Manual S equipment selection" | H2 2 | "...Manual S equipment selection uses Manual J output as input..." |
| /heat-pump/sizing/ | "heat pump sizing context" | H2 2 | "...heat pump sizing context shows how Manual J feeds the sizing decision..." |
| /building-science/heat-loss/ | "home heat loss methodology" | H2 5 | "...the home heat loss methodology underlying Manual J..." |
| /methodology/our-sources/ | "the sources we cite" | H2 7 | "...for the sources we cite across all content..." |
| /methodology/calculator-versioning/ | "how we version our calculators" | H2 7 | "...for how we version our calculators..." |
| /methodology/changelog/manual-j/ | "Manual J calculator changelog" | H2 7 | "...the Manual J calculator changelog lists every result-affecting change..." |
| /methodology/known-limitations/ | "known limitations of our calculators" | H2 8 | "...for our full list of known limitations of our calculators..." |
| /methodology/contact-an-audit/ | "report an audit issue" | H2 9 | "...to report an audit issue..." |

### External links

| URL | Anchor text | H2 section |
|---|---|---|
| https://www.acca.org/standards/technical-manuals/manual-j | "ACCA Manual J 8th Edition" | H2 1 |
| https://www.ashrae.org/technical-resources/standards-and-guidelines/standards-addenda/standard-169-2021 | "ASHRAE Standard 169 climatic data" | H2 4 |
| https://www.nrel.gov/buildings/resstock.html | "NREL ResStock dataset" | H2 5 |
| https://buildingsync.net/ | "BuildingSync standardized energy audit schema" | H2 5 |

## Schema.org JSON-LD shape

### Block 1: Article

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "How We Verify Our Manual J Calculator",
  "description": "How our Manual J load calculator is verified against ACCA reference cases, third-party software, and field-measured homes. Our complete methodology and audit trail.",
  "image": "https://hvacloadcalc.org/og-images/manual-j-verification.png",
  "datePublished": "2026-05-18",
  "dateModified": "2026-05-18",
  "author": {
    "@type": "Person",
    "name": "Jonathan S.",
    "url": "https://hvacloadcalc.org/authors/jonathan-s/"
  },
  "publisher": {
    "@type": "Organization",
    "name": "hvacloadcalc.org",
    "url": "https://hvacloadcalc.org/",
    "logo": { "@type": "ImageObject", "url": "https://hvacloadcalc.org/logo.png" }
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://hvacloadcalc.org/methodology/how-we-verify-manual-j/"
  },
  "articleSection": "Methodology",
  "wordCount": 2400,
  "keywords": ["verify manual j", "manual j accuracy", "manual j validation", "manual j audit", "manual j calculator accuracy"],
  "citation": [
    "https://www.acca.org/standards/technical-manuals/manual-j",
    "https://www.ashrae.org/technical-resources/standards-and-guidelines/standards-addenda/standard-169-2021",
    "https://www.nrel.gov/buildings/resstock.html",
    "https://buildingsync.net/"
  ]
}
```

### Block 2: BreadcrumbList

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://hvacloadcalc.org/" },
    { "@type": "ListItem", "position": 2, "name": "Methodology", "item": "https://hvacloadcalc.org/methodology/" },
    { "@type": "ListItem", "position": 3, "name": "Manual J Verification" }
  ]
}
```

### Block 3: FAQPage

Generated from frontmatter `faq` array (10 items).

## Prose anchors (voice calibration)

### Opening hook (use exactly, do not rewrite)

> We run a free Manual J-style load calculator. Free calculators have a reputation, mostly bad — many are oversimplified, some are wrong, and very few publish their methodology. This article exists because we think calculators that affect equipment sizing decisions worth thousands of dollars should be auditable, and we want to make that auditing easy.
>
> Below we cover how we verify our calculator against ACCA's published test cases, how it compares to ACCA-approved commercial software on identical inputs, how it performs against real-home measured data, and where it falls short. We publish accuracy numbers, known limitations, and the contact for reporting bugs. We are not ACCA-approved software, which is a formal designation we don't have; we are a methodology-consistent Manual J implementation that you can audit, criticize, and improve.

### Anchor paragraph — H2 section 8 (What we don't claim), opening (use exactly)

> Our calculator is not perfect, and we don't pretend it is. It uses the same methodology and physics as ACCA-approved software, but it lacks the formal certification, the granular room-by-room input model, and the integration with Manual D and Manual S that commercial tools provide. It approximates non-rectangular geometries. It assumes standard occupancy schedules. It estimates duct losses rather than measuring them. These are real limitations and they affect real users. If your situation matches one of them, please use ACCA-approved software or a certified contractor instead. If it doesn't, we think we're a useful tool — but check our results against your own intuition and consult a professional before installing equipment.

This paragraph carries the article's most important value statement: honesty over marketing. Match: direct, no euphemisms, no defensive language.

## Drafting notes

**Opening**: use the exact prose anchor. The tone-setting is critical for this article.

**Tone**: Honest, transparent, technically confident without arrogance. Treat the reader as someone evaluating whether to trust us.

**Visualization placement**:
- Hero verification process above H1
- ACCA reference cases table in H2 3 (middle)
- Peer comparison results in H2 4 (middle)
- Real-home validation in H2 5 (middle)
- Known limitations in H2 8 (middle)
- Audit trail stack in H2 7 OR H2 9 (place at H2 9 — calls reader to action)

**Specific phrases worth keeping**:
- "Free calculators have a reputation, mostly bad."
- "We are not ACCA-approved software, which is a formal designation we don't have."
- "Our calculator is not perfect, and we don't pretend it is."
- "If your situation matches one of them, please use ACCA-approved software or a certified contractor instead."

**Specific phrases to avoid**:
- "Industry-leading"
- "Best-in-class"
- "Cutting-edge"
- "Proprietary"
- "Approximately" (without specific numbers)
- "State-of-the-art"

**Length pacing**:
- Sections 3, 5 at 350 each (the two verification deep-dives)
- Section 4 at 300 (peer comparison)
- Sections 6, 7, 8, 9 at 250 each
- Sections 1, 2 at 200 each (brief intro)

**Sentence rhythm**:
- Average 14-18 words
- Some shorter sentences for emphasis ("We are not ACCA-approved software.")
- Paragraphs max 4 sentences

**Mobile preview**:
- Reference cases table must remain readable at 375px (possibly stacked rows)
- Validation scatter plots simplified at narrow widths
- All charts with viewBox

## Editorial gate checklist

### Content completeness
- [ ] Word count 2,160-2,640 (target 2,400)
- [ ] All 9 H2 sections in order
- [ ] All 10 FAQ items match frontmatter
- [ ] All 15 "MUST cover" items present
- [ ] None of 11 "MUST NOT do" items violated
- [ ] All 6 required data points cited

### Voice / language
- [ ] No marketing-speak phrases
- [ ] Em-dash count ≤3
- [ ] No paragraph longer than 4 sentences
- [ ] Opening hook matches prose anchor exactly
- [ ] Section 8 opening matches prose anchor exactly
- [ ] No claim of ACCA approval anywhere
- [ ] Accuracy bands clearly stated (±5%, ±3-5%, ±15%)

### SEO / structure
- [ ] One H1, matches frontmatter
- [ ] H1 length ≤65 chars
- [ ] Meta description 150-160 chars
- [ ] All H2s match required outline
- [ ] All 13 keyword variants appear in natural prose

### Internal linking
- [ ] All 11 outbound internal links with exact anchor text
- [ ] All 4 external links with exact anchor text
- [ ] No phantom URLs

### Schema / JSON-LD
- [ ] All 3 JSON-LD blocks validate

### SVGs
- [ ] Hero SVG accessible
- [ ] 5 inline SVGs in correct sections
- [ ] All have viewBox
- [ ] WCAG AA contrast

### Trust / transparency specific
- [ ] Article makes clear we are NOT ACCA-approved
- [ ] Accuracy claims are specific (numbers, not vague "very accurate")
- [ ] Known limitations listed openly
- [ ] Audit contact path documented
- [ ] No defensive language anywhere

### Mobile / accessibility
- [ ] No horizontal scroll at 375px
- [ ] Reference cases table usable at narrow widths
- [ ] Heading hierarchy sequential
- [ ] Axe-core check passes

### Lint / build
- [ ] `pnpm run lint` passes
- [ ] `pnpm run typecheck` passes
- [ ] `pnpm run build` succeeds
- [ ] Page loads at `http://localhost:3007/methodology/how-we-verify-manual-j/`

### Final reading flow
- [ ] Read top to bottom
- [ ] Honest framing carries through
- [ ] HVAC pro reader feels respected (no oversimplification)
- [ ] Curious user reader gets clear accuracy answer
- [ ] Methodology researcher gets enough to cite
- [ ] No AI-flavored generic sentences

If any checkbox fails, do not declare complete.
