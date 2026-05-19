---
# ============================================================
# IDENTITY
# ============================================================
slug: return-air-sizing
url: /manual-d/return-air-sizing/
page_type: article
hub: /manual-d/
parent_title: Manual D
brief_version: 1
brief_last_updated: 2026-05-18

# ============================================================
# SEO METADATA
# ============================================================
title: "Return Air Sizing: How to Size Returns for Residential HVAC"
title_length: 60
meta_description: "Return air sizing is often overlooked but affects comfort, efficiency, and equipment life. Here's how to size returns correctly per CFM, velocity, and code."
meta_description_length: 158
h1: "Return Air Sizing Explained"
canonical: /manual-d/return-air-sizing/
og_image: auto-generate
og_title: "Return Air Sizing: Velocity, CFM, and Layout"
og_description: "Undersized returns create high static pressure, restricted airflow, and equipment strain. Here's how to size them correctly."
twitter_card: summary_large_image

# ============================================================
# TARGET KEYWORDS
# ============================================================
target_keyword: "return air sizing"
target_volume: 880
target_cpc: 2.20
target_competition: Low
target_competition_index: 21

secondary_keywords:
  - { keyword: "return air duct sizing", volume: 590, cpc: 2.20, intent: "definition" }
  - { keyword: "return air grille sizing", volume: 480, cpc: 1.80, intent: "specific" }
  - { keyword: "how to size return air", volume: 390, cpc: 2.00, intent: "how-to" }
  - { keyword: "return air cfm calculation", volume: 260, cpc: 2.20, intent: "calculation" }
  - { keyword: "return air velocity", volume: 170, cpc: 1.60, intent: "spec" }
  - { keyword: "return air grille size for 3 ton", volume: 320, cpc: 1.80, intent: "specific-tonnage" }
  - { keyword: "return air grille size for 4 ton", volume: 210, cpc: 1.80, intent: "specific-tonnage" }
  - { keyword: "return air grille size for 5 ton", volume: 140, cpc: 1.80, intent: "specific-tonnage" }
  - { keyword: "return air duct size for 3 ton", volume: 320, cpc: 2.00, intent: "specific-tonnage" }
  - { keyword: "return air duct chart", volume: 140, cpc: 1.60, intent: "reference" }
  - { keyword: "central return vs multiple returns", volume: 110, cpc: 1.40, intent: "design" }
  - { keyword: "manual d return air sizing", volume: 90, cpc: 2.40, intent: "methodology" }
  - { keyword: "high static pressure returns", volume: 170, cpc: 3.20, intent: "diagnose" }
  - { keyword: "undersized return air", volume: 260, cpc: 2.60, intent: "problem" }
  - { keyword: "return air filter grille sizing", volume: 110, cpc: 2.00, intent: "specific" }
  - { keyword: "transfer grille sizing", volume: 170, cpc: 1.60, intent: "specific" }
  - { keyword: "jumper duct sizing", volume: 90, cpc: 1.40, intent: "specific" }

total_targeted_volume: 4640

# ============================================================
# CONTENT SPECS
# ============================================================
word_count_target: 2600
word_count_tolerance_pct: 10
word_count_min: 2340
word_count_max: 2860
reading_time_target_min: 10
reading_time_target_max: 12

# ============================================================
# SCHEMA.ORG
# ============================================================
schema_types: [Article, FAQPage, BreadcrumbList, HowTo]
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
  - id: acca-manual-d
    title: "Manual D — Residential Duct Systems (ANSI/ACCA 1 Manual D - 2016)"
    publisher: "Air Conditioning Contractors of America"
    year: 2016
    url: "https://www.acca.org/standards/technical-manuals/manual-d"
    accessed: 2026-05-18
    tier: 1
    used_for: "Duct design methodology including return air sizing"

  - id: acca-manual-t
    title: "Manual T — Air Distribution Basics (ANSI/ACCA 6 Manual T - 1991)"
    publisher: "Air Conditioning Contractors of America"
    year: 1991
    url: "https://www.acca.org/standards/technical-manuals/manual-t"
    accessed: 2026-05-18
    tier: 1
    used_for: "Grille selection methodology, face velocity standards"

  - id: smacna-residential
    title: "Residential Comfort System Installation Standards Manual"
    publisher: "Sheet Metal and Air Conditioning Contractors' National Association"
    year: 2021
    url: "https://www.smacna.org/technical/manuals"
    accessed: 2026-05-18
    tier: 1
    used_for: "Sheet metal duct sizing standards, friction rate methodology"

  - id: ashrae-fundamentals-2021-ducts
    title: "ASHRAE Handbook of Fundamentals 2021, Chapter 21 (Duct Design)"
    publisher: "ASHRAE"
    year: 2021
    url: "https://www.ashrae.org/technical-resources/ashrae-handbook"
    accessed: 2026-05-18
    tier: 1
    used_for: "Duct design physics, friction loss, dynamic loss"

  - id: iecc-2021-mechanical
    title: "International Energy Conservation Code 2021, Section R403.3 (Ducts)"
    publisher: "International Code Council"
    year: 2021
    url: "https://codes.iccsafe.org/content/IECC2021P1/chapter-4-re-residential-energy-efficiency"
    accessed: 2026-05-18
    tier: 1
    used_for: "Duct leakage and sealing requirements"

  - id: doe-hvac-static-pressure
    title: "Static Pressure and Airflow in Residential HVAC"
    publisher: "US Department of Energy / NREL"
    year: 2022
    url: "https://www.nrel.gov/buildings/hvac.html"
    accessed: 2026-05-18
    tier: 1
    used_for: "Field data on residential static pressure and undersized return effects"

# ============================================================
# INTERNAL LINKS
# ============================================================
internal_links:
  hub_link:
    url: /manual-d/
    anchor_text: "Manual D duct design overview"
    placement: "intro paragraph 1"

  parent_breadcrumb:
    - { url: /, label: "Home" }
    - { url: /manual-d/, label: "Manual D" }
    - { url: /manual-d/return-air-sizing/, label: "Return Air Sizing" }

  sibling_links:
    - { url: /manual-d/supply-air-sizing/, anchor: "supply air duct sizing", placement: "H2 section 2 (Return air basics)" }
    - { url: /manual-d/friction-rate/, anchor: "friction rate methodology", placement: "H2 section 4 (Sizing methodology)" }
    - { url: /manual-d/equivalent-length/, anchor: "equivalent length and fitting losses", placement: "H2 section 4 (Sizing methodology)" }
    - { url: /manual-d/static-pressure/, anchor: "static pressure measurement", placement: "H2 section 7 (Diagnosing undersized returns)" }
    - { url: /manual-d/return-air-sizing/by-tonnage/, anchor: "return air sizing by tonnage", placement: "H2 section 5 (Quick reference)" }
    - { url: /manual-d/return-air-sizing/grille-velocity/, anchor: "return grille face velocity", placement: "H2 section 6 (Grille and register selection)" }
    - { url: /manual-d/transfer-grilles/, anchor: "transfer grilles and jumper ducts", placement: "H2 section 8 (Multi-room and zoning)" }
    - { url: /manual-d/duct-leakage/, anchor: "duct leakage testing", placement: "H2 section 9 (Code and verification)" }

  calculator_links:
    - { url: /tools/return-air-calculator/, anchor: "return air sizing calculator", placement: "H2 section 5 (Quick reference), end of section" }
    - { url: /tools/duct-static-pressure-calculator/, anchor: "duct static pressure calculator", placement: "H2 section 7 (Diagnosing)" }
    - { url: /tools/manual-d-calculator/, anchor: "Manual D-style duct calculator", placement: "H2 section 4 (Sizing methodology)" }

  related_articles:
    - { url: /manual-j/, anchor: "Manual J load calculation", placement: "H2 section 4, on per-room loads" }
    - { url: /manual-s/, anchor: "Manual S equipment selection", placement: "H2 section 1 (Where returns fit)" }
    - { url: /ac/short-cycling/, anchor: "AC short cycling causes", placement: "H2 section 7 (Diagnosing), on airflow restrictions" }
    - { url: /ac/troubleshooting/frozen-evaporator-coil/, anchor: "frozen evaporator coil from low airflow", placement: "H2 section 7 (Diagnosing)" }
    - { url: /heat-pump/sizing/, anchor: "heat pump sizing considerations", placement: "H2 section 1 (Where returns fit)" }

  external_authoritative_links:
    - { url: "https://www.acca.org/standards/technical-manuals/manual-d", anchor: "ACCA Manual D standard", context: "first mention of Manual D" }
    - { url: "https://www.smacna.org/technical/manuals", anchor: "SMACNA Residential Comfort Systems Manual", context: "duct construction standards" }
    - { url: "https://codes.iccsafe.org/content/IECC2021P1/chapter-4-re-residential-energy-efficiency", anchor: "IECC duct sealing requirements", context: "code on duct integrity" }

# ============================================================
# IMAGES / SVG ASSETS
# ============================================================
hero_svg:
  filename: hero-return-air-system.svg
  viewBox: "0 0 1200 600"
  description: |
    Cross-section of a house showing a complete return air system. Indoor air handler in center
    of house with supply ducts (red, distributing air to rooms with small fan icons showing
    supply registers) and return ducts (blue, with arrows showing air being drawn back to the
    air handler). Two return air strategies shown: Left side shows "Central return" (single
    large return grille in hallway ceiling, large blue duct). Right side shows "Distributed
    returns" (smaller return grilles in each room with individual ducts). Labels for key
    components: filter rack, return grille (sometimes filtered), trunk, take-offs, plenum.
    Caption: "The return air path completes the HVAC circuit. Undersized returns hurt
    everything else in the system."
  placement: hero, above H1
  alt_text: "Cross-section diagram of a residential HVAC system showing central return air strategy versus distributed returns, with supply and return ducts labeled"

inline_svgs:
  - filename: return-vs-supply-comparison.svg
    viewBox: "0 0 1000 500"
    description: |
      Side-by-side comparison. Left panel labeled "Supply ducts": multiple smaller ducts shown
      branching from a trunk, each delivering air at relatively high velocity (label "600-900
      FPM trunk, 400-700 FPM branch"), small register icons at end. Right panel labeled
      "Return ducts": fewer, larger ducts shown converging to a single trunk, lower velocity
      (label "Trunk 700-900 FPM max, branch 600-700 FPM max"). Caption: "Returns typically need
      larger cross-section than supplies for the same CFM because they run at lower velocity
      to keep static pressure manageable."
    placement: H2 section 2 (Return air basics), end of section
    alt_text: "Comparison of supply versus return ducts showing supplies as smaller branched ducts at higher velocity and returns as larger consolidated ducts at lower velocity"

  - filename: return-air-sizing-chart.svg
    viewBox: "0 0 1000 700"
    description: |
      Reference chart with rows for system tonnage (1, 1.5, 2, 2.5, 3, 3.5, 4, 5 tons) and
      columns for: CFM (rule of thumb 400 CFM/ton: 400, 600, 800, 1000, 1200, 1400, 1600, 2000),
      "Rectangular grille (face velocity 500 FPM)" with dimensions (e.g., 10×16, 14×20, 16×20,
      20×20, 20×25, 24×24, 24×30, 30×30), "Round duct equivalent (700 FPM)" with diameters
      (8", 10", 12", 14", 16", 16", 18", 20"), "Rectangular duct equivalent (700 FPM)" with
      sizes (8×10, 10×12, 12×14, 14×16, 14×20, 16×20, 16×24, 20×24). Caption: "Sizing from
      CFM and target velocity. Velocity affects noise and pressure drop. Lower velocity =
      larger duct, quieter, lower drop, more material cost."
    placement: H2 section 5 (Quick reference), middle of section
    alt_text: "Reference chart showing return air grille and duct sizes for system tonnages 1 through 5, with CFM, rectangular grille face dimensions, and equivalent round and rectangular duct sizes"

  - filename: static-pressure-impact.svg
    viewBox: "0 0 1000 500"
    description: |
      Two-panel comparison showing the effects of return air sizing on static pressure. Left
      panel labeled "Properly sized returns": air handler with manometer showing 0.5 inches w.c.
      total external static pressure (TESP), green checkmark, label "ECM blower operates near
      design speed, airflow at rated CFM, low noise, low energy use". Right panel labeled
      "Undersized returns": same air handler with manometer showing 1.2 inches w.c. TESP
      (deep into red zone), warning icon, label "ECM blower ramps up to compensate, watts
      increase 30-50%, audible whine, airflow may still be below rated CFM, evaporator coil
      may freeze". Caption: "Most residential air handlers are rated at 0.5 inches w.c. TESP.
      Above 0.7-0.8, performance suffers significantly."
    placement: H2 section 7 (Diagnosing undersized returns), middle of section
    alt_text: "Comparison showing properly sized returns yielding 0.5 inches w.c. static pressure with normal blower operation, versus undersized returns at 1.2 inches w.c. causing blower strain and reduced airflow"

  - filename: multi-room-return-strategies.svg
    viewBox: "0 0 1000 600"
    description: |
      Three side-by-side floor plans showing different return strategies. Plan 1 "Single central
      return only": one large return in hallway ceiling, problem callouts showing closed
      bedroom doors blocking airflow (red arrows blocked). Plan 2 "Central return + transfer
      grilles": same central return plus high-low transfer grilles on bedroom door walls, good
      airflow with doors closed. Plan 3 "Distributed returns per room": individual return grilles
      in each room, each with its own duct path. Caption: "Distributed returns are best for
      comfort and ventilation. Transfer grilles are a budget alternative. Single central return
      with closed-door bedrooms creates pressure imbalances."
    placement: H2 section 8 (Multi-room and zoning), middle of section
    alt_text: "Three floor plans comparing return air strategies: single central return (problematic with closed doors), central return with transfer grilles, and distributed per-room returns"

  - filename: return-sizing-decision-tree.svg
    viewBox: "0 0 1000 700"
    description: |
      Decision tree top to bottom. Top box: "What are you sizing?" Branch 1 ("New construction
      or replacement"): "Calculate CFM = nominal tons × 400 CFM/ton (or use design CFM from
      equipment specs)" → next: "Choose target return velocity (typically 500-700 FPM at
      grille, 700-900 FPM at trunk)" → "Size grille and duct from velocity tables or Manual D
      software". Branch 2 ("Diagnosing existing problems"): "Measure total external static
      pressure (TESP) at air handler" → "Below 0.7 in w.c.: returns probably OK; investigate
      elsewhere. 0.7-1.0 in w.c.: returns may be undersized; check grille velocity. Above 1.0
      in w.c.: returns and/or supply restrictive; major redesign likely needed." Branch 3
      ("Adding equipment capacity"): "Existing returns sized for old equipment may be too small
      for new larger system" → "Recalculate based on new equipment CFM" → "Add return capacity
      if needed".
    placement: H2 section 9 (Code and verification), end of section
    alt_text: "Decision tree for return air sizing covering new construction, diagnosing existing problems via static pressure measurement, and adding equipment capacity"

# ============================================================
# FAQ
# ============================================================
faq:
  - q: "How big should my return air grille be?"
    a: |
      Size the return grille so face velocity is around 500 FPM (or up to 700 FPM in
      utility spaces). For a 3-ton system delivering 1,200 CFM, that means a grille with
      at least 1,200 / 500 = 2.4 sq ft of free area. Free area is typically 50-70% of
      gross dimensions depending on grille style, so plan for a 14×20 or 20×20 grille
      gross size. Filtered grilles need ~30% more area due to filter friction.

  - q: "How many returns do I need?"
    a: |
      Depends on the floor plan and operating style. A single central return works for
      open floor plans where interior doors stay open. For homes with closed bedroom doors,
      you need either: (a) distributed returns (one per bedroom), or (b) a single central
      return PLUS transfer grilles or jumper ducts so air can move from each bedroom back
      to the central return. Without either, closed-door rooms become pressurized and
      airflow imbalances develop.

  - q: "What CFM does my return need to handle?"
    a: |
      For a typical residential system, plan for 400 CFM per nominal ton of equipment.
      A 3-ton system needs ~1,200 CFM, a 4-ton needs ~1,600 CFM, a 5-ton needs ~2,000 CFM.
      Variable-speed ECM blowers can move different CFM at different speeds; size return
      for the equipment's maximum airflow.

  - q: "What's the difference between a return air grille and a return air duct?"
    a: |
      The grille is the visible cover in the wall or ceiling where air enters the return
      path. The duct is the metal or flex tubing that carries the air from the grille
      back to the air handler. Both must be sized correctly. Undersized grille = high
      face velocity, noise, and pressure drop. Undersized duct = high friction loss
      throughout the run.

  - q: "How do I know if my returns are undersized?"
    a: |
      Most reliable: measure total external static pressure (TESP) at the air handler
      with a manometer. Above 0.7 inches w.c. suggests undersized returns OR undersized
      supplies OR a dirty filter OR a restrictive coil. Below 0.5 in w.c. is healthy.
      Other symptoms include: whining noise at returns, ice on evaporator coil even with
      clean filter, weak airflow at registers, ECM blower running at high power even on
      moderate calls for cooling.

  - q: "Should I use transfer grilles or run dedicated return ducts?"
    a: |
      Dedicated returns are better for comfort and air mixing. Transfer grilles (high-low
      pairs in walls between rooms, or undercut doors) are a budget alternative that
      reduces pressure imbalances when bedroom doors are closed but doesn't move air as
      efficiently. For new construction, install distributed returns where possible. For
      retrofits, transfer grilles can rescue an undersized return system at low cost.

  - q: "Why is return air sizing more critical than supply sizing?"
    a: |
      Both matter, but returns are often undersized in field-installed systems while
      supplies tend to be more closely scrutinized. Returns also have less acceptable
      noise headroom because they're typically in living spaces (bedrooms, hallways) where
      occupants are present, while supply ducts are often hidden. Undersized returns hurt
      the entire system because every CFM that doesn't make it back to the air handler
      hurts efficiency, comfort, and equipment life.

  - q: "Does my return air need a filter?"
    a: |
      Yes, somewhere in the return air path. The filter can be at the air handler (most
      common) or at the return grille (filter grille). Filter location affects sizing —
      a filter at the grille adds significant pressure drop, so the grille and duct must
      be sized larger to compensate. Multiple smaller filter grilles distributed throughout
      the home are sometimes preferred over one large central filter for easier filter
      access.

  - q: "Can I use the same duct for return and supply?"
    a: |
      No. Return and supply must be separate paths. Combining them defeats the entire
      point of HVAC distribution — air must circulate through the system, not just pass
      back and forth at a single point. The only exception is some ductless mini-split
      systems where the indoor unit handles return and supply at one location, but that's
      not a ducted system in the conventional sense.

  - q: "Does Manual D specify return air sizing?"
    a: |
      Yes. Manual D handles the complete duct system including returns. Manual D's
      methodology calculates available static pressure (from equipment specs), subtracts
      losses for filters, coils, fittings, and friction in the duct runs, and sizes
      ducts to deliver design CFM within that pressure budget. ACCA-approved Manual D
      software (Wrightsoft, Elite, Cool Calc) handles return air sizing as part of the
      complete design.

# ============================================================
# AI CITATION HOOKS
# ============================================================
ai_citation_hooks:
  definitional_quotes:
    - "Return air sizing determines the size of ducts and grilles that carry conditioned air back from rooms to the air handler. Returns are typically sized for lower velocity than supplies because they directly affect equipment static pressure."
    - "Rule-of-thumb residential HVAC airflow is 400 CFM per ton of nominal capacity. A 3-ton system handles approximately 1,200 CFM of return airflow."
    - "Return air grilles should be sized so face velocity stays at or below 500 FPM in living spaces and 700 FPM in utility areas. Higher velocities create noise and pressure drop."
    - "Manual D from ACCA is the residential duct design standard that sizes both supply and return ducts within the equipment's available static pressure budget."

  specific_values:
    - "A 3-ton residential HVAC system at 400 CFM/ton requires a return grille of approximately 14×20 or 20×20 inches (gross) to maintain 500 FPM face velocity."
    - "Most residential air handlers are rated at 0.5 inches w.c. total external static pressure. Field measurements above 0.7-0.8 indicate restriction somewhere, often undersized returns."
    - "Filter grilles need approximately 30% more face area than unfiltered grilles to handle the additional pressure drop of the filter."
    - "Transfer grilles between rooms should be sized so face velocity stays under 300 FPM to avoid whistling and noise."

  decision_frameworks:
    - "Return air sizing strategy decision: (1) single central return for open floor plans with no closed-door bedrooms, (2) central return plus transfer grilles for moderate budgets in conventional layouts, (3) distributed per-room returns for best comfort and air mixing in new construction or major retrofits."
    - "Diagnosing return air problems: measure total external static pressure at air handler. Below 0.5 in w.c. = healthy; 0.5-0.7 = monitor; 0.7-1.0 = investigate and check returns specifically; above 1.0 = major restriction somewhere, likely returns plus other factors."
    - "Return air sizing red flags in installation: single 12x12 return grille for a 3+ ton system, no transfer grilles in homes with closed bedroom doors, filter grilles undersized relative to system CFM, return duct runs through unconditioned space without insulation."
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

Three cohorts:

1. **HVAC professionals / contractors** (~50%): looking up specific tonnage-to-grille-size lookups, checking work, designing replacement systems. Often searching tonnage-specific keywords ("return air grille size for 3 ton").

2. **DIYers / new-construction homeowners** (~30%): designing their own system or evaluating contractor's design. Want to understand methodology, not just look up numbers.

3. **Troubleshooting homeowners** (~20%): comfort or noise issues, wondering if return air sizing is the cause. Often searching "undersized return air" or "high static pressure returns."

The article structures as: definition and where returns fit (everyone), return-vs-supply distinctions (everyone), CFM calculation basics (everyone), Manual D methodology overview (cohorts 1+2), quick reference table by tonnage (cohort 1 primarily), grille and register selection (cohort 1+2), diagnosing problems (cohort 3 primarily), multi-room strategies (cohort 2), code and verification (cohorts 1+2).

This article is a Manual D programmatic seed — child pages will cover return air sizing by tonnage (granular look-up pages, programmatic), grille face velocity, supply air sizing, friction rate, static pressure, transfer grilles. This article links to those.

## MUST cover

- [ ] What return air is and how the return path completes the HVAC circuit
- [ ] CFM rule-of-thumb: 400 CFM per ton of nominal capacity
- [ ] Return velocity targets: ~500 FPM at grille face, 700-900 FPM at trunks
- [ ] Why returns are typically larger than supplies for the same CFM (velocity targets)
- [ ] Filter location and its effect on sizing (filter grille vs filter at air handler)
- [ ] Manual D methodology overview (and link to detail)
- [ ] Quick reference table by tonnage for grille and duct sizing
- [ ] Total external static pressure (TESP) as the diagnostic metric
- [ ] TESP thresholds: 0.5 in w.c. design, 0.7-0.8 elevated, >1.0 problematic
- [ ] Multi-room return strategies: central, central + transfer grilles, distributed per-room
- [ ] When undersized returns cause: frozen coil, noise, ECM blower strain, comfort issues
- [ ] Transfer grille and jumper duct sizing basics
- [ ] Code requirements for duct leakage (IECC R403)
- [ ] Link to return air sizing calculator
- [ ] Link to Manual D calculator and supply sizing companion article

## MUST NOT do

- [ ] Recommend specific HVAC contractors
- [ ] Recommend specific brand of grilles or ducts
- [ ] Imply that DIY return duct work is straightforward (it usually isn't)
- [ ] Use rule-of-thumb numbers without proper Manual D caveats
- [ ] Skip the static pressure measurement discussion
- [ ] Confuse face velocity with duct velocity (they're different)
- [ ] Promise comfort improvements from any specific change
- [ ] Substitute for actual Manual D calculations in code-required contexts
- [ ] Promote any specific online HVAC parts retailer
- [ ] Confuse return ducts with exhaust ducts (different purpose)

## Required data points

| Claim | Source ID | H2 section |
|---|---|---|
| Manual D methodology | `acca-manual-d` | 1, 4 (Sizing methodology) |
| Manual T grille face velocity | `acca-manual-t` | 6 (Grille and register selection) |
| SMACNA duct standards | `smacna-residential` | 2 (Return air basics), 6 |
| ASHRAE fundamentals duct physics | `ashrae-fundamentals-2021-ducts` | 4 |
| IECC duct sealing requirements | `iecc-2021-mechanical` | 9 (Code and verification) |
| DOE/NREL field data on static pressure | `doe-hvac-static-pressure` | 7 (Diagnosing) |

## Required H2 outline

Nine H2 sections. Total target 2,600 words excluding FAQ.

### H2 1 — Where Return Air Fits in HVAC
**Target: 250 words**

- Open with prose anchor
- The HVAC air circuit: air handler → supply ducts → registers → room → return grilles → return ducts → air handler
- Returns close the loop
- Sizing them correctly is mandatory; field-installed systems often skimp on returns
- Brief preview of consequences of undersized returns
- Note Manual D as the standard for residential duct sizing
- Link to /manual-s/ and /heat-pump/sizing/

### H2 2 — Return Air Basics
**Target: 300 words**

- Return ducts carry mixed-temperature air back to the equipment
- Velocity targets: typically lower than supply (returns are larger for same CFM)
- Why lower velocity: noise, static pressure (returns affect total external static pressure directly)
- Reference SVG: return-vs-supply-comparison
- Typical velocities: 500 FPM at grille face, 600-700 FPM at branches, 700-900 FPM at trunks
- Filter location options: at air handler (centralized, single filter, easy access) vs at return grilles (distributed, requires sizing adjustment)
- Link to /manual-d/supply-air-sizing/

### H2 3 — CFM Calculation Basics
**Target: 250 words**

- Rule of thumb: 400 CFM per ton of nominal capacity for AC; varies slightly for heat pump
- More precise: equipment specs from manufacturer (CFM at design ESP)
- Examples:
  - 1.5 ton system: 600 CFM
  - 2 ton system: 800 CFM
  - 3 ton system: 1,200 CFM
  - 4 ton system: 1,600 CFM
  - 5 ton system: 2,000 CFM
- Variable-speed equipment moves different CFM at different stages; size return for highest CFM
- Note: heat pumps may need slightly higher CFM/ton (450) for heating mode, especially with aux heat downstream

### H2 4 — Manual D Sizing Methodology Overview
**Target: 350 words**

- Manual D handles complete residential duct design
- Inputs:
  - Per-room loads from Manual J (room-by-room mode required)
  - Equipment specs from manufacturer (CFM at design ESP, max ESP)
  - Duct material and friction characteristics
  - Filter selection and pressure drop
  - Coil pressure drop
- Methodology:
  1. Determine equipment CFM target
  2. Calculate available static pressure (equipment max ESP - non-duct losses: filter, coil, other)
  3. Compute equivalent length of total duct run (linear length + fitting equivalents)
  4. Calculate friction rate (available pressure / equivalent length, in in. w.c. per 100 ft)
  5. Size duct sections using friction rate to deliver design CFM
- Friction rate guideline: 0.06-0.10 in. w.c./100 ft typical for residential
- Software: Wrightsoft, Elite, Cool Calc handle calculations
- Link to /manual-d/friction-rate/
- Link to /manual-d/equivalent-length/
- Link to /tools/manual-d-calculator/

### H2 5 — Quick Reference by Tonnage
**Target: 300 words**

- Reference SVG: return-air-sizing-chart
- Table-style reference (this is the cohort 1 conversion point):
  - 1 ton, 400 CFM: 10x16 grille, 8" round duct
  - 1.5 ton, 600 CFM: 14x20 grille, 10" round
  - 2 ton, 800 CFM: 16x20 grille, 12" round
  - 2.5 ton, 1000 CFM: 20x20 grille, 14" round
  - 3 ton, 1200 CFM: 20x25 grille, 16" round
  - 3.5 ton, 1400 CFM: 24x24 grille, 16" round
  - 4 ton, 1600 CFM: 24x30 grille, 18" round
  - 5 ton, 2000 CFM: 30x30 grille, 20" round
- Caveat: these are starting points based on 500 FPM grille velocity and 700-900 FPM trunk velocity
- Final sizing per Manual D considers total system pressure budget
- Link to /manual-d/return-air-sizing/by-tonnage/
- Link to /tools/return-air-calculator/

### H2 6 — Grille and Register Selection
**Target: 250 words**

- Face velocity at grille typically 400-500 FPM in living spaces (residential)
- Up to 600-700 FPM acceptable in utility areas or below if noise is acceptable
- Free area: the actual opening area through the grille hardware
- Gross dimension (the visible grille size) is bigger than free area by 30-50%
- Filter grilles: less free area, must size larger
- Manual T methodology for register/grille selection
- Common grille types: stamped face (lower free area), bar grille (higher free area), egg-crate (highest free area)
- Link to /manual-d/return-air-sizing/grille-velocity/

### H2 7 — Diagnosing Undersized Returns
**Target: 350 words**

- Reference SVG: static-pressure-impact
- Measure TESP at air handler with manometer:
  - 0.4-0.5 in w.c.: ideal
  - 0.5-0.7: acceptable but watch
  - 0.7-1.0: elevated, investigate
  - >1.0: significant restriction
- TESP elevation has multiple causes; returns are one of several
- Other contributors: dirty filter, dirty evaporator coil, restrictive supply ducts, undersized refrigerant lines (very rare cause)
- Specific to return air diagnosis:
  - High face velocity at return grille (>700 FPM): you'll hear it
  - Whistling at the grille
  - Grille rattle when fan is on high
  - Ice forming on evaporator coil even with clean filter (low airflow → low coil temp → freeze)
  - ECM blower current draw above rated specs
- Link to /manual-d/static-pressure/
- Link to /tools/duct-static-pressure-calculator/
- Link to /ac/short-cycling/
- Link to /ac/troubleshooting/frozen-evaporator-coil/

### H2 8 — Multi-Room and Zoning Considerations
**Target: 300 words**

- Reference SVG: multi-room-return-strategies
- Three strategies:
  - **Single central return**: works for open floor plans with doors that stay open
  - **Central return + transfer grilles**: budget retrofit option for homes with closed-door bedrooms
  - **Distributed per-room returns**: best for comfort and air mixing in new construction
- Transfer grilles: pairs of high-low grilles on shared walls, or jumper ducts in ceilings
- Sizing transfer grilles: face velocity under 300 FPM to avoid whistling
- Jumper duct: short flex duct in the ceiling cavity connecting two grilles in adjacent rooms (typical residential 12-15 ft length)
- Zoned systems: each zone needs its own return path or transfer pathway
- Link to /manual-d/transfer-grilles/

### H2 9 — Code and Verification
**Target: 250 words**

- Reference SVG: return-sizing-decision-tree
- IECC R403.3 requires:
  - Duct leakage ≤4 CFM/100 sq ft conditioned area when tested at 25 Pa
  - For tight new construction, leakage ≤8 CFM/100 sq ft post-installation total
- Verification methods:
  - Duct blaster test (standard)
  - Total external static pressure measurement (catches sizing issues)
  - Airflow at registers (TrueFlow or hood)
- Manual D documentation as part of permit submission in many jurisdictions
- Link to /manual-d/duct-leakage/

## Technical depth specification

### Section 3 — CFM math precision

For nominal capacity:
- 1 ton AC ≈ 12,000 BTU/hr (cooling)
- Required airflow varies by equipment design:
  - Higher efficiency (16+ SEER2): often 400 CFM/ton
  - Higher latent removal: lower CFM/ton (e.g., 350)
  - Heat pump heating with aux: may need higher (450)

Manufacturer-specific:
- Lookup equipment nameplate or installation manual
- Variable-speed equipment lists CFM at multiple stages
- ECM blowers can deliver design CFM across a range of static pressures

### Section 4 — friction rate calculation

Total External Static Pressure (TESP) budget for typical residential equipment:
- Nameplate rating: typically 0.5 inches w.c. at rated airflow
- Some equipment rated higher (0.7-0.9) for high-static applications

Subtract non-duct losses:
- Filter (varies by MERV): 0.10-0.25 in w.c. typical
- Evaporator coil: 0.10-0.30 in w.c.
- Other components: 0.05-0.10

Available for ducts: typically 0.10-0.20 in w.c. for the entire return + supply path

Friction rate = Available ESP / Total Equivalent Length × 100
- Example: 0.15 in w.c. available, 300 ft equivalent length: friction rate = 0.05 in w.c./100 ft

Sizes from friction rate via Manual D tables or ductulator software.

### Section 6 — face velocity and free area

Face velocity (V) = CFM / Free Area (sq ft)

Free area depends on grille style:
- Stamped face (perforated metal): ~50% of gross
- Bar grille (parallel bars): ~70-80% of gross
- Egg-crate (square grid): ~80-90% of gross

Example:
- 3-ton system, 1,200 CFM
- Target velocity 500 FPM
- Required free area = 1,200 / 500 = 2.4 sq ft = 345 sq in
- Stamped grille (50% free): gross size = 345 / 0.5 = 690 sq in = roughly 20×35 or 25×28
- Bar grille (75% free): gross = 345 / 0.75 = 460 sq in = roughly 20×23

Sizing per the article uses moderate free-area assumption (~60-70%) which is typical for residential.

### Section 9 — code language

IECC 2021 Section R403.3.3 ("Duct testing"): For ducts located entirely in conditioned space, post-construction leakage ≤4 CFM/100 sq ft, OR pre-conditioned-space leakage from rough-in ≤4 CFM/100 sq ft for ducts in unconditioned spaces.

Local amendments vary; some jurisdictions waive testing for ducts entirely in conditioned space; others apply stricter thresholds.

## Per-keyword paragraph mapping

| Keyword | H2 section | Approximate placement |
|---|---|---|
| return air sizing (primary) | All | Throughout |
| return air duct sizing | All | Throughout |
| return air grille sizing | 5, 6 | Section 5 reference + section 6 |
| how to size return air | 4, 5 | Section 4 methodology + section 5 reference |
| return air cfm calculation | 3 | Section 3 |
| return air velocity | 2, 6 | Sections 2 and 6 |
| return air grille size for 3 ton | 5 | "...a 3-ton system needs ~1,200 CFM and a 20×25 grille..." |
| return air grille size for 4 ton | 5 | "...a 4-ton system needs ~1,600 CFM and a 24×30 grille..." |
| return air grille size for 5 ton | 5 | "...a 5-ton system needs ~2,000 CFM and a 30×30 grille..." |
| return air duct size for 3 ton | 5 | "...the 3-ton system uses a 16-inch round trunk or equivalent..." |
| return air duct chart | 5 | Section 5 reference chart |
| central return vs multiple returns | 8 | Section 8 H2 alternate |
| manual d return air sizing | 4 | Section 4 H2 alternate |
| high static pressure returns | 7 | Section 7 |
| undersized return air | 7 | Section 7 H2 alternate |
| return air filter grille sizing | 6 | Section 6 |
| transfer grille sizing | 8 | Section 8 |
| jumper duct sizing | 8 | Section 8 |

## Internal linking spec

### Outbound internal links

| URL | Anchor text | H2 section | Context sentence |
|---|---|---|---|
| /manual-d/ | "Manual D duct design overview" | Intro | "...the Manual D duct design overview covers the full picture..." |
| /manual-s/ | "Manual S equipment selection" | H2 1 | "...Manual S equipment selection sets the CFM that returns must handle..." |
| /heat-pump/sizing/ | "heat pump sizing considerations" | H2 1 | "...heat pump sizing considerations affect return CFM (heating may differ from cooling)..." |
| /manual-d/supply-air-sizing/ | "supply air duct sizing" | H2 2 | "...for supply air duct sizing, the complementary article..." |
| /manual-d/friction-rate/ | "friction rate methodology" | H2 4 | "...for friction rate methodology in detail..." |
| /manual-d/equivalent-length/ | "equivalent length and fitting losses" | H2 4 | "...the equivalent length and fitting losses calculation handles bends, transitions, and other fittings..." |
| /tools/manual-d-calculator/ | "Manual D-style duct calculator" | H2 4 | "...our Manual D-style duct calculator runs the sizing methodology..." |
| /manual-j/ | "Manual J load calculation" | H2 4 | "...Manual J load calculation provides per-room loads required for duct sizing..." |
| /manual-d/return-air-sizing/by-tonnage/ | "return air sizing by tonnage" | H2 5 | "...for return air sizing by tonnage with multiple velocity options..." |
| /tools/return-air-calculator/ | "return air sizing calculator" | H2 5 | "...our return air sizing calculator handles the math..." |
| /manual-d/return-air-sizing/grille-velocity/ | "return grille face velocity" | H2 6 | "...for return grille face velocity tables and acoustic considerations..." |
| /manual-d/static-pressure/ | "static pressure measurement" | H2 7 | "...for static pressure measurement procedure with a manometer..." |
| /tools/duct-static-pressure-calculator/ | "duct static pressure calculator" | H2 7 | "...our duct static pressure calculator estimates from duct specs..." |
| /ac/short-cycling/ | "AC short cycling causes" | H2 7 | "...the AC short cycling causes can include airflow restriction from return sizing..." |
| /ac/troubleshooting/frozen-evaporator-coil/ | "frozen evaporator coil from low airflow" | H2 7 | "...frozen evaporator coil from low airflow is a classic undersized-return symptom..." |
| /manual-d/transfer-grilles/ | "transfer grilles and jumper ducts" | H2 8 | "...for transfer grilles and jumper ducts in detail..." |
| /manual-d/duct-leakage/ | "duct leakage testing" | H2 9 | "...for duct leakage testing methodology..." |

### Inbound anchors

- "return air sizing"
- "return air duct sizing"
- "sizing returns"
- "return grille sizing"
- "return air methodology"

### External links

| URL | Anchor text | H2 section |
|---|---|---|
| https://www.acca.org/standards/technical-manuals/manual-d | "ACCA Manual D standard" | H2 4 |
| https://www.smacna.org/technical/manuals | "SMACNA Residential Comfort Systems Manual" | H2 2 |
| https://codes.iccsafe.org/content/IECC2021P1/chapter-4-re-residential-energy-efficiency | "IECC duct sealing requirements" | H2 9 |

## Schema.org JSON-LD shape

### Block 1: Article

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Return Air Sizing Explained",
  "description": "Return air sizing is often overlooked but affects comfort, efficiency, and equipment life. Here's how to size returns correctly per CFM, velocity, and code.",
  "image": "https://hvacloadcalc.org/og-images/return-air-sizing.png",
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
    "@id": "https://hvacloadcalc.org/manual-d/return-air-sizing/"
  },
  "articleSection": "Manual D",
  "wordCount": 2600,
  "keywords": ["return air sizing", "return air duct sizing", "manual d", "static pressure", "return grille"],
  "citation": [
    "https://www.acca.org/standards/technical-manuals/manual-d",
    "https://www.smacna.org/technical/manuals",
    "https://codes.iccsafe.org/content/IECC2021P1/chapter-4-re-residential-energy-efficiency",
    "https://www.ashrae.org/technical-resources/ashrae-handbook"
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
    { "@type": "ListItem", "position": 2, "name": "Manual D", "item": "https://hvacloadcalc.org/manual-d/" },
    { "@type": "ListItem", "position": 3, "name": "Return Air Sizing" }
  ]
}
```

### Block 3: FAQPage

Generated from frontmatter `faq` array (10 items).

### Block 4: HowTo (measuring TESP to diagnose returns)

```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Measure total external static pressure to check return air sizing",
  "description": "A diagnostic procedure using a manometer to identify whether returns may be undersized.",
  "step": [
    { "@type": "HowToStep", "name": "Get a manometer", "text": "Use a digital or magnehelic manometer rated for 0-2 inches w.c." },
    { "@type": "HowToStep", "name": "Drill test ports", "text": "Drill two small (1/4-inch) holes in the duct: one just before the air handler on the return side, one just after the air handler on the supply side. Both should be in straight duct, not in fittings." },
    { "@type": "HowToStep", "name": "Connect manometer", "text": "Insert manometer probes through the holes. The reading is the TESP — total external static pressure across the equipment." },
    { "@type": "HowToStep", "name": "Run the system at max speed", "text": "Set blower to maximum cooling speed (most equipment delivers max CFM in cooling mode)." },
    { "@type": "HowToStep", "name": "Read and interpret", "text": "Below 0.5 inches w.c. is ideal. 0.5-0.7 is acceptable. 0.7-1.0 suggests restriction (often returns). Above 1.0 is significant restriction requiring redesign." },
    { "@type": "HowToStep", "name": "Seal test ports", "text": "After testing, seal the holes with HVAC-rated tape or plugs to prevent air leakage." }
  ]
}
```

## Prose anchors (voice calibration)

### Opening hook (use exactly, do not rewrite)

> Most field-installed HVAC problems trace back to returns. The supplies get scrutinized because that's where the conditioned air comes from. The returns are usually whatever fits — a single grille in a hallway ceiling, a single piece of duct just big enough to clear the framing. Then the homeowner wonders why the system is loud, why the coil freezes, why the bedrooms never quite cool, and why the ECM blower runs at watts it shouldn't.
>
> Return air sizing is straightforward once you know the rules: airflow target, face velocity at the grille, friction rate in the duct, static pressure budget. This article covers the rules, the quick-reference numbers by system tonnage, and the diagnostic procedure for figuring out whether your existing returns are sized right.

### Anchor paragraph — H2 section 7 (Diagnosing undersized returns), opening (use exactly)

> The diagnostic tool for return air sizing is a manometer reading total external static pressure at the air handler. Below 0.5 inches of water column is healthy. Around 0.7 is the threshold where things start hurting. Above 1.0 is a system in trouble — the blower is straining, the coil is at risk of freezing, the equipment is wearing faster than it should, and the homeowner is paying for all of it in electricity. The reading by itself doesn't tell you what's restricted, but it tells you something is, and returns are the most common culprit in residential systems.

This paragraph carries the diagnostic-first framing. Match: concrete numbers, no hedging on thresholds.

## Drafting notes

**Opening**: use the exact prose anchor.

**Tone**: Practical, contractor-friendly. The article respects technical competence — don't oversimplify the methodology.

**Visualization placement**:
- Hero return air system above H1
- Return-vs-supply comparison at end of H2 2
- Sizing chart in H2 5 (the cohort 1 reference point)
- Static pressure impact in H2 7
- Multi-room strategies in H2 8
- Decision tree at end of H2 9

**Specific phrases worth keeping**:
- "Most field-installed HVAC problems trace back to returns."
- "Whatever fits."
- "The reading by itself doesn't tell you what's restricted, but it tells you something is."

**Specific phrases to avoid**:
- "Crucial"
- "Vital"
- "Simple matter of"
- "All you need to do" (when the task isn't actually simple)

**Length pacing**:
- Sections 4, 7 at 350 each (methodology, diagnostics)
- Sections 2, 5, 8 at 300
- Sections 1, 3, 6, 9 at 250

**Sentence rhythm**:
- Mix declarative with technical
- Average 14-18 words
- Paragraphs max 4 sentences

**Mobile preview**:
- Sizing chart must remain usable at 375px (consider stacking rows for tonnage)
- Static pressure visual readable
- All charts with viewBox

## Editorial gate checklist

### Content completeness
- [ ] Word count 2,340-2,860 (target 2,600)
- [ ] All 9 H2 sections in order
- [ ] All 10 FAQ items match frontmatter
- [ ] All 15 "MUST cover" items present
- [ ] None of 10 "MUST NOT do" items violated
- [ ] All 6 required data points cited

### Voice / language
- [ ] No forbidden phrases from `01-brand-voice.md`
- [ ] Em-dash count ≤3
- [ ] No paragraph longer than 4 sentences
- [ ] Opening hook matches prose anchor exactly
- [ ] Section 7 opening matches prose anchor exactly

### SEO / structure
- [ ] One H1, matches frontmatter
- [ ] H1 length ≤65 chars
- [ ] Meta description 150-160 chars
- [ ] All H2s match required outline
- [ ] All 17 keyword variants appear in natural prose
- [ ] Tonnage reference chart renders correctly

### Internal linking
- [ ] All 17 outbound internal links with exact anchor text
- [ ] All 3 external links with exact anchor text
- [ ] No phantom URLs

### Schema / JSON-LD
- [ ] Article JSON-LD validates
- [ ] BreadcrumbList JSON-LD validates
- [ ] FAQPage JSON-LD with all 10 FAQs
- [ ] HowTo JSON-LD validates

### SVGs
- [ ] Hero SVG accessible
- [ ] 5 inline SVGs in correct sections
- [ ] All have viewBox
- [ ] WCAG AA contrast

### Mobile / accessibility
- [ ] No horizontal scroll at 375px
- [ ] Tonnage chart responsive
- [ ] Heading hierarchy sequential
- [ ] Axe-core check passes

### Lint / build
- [ ] `pnpm run lint` passes
- [ ] `pnpm run typecheck` passes
- [ ] `pnpm run build` succeeds
- [ ] Page loads at `http://localhost:3007/manual-d/return-air-sizing/`

### Final reading flow
- [ ] Read top to bottom
- [ ] Quick reference chart usable in isolation (cohort 1 conversion point)
- [ ] Diagnostic procedure clear and actionable
- [ ] No sentence sounds AI-generic

If any checkbox fails, do not declare complete.
