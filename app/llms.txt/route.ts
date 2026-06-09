import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

/**
 * llms.txt — emerging standard for LLM / AI-crawler guidance.
 *
 * Acts as an index of the site's most important content with brief context
 * to help language models retrieve and summarize the site accurately. Pairs
 * with the AI-crawler allowlist in robots.txt.
 */
export function GET() {
  const body = `# hvacloadcalc.org

> Educational HVAC reference covering load calculation, heat pump sizing, AC sizing, furnace selection, and building science. Every claim sourced to ACCA, ASHRAE, AHRI, NEEP, DOE, EPA, IRS, NFRC, RESNET primary publications. Written for homeowners verifying contractor quotes.

## Calculators

- [BTU Calculator](https://hvacloadcalc.org/tools/btu-calculator/): Free planning-grade BTU calculator implementing ACCA Manual J methodology with climate, ceiling, insulation, sun, and occupancy adjustments. 16 worked-example URLs.
- [AC Size Calculator](https://hvacloadcalc.org/tools/ac-size-calculator/): AC capacity in BTU and tonnage with equipment class recommendation (window, portable, mini-split, central), Manual S tolerance band, SEER2 cost comparison.
- [Heat Pump Size Calculator](https://hvacloadcalc.org/tools/heat-pump-size-calculator/): Dual-load (cooling + heating) sizing with balance point, aux heat capacity, and standard vs NEEP CCASHP cold-climate equipment comparison.
- [Attic R-Value Calculator](https://hvacloadcalc.org/tools/attic-r-value-calculator/): Multi-layer R-value calculation with DOE recommended R-values by climate zone and upgrade depth by material.
- [Manual J Load Calculator](https://hvacloadcalc.org/tools/manual-j-calculator/): Whole-house heating + cooling load calculator with envelope, infiltration, solar, internal gain math. Verified against ACCA reference cases.

## Reference hubs

- [Heat Pump](https://hvacloadcalc.org/heat-pump/): Refrigerant-cycle operation, AHRI 210/240 rating points, NEEP CCASHP cold-temperature data, system types, 2026 federal incentives.
- [Air Conditioner](https://hvacloadcalc.org/ac/): AHRI 210/240 cooling ratings, SEER2 minimums, sensible vs latent cooling, BTU per square foot by climate, R-410A phaseout.
- [Furnace](https://hvacloadcalc.org/furnace/): AFUE methodology, 80 vs 95 AFUE comparison, fuel-cost comparison across natural gas, propane, oil, electric, heat pump.
- [Manual J](https://hvacloadcalc.org/manual-j/): ACCA Manual J 8th Edition methodology: Heat Transfer Multipliers, infiltration, internal gains, verification against reference cases.
- [Manual S](https://hvacloadcalc.org/manual-s/): AHRI matchup, sensible vs latent capacity, SHR matching, oversizing tolerances, NEEP CCASHP v4.0 cold-climate selection.
- [Manual D](https://hvacloadcalc.org/manual-d/): Friction rate, equivalent length, static pressure budget, trunk and branch sizing, flex vs metal trade-offs.
- [Manual T](https://hvacloadcalc.org/manual-t/): Throw and spread, face velocity targets, register selection, return air placement.
- [Building Science](https://hvacloadcalc.org/building-science/): R-values, U-factors, ACH50 infiltration, IECC climate zones, psychrometrics, HERS/RESNET energy audits.
- [Tools Hub](https://hvacloadcalc.org/tools/): Five live calculators with methodology and 61 worked-example URLs. Planning-grade vs permit-grade explained.
- [Glossary](https://hvacloadcalc.org/glossary/): 60+ HVAC and building science terms with sourced definitions, formulas, and source citations.

## In-depth articles

- [Heat pump sizing](https://hvacloadcalc.org/heat-pump/sizing/): Dual-load methodology, balance point math, capacity-vs-temperature curves.
- [Heat pump aux heat](https://hvacloadcalc.org/heat-pump/aux-heat/): When aux fires normally vs problem scenarios; aux strip sizing.
- [Aux vs Emergency heat](https://hvacloadcalc.org/heat-pump/aux-heat/meaning/): AUX runs strip + compressor; EM disables compressor.
- [Heat pump defrost cycle](https://hvacloadcalc.org/heat-pump/cold-climate/defrost-cycle/): Why and when defrost happens; CCASHP behavior at low ambient.
- [Seasonal Performance Factor (SPF)](https://hvacloadcalc.org/heat-pump/performance/seasonal-performance-factor/): Field SPF vs nameplate HSPF2.
- [AC short cycling](https://hvacloadcalc.org/ac/short-cycling/): Oversizing as the primary cause; refrigerant, airflow, control diagnoses.
- [AC BTU chart](https://hvacloadcalc.org/ac/btu/chart/): BTU per sq ft by climate, ceiling, sun, insulation, space type.
- [Garage mini-split sizing](https://hvacloadcalc.org/ac/btu/garage-mini-split/): Uninsulated garages need 2-3× the BTU/sqft.
- [Attic R-value](https://hvacloadcalc.org/building-science/insulation/attic-r-value/): DOE recommendations by zone, cost-per-R by material.
- [Window U-factor](https://hvacloadcalc.org/building-science/windows/u-factor/): NFRC label, U-factor by frame, SHGC.
- [Wet bulb temperature](https://hvacloadcalc.org/building-science/psychrometrics/wet-bulb/): Latent load driver.
- [HERS Index](https://hvacloadcalc.org/building-science/hers-index/): 0-150+ scale, RESNET methodology.
- [Return air sizing](https://hvacloadcalc.org/manual-d/return-air-sizing/): CFM matching, face velocity, closed-door problem.
- [Manual J methodology](https://hvacloadcalc.org/manual-j/): HTM approach, infiltration, internal gains.
- [How we verify Manual J](https://hvacloadcalc.org/methodology/how-we-verify-manual-j/): Validation against ACCA reference cases.

## Editorial and identity

- [About the site](https://hvacloadcalc.org/about/): Editorial mission, audience, methodology approach.
- [Author bio: Jonathan Stowe](https://hvacloadcalc.org/authors/jonathan-s/): Writer-researcher specializing in residential HVAC methodology.
- [Editorial standards](https://hvacloadcalc.org/editorial-standards/): Source tiers, review cadence, conflict-of-interest policy.
- [Methodology](https://hvacloadcalc.org/methodology/): Calculator math, accuracy bands, verification.
- [Sources cited](https://hvacloadcalc.org/sources/): Full bibliography by organization.
- [Corrections](https://hvacloadcalc.org/corrections/): Public log of material content corrections.
- [Privacy policy](https://hvacloadcalc.org/privacy/): Google AdSense disclosure, GDPR/CCPA rights.
- [Terms of use](https://hvacloadcalc.org/terms/): Acceptable use, IP, warranty disclaimer.
- [Contact](https://hvacloadcalc.org/contact/): Email at info@hvacloadcalc.org.

## Primary sources behind the content

ACCA (Manual J/S/D/T), ASHRAE (Fundamentals, Standard 169), AHRI (210/240 ratings), NEEP (CCASHP v4.0), DOE (10 CFR 430, Building America), EPA (AIM Act, ENERGY STAR), IRS (Section 25C), NFRC (window labels), RESNET (HERS), EIA (utility prices), IECC (climate zones), ASTM (testing standards).

Full bibliography with documents, URLs, and access dates: https://hvacloadcalc.org/sources/
`;

  return new NextResponse(body, {
    status: 200,
    headers: {
      'content-type': 'text/markdown; charset=utf-8',
      'cache-control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
