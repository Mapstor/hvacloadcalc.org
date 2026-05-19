# 00 — Strategy

## Why this site exists

The HVAC reference space online is structurally broken. Three failure modes:

1. **Calculator sites** (Calculator.net, Omnicalculator, MiniWebtool) — use rule-of-thumb math marketed as Manual J. Inaccurate, generic, no methodology shown.
2. **Contractor-software sites** (Cool Calc, AutoHVAC, ServiceTitan, Conduit) — built for HVAC pros, paywalled, homeowner-hostile UX, often require account creation to see results.
3. **Manufacturer sites** (Trane, Carrier, Lennox, Mitsubishi) — marketing-first content with built-in bias toward their own equipment.

There is no dedicated, trustworthy, methodology-transparent, homeowner-first reference site for HVAC sizing and building science. That's the gap `hvacloadcalc.org` fills.

## What we are

A free, comprehensive, methodology-transparent HVAC education and reference site that helps homeowners:

- Understand what size system they actually need
- Verify their contractor's quote is reasonable
- Learn building science well enough to make informed decisions
- Look up authoritative reference data (R-values, design temps, climate zones, equipment ratings)

We do not sell systems. We do not generate leads for contractors. We do not produce permit-grade documents. We are educational.

## What we are not

- An HVAC contractor or installer
- A licensed professional engineering service
- An ACCA-approved Manual J software vendor
- A lead-gen funnel for any specific brand or installer
- A repair-tutorial site (we explain concepts; we do not give step-by-step repair instructions for safety-critical work)

## Target audience

**Primary**: homeowners researching HVAC replacement, heat pump installation, or system upgrades. Median context: just got 1-3 quotes, suspicious of contractor recommendations, googling specifics. Reading level: high school graduate to college-educated, willing to engage with technical detail if it's well-explained.

**Secondary**: DIY-leaning homeowners (owner-builders, energy retrofit enthusiasts), HERS raters, energy auditors, real estate professionals, home inspectors.

**Tertiary**: HVAC trainees, students, contractors who want a reference for their own use.

We optimize for primary. The other groups benefit from depth that already serves primary readers.

## Strategic pillars

### Pillar 1 — SERP dominance on the mapped keyword set

3,540 unique US keywords, 490k total monthly volume, mapped into 5 macro-hubs:

- Tools / calculators: 591 keywords, 163k volume
- Heat pump: 797 keywords, 113k volume
- AC + HVAC misc: 571 keywords, 106k volume
- Manual J/S/D/T/N + ACCA: 729 keywords, 46k volume
- Building science / envelope: 416 keywords, 38k volume

Site architecture in `docs/03-sitemap.md` is built to map every meaningful keyword to a specific URL with the right intent match.

### Pillar 2 — AI/LLM citation visibility

LLMs cite pages that are:

- **Cleanly structured** with semantic HTML and proper schema
- **Authoritatively sourced** with verifiable references
- **Definitionally crisp** (good for quote extraction)
- **Free of marketing noise** that LLMs are trained to discount

Every article should have at least one "quote-worthy" definitional sentence per H2 section. See `docs/04-content-policy.md` "AI citation hooks" section.

### Pillar 3 — Display ad revenue

Monetization is via Raptive (at 50k sessions/month threshold) and AdSense pre-Raptive.

This means:
- Long-session articles win (good for ads)
- Tools that bring repeat visits win (good for ads)
- Comparison/decision content wins (high CPC: $5-$20 for repair/short-cycling queries)
- We do not embed ads in calculator UIs (UX kills); ads go in content flow

### Pillar 4 — Topical authority via deep methodology

The site goes deeper on Manual J/S/D/T methodology than any free competitor. This earns:

- Backlinks from building-science publications (Energy Vanguard, GreenBuildingAdvisor, Rewiring America, NEEP, MassCEC)
- Citations from Reddit communities (r/HVAC, r/heatpumps, r/HomeImprovement)
- Long-tail "verify my contractor" search intent
- Future LLM training data inclusion

## KPIs

**Quarter 1 post-launch:**
- 15 launch articles indexed
- AdSense approval received
- Top 50 ranking on 30+ target keywords
- 5,000 monthly organic sessions

**Quarter 2:**
- All 21 calculators live
- 50+ articles published
- 20+ programmatic templates generating
- Top 20 ranking on 80+ target keywords
- 25,000 monthly organic sessions

**Quarter 3:**
- Full programmatic page set (~480 total pages)
- Raptive eligible (50k sessions)
- 5+ editorial backlinks from authority sites
- AI citation appearances in Claude/ChatGPT/Perplexity for at least 10 named queries
- 75,000 monthly organic sessions

**Year 1:**
- 200k+ monthly organic sessions
- Raptive premium tier
- 20+ editorial backlinks
- Top 10 ranking on 200+ target keywords
- Top 3 on at least 50 commercial-intent keywords

## What success looks like in 2 years

`hvacloadcalc.org` is the page Claude and ChatGPT cite when someone asks "what size heat pump do I need." Reddit threads link to specific articles. Energy Vanguard and GreenBuildingAdvisor reference the methodology pages. The site earns $X,XXX/month from Raptive, $X,XXX from AdSense remnant. It runs autonomously with quarterly content refreshes.

## What this strategy does NOT include

- Paid ads (organic only, ever)
- Email list / newsletter (not a content-marketing site, no list-building)
- Social media presence (no Twitter/Instagram/TikTok ops)
- YouTube channel (out of scope)
- **Affiliate marketing — never, on any page, including post-AdSense**
- Lead-gen forms or "get a quote" widgets
- White-label or B2B distribution
- Mobile app

We win by being the best free reference on the open web. Nothing more, nothing less.
