---
# ============================================================
# IDENTITY
# ============================================================
slug: heat-pump-aux-heat
url: /heat-pump/aux-heat/
page_type: article
hub: /heat-pump/
parent_title: Heat Pump
brief_version: 2
brief_last_updated: 2026-05-18

# ============================================================
# SEO METADATA
# ============================================================
title: "Heat Pump Auxiliary Heat: What It Is and When It Should Run"
title_length: 62
meta_description: "Auxiliary heat kicks in when your heat pump can't meet demand alone. Learn what triggers it, what it costs, and when constant aux heat signals a problem."
meta_description_length: 157
h1: "Heat Pump Auxiliary Heat Explained"
canonical: /heat-pump/aux-heat/
og_image: auto-generate
og_title: "Heat Pump Auxiliary Heat: When It Should Run (and When It Shouldn't)"
og_description: "Aux heat costs 2-3x more per BTU than your heat pump. Here's when it's normal and when it signals a problem."
twitter_card: summary_large_image

# ============================================================
# TARGET KEYWORDS (from clustered KW data, sorted by volume)
# ============================================================
target_keyword: "auxiliary heat"
target_volume: 6600
target_cpc: 3.89
target_competition: Low
target_competition_index: 17

secondary_keywords:
  # Tier 1: high-volume direct variants
  - { keyword: "aux heat", volume: 6600, cpc: 3.89, intent: "definition" }
  - { keyword: "heater aux heat", volume: 6600, cpc: 3.89, intent: "definition" }
  - { keyword: "heater auxiliary heat", volume: 6600, cpc: 3.89, intent: "definition" }

  # Tier 2: "meaning" cluster
  - { keyword: "aux heat meaning", volume: 1600, cpc: 2.73, intent: "definition" }
  - { keyword: "auxiliary heat on meaning", volume: 1000, cpc: 2.12, intent: "definition" }

  # Tier 3: heat pump specific
  - { keyword: "heat pump auxiliary heat", volume: 720, cpc: 9.87, intent: "definition+troubleshoot" }
  - { keyword: "heat pump and aux heat", volume: 720, cpc: 9.87, intent: "definition+troubleshoot" }
  - { keyword: "aux heat heat pump", volume: 720, cpc: 9.87, intent: "definition+troubleshoot" }
  - { keyword: "auxiliary heat on a heat pump", volume: 720, cpc: 9.87, intent: "definition+troubleshoot" }
  - { keyword: "heat pump on auxiliary", volume: 720, cpc: 9.87, intent: "troubleshoot" }

  # Tier 4: thermostat-related
  - { keyword: "thermostat with aux heat", volume: 720, cpc: 3.93, intent: "shopping" }
  - { keyword: "thermostat emergency heat setting", volume: 480, cpc: 3.00, intent: "troubleshoot" }
  - { keyword: "thermostat with emergency heat setting", volume: 480, cpc: 3.00, intent: "troubleshoot" }
  - { keyword: "heat on aux", volume: 210, cpc: 0.62, intent: "troubleshoot" }
  - { keyword: "thermostat aux", volume: 170, cpc: 0.40, intent: "definition" }
  - { keyword: "auxiliary on thermostat", volume: 170, cpc: 0.40, intent: "definition" }

  # Tier 5: smart thermostat brand modifiers (link out, don't fully cover)
  - { keyword: "ecobee aux heat settings", volume: 320, cpc: 0.00, intent: "configure" }
  - { keyword: "ecobee auxiliary heat settings", volume: 320, cpc: 0.00, intent: "configure" }

total_targeted_volume: 28980

# ============================================================
# CONTENT SPECS
# ============================================================
word_count_target: 2400
word_count_tolerance_pct: 10
word_count_min: 2160
word_count_max: 2640
reading_time_target_min: 10
reading_time_target_max: 11

# ============================================================
# SCHEMA.ORG
# ============================================================
schema_types: [Article, FAQPage, BreadcrumbList]
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
  - id: eia-residential-electricity-2025
    title: "Average Price of Electricity to Ultimate Customers by End-Use Sector, Table 5.6.A"
    publisher: "US Energy Information Administration"
    year: 2025
    url: "https://www.eia.gov/electricity/monthly/epm_table_grapher.php?t=epmt_5_6_a"
    accessed: 2026-05-18
    tier: 1
    used_for: "US average residential electricity rate"

  - id: energystar-heat-pump-spec
    title: "ENERGY STAR Program Requirements for Central Air Conditioners and Air-Source Heat Pumps, Version 6.0"
    publisher: "US EPA / ENERGY STAR"
    year: 2024
    url: "https://www.energystar.gov/products/spec/central_air_conditioner_and_heat_pump_specification_version_6_0_pd"
    accessed: 2026-05-18
    tier: 1
    used_for: "Heat pump efficiency rating conditions, HSPF/HSPF2 definitions"

  - id: neep-cchp-spec
    title: "Cold Climate Air Source Heat Pump Specification, Version 4.0"
    publisher: "Northeast Energy Efficiency Partnerships (NEEP)"
    year: 2024
    url: "https://neep.org/heating-electrification/ccashp-specification-product-list"
    accessed: 2026-05-18
    tier: 1
    used_for: "Cold-climate heat pump capacity at low temperatures, defrost behavior"

  - id: doe-heat-pump-basics
    title: "Heat Pump Systems"
    publisher: "US Department of Energy, Office of Energy Efficiency and Renewable Energy"
    year: 2024
    url: "https://www.energy.gov/energysaver/heat-pump-systems"
    accessed: 2026-05-18
    tier: 1
    used_for: "Heat pump COP ranges, basic operating principles"

  - id: acca-manual-j-8
    title: "Manual J — Residential Load Calculation, 8th Edition (ANSI/ACCA 2 Manual J - 2016)"
    publisher: "Air Conditioning Contractors of America (ACCA)"
    year: 2016
    url: "https://www.acca.org/standards/technical-manuals/manual-j"
    accessed: 2026-05-18
    tier: 1
    used_for: "Balance point determination methodology, load calculation reference"

  - id: doe-cchp-challenge
    title: "Residential Cold Climate Heat Pump Challenge, Technical Specification"
    publisher: "US Department of Energy, Building Technologies Office"
    year: 2023
    url: "https://www.energy.gov/eere/buildings/residential-cold-climate-heat-pump-challenge"
    accessed: 2026-05-18
    tier: 1
    used_for: "DOE cold-climate heat pump performance targets"

  - id: ahri-210-240
    title: "ANSI/AHRI Standard 210/240-2023, Performance Rating of Unitary Air-Conditioning and Air-Source Heat Pump Equipment"
    publisher: "Air-Conditioning, Heating and Refrigeration Institute (AHRI)"
    year: 2023
    url: "https://www.ahrinet.org/search-standards/ahri-210240-2023-performance-rating-unitary-air-conditioning-air-source-heat-pump"
    accessed: 2026-05-18
    tier: 1
    used_for: "Rating temperature definitions (47°F, 17°F), HSPF2 calculation"

# ============================================================
# INTERNAL LINKS
# ============================================================
internal_links:
  hub_link:
    url: /heat-pump/
    anchor_text: "heat pump fundamentals"
    placement: "intro paragraph 1"

  parent_breadcrumb:
    - { url: /, label: "Home" }
    - { url: /heat-pump/, label: "Heat Pump" }
    - { url: /heat-pump/aux-heat/, label: "Auxiliary Heat" }

  sibling_links:
    - { url: /heat-pump/cold-climate/, anchor: "cold-climate heat pump performance", placement: "H2 section 3 (Balance Point)" }
    - { url: /heat-pump/cold-climate/balance-point/, anchor: "balance point in detail", placement: "H2 section 3, after the chart" }
    - { url: /heat-pump/cold-climate/defrost-cycle/, anchor: "defrost cycle behavior", placement: "H2 section 4 (Normal scenarios)" }
    - { url: /heat-pump/types/dual-fuel/, anchor: "dual-fuel heat pump configurations", placement: "H2 section 7 (Aux vs Em Heat)" }
    - { url: /heat-pump/troubleshooting/short-cycling/, anchor: "heat pump short cycling diagnostics", placement: "H2 section 9 (Upgrade decisions)" }
    - { url: /heat-pump/troubleshooting/running-constantly/, anchor: "why a heat pump runs continuously", placement: "H2 section 5 (Problem scenarios)" }

  calculator_links:
    - { url: /tools/balance-point-calculator/, anchor: "balance point calculator", placement: "H2 section 3, end of section" }
    - { url: /tools/heat-pump-size-calculator/, anchor: "heat pump sizing calculator", placement: "H2 section 9, end of section" }

  related_articles:
    - { url: /heat-pump/performance/seasonal-performance-factor/, anchor: "seasonal performance factor (SPF)", placement: "H2 section 6 (Cost)" }
    - { url: /heat-pump/aux-heat/meaning/, anchor: "what aux heat means on your thermostat", placement: "H2 section 1, intro" }
    - { url: /heat-pump/aux-heat/ecobee/, anchor: "configure aux heat on Ecobee thermostats", placement: "H2 section 8 (Thermostat control)" }
    - { url: /heat-pump/aux-heat/nest/, anchor: "Nest thermostat aux heat settings", placement: "H2 section 8 (Thermostat control)" }
    - { url: /heat-pump/aux-heat/emergency-heat-difference/, anchor: "the full breakdown of aux heat vs emergency heat", placement: "H2 section 7, end of section" }

  external_authoritative_links:
    - { url: "https://www.energy.gov/energysaver/heat-pump-systems", anchor: "DOE heat pump systems overview", context: "first definition of heat pump" }
    - { url: "https://neep.org/heating-electrification/ccashp-specification-product-list", anchor: "NEEP cold-climate heat pump specification", context: "cold-climate balance point discussion" }
    - { url: "https://www.eia.gov/electricity/monthly/epm_table_grapher.php?t=epmt_5_6_a", anchor: "current US residential electricity rates from the EIA", context: "cost calculation worked example" }

# ============================================================
# IMAGES / SVG ASSETS
# ============================================================
hero_svg:
  filename: hero-aux-heat-flow.svg
  viewBox: "0 0 1200 600"
  description: |
    Cross-section diagram showing airflow path: outdoor heat pump unit (left) connected via
    refrigerant lines to indoor air handler (center). Inside the air handler, show the indoor
    coil with refrigerant flow arrows, then below it, two electric resistance heat strips (red).
    Airflow arrow: cool air enters from return, passes through coil, then through strips,
    exits as warm supply air. Label each component. Show two operating modes side by side:
    "Heat pump only" (compressor on, strips off, coil pulls heat from refrigerant) and
    "Heat pump + Aux Heat" (compressor on, strips glowing red, both contributing to warming).
  placement: hero, above H1
  alt_text: "Diagram showing how auxiliary electric resistance heat strips work alongside a heat pump's indoor coil to warm supply air"

inline_svgs:
  - filename: balance-point-chart.svg
    viewBox: "0 0 800 500"
    description: |
      X-axis: outdoor temperature, range -10°F to 60°F. Y-axis: BTU/hour, range 0 to 60,000.
      Blue declining curve: heat pump heating capacity (60k at 47°F dropping to ~25k at -10°F,
      drawn from typical NEEP-listed cold-climate heat pump performance curve). Red ascending
      line: home heat loss (linear, 0 at 65°F balance point of design assumption, rising to ~50k
      at -10°F). The two curves intersect at approximately 20°F. Label that intersection
      "Balance Point — 20°F". Below the intersection, shade the region between the two curves
      light orange and label "Aux Heat Zone — heat pump needs supplement here". Above the
      intersection, label the gap between heat pump capacity and load "Heat pump alone is enough".
    placement: H2 section 3 (The Balance Point), after the first paragraph
    alt_text: "Chart showing heat pump capacity declining and home heat loss rising as outdoor temperature drops; the intersection point is the balance point, below which auxiliary heat fills the gap"

  - filename: thermostat-call-flow.svg
    viewBox: "0 0 1000 600"
    description: |
      Flow diagram, top to bottom. Step 1: "Thermostat detects indoor temp drop below setpoint"
      with thermostat icon. Arrow down. Step 2: "Stage 1: Heat pump compressor runs" with
      heat pump icon. Arrow down with conditional label "If indoor temp continues to fall OR
      droop threshold exceeded". Step 3: "Stage 2: Second compressor stage OR aux heat engages"
      with two boxes showing each option. Arrow down with conditional label "If temp still
      falling". Step 4: "Aux heat strips activate at full power, run alongside compressor".
      Final box at bottom: "System runs both heat sources until setpoint reached".
    placement: H2 section 2 (Mechanical Sequence), end of section
    alt_text: "Flow diagram showing how a thermostat call escalates from stage 1 compressor through stage 2 to auxiliary heat engagement"

  - filename: cost-comparison-bar.svg
    viewBox: "0 0 800 500"
    description: |
      Horizontal bar chart, three bars, all delivering the same heat output (e.g., 30,000 BTU/hour
      over one hour). Top bar (green): "Heat pump alone" with $0.25/hour label, narrow bar.
      Middle bar (orange): "Heat pump + 5 kW aux heat strip" with $1.05/hour label, medium bar.
      Bottom bar (red): "Emergency heat (10 kW strips only)" with $1.60/hour label, longest bar.
      Footnote: "Based on US average residential electricity rate of $0.16/kWh, 2024 EIA data.
      Heat pump COP assumed 3.0, resistance heat COP 1.0."
    placement: H2 section 6 (Cost), after the worked example paragraph
    alt_text: "Bar chart comparing hourly operating cost of heat pump alone, heat pump plus aux heat, and emergency heat only for the same heat output"

  - filename: normal-vs-problem-decision.svg
    viewBox: "0 0 1000 700"
    description: |
      Side-by-side decision matrix, two columns: "NORMAL" (green header) and "PROBLEM" (red header).
      NORMAL column lists four scenarios with brief descriptions and a green checkmark each:
      "Outdoor temp below balance point", "Defrost cycle (5-15 min)", "Setback recovery (raising 3°F+)",
      "Sustained indoor temp drop". PROBLEM column lists four scenarios with red warning icons:
      "Aux heat in mild weather", "Continuous operation without trigger", "Runs after setpoint reached",
      "Runs alone without compressor". Bottom bar: "Aux heat is automatic. Emergency heat is manual."
    placement: H2 section 5 (Problem scenarios), end of section, summarizing 4 and 5
    alt_text: "Decision matrix showing four normal scenarios for auxiliary heat operation versus four problem scenarios that warrant troubleshooting"

# ============================================================
# FAQ
# ============================================================
faq:
  - q: "Why is my aux heat on when it's not that cold outside?"
    a: |
      Aux heat can engage during mild weather for three normal reasons: the system is recovering
      from a thermostat setback, the heat pump is in a defrost cycle, or the indoor temperature
      dropped more than 2-3°F below setpoint. If aux heat runs in mild weather without any of those
      triggers, the most common causes are an undersized heat pump, a malfunctioning outdoor
      temperature sensor, or a thermostat configured to use aux heat more aggressively than necessary.

  - q: "Is it normal for aux heat to run during defrost?"
    a: |
      Yes. During defrost, the system reverses to send hot refrigerant to the outdoor coil to melt
      frost, which means it temporarily cools the indoor air. Aux heat strips activate to keep the
      air coming out of the registers warm during the 5-15 minute defrost cycle. This is designed
      behavior, not a problem.

  - q: "Can I disable auxiliary heat to save money?"
    a: |
      Most thermostats allow you to lock out aux heat above a temperature you choose. This works in
      mild climates where the heat pump alone is enough. In colder climates, fully disabling aux heat
      risks letting the house drop below setpoint on the coldest days and during defrost. A better
      approach is to raise the aux heat lockout temperature to keep it from kicking on during minor
      temperature swings.

  - q: "What's the difference between aux heat and emergency heat on my thermostat?"
    a: |
      Auxiliary heat (AUX) is automatic — the thermostat activates it as a supplement when the heat
      pump can't meet demand. Emergency heat (EM HEAT) is manual — you select it to lock out the heat
      pump entirely and run only the resistance strips, typically when the heat pump itself has failed.

  - q: "How much does it cost to run aux heat?"
    a: |
      A 5 kW aux heat strip running for one hour at the 2024 US average electricity rate of $0.16/kWh
      costs about $0.80 per hour. A 10 kW strip doubles that. By comparison, the heat pump alone
      delivering the same amount of heat typically costs $0.20-$0.30 per hour because it moves heat
      rather than generating it.

  - q: "Why does my aux heat run when the thermostat is satisfied?"
    a: |
      It shouldn't. If aux heat continues to run after the thermostat shows the setpoint is reached,
      the most likely causes are a stuck relay in the air handler, a thermostat wiring error, or a
      control board fault. This is a service call.

  - q: "How long should aux heat normally run?"
    a: |
      In a properly sized system, aux heat should run during defrost cycles (5-15 minutes a few times
      per cold day), during setback recovery (10-30 minutes when the thermostat raises the setpoint),
      and below the system's balance point (continuously when outdoor temperature is below that
      threshold). Hours of continuous aux heat operation in mild weather indicates a problem.

  - q: "Will running aux heat damage my system?"
    a: |
      No, but it indicates the heat pump cannot meet the load on its own. The resistance strips
      themselves are robust. The concern is the cost — aux heat consumes 2-3x more electricity per
      BTU delivered than the heat pump does — and the fact that frequent aux heat operation suggests
      either undersizing, equipment problems, or both.

  - q: "Does aux heat work the same on all heat pumps?"
    a: |
      The principle is the same: electric resistance strips supplement the heat pump when needed.
      Implementation varies. Some systems use a single 5 kW strip; larger systems use 10-20 kW total
      split into multiple stages. Variable-speed inverter heat pumps engage aux heat less often than
      single-stage models because they can ramp output to match demand more precisely.

  - q: "Should I upgrade my heat pump if aux heat runs a lot?"
    a: |
      Possibly, but troubleshoot first. Common fixes that don't require replacement: raise the aux
      heat lockout temperature on the thermostat, check for dirty filters or duct leakage, verify
      outdoor unit is clear of snow and debris, ensure the refrigerant charge is correct. If those
      don't help and aux heat runs frequently in mild weather, the heat pump is likely undersized
      for the house and an upgrade may be justified.

# ============================================================
# AI CITATION HOOKS
# ============================================================
ai_citation_hooks:
  definitional_quotes:
    - "Auxiliary heat is electric resistance backup heat that automatically supplements a heat pump when the heat pump alone cannot meet thermostat demand."
    - "Aux heat differs from emergency heat in that it activates automatically as a supplement, while emergency heat is a manual mode that locks out the heat pump entirely."
    - "A heat pump's balance point is the outdoor temperature below which the heat pump cannot provide 100% of the home's heating load, which is when auxiliary heat begins to engage."
    - "Auxiliary heat strips are mounted in the air handler downstream of the heat pump's indoor coil, so the same airstream passes through both heat sources during aux heat operation."

  specific_values:
    - "A 5 kW auxiliary heat strip costs approximately $0.80 per hour to run at the 2024 US average residential electricity rate of $0.16/kWh."
    - "Auxiliary heat consumes roughly 2-3 times more electricity per BTU delivered than the heat pump it supplements, because resistance heating has a coefficient of performance of 1.0 while heat pumps typically operate at COP 2.5-4.0."
    - "Typical aux heat element ratings are 5 kW, 10 kW, 15 kW, and 20 kW, sized at roughly 100% of the home's design heating load."
    - "Conventional heat pumps reach their balance point around 25-35°F outdoor temperature; cold-climate heat pumps push that down to 5-15°F."
    - "A typical defrost cycle lasts 5-15 minutes and triggers every 30-90 minutes when outdoor conditions favor frost accumulation on the outdoor coil."

  decision_frameworks:
    - "Aux heat operation is normal when: (1) outdoor temperature is below the system balance point, (2) the heat pump is in defrost cycle, (3) the thermostat is recovering from a setback of 3°F or more, or (4) the indoor temperature has fallen 2°F or more below setpoint."
    - "Aux heat operation is a warning sign when: it runs in mild weather above the balance point, runs continuously without temperature drops triggering it, runs after the thermostat shows setpoint is reached, or runs without any heat pump operation alongside it."
    - "Before replacing a heat pump that runs aux heat frequently, check in this order: thermostat lockout temperature setting, air filter, duct leakage, refrigerant charge, outdoor unit clearance from snow and debris."
---

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

Most of this article's traffic comes from homeowners who just looked at their thermostat and saw "AUX HEAT" or "AUXILIARY HEAT" lit up, and they want to know what it means and whether they should be worried. A smaller portion is researching before a heat pump purchase. A few are diagnosing a high electricity bill.

The dominant emotional state of the searcher is mild alarm. The article should validate the concern (yes, this is something worth understanding) without inflating it (no, your house is not about to burn down), then explain clearly. The reader should leave with three things: a working mental model of what aux heat does, the ability to tell normal aux heat operation from a problem, and a decision framework for the most common scenarios.

Cross-referencing the keyword cluster, there are three distinct sub-intents to serve in one article:

1. **Definitional** (`aux heat meaning`, `what is aux heat`, ~3,200 combined volume): readers want a clear plain-English answer in the first 100 words
2. **Troubleshooting** (`aux heat on when not cold`, `aux heat running constantly`, ~1,800 combined volume): readers want diagnostic guidance, not just definitions
3. **Configuration** (`thermostat with aux heat`, brand-specific queries, ~1,200 combined volume): readers want to know how to control aux heat behavior

The article serves all three by structuring intent in this order: definition first (sections 1-3), troubleshooting middle (sections 4-5, 9), configuration late (section 8).

## MUST cover

- [ ] What "auxiliary heat" means functionally — electric resistance backup, not the heat pump's primary mode
- [ ] How aux heat is physically implemented (resistance strips in the air handler downstream of the indoor coil)
- [ ] The mechanical sequence: thermostat call → compressor stage 1 → stage 2 (if applicable) → aux heat engages
- [ ] The concept of the system's balance point and why aux heat depends on it
- [ ] Four specific scenarios in which aux heat normally runs: below balance point, during defrost, during setback recovery, during prolonged temperature drop
- [ ] Four specific scenarios in which aux heat indicates a problem: mild weather, continuous operation, runs after setpoint reached, runs alone without compressor
- [ ] The cost difference between aux heat and normal heat pump operation, with a concrete dollar example
- [ ] The difference between auxiliary heat and emergency heat (this is a separate question, and many readers conflate them)
- [ ] How thermostats configure aux heat behavior (lockout temperature, droop, stages)
- [ ] When aux heat usage justifies further investigation vs replacement
- [ ] Brief mention of how thermostat brands (Ecobee, Nest, Honeywell) expose aux heat settings, with link to brand-specific articles

## MUST NOT do

- [ ] Recommend specific heat pump brands or models
- [ ] Tell the reader to replace their system as a default solution
- [ ] Give wiring or electrical work instructions for aux heat strips
- [ ] Give refrigerant charge verification instructions
- [ ] Claim a specific dollar-per-month cost without showing the math
- [ ] Use the word "essentially" more than once
- [ ] Promise that aux heat will never cost the homeowner money — it will, and the article should be honest about it
- [ ] Confuse auxiliary heat with emergency heat in the body of the article
- [ ] Imply that a heat pump in cold climate "shouldn't need" aux heat — even properly sized cold-climate heat pumps use it during defrost
- [ ] Recommend products, equipment, contractors, or services (display ads only — no affiliate or referral content)
- [ ] Include any "click here to get a quote" CTAs or lead-gen forms

## Required data points

Every claim below MUST appear in the article, sourced exactly to the listed source ID:

| Claim | Source ID | H2 section |
|---|---|---|
| US average residential electricity rate ~$0.16/kWh (2024) | `eia-residential-electricity-2025` | 6 (Cost) |
| Typical aux heat strip wattages: 5, 10, 15, 20 kW | `energystar-heat-pump-spec` | 1 (What it is) |
| Heat pump COP typically 2.5-4.0 | `doe-heat-pump-basics` | 6 (Cost) |
| Resistance heat COP = 1.0 by definition | `doe-heat-pump-basics` | 6 (Cost) |
| NEEP cold-climate heat pumps still use aux during defrost | `neep-cchp-spec` | 4 (Normal scenarios) |
| Manual J methodology determines balance point | `acca-manual-j-8` | 3 (Balance point) |
| Heat pump rating conditions: 47°F and 17°F | `ahri-210-240` | 3 (Balance point) |
| Conventional HP balance point: 25-35°F | `neep-cchp-spec` (range derived) | 3 (Balance point) |
| Cold-climate HP balance point: 5-15°F | `neep-cchp-spec` | 3 (Balance point) |
| DOE cold-climate HP performance targets | `doe-cchp-challenge` | 3 (Balance point), optional |

## Required H2 outline

Nine H2 sections, in this order. Target words per section noted; total target 2,400 words excluding FAQ.

### H2 1 — What Auxiliary Heat Actually Is
**Target: 250 words**

- Open with the panic scenario (see prose anchor below)
- Define aux heat in one sentence (definitional quote candidate)
- Locate it physically: resistance strips mounted in the air handler, downstream of the indoor evaporator coil
- Specify typical wattages (5/10/15/20 kW) with source
- Contrast briefly with how the heat pump itself works (refrigerant cycle moves heat, doesn't generate it)
- One sentence forward-reference to section 7: "Aux heat is automatic. Emergency heat is manual. The difference matters and gets its own section below."
- Reference hero SVG implicitly (the diagram explains itself above the section)

### H2 2 — How Aux Heat Engages: The Mechanical Sequence
**Target: 250 words**

- Step 1: thermostat detects indoor temp below setpoint
- Step 2: compressor stage 1 engages (or stage 1 of variable-speed)
- Step 3: if temperature continues to fall (or droop threshold exceeded), stage 2 / aux heat engages
- Clarify: on most residential systems, aux heat runs ALONGSIDE the compressor, not instead of it (this is a frequent misconception)
- Mention exception: dual-fuel systems behave differently (link to /heat-pump/types/dual-fuel/)
- Reference SVG: thermostat-call-flow diagram
- End with one-line takeaway: "The system always tries the heat pump first. Aux heat is the supplement, not the substitute."

### H2 3 — The Balance Point: Why Aux Heat Exists
**Target: 350 words (the most important section for AI citation)**

- Define balance point in plain language (definitional quote candidate)
- Explain the two competing curves: HP capacity (declining with cold) and home heat loss (rising with cold)
- Where they cross = balance point. Below = aux heat zone. Above = HP alone is enough.
- Reference SVG: balance-point-chart
- Typical balance points: 25-35°F for conventional HPs, 5-15°F for cold-climate HPs (NEEP-listed)
- Explain WHY the cold-climate balance point is lower (inverter compressors, vapor-injection refrigerant circuits, larger heat exchangers)
- Mention that balance point is calculated as part of Manual J/S methodology (link to /manual-j/)
- Reference: heat pump rating conditions (47°F and 17°F per AHRI 210/240)
- End with link to balance point calculator and the balance point detail article

### H2 4 — Four Scenarios When Aux Heat Is Normal
**Target: 300 words**

- Sub-bullet 1: Outdoor temp below balance point — the main reason
  - Explain: this is engineered behavior, not a fault
  - Specific note: in climate zones 5-7, expect aux heat use during cold snaps
- Sub-bullet 2: Defrost cycle
  - 5-15 minute cycles, every 30-90 minutes when conditions favor frost
  - System reverses; aux heat keeps supply air warm
  - Even cold-climate HPs use aux during defrost (cite NEEP spec)
  - Link to defrost cycle detail article
- Sub-bullet 3: Setback recovery
  - When thermostat raises setpoint 3°F+ from a setback, the system needs extra capacity briefly
  - "Smart" recovery features may schedule this differently
- Sub-bullet 4: Sustained indoor temp drop
  - Open door, large temperature drop, etc.
  - System recovers using aux heat to catch up quickly

### H2 5 — Four Scenarios When Aux Heat Is a Problem
**Target: 300 words**

- Sub-bullet 1: Aux heat in mild weather (above balance point)
  - Possible causes: undersized HP, sensor fault, aggressive thermostat config
  - Diagnostic: check thermostat aux heat lockout setting
- Sub-bullet 2: Continuous aux heat operation
  - Suggests severe undersizing or equipment fault
  - Link to /heat-pump/troubleshooting/running-constantly/
- Sub-bullet 3: Aux heat runs after setpoint reached
  - Stuck relay or control fault
  - Service call
- Sub-bullet 4: Aux heat runs alone without compressor
  - Likely "EM HEAT" mode accidentally engaged
  - OR compressor failure (heat pump is dead, only strips work)
  - Cross-reference to section 7
- Reference SVG: normal-vs-problem-decision matrix

### H2 6 — What Aux Heat Costs to Run
**Target: 350 words (the second AI-citation gold mine)**

- The COP comparison: heat pump 2.5-4.0 vs resistance 1.0 (cite DOE)
- Worked example with math shown:
  - 5 kW strip × 1 hour at $0.16/kWh = $0.80/hour
  - Same heat output from HP at COP 3.0 = ~$0.27/hour
  - Difference: ~3x more expensive
- 10 kW example
- 20 kW example (larger homes)
- Reference SVG: cost-comparison-bar
- Cite EIA for electricity rate
- Mention regional variation (CA/HI can be 2-3x national average; cite EIA state breakdown reference)
- Link to /heat-pump/performance/seasonal-performance-factor/ for the SPF concept

### H2 7 — Auxiliary Heat vs Emergency Heat
**Target: 250 words**

- The distinction in one quotable sentence: aux is automatic, em heat is manual
- Aux heat: thermostat decides when to engage, supplements the HP
- Emergency heat: user manually selects, LOCKS OUT the compressor, runs only strips
- When to use emergency heat: heat pump itself has failed (outdoor unit dead, refrigerant leak, frozen solid)
- Why em heat is more expensive: zero compressor contribution, all heat from resistance only
- Link to /heat-pump/aux-heat/emergency-heat-difference/ for full breakdown
- Brief mention of dual-fuel systems with link to /heat-pump/types/dual-fuel/

### H2 8 — How Thermostats Control Aux Heat
**Target: 250 words**

- Lockout temperature setting: thermostat will not engage aux heat above this outdoor temp
- Stage 2 droop / differential: how much temp drop triggers stage 2 / aux
- Brief look at the three major smart thermostat brands:
  - Ecobee: exposes aux heat lockout and runtime, has "Smart Recovery" feature
  - Nest: more limited user controls, learns automatically
  - Honeywell (Resideo): T-series exposes detailed staging controls
- When to raise the lockout temperature (typical: 35-40°F)
- When NOT to disable aux heat entirely (cold climates, defrost)
- Links to /heat-pump/aux-heat/ecobee/ and /heat-pump/aux-heat/nest/

### H2 9 — When Aux Heat Usage Justifies a System Upgrade
**Target: 100 words**

- Diagnostic order before considering replacement:
  1. Thermostat aux heat lockout configuration
  2. Air filter (clogged filter restricts airflow, reduces HP output)
  3. Duct leakage (lost capacity to unconditioned spaces)
  4. Refrigerant charge (under-charged HP can't deliver rated capacity)
  5. Outdoor unit clearance (snow, leaves, debris choking airflow)
- If diagnostics pass and aux heat still runs heavily in mild weather: undersized HP is likely
- Link to heat pump sizing calculator
- Reference to cold-climate retrofit considerations (link to /heat-pump/cold-climate/)

## Technical depth specification

The article must demonstrate technical fluency without being a textbook. This section spells out the specific technical content per section.

### Section 3 (Balance Point) — required technical content

**The balance point formula** (do not show the formula explicitly in the article, but ensure the explanation is consistent with it):

```
Balance point T_bal solves:
   HP_capacity(T_bal) = Home_heat_loss(T_bal)

Where:
   HP_capacity(T) = HP_capacity_at_47F × performance_curve(T)
   Home_heat_loss(T) = UA × (T_indoor - T)
```

The article should describe this in plain language: as outdoor temperature drops, two things happen simultaneously — the heat pump can deliver less heat (because the temperature differential it has to "pump against" grows), and the house needs more heat (because the indoor-outdoor temperature gap grows). Where those two curves cross is the balance point.

**Edge cases to mention briefly**:
- Variable-speed inverter HPs have a "soft" balance point because capacity is modulated; the SVG should show a smooth curve, not a step
- Single-stage HPs have a "harder" balance point because capacity is fixed at maximum
- Cold-climate HPs with vapor injection have a flatter capacity curve, pushing balance point lower
- Below the HP's minimum operating temperature (typically -5 to -22°F depending on model), the HP locks out entirely and ALL heat comes from aux

**Numeric ranges to cite**:
- Conventional split HP balance point: 25-35°F (NEEP, derived from typical performance curves)
- Cold-climate HP (NEEP-listed) balance point: 5-15°F (NEEP CCASHP spec)
- DOE cold-climate challenge target: deliver 100% heating capacity at 5°F, partial capacity to -15°F (cite `doe-cchp-challenge`)

### Section 6 (Cost) — required technical content

**The cost formula** (show the math in the worked example):

```
Cost per hour = Strip_power_kW × hours × electricity_rate_per_kWh
            = 5 kW × 1 hour × $0.16/kWh
            = $0.80/hour
```

**Heat pump equivalent cost** for the same heat output:

```
Heat output = 5 kW × 3412 BTU/kWh × 1 hour = 17,060 BTU

HP power to deliver same:
   HP_power = Heat_output / (COP × 3412 BTU/kWh)
          = 17,060 BTU / (3.0 × 3412)
          = 1.67 kWh
   HP_cost = 1.67 × $0.16 = $0.27/hour
```

**Show the worked example explicitly in the article body**. Do not simply state "$0.80/hour"; show that this comes from 5 kW × 1 hour × $0.16/kWh. The math is the credibility.

**Optional technical depth (include if word count allows)**:
- Note that aux heat strips draw constant power regardless of outdoor temperature; HP power draw varies with outdoor temperature
- Note that some homes have aux heat sized at less than 100% of design load to encourage HP usage; this is a design choice with tradeoffs
- Mention that aux heat circuits typically require a 60A or 100A breaker (just for context; do NOT give wiring instructions)

### Section 8 (Thermostat control) — required technical content

**Thermostat aux heat configuration parameters**:

| Parameter | Typical range | Effect |
|---|---|---|
| Aux heat lockout temperature | 25-45°F | Prevents aux heat above this outdoor temp |
| Stage 2 droop / differential | 1-3°F | Indoor temp drop below setpoint that triggers stage 2 |
| Aux heat differential | 2-4°F | Indoor temp drop that triggers aux specifically |
| Compressor lockout temperature | -5 to 15°F | Below this, HP shuts off entirely (em heat only) |
| Cycle minimum on-time | 5-10 min | Prevents short cycling |

Mention these by name in the article but do not enumerate them all. The Ecobee/Nest/Honeywell brand articles will go deeper.

## Per-keyword paragraph mapping

Every secondary keyword from the cluster must appear in natural prose somewhere in the article. This table maps each keyword to where it appears and roughly what surrounding text uses it.

| Keyword | H2 section | Approximate placement |
|---|---|---|
| auxiliary heat (primary) | 1, 2, 3, 4, 5, 6, 7, 8, 9 | Used throughout |
| aux heat | 1, 4, 5, 8 | "AUX HEAT shows on most thermostats..." |
| heater aux heat | 1 | Natural variant in opening; "...what HVAC techs call heater aux heat..." |
| heater auxiliary heat | 1 | Pair with "heater aux heat" in opening |
| aux heat meaning | 1 | Section 1 H2 alternate phrasing in subheading or first sentence |
| auxiliary heat on meaning | 1 | "When you see 'AUX HEAT ON' on a thermostat, the meaning is..." |
| heat pump auxiliary heat | 1, 3, 6 | "heat pump auxiliary heat differs from a furnace's backup heat in that..." |
| heat pump and aux heat | 2, 6 | "the heat pump and aux heat run simultaneously..." |
| aux heat heat pump | 1, 2 | "aux heat on a heat pump system specifically refers to..." |
| auxiliary heat on a heat pump | 7 | "auxiliary heat on a heat pump engages automatically; emergency heat does not" |
| heat pump on auxiliary | 5 | "If your heat pump is on auxiliary and the weather is mild..." |
| thermostat with aux heat | 8 | "Any thermostat with aux heat capability exposes a lockout temperature setting..." |
| thermostat emergency heat setting | 7 | "Most thermostats with an emergency heat setting place it on the mode selector..." |
| thermostat with emergency heat setting | 7 | Pair with above |
| heat on aux | 5 | "If your heat is on aux but the outdoor temperature is above 50°F..." |
| thermostat aux | 8 | "The thermostat aux configuration is usually found under installer settings..." |
| auxiliary on thermostat | 8 | "When auxiliary on the thermostat is illuminated..." |
| ecobee aux heat settings | 8 | "Ecobee aux heat settings include..." (then link to /heat-pump/aux-heat/ecobee/) |
| ecobee auxiliary heat settings | 8 | Pair with above |

**Rule**: keyword variants should NOT feel jammed in. If a placement reads awkwardly, drop that specific variant — the article should not sacrifice readability for keyword density. Coverage of ~80% of the variants in natural prose is the target.

## Internal linking spec

Every internal link in this article uses the exact anchor text specified below. Do not vary anchor text — variation hurts topical authority signaling.

### Outbound internal links from this article

| URL | Anchor text | H2 section | Context sentence |
|---|---|---|---|
| /heat-pump/ | "heat pump fundamentals" | Intro | "...if you're new to how a heat pump fundamentals work, the brief version is..." |
| /heat-pump/aux-heat/meaning/ | "what aux heat means on your thermostat" | H2 1 | "...for a deeper breakdown of what aux heat means on your thermostat, see..." |
| /heat-pump/types/dual-fuel/ | "dual-fuel heat pump configurations" | H2 2 | "...dual-fuel heat pump configurations behave differently because..." |
| /heat-pump/cold-climate/ | "cold-climate heat pump performance" | H2 3 | "...cold-climate heat pump performance pushes the balance point lower because..." |
| /heat-pump/cold-climate/balance-point/ | "balance point in detail" | H2 3 | "...for the balance point in detail, including how it's calculated..." |
| /tools/balance-point-calculator/ | "balance point calculator" | H2 3 | "...estimate your system's balance point with the balance point calculator..." |
| /manual-j/ | "Manual J load calculation" | H2 3 | "...balance point determination is part of the Manual J load calculation methodology..." |
| /heat-pump/cold-climate/defrost-cycle/ | "defrost cycle behavior" | H2 4 | "...the defrost cycle behavior in detail explains why this is engineered..." |
| /heat-pump/troubleshooting/running-constantly/ | "why a heat pump runs continuously" | H2 5 | "...if you're trying to diagnose why a heat pump runs continuously, the causes overlap with..." |
| /heat-pump/performance/seasonal-performance-factor/ | "seasonal performance factor (SPF)" | H2 6 | "...the seasonal performance factor (SPF) summarizes this efficiency variation across a heating season..." |
| /heat-pump/aux-heat/emergency-heat-difference/ | "the full breakdown of aux heat vs emergency heat" | H2 7 | "...see the full breakdown of aux heat vs emergency heat for more..." |
| /heat-pump/aux-heat/ecobee/ | "configure aux heat on Ecobee thermostats" | H2 8 | "...to configure aux heat on Ecobee thermostats, the relevant settings are..." |
| /heat-pump/aux-heat/nest/ | "Nest thermostat aux heat settings" | H2 8 | "...Nest thermostat aux heat settings are more limited..." |
| /heat-pump/troubleshooting/short-cycling/ | "heat pump short cycling diagnostics" | H2 9 | "...see heat pump short cycling diagnostics if your aux heat issue coincides with short cycling..." |
| /tools/heat-pump-size-calculator/ | "heat pump sizing calculator" | H2 9 | "...check your current system size against your home's load with the heat pump sizing calculator..." |

### Inbound internal links TO this article (other pages link here using these anchors)

When other articles get written, they should link to this article using one of these anchors:

- "auxiliary heat explained"
- "what auxiliary heat does"
- "how aux heat works on a heat pump"
- "the role of auxiliary heat"
- "aux heat behavior"

### External link spec

3 external links required, all to tier-1 sources:

| URL | Anchor text | H2 section |
|---|---|---|
| https://www.energy.gov/energysaver/heat-pump-systems | "DOE heat pump systems overview" | H2 1 (first definition) |
| https://neep.org/heating-electrification/ccashp-specification-product-list | "NEEP cold-climate heat pump specification" | H2 3 (cold-climate discussion) |
| https://www.eia.gov/electricity/monthly/epm_table_grapher.php?t=epmt_5_6_a | "current US residential electricity rates from the EIA" | H2 6 (cost calculation) |

External links must use `rel="noopener"` (no nofollow — these are editorial citations, treat them as authority signals).

## Schema.org JSON-LD shape

The page must emit three JSON-LD blocks in the `<head>`:

### Block 1: Article

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Heat Pump Auxiliary Heat Explained",
  "description": "Auxiliary heat kicks in when your heat pump can't meet demand alone. Learn what triggers it, what it costs, and when constant aux heat signals a problem.",
  "image": "https://hvacloadcalc.org/og-images/heat-pump-aux-heat.png",
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
    "logo": {
      "@type": "ImageObject",
      "url": "https://hvacloadcalc.org/logo.png"
    }
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://hvacloadcalc.org/heat-pump/aux-heat/"
  },
  "articleSection": "Heat Pump",
  "wordCount": 2400,
  "keywords": ["auxiliary heat", "aux heat", "heat pump aux heat", "emergency heat", "balance point"],
  "citation": [
    "https://www.eia.gov/electricity/monthly/epm_table_grapher.php?t=epmt_5_6_a",
    "https://www.energy.gov/energysaver/heat-pump-systems",
    "https://neep.org/heating-electrification/ccashp-specification-product-list",
    "https://www.acca.org/standards/technical-manuals/manual-j",
    "https://www.ahrinet.org/search-standards/ahri-210240-2023-performance-rating-unitary-air-conditioning-air-source-heat-pump"
  ]
}
```

### Block 2: BreadcrumbList

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://hvacloadcalc.org/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Heat Pump",
      "item": "https://hvacloadcalc.org/heat-pump/"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Auxiliary Heat"
    }
  ]
}
```

### Block 3: FAQPage

Emit one entry per FAQ item in frontmatter. Structure:

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Why is my aux heat on when it's not that cold outside?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Aux heat can engage during mild weather for three normal reasons..."
      }
    }
    // ... one entry per FAQ item
  ]
}
```

The `<FAQ>` component must generate this automatically from frontmatter. Do not hand-write the JSON-LD per article.

## Prose anchors (voice calibration)

Two prose samples below. These are the ONLY drafted prose CC should attempt to match exactly. The rest of the article CC writes fresh, calibrated to these.

### Opening hook (use exactly, do not rewrite)

> If your thermostat is showing "AUX HEAT" right now and you're trying to figure out whether it's a problem, here's the short answer: it depends on what's happening outside and what your thermostat is set to do.
>
> Auxiliary heat is the electric resistance backup that lives inside your air handler, downstream of the heat pump's indoor coil. When the heat pump alone can't keep up with what the thermostat is asking for, the resistance strips switch on and help close the gap. Most of the time, this is exactly what the system is supposed to do. Sometimes, it's a sign something else is wrong.
>
> This article walks through both cases — when aux heat is doing its job, and when it's telling you to investigate.

This opening hook does three things deliberately: validates the panic state in sentence 1, defines aux heat physically in sentence 2-3, and previews the article's dual structure in sentence 4. Match this rhythm in the rest of the article.

### Anchor paragraph — H2 section 3 (Balance Point), opening (use exactly)

> The balance point is the outdoor temperature at which your heat pump's heating capacity exactly equals your home's heat loss. Above that temperature, the heat pump alone delivers enough heat to maintain the indoor setpoint. Below it, the heat pump cannot keep up on its own — and aux heat fills the gap. The colder it gets, the more aux heat contributes.
>
> Two curves explain it. As outdoor temperature drops, the heat pump's capacity declines, because it has to "pump" heat across a larger temperature difference. At the same time, the home's heat loss rises, because the indoor-outdoor temperature gap grows. The chart below shows what this looks like for a typical residential system.

This is the hardest section to write because it introduces a counterintuitive idea (the heat pump becomes weaker when you need it most) and a graphical concept (two curves crossing). Match this clarity. Don't pile on metaphors. Don't apologize for the technical content. State, show, move on.

## Drafting notes

**Opening**: use the exact prose anchor above. Don't paraphrase.

**Tone**: calm. Stressed homeowner. No marketing-speak. Respect the reader's time.

**Visualization placement**:
- Hero SVG above the H1
- Balance-point chart in H2 3, after paragraph 1
- Thermostat call flow at the end of H2 2
- Cost comparison bar in H2 6, after the worked-example paragraph
- Decision matrix at the end of H2 5

**Specific phrases worth keeping** (use these forms in the article body, not paraphrased):
- "Aux heat is automatic. Emergency heat is manual."
- "Heat pumps move heat. Resistance strips make heat. Moving is cheaper than making."
- "The system always tries the heat pump first."

**Specific phrases to avoid**:
- "Don't worry" (condescending)
- "Easy fix" (we don't promise this)
- "Simply" (almost always a lie)
- "Essentially" (max 1 use in this article)

**Length pacing**:
- Section 3 (balance point) gets the most words (350)
- Section 6 (cost) gets 350 too
- Sections 4 and 5 are 300 each
- Sections 1, 2, 7, 8 are 250 each
- Section 9 is shortest at 100 (it's a transition/wrap)
- FAQ adds ~600 words on top

Total body target: 2,400 words. With FAQ: ~3,000 on page.

**Sentence rhythm reminder**:
- Average 14-18 words per sentence
- Mix short (5-10) with medium (20-25)
- Vary openings — never three consecutive sentences starting with the same word
- Paragraphs max 4 sentences, sweet spot 2-3

**Mobile preview**:
- All tables in the article must be responsive (use `<DataTable>` component, not raw `<table>`)
- All SVGs must have viewBox and scale to width
- Code blocks must wrap or scroll horizontally, not push page width

## Editorial gate checklist

This is the gate CC must pass before declaring the article complete. CC outputs each checkbox state in the commit message or PR description.

### Content completeness
- [ ] Word count between 2,160 and 2,640 (target 2,400, ±10%)
- [ ] All 9 H2 sections present, in the order specified
- [ ] All 10 FAQ items match frontmatter exactly (text and order)
- [ ] All 11 "MUST cover" items present in the body
- [ ] None of the 11 "MUST NOT do" items violated
- [ ] All 7 required data points cited with correct source ID

### Voice / language
- [ ] No forbidden phrases from `01-brand-voice.md`
- [ ] Em-dash count ≤3 across the whole article
- [ ] Word "essentially" used at most 1 time
- [ ] No paragraph longer than 4 sentences
- [ ] No three consecutive sentences starting with the same word
- [ ] Opening hook matches the prose anchor exactly
- [ ] Balance-point opening paragraph matches the prose anchor exactly

### SEO / structure
- [ ] Exactly one H1, matches frontmatter `h1`
- [ ] H1 length ≤65 characters
- [ ] Meta description 150-160 characters
- [ ] All H2s match the required outline (no extras, no missing)
- [ ] All required keyword variants from the per-keyword mapping appear in natural prose

### Internal linking
- [ ] All 15 outbound internal links present with exact anchor text from spec
- [ ] All 3 external links present with exact anchor text from spec
- [ ] No links to phantom URLs (every linked URL is either a real existing page or scheduled for build)
- [ ] No `nofollow` on editorial citations
- [ ] No duplicate anchor texts pointing to different URLs

### Schema / JSON-LD
- [ ] Article JSON-LD block present and validates at schema.org validator
- [ ] BreadcrumbList JSON-LD block present and validates
- [ ] FAQPage JSON-LD block present, all 10 FAQ items represented
- [ ] All three blocks emit valid JSON (no trailing commas)
- [ ] `dateModified` matches frontmatter `last_reviewed`

### SVGs
- [ ] Hero SVG present and accessible (alt text, role="img", aria-label)
- [ ] 4 inline SVGs present in correct H2 sections
- [ ] All SVGs have viewBox attribute
- [ ] All SVGs scale responsively on mobile
- [ ] Color contrast meets WCAG AA

### Mobile / accessibility
- [ ] No horizontal scroll at 375px viewport
- [ ] All tables use `<DataTable>` component, responsive
- [ ] All links have descriptive text (no "click here", "read more")
- [ ] Heading hierarchy is sequential (no skipped levels)
- [ ] Page passes axe-core automated accessibility check

### Lint / build
- [ ] `pnpm run lint` passes
- [ ] `pnpm run typecheck` passes
- [ ] `pnpm run build` succeeds
- [ ] Page loads at `http://localhost:3007/heat-pump/aux-heat/` without errors

### Final reading flow
- [ ] Read the article top to bottom on localhost:3007
- [ ] Skim H2s only — does the structure make sense in isolation?
- [ ] Are any paragraphs harder to read than they should be?
- [ ] Does any sentence sound generic/AI-flavored? If yes, rewrite.

If any checkbox fails, do not declare the article complete. Fix it.
