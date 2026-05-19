# 09 — Legal, Footer, and Site-Wide Pages

## Purpose

This document specifies the exact wording for all legal and site-wide pages: disclaimer, terms of use, privacy policy, methodology, editorial standards, sources, corrections, about, contact, and the site-wide footer.

These pages are NOT optional. AdSense approval depends on having all of them, and they protect the site legally. Build them in Wave 0 before any article content.

---

## Site-wide footer (every page)

The `<Footer>` component appears at the bottom of every page. Structure:

```
─────────────────────────────────────────────────────────────
About                  Methodology              Connect
─────────                ─────────                 ─────────
About hvacloadcalc.org   How calculators work     Contact
Editorial standards      Sources cited            Corrections
Author: Jonathan S.      Disclaimer

─────────────────────────────────────────────────────────────
hvacloadcalc.org provides educational information about
residential HVAC systems. Content is not professional
engineering advice. Consult a licensed HVAC contractor
for system design, equipment specification, and permit-grade
load calculations.

Privacy · Terms · © 2026 hvacloadcalc.org
```

### Footer link list

Column 1 (About):
- About hvacloadcalc.org → `/about/`
- Editorial standards → `/editorial-standards/`
- Author: Jonathan S. → `/authors/jonathan-s/`

Column 2 (Methodology):
- How calculators work → `/methodology/`
- Sources cited → `/sources/`
- Disclaimer → `/disclaimer/`

Column 3 (Connect):
- Contact → `/contact/`
- Corrections → `/corrections/`

Bottom row:
- Privacy → `/privacy/`
- Terms → `/terms/`
- Copyright notice

### Footer disclaimer text (exact wording)

> hvacloadcalc.org provides educational information about residential HVAC systems. Content is not professional engineering advice. Consult a licensed HVAC contractor for system design, equipment specification, and permit-grade load calculations.

This wording is fixed. Do not edit per page. Do not paraphrase. The exact text appears in every footer.

---

## `/disclaimer/` page

```markdown
---
title: "Disclaimer"
url: /disclaimer/
page_type: legal
h1: "Disclaimer"
meta_description: "Educational HVAC information from hvacloadcalc.org. Not professional engineering advice. Calculators provide planning-grade estimates only."
last_reviewed: 2026-05-18
---

# Disclaimer

## Educational content only

hvacloadcalc.org provides educational information about residential HVAC systems, including heat pump sizing, load calculation methodology, building science fundamentals, and equipment selection guidance. The site exists to help homeowners understand HVAC concepts well enough to make informed decisions.

Nothing on this site is professional engineering advice. Nothing on this site is a substitute for consultation with a licensed HVAC contractor, professional engineer, or building scientist.

## Planning-grade estimates

The calculators on hvacloadcalc.org provide planning-grade estimates based on industry-standard methodology, including elements derived from ACCA Manual J 8th Edition, ASHRAE design conditions, and published equipment performance data. These estimates are useful for:

- Understanding the magnitude of your home's heating and cooling needs
- Sanity-checking contractor recommendations
- Comparing how different variables (insulation, climate, square footage) affect load
- General education about HVAC sizing concepts

Calculator outputs are NOT:

- ACCA-approved Manual J calculations
- Permit-ready documents
- Engineering specifications
- Equipment selection commitments
- Warranties or guarantees of any kind

A full Manual J performed by a licensed contractor includes site-specific factors that no online calculator can fully capture: actual envelope conditions, duct system characteristics, infiltration measurements from a blower door test, internal loads from specific appliances and occupancy patterns, and site-specific orientation and shading. Where a permit, rebate, or warranty depends on a Manual J calculation, that calculation must be performed by a qualified professional using approved software.

## No professional credentials claimed

The site is not operated by a licensed HVAC contractor, professional engineer, ACCA-certified specialist, HERS rater, or any other credentialed professional. The author writes as a researcher and homeowner translating authoritative standards (ACCA, ASHRAE, NEEP, DOE) into accessible educational content.

## No personalized advice

hvacloadcalc.org does not provide personalized engineering advice, contractor referrals, equipment recommendations, or installation guidance for specific homes. Information on the site is general and educational; your situation requires consultation with qualified local professionals.

## Safety-critical work

Information on this site about refrigerant systems, electrical work, gas connections, and combustion appliances is for general education only. Do not perform safety-critical HVAC work based on information from this site. Refrigerant handling requires EPA certification. Electrical work on HVAC equipment requires a licensed electrician. Gas line work requires a licensed gas professional. Combustion appliance commissioning requires manufacturer-specific training.

## Information accuracy

The site makes a good-faith effort to cite authoritative sources for every claim and to update content when standards change. Despite this effort:

- Information may be outdated relative to the latest standards
- Equipment performance data may not reflect the latest manufacturer specifications
- Regional code requirements vary and are not comprehensively covered
- Errors may exist; corrections are documented at `/corrections/`

Users are responsible for verifying critical information against current standards and local code requirements.

## No warranty

Information on hvacloadcalc.org is provided "as is" without warranty of any kind, express or implied. The site disclaims all warranties including merchantability, fitness for a particular purpose, and non-infringement. Use of any information from this site is at the user's own risk.

## Limitation of liability

In no event shall hvacloadcalc.org, its author, or its operators be liable for any direct, indirect, incidental, consequential, or special damages arising out of or in connection with the use of information on this site, including but not limited to damages for equipment sizing errors, installation outcomes, energy costs, comfort issues, or any other consequence of relying on educational content from this site.

## Third-party links

The site links to third-party resources (DOE, ASHRAE, NEEP, manufacturer documentation, etc.) for educational purposes. hvacloadcalc.org is not responsible for the content, accuracy, or availability of third-party sites.

## Updates to this disclaimer

This disclaimer may be updated to reflect changes in site content, applicable law, or industry practice. The "Last reviewed" date below indicates the most recent revision.

---

**Last reviewed**: May 18, 2026
```

---

## `/methodology/` page

```markdown
---
title: "Methodology: How Our Calculators Work"
url: /methodology/
page_type: methodology
h1: "Methodology"
meta_description: "How hvacloadcalc.org calculators compute results. Every formula, every source, every assumption documented for transparency."
last_reviewed: 2026-05-18
---

# Methodology

This page documents how every calculator on hvacloadcalc.org computes its results. Transparency about methodology is non-negotiable for an educational HVAC site — readers should be able to verify the math, identify where assumptions are made, and understand the limits of what a free online tool can compute.

If you find a methodology issue, please file it via `/corrections/` and it will be reviewed.

## General approach

Calculators on the site follow these principles:

1. **Methodology is industry-standard** — derived from ACCA Manual J 8th Edition (load calculation), Manual S (equipment selection), Manual D (duct design), ASHRAE Handbook of Fundamentals (design conditions, psychrometrics), and AHRI 210/240 (equipment rating standards).

2. **Inputs are reasonable defaults** — calculators open with sensible default values (e.g., 1,500 sq ft, climate zone 4, average insulation) so users can see a worked example immediately. All defaults are listed on each calculator's methodology section.

3. **Formulas are shown, not hidden** — the methodology section on every calculator page details the formula used.

4. **Sources are cited** — every numeric constant, lookup table, or methodology choice cites the standard it comes from.

5. **Limits are stated** — every calculator's methodology section explicitly notes what the calculator does NOT account for (e.g., "Does not include duct losses to unconditioned spaces" or "Assumes standard 8-foot ceilings").

## Per-calculator methodology

Each calculator has its own methodology section on its page. Links:

- [BTU Calculator](/tools/btu-calculator/) — room sizing methodology
- [Heat Pump Size Calculator](/tools/heat-pump-size-calculator/) — heat pump-specific load calc
- [Furnace Size Calculator](/tools/furnace-size-calculator/) — furnace BTU sizing
- [Mini Split Calculator](/tools/mini-split-calculator/) — ductless sizing
- [Manual J Calculator](/tools/manual-j-calculator/) — full Manual J-style load calc
- [Balance Point Calculator](/tools/balance-point-calculator/) — heat pump balance point
- [Duct Size Calculator](/tools/duct-size-calculator/) — Manual D-style duct sizing
- [Fuel-Use Load Calculator](/tools/fuel-use-load-calculator/) — back-calculate load from past fuel use
- [Heat Loss Calculator](/tools/heat-loss-calculator/) — home-level heat loss estimation
- (and so on — link to all 21 calculators)

## Data sources

Every calculator references one or more of these underlying data sources:

- **ASHRAE Handbook of Fundamentals 2021** — outdoor design temperatures, psychrometric properties
- **ASHRAE Standard 169** — IECC climate zone definitions
- **ACCA Manual J 8th Edition** — load calculation methodology, Heat Transfer Multiplier tables
- **NEEP Cold Climate Heat Pump Specification** — heat pump capacity at low temperatures
- **AHRI Directory** — equipment performance ratings (47°F and 17°F)
- **DOE Building America program data** — typical envelope characteristics by vintage and climate
- **EIA monthly electricity rates** — operating cost calculations
- **NOAA degree day data** — fuel-use load calculator inputs

Where a calculator uses internal lookup tables (e.g., R-value defaults by climate zone), those tables are derived from the above sources and published in JSON form at `/data/` for transparency.

## Limits of online calculators

A free, browser-based calculator cannot match a full Manual J performed by a credentialed professional. Specifically:

- **No site visit** — calculators cannot see your actual home, measure walls, or inspect insulation
- **No blower door data** — actual infiltration is measured, not estimated
- **No duct system characterization** — calculators don't know if your ducts leak or run through unconditioned spaces
- **No appliance audit** — internal heat gains depend on specific equipment and occupancy patterns
- **No code interpretation** — local code requirements vary and aren't comprehensively checked

For these reasons, calculator results are planning-grade. They're useful for understanding magnitudes and for sanity-checking professional recommendations. They are not a substitute for professional load calculations where permits, rebates, or warranties depend on the result.

## Corrections and updates

When ACCA, ASHRAE, NEEP, AHRI, or other authoritative sources update their standards, the calculators are reviewed and updated to match. Material methodology changes are noted at `/corrections/`.

If you identify a methodology issue, please report it via `/contact/` with category "Correction" or `/corrections/`.

---

**Last reviewed**: May 18, 2026
```

---

## `/editorial-standards/` page

```markdown
---
title: "Editorial Standards"
url: /editorial-standards/
page_type: editorial
h1: "Editorial Standards"
meta_description: "How content is created and reviewed at hvacloadcalc.org. Sourcing standards, review process, and update cadence."
last_reviewed: 2026-05-18
---

# Editorial Standards

## Mission

hvacloadcalc.org exists to help homeowners understand residential HVAC well enough to make informed decisions about system sizing, equipment selection, and contractor recommendations. Content is educational, methodology-transparent, and free of commercial bias.

## Who writes the content

All content is written by Jonathan S. ([author page](/authors/jonathan-s/)). Jonathan is a homeowner-researcher, not a credentialed HVAC professional. The site does not claim professional engineering authority — it claims that rigorous research into ACCA, ASHRAE, NEEP, and DOE publications produces content that helps non-specialists make better decisions.

When subject-matter expertise beyond the author's reading is required, the relevant source is cited directly. The site relies on authoritative standards for the substance of every claim.

## Sourcing standards

Every claim that could be disputed is cited to a source. Sources are tiered:

- **Tier 1**: Industry standards (ACCA, ASHRAE, AHRI, IECC), government agencies (DOE, EIA, ENERGY STAR, NOAA), and authoritative databases (NEEP, AHRI Directory). Preferred for all factual claims.
- **Tier 2**: Peer-reviewed publications, national laboratory reports (LBNL, ORNL, NREL), state energy office publications.
- **Tier 3**: Established building-science publications (GreenBuildingAdvisor, Energy Vanguard, Building Science Corporation) for context where Tier 1/2 sources don't directly address a topic.

The site does not cite competitor calculator outputs, HVAC contractor marketing blog posts, social media, or AI-generated content as sources of fact.

## Review process

Every article goes through a multi-stage review:

1. **Brief**: Article topic, target keywords, required content, sources, and structure are specified in a detailed brief before writing begins.
2. **Drafting**: Article is written against the brief, with all sources cited inline.
3. **Editorial review**: Brand voice, content policy, factual claims, and source citations are verified.
4. **Mobile/accessibility review**: Page is checked at 375px viewport, with screen reader, and against WCAG AA standards.
5. **Schema validation**: All JSON-LD structured data is validated at schema.org validator and Google Rich Results Test.
6. **Publication**: Article is published with a "Last reviewed" date in the byline.

## Update cadence

- Articles are reviewed at least annually, with the "Last reviewed" date updated regardless of whether content changed
- When industry standards change (ACCA updates Manual J, NEEP updates CCASHP spec, etc.), affected articles are reviewed and updated within 60 days
- When errors are identified, articles are corrected immediately and the correction is logged at `/corrections/`

## Independence and bias

hvacloadcalc.org is independent of:

- HVAC equipment manufacturers
- HVAC contractors and installers
- HVAC software vendors
- Trade associations
- Real estate companies
- Utility companies

The site does not accept paid placement, sponsored content, contractor referral fees, or affiliate commissions. The site is funded entirely by display advertising managed by Raptive / AdSense. Display ad content does not influence editorial decisions.

The site does not recommend specific brands or models. Where equipment categories are discussed (e.g., "cold-climate heat pumps with vapor-injection compressors"), general guidance is provided; specific model recommendations are out of scope.

## Corrections policy

When an error is identified — whether in factual content, methodology, or sourcing — the policy is:

1. **Fix immediately** in the article
2. **Update "Last reviewed" date** in the article frontmatter
3. **Log the correction** at `/corrections/` with date, article URL, and summary of the change
4. **Attribute** when the correction came from a reader, building scientist, or industry professional

The site treats accuracy as a higher priority than ego. Corrections are public and prompt.

## Accessibility

Content is designed to be accessible across reading levels and devices:

- Reading level target: high school graduate (Flesch reading ease ~50-65)
- Technical concepts are introduced before being used
- Headings provide a clear outline
- Tables include responsive scrolling
- Images include descriptive alt text
- Color contrast meets WCAG AA
- Site is functional with screen readers

## Reader feedback

Reader questions, corrections, and feedback are welcome via `/contact/`. The site is small and responses are not guaranteed, but substantive feedback is read and considered.

---

**Last reviewed**: May 18, 2026
```

---

## `/sources/` page

```markdown
---
title: "Sources and References"
url: /sources/
page_type: bibliography
h1: "Sources and References"
meta_description: "Authoritative HVAC standards and references cited across hvacloadcalc.org. ACCA, ASHRAE, NEEP, DOE, AHRI, and more."
last_reviewed: 2026-05-18
---

# Sources and References

This is the master bibliography of authoritative sources cited across hvacloadcalc.org. Individual articles cite specific sources inline; this page provides the canonical reference list.

## Industry standards

### ACCA — Air Conditioning Contractors of America
- [Manual J 8th Edition — Residential Load Calculation](https://www.acca.org/standards/technical-manuals/manual-j) (ANSI/ACCA 2 Manual J — 2016)
- [Manual S — Residential Equipment Selection](https://www.acca.org/standards/technical-manuals/manual-s) (ANSI/ACCA 3 Manual S — 2014)
- [Manual D — Residential Duct Systems](https://www.acca.org/standards/technical-manuals/manual-d) (ANSI/ACCA 1 Manual D — 2016)
- [Manual T — Air Distribution Basics](https://www.acca.org/standards/technical-manuals/manual-t)
- [Manual N — Commercial Load Calculation](https://www.acca.org/standards/technical-manuals/manual-n)

### ASHRAE — American Society of Heating, Refrigerating and Air-Conditioning Engineers
- [ASHRAE Handbook of Fundamentals 2021](https://www.ashrae.org/technical-resources/ashrae-handbook)
- [ANSI/ASHRAE Standard 169-2021 — Climatic Data for Building Design Standards](https://www.ashrae.org/technical-resources/standards-and-guidelines)
- [ASHRAE Standard 62.2 — Ventilation and Acceptable Indoor Air Quality in Residential Buildings](https://www.ashrae.org/technical-resources/standards-and-guidelines)
- [ASHRAE Standard 90.1 / 90.2 — Energy Standard](https://www.ashrae.org/technical-resources/standards-and-guidelines)

### AHRI — Air-Conditioning, Heating and Refrigeration Institute
- [ANSI/AHRI Standard 210/240-2023 — Performance Rating of Unitary Air-Conditioning and Air-Source Heat Pump Equipment](https://www.ahrinet.org/search-standards/ahri-210240-2023-performance-rating-unitary-air-conditioning-air-source-heat-pump)
- [AHRI Directory of Certified Product Performance](https://www.ahridirectory.org/)

### IECC — International Energy Conservation Code
- [2021 IECC](https://codes.iccsafe.org/content/IECC2021P2)

## Government agencies

### US DOE — Department of Energy
- [Energy Saver: Heat Pump Systems](https://www.energy.gov/energysaver/heat-pump-systems)
- [Residential Cold Climate Heat Pump Challenge](https://www.energy.gov/eere/buildings/residential-cold-climate-heat-pump-challenge)
- [Building America Solution Center](https://basc.pnnl.gov/)

### EIA — Energy Information Administration
- [Electricity Monthly Update](https://www.eia.gov/electricity/monthly/)
- [Residential Energy Consumption Survey (RECS)](https://www.eia.gov/consumption/residential/)

### ENERGY STAR (US EPA)
- [ENERGY STAR Heat Pump Specification Version 6.0](https://www.energystar.gov/products/spec/central_air_conditioner_and_heat_pump_specification_version_6_0_pd)
- [ENERGY STAR Most Efficient](https://www.energystar.gov/products/most_efficient)

### NOAA / NWS
- [Climate Data Online (CDO)](https://www.ncei.noaa.gov/cdo-web/)
- [Heating and Cooling Degree Day data](https://www.cpc.ncep.noaa.gov/products/analysis_monitoring/cdus/degree_days/)

## Specialized programs and databases

### NEEP — Northeast Energy Efficiency Partnerships
- [Cold Climate Air Source Heat Pump Specification](https://neep.org/heating-electrification/ccashp-specification-product-list)
- [Cold Climate Heat Pump Product List](https://ashp.neep.org/)

### National Laboratories
- [Lawrence Berkeley National Laboratory (LBNL) Building Technologies](https://buildings.lbl.gov/)
- [Oak Ridge National Laboratory (ORNL) Buildings](https://www.ornl.gov/division/btric)
- [National Renewable Energy Laboratory (NREL) Buildings Research](https://www.nrel.gov/buildings/)

### State energy programs
- [Massachusetts Clean Energy Center (MassCEC)](https://www.masscec.com/)
- [NYSERDA — New York State Energy Research and Development](https://www.nyserda.ny.gov/)
- [Xcel Energy Quality Installation](https://co.my.xcelenergy.com/s/) (Colorado)

## Building science publications

- [Building Science Corporation](https://www.buildingscience.com/)
- [Energy Vanguard](https://www.energyvanguard.com/blog)
- [Green Building Advisor](https://www.greenbuildingadvisor.com/)
- [ACEEE — American Council for an Energy-Efficient Economy](https://www.aceee.org/)

## Trade publications

- [ACHR News (The Air Conditioning, Heating & Refrigeration News)](https://www.achrnews.com/)
- [Journal of Light Construction (JLC)](https://www.jlconline.com/)
- [Contracting Business](https://www.contractingbusiness.com/)

## Note on access

Some sources (particularly ACCA and ASHRAE standards) are paywalled. The site cites them by title, edition, and section so that professionals with access can verify, and homeowners can request copies through libraries or trade associations if needed.

---

**Last reviewed**: May 18, 2026
```

---

## `/corrections/` page

```markdown
---
title: "Corrections"
url: /corrections/
page_type: corrections
h1: "Corrections"
meta_description: "Public log of corrections made to content on hvacloadcalc.org. Errors get fixed promptly with attribution where applicable."
last_reviewed: 2026-05-18
---

# Corrections

When an error is identified on hvacloadcalc.org, it gets fixed promptly and the correction is logged here. This page exists to make the site's accuracy track record auditable.

## Correction policy

- **Errors get fixed immediately**, not on a publication schedule
- **The article's "Last reviewed" date is updated** when content is corrected
- **A summary is logged here** with the date, article URL, and nature of the correction
- **Reader/expert contributions get attribution** unless the contributor requests anonymity
- **Methodology errors are flagged prominently** in the relevant article for at least 30 days after correction

## How to report an error

Use `/contact/` with subject category "Correction". Include:

- The article URL
- The specific claim or calculation in question
- The correct information and (where possible) the authoritative source

## Correction log

*No corrections logged yet. The first correction will appear here when made.*

---

**Last reviewed**: May 18, 2026
```

---

## `/privacy/` page

```markdown
---
title: "Privacy Policy"
url: /privacy/
page_type: legal
h1: "Privacy Policy"
meta_description: "Privacy policy for hvacloadcalc.org. What data we collect, how we use it, and your choices."
last_reviewed: 2026-05-18
---

# Privacy Policy

This policy explains what information hvacloadcalc.org collects, how it's used, and the choices available to visitors.

## Summary

- We do not require accounts. There is no signup, no login, no user database.
- We use Google Analytics (or Vercel Analytics) for anonymous traffic statistics.
- We serve display advertising through Google AdSense (and/or Raptive after eligibility). These ad systems set cookies and may use device identifiers.
- We do not sell or share personal information with third parties beyond what's required for ad serving and analytics.
- The contact form collects only the information you choose to provide.

## Information we collect

### Automatically collected
When you visit the site, the following is collected automatically by standard web infrastructure:

- IP address (used for analytics, ad targeting, and security; truncated where possible)
- Browser type, version, and language
- Operating system
- Referring URL
- Pages viewed, time spent, and basic interaction events
- Approximate geographic location (country/state from IP)

This data is aggregated for analytics and never tied to a personal identity.

### Information you provide
The contact form collects:
- Your name (as you provide it)
- Your email address (as you provide it)
- Your message content
- Subject category (Correction / Question / Press / Other)

This information is used only to respond to your message and is not retained beyond what's needed for that purpose.

### Cookies
- **First-party cookies**: minimal session cookies if needed for site function
- **Third-party cookies**: set by Google AdSense (and Raptive when enabled), Google Analytics, and similar ad/analytics services
- You can manage cookies through your browser settings

## How we use information

- To understand site traffic patterns and improve content
- To serve relevant advertising (managed by Google AdSense / Raptive)
- To respond to contact form messages
- To detect and prevent abuse (excessive form submissions, scraping, etc.)

## Advertising

This site is supported by display advertising. Google AdSense (and Raptive when eligible) may use cookies and similar technology to:
- Show ads on this site
- Personalize ad content based on prior browsing
- Measure ad performance

You can manage personalized ads through:
- [Google's Ads Settings](https://adssettings.google.com/)
- [Network Advertising Initiative opt-out](https://optout.networkadvertising.org/)
- [Digital Advertising Alliance opt-out](https://optout.aboutads.info/)

## Third-party services used

- **Google AdSense** ([privacy policy](https://policies.google.com/privacy))
- **Google Analytics** (or Vercel Analytics, depending on configuration)
- **Raptive** (when eligible) ([privacy policy](https://help.raptive.com/hc/en-us/articles/360037451031))
- **Vercel** (hosting provider)

## Data retention

- Analytics data: retained per analytics provider's policy (typically 14-26 months)
- Contact form messages: retained only as long as needed to address the inquiry, generally less than 90 days
- Server logs: retained for security and debugging, typically less than 30 days

## Your rights

Depending on your jurisdiction (GDPR for EU users, CCPA for California residents, etc.), you may have rights including:

- Access to information held about you
- Correction of inaccurate information
- Deletion of your information
- Opting out of certain processing

To exercise any of these rights, contact the site through `/contact/` with subject "Other".

## Children

This site is not directed at children under 13. We do not knowingly collect information from children. If you believe a child has provided information through the site, please contact us so we can remove it.

## Changes to this policy

This policy may be updated. The "Last reviewed" date indicates the current version. Material changes will be noted prominently on the site for at least 30 days.

## Contact

Questions about privacy: use `/contact/` with subject "Other".

---

**Last reviewed**: May 18, 2026
```

---

## `/terms/` page

```markdown
---
title: "Terms of Use"
url: /terms/
page_type: legal
h1: "Terms of Use"
meta_description: "Terms of use for hvacloadcalc.org. Acceptable use, intellectual property, and limitations."
last_reviewed: 2026-05-18
---

# Terms of Use

By using hvacloadcalc.org you agree to these terms.

## Use of the site

The site is provided for educational purposes. You may:

- Read, share, and link to content on the site
- Use calculator outputs for personal, non-commercial decision-making
- Quote brief excerpts of articles with attribution to hvacloadcalc.org

You may not:

- Scrape the site at industrial scale or in a way that disrupts service
- Republish full articles or calculator outputs without permission
- Use the site's content to train commercial AI models without permission
- Use the site for any unlawful purpose
- Attempt to access non-public parts of the system
- Spam the contact form

## Intellectual property

Content on hvacloadcalc.org is © 2026 hvacloadcalc.org unless otherwise noted. Authoritative standards cited from ACCA, ASHRAE, AHRI, IECC, and similar organizations remain the property of those organizations and are referenced under fair use.

Calculator outputs (the numeric result for your specific inputs) are not copyrighted; you may use them freely.

## Disclaimer of warranty

See the [disclaimer](/disclaimer/). Information is provided "as is" without warranty. Calculator outputs are planning-grade estimates, not engineering specifications.

## Limitation of liability

In no event shall hvacloadcalc.org, its author, or its operators be liable for any damages arising from use of the site, including direct, indirect, incidental, consequential, or special damages.

## Indemnification

You agree to indemnify and hold harmless hvacloadcalc.org from any claims arising out of your use of the site or any violation of these terms.

## Governing law

These terms are governed by US law. Disputes shall be resolved in the appropriate jurisdiction.

## Changes to these terms

Terms may be updated. The "Last reviewed" date indicates the current version. Continued use of the site after a change constitutes acceptance.

---

**Last reviewed**: May 18, 2026
```

---

## `/about/` page

```markdown
---
title: "About hvacloadcalc.org"
url: /about/
page_type: about
h1: "About hvacloadcalc.org"
meta_description: "hvacloadcalc.org is an educational HVAC reference site covering load calculation, heat pump sizing, and building science."
last_reviewed: 2026-05-18
---

# About hvacloadcalc.org

hvacloadcalc.org is an educational reference site covering residential HVAC sizing, heat pump systems, building science, and the ACCA Manual J / S / D / T methodology. The goal is to help homeowners level up from "I have no idea what my contractor is talking about" to "I can verify whether this quote makes sense."

## What you'll find here

- **Calculators** that show their math: room BTU sizing, heat pump load, balance point, duct sizing, fuel-use heat loss, and more. Every calculator's methodology is documented openly.
- **Reference articles** on Manual J methodology, heat pump operation, building science fundamentals, and equipment performance metrics.
- **A glossary** of HVAC terms, each entry concise and quotable.
- **Programmatic pages** answering specific sizing questions ("what size heat pump for 1,500 sq ft in Minnesota?").

## What you won't find here

- Equipment sales, contractor referrals, or affiliate links
- "Get a quote" forms or lead-gen funnels
- Recommendations for specific brands
- Sponsored content
- AI-generated marketing fluff

The site is funded entirely by display advertising and is independent of every HVAC manufacturer, contractor, and software vendor.

## Who runs the site

The site is written and maintained by [Jonathan S.](/authors/jonathan-s/), a homeowner-researcher who got tired of contradictory contractor quotes and decided to learn the underlying methodology himself.

Jonathan is not a licensed HVAC contractor, not a professional engineer, not ACCA-certified. The site does not claim professional credentials. Where authoritative expertise is needed, the relevant industry standard (ACCA, ASHRAE, NEEP, DOE) is cited directly.

## How content is created

See [editorial standards](/editorial-standards/) for the full process. Summary:

1. Every article starts from a detailed brief specifying topic, sources, and structure
2. Every numeric claim is sourced to authoritative material
3. Every calculator's methodology is documented openly
4. Articles are reviewed at least annually
5. Errors get fixed promptly and are logged at [/corrections/](/corrections/)

## Funding and independence

hvacloadcalc.org is funded by display advertising (Google AdSense and, when eligible, Raptive). No affiliate marketing. No paid placements. No sponsored content. Ad content does not influence editorial decisions.

## How to reach us

Use the [contact form](/contact/). For corrections, use the "Correction" subject category — substantive corrections get attribution at [/corrections/](/corrections/).

---

**Last reviewed**: May 18, 2026
```

---

## `/contact/` page

This is a form, not MDX. Built as a Next.js page with a server action.

Form fields:
- Name (text, required)
- Email (email, required)
- Subject (select, required): Correction | Question | Press/Outreach | Other
- Message (textarea, required, 30-2000 chars)
- Spam protection: timestamp-based + simple math check, NO third-party reCAPTCHA (avoid privacy issue and weight)

Post-submit behavior:
- Submit goes to a server action
- Server action sends email to a private inbox (configured via env var)
- Display confirmation: "Thanks. Your message has been received. We don't autorespond, but substantive corrections and questions are read."
- No login, no signup, no follow-up flow

Page also includes static text:
- Brief explanation of what each subject category is for
- Note that responses aren't guaranteed
- Note that corrections are logged at `/corrections/` when actioned
