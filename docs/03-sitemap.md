# 03 — Sitemap

## Purpose

This is the authoritative URL map for hvacloadcalc.org. Every page that will ever exist on the site is listed here with its target keyword(s), brief reference, and build wave.

If a URL is not in this document, it doesn't exist. If you're about to create a URL not listed here, stop and add it to this doc first.

---

## URL conventions

- All URLs end with trailing slash: `/heat-pump/aux-heat/`
- All URLs lowercase, hyphens between words
- No abbreviations except universally understood (HVAC, AC, BTU, R-value)
- No deeper than 4 segments from root (e.g., `/heat-pump/aux-heat/ecobee/` is the max depth)
- Programmatic URLs use the data variant slug directly: `/heat-pump/sizing/1500-sq-ft/`, `/manual-d/return-air-grille/20x20/`

---

## Build waves

- **Wave 0**: foundation (homepage, hub pages, footer pages, legal)
- **Wave 1**: launch 15 articles (the AdSense application set)
- **Wave 2**: tool pages (21 calculators)
- **Wave 3**: secondary articles (broader content depth, 30-50 articles)
- **Wave 4**: programmatic templates (~400 pages across 8 templates)
- **Wave 5**: backlink magnets (10 link-bait assets)

---

## Wave 0 — Foundation

| URL | Page type | Target KW | Volume | Build |
|---|---|---|---|---|
| `/` | homepage | brand | — | Wave 0 |
| `/heat-pump/` | hub | "heat pump" (hub) | — | Wave 0 |
| `/ac/` | hub | "air conditioner" (hub) | — | Wave 0 |
| `/furnace/` | hub | "furnace" (hub) | — | Wave 0 |
| `/manual-j/` | hub + cornerstone | "manual j" | 2,400 | Wave 1 |
| `/manual-s/` | hub | "manual s" | 90 | Wave 3 |
| `/manual-d/` | hub | "manual d" | 320 | Wave 3 |
| `/manual-t/` | hub | "manual t" | 30 | Wave 3 |
| `/building-science/` | hub | (umbrella) | — | Wave 0 |
| `/tools/` | hub | "hvac calculator" | 880 | Wave 2 |
| `/glossary/` | hub | (umbrella) | — | Wave 3 |

### Site-wide / legal / about

| URL | Page type | Purpose | Build |
|---|---|---|---|
| `/about/` | static | Mission, what site does, owner-anonymous | Wave 0 |
| `/methodology/` | static | How calculators compute; formula sources | Wave 0 |
| `/editorial-standards/` | static | Content creation/review process | Wave 0 |
| `/sources/` | static | Bibliography of all standards cited | Wave 0 |
| `/corrections/` | static | Error correction policy + log | Wave 0 |
| `/privacy/` | static | Privacy policy | Wave 0 |
| `/terms/` | static | Terms of use | Wave 0 |
| `/disclaimer/` | static | Planning-grade disclaimer in full | Wave 0 |
| `/contact/` | form | Contact form, no other contact info | Wave 0 |
| `/authors/jonathan-s/` | author profile | Jonathan S. bio + article list | Wave 0 |

---

## Wave 1 — Launch 15 articles (AdSense application set)

In recommended publish order. Each has a corresponding brief in `content/briefs/launch-15/`.

| # | URL | Target KW | Volume | CPC | Brief file |
|---|---|---|---|---|---|
| 1 | `/heat-pump/aux-heat/` | auxiliary heat | 6,600 | $3.89 | `01-heat-pump-aux-heat.md` |
| 2 | `/heat-pump/performance/seasonal-performance-factor/` | seasonal performance factor | 27,100 | $1.82 | `02-seasonal-performance-factor.md` |
| 3 | `/manual-j/` | manual j | 2,400 | $2.23 | `03-manual-j.md` |
| 4 | `/ac/short-cycling/` | air conditioner short cycling | 1,600 | $21.56 | `04-ac-short-cycling.md` |
| 5 | `/building-science/psychrometrics/wet-bulb/` | wet thermometer / wet bulb | 18,100 | $4.19 | `05-wet-bulb.md` |
| 6 | `/heat-pump/cold-climate/defrost-cycle/` | heat pump defrost cycle | 1,000 | low | `06-defrost-cycle.md` |
| 7 | `/heat-pump/sizing/` | heat pump sizing | 720+ | varies | `07-heat-pump-sizing.md` |
| 8 | `/building-science/r-value/attic/` | recommended attic insulation r value | 3,600 | $1.64 | `08-attic-r-value.md` |
| 9 | `/building-science/u-factor/windows/` | u factor windows | 1,600 | $4.95 | `09-u-factor-windows.md` |
| 10 | `/building-science/energy-audit/hers-index/` | hers index | 2,400 | $7.97 | `10-hers-index.md` |
| 11 | `/manual-d/return-air-sizing/` | return duct sizing | 480 | $4.51 | `11-return-air-sizing.md` |
| 12 | `/mini-split/for-garage/` | mini split for garage | 3,600 | $2.34 | `12-mini-split-garage.md` |
| 13 | `/manual-j/verify-contractor-report/` | (backlink magnet, lower volume) | low | low | `13-verify-manual-j.md` |
| 14 | `/heat-pump/aux-heat/meaning/` | aux heat meaning | 1,600 | $2.73 | `14-aux-heat-meaning.md` |
| 15 | `/ac/btu-chart/` | btus per sq ft + cluster | 49,000+ | $0.45 | `15-ac-btu-chart.md` |

**Total Wave 1 targeted volume: ~120,000 monthly searches**

---

## Wave 2 — Calculator pages

Each calculator has its own brief in `content/briefs/tools/`. Each is built per `docs/16-calculator-architecture.md` (Option C: SSR default + interactive + examples page).

| URL | Calculator | Target KW | Volume |
|---|---|---|---|
| `/tools/btu-calculator/` | Room BTU calc | btu calculator | combined 49k+ |
| `/tools/ac-size-calculator/` | AC sizing | ac size calculator | 2,400 |
| `/tools/heat-pump-size-calculator/` | Heat pump sizing | heat pump size calculator | 720 |
| `/tools/furnace-size-calculator/` | Furnace BTU | calculate furnace size | 5,400 |
| `/tools/mini-split-calculator/` | Mini split sizing | mini split sizing | 1,600 |
| `/tools/btu-per-square-foot/` | BTU/sqft converter | btu per square foot | 3,600+ |
| `/tools/btu-to-tons-converter/` | BTU↔ton | btu to tons | 880 |
| `/tools/manual-j-calculator/` | Manual J online | manual j calculator online | 210 |
| `/tools/duct-size-calculator/` | Duct sizing | hvac duct calculator | 3,600 |
| `/tools/return-air-grille-calculator/` | Grille sizing | return air grille size | 320+ |
| `/tools/cfm-calculator/` | Airflow CFM | cfm calculator | 50+ |
| `/tools/ach-calculator/` | Air changes/hour | air changes per hour | 720+ |
| `/tools/r-value-calculator/` | R-value calc | r value calculator | low |
| `/tools/balance-point-calculator/` | Balance point | balance point calculator | low (backlink) |
| `/tools/heat-loss-calculator/` | Home heat loss | heat loss calculator | 390 |
| `/tools/fuel-use-load-calculator/` | Fuel-use load (MOAT) | (no current volume — backlink play) | — |
| `/tools/wet-bulb-calculator/` | Wet bulb temp | wet bulb calculator | low |
| `/tools/degree-days-calculator/` | HDD/CDD | degree days calculator | low |
| `/tools/seer-savings-calculator/` | SEER savings | seer savings calculator | low |
| `/tools/short-cycling-diagnostic/` | Short cycling diagnosis | hvac short cycling | 480 |
| `/tools/ahri-lookup/` | AHRI search | ahri certificate | 40+ |

### Calculator examples sub-pages

Each calculator has an `/examples/[variant]/` set of 12-20 pre-computed result URLs for long-tail SEO. These are listed per calculator in their respective briefs.

Example: `/tools/btu-calculator/examples/1500-sq-ft-zone-5/`, `/tools/btu-calculator/examples/2000-sq-ft-zone-3/`, etc.

---

## Wave 3 — Secondary articles

### Heat pump cluster

| URL | Target KW | Volume |
|---|---|---|
| `/heat-pump/aux-heat/ecobee/` | ecobee aux heat settings | 320 |
| `/heat-pump/aux-heat/nest/` | nest aux heat | low |
| `/heat-pump/aux-heat/honeywell/` | honeywell aux heat | low |
| `/heat-pump/aux-heat/emergency-heat-difference/` | aux vs emergency heat | combined 1k+ |
| `/heat-pump/cold-climate/` | cold climate heat pump | 1,980 |
| `/heat-pump/cold-climate/balance-point/` | balance point | low (backlink) |
| `/heat-pump/cold-climate/how-cold-can-they-work/` | how cold can heat pumps work | 640 |
| `/heat-pump/cold-climate/neep-database/` | neep cold climate database | 40 |
| `/heat-pump/types/mini-split/` | mini split | (hub) |
| `/heat-pump/types/ductless/` | ductless heat pump | varies |
| `/heat-pump/types/ducted/` | ducted heat pump | varies |
| `/heat-pump/types/dual-fuel/` | dual fuel heat pump | varies |
| `/heat-pump/types/geothermal/` | geothermal heat pump | varies |
| `/heat-pump/performance/seer-vs-seer2/` | seer vs seer2 | low |
| `/heat-pump/performance/hspf-vs-hspf2/` | hspf vs hspf2 | 90 |
| `/heat-pump/performance/cop-explained/` | heat pump cop explained | 10+ |
| `/heat-pump/troubleshooting/short-cycling/` | heat pump short cycling | low |
| `/heat-pump/troubleshooting/not-cooling/` | heat pump not cooling | varies |
| `/heat-pump/troubleshooting/not-heating/` | heat pump not heating | varies |
| `/heat-pump/troubleshooting/running-constantly/` | heat pump runs constantly | varies |
| `/mini-split/sizing/` | mini split sizing | 1,600 |
| `/mini-split/for-basement/` | mini split for basement | 390 |
| `/mini-split/multi-zone/` | multi zone mini split | low |

### AC cluster

| URL | Target KW | Volume |
|---|---|---|
| `/ac/sizing/` | ac sizing | (hub) |
| `/ac/oversized-problems/` | oversized ac problems | low |
| `/ac/undersized-symptoms/` | undersized ac | low |
| `/ac/split-vs-central/` | split central air conditioner | 5,400 |
| `/ac/window-vs-portable/` | window vs portable ac | low |
| `/ac/types/` | (hub) | — |

### Furnace cluster

| URL | Target KW | Volume |
|---|---|---|
| `/furnace/sizing/` | furnace sizing | (hub) |
| `/furnace/afue/` | afue | combined |
| `/furnace/oversized-problems/` | oversized furnace | low |
| `/furnace/80-vs-95-afue/` | 80 vs 95 afue | 110 |

### Manual J / S / D / T deep articles

| URL | Target KW | Volume |
|---|---|---|
| `/manual-j/8th-edition/` | manual j 8th edition | low |
| `/manual-j/by-hand/` | manual j by hand | low |
| `/manual-j/software-comparison/` | manual j software | low |
| `/manual-j/example/` | manual j example | low |
| `/manual-j/cost/` | manual j cost | low |
| `/manual-j/vs-rule-of-thumb/` | manual j vs rule of thumb | low |
| `/manual-j/heat-transfer-multiplier/` | heat transfer multiplier | 10 |
| `/manual-s/ahri-matchup/` | ahri matchup | 40+ |
| `/manual-s/sensible-heat-ratio/` | sensible heat ratio | combined |
| `/manual-d/friction-rate/` | friction rate | low |
| `/manual-d/equivalent-length/` | equivalent length fittings | 320 |
| `/manual-d/flex-vs-metal/` | flexible duct vs metal | 210 |
| `/manual-d/static-pressure/` | hvac static pressure | low |
| `/manual-t/register-throw-spread/` | register throw spread | low |
| `/manual-t/face-velocity/` | register face velocity | low |

### Building science cluster

| URL | Target KW | Volume |
|---|---|---|
| `/building-science/r-value/` | r value | (hub) |
| `/building-science/r-value/walls/` | wall r value | varies |
| `/building-science/r-value/crawlspace/` | crawlspace insulation r value | 390 |
| `/building-science/r-value/basement/` | basement wall r value | 260 |
| `/building-science/r-value/vs-u-value/` | r value vs u value | 590 |
| `/building-science/u-factor/` | u factor | 1,300 |
| `/building-science/psychrometrics/` | psychrometrics | (hub) |
| `/building-science/psychrometrics/dry-bulb/` | dry bulb temperature | 1,600 |
| `/building-science/psychrometrics/wet-bulb-vs-dry-bulb/` | wet bulb vs dry bulb | 480 |
| `/building-science/psychrometrics/dew-point/` | dew point | varies |
| `/building-science/psychrometrics/enthalpy/` | enthalpy hvac | low |
| `/building-science/infiltration/` | infiltration | (hub) |
| `/building-science/infiltration/ach50/` | ach50 | low |
| `/building-science/infiltration/blower-door/` | blower door test | varies |
| `/building-science/infiltration/air-sealing/` | air sealing home | varies |
| `/building-science/climate-zones/` | climate zones | 1,010 |
| `/building-science/climate-zones/iecc-map/` | iecc climate zone map | low |
| `/building-science/design-temperature/` | design temperature | 10 |
| `/building-science/internal-gains/` | internal heat gains | 300 |
| `/building-science/energy-audit/` | home energy audit | (hub) |
| `/building-science/energy-audit/hers-rater/` | hers rater | 2,400 |
| `/building-science/energy-audit/energy-star/` | energy star certified | 1,900 |
| `/building-science/energy-audit/passive-house/` | passive house | 3,600 |

### Glossary terms (Wave 3)

50+ short reference pages. Each is 300-600 words optimized for LLM citation. Sample subset:

| URL | Term |
|---|---|
| `/glossary/btu/` | BTU |
| `/glossary/ton-of-refrigeration/` | Ton of refrigeration |
| `/glossary/sensible-heat/` | Sensible heat |
| `/glossary/latent-heat/` | Latent heat |
| `/glossary/cfm/` | CFM |
| `/glossary/static-pressure/` | Static pressure |
| `/glossary/seer/` | SEER |
| `/glossary/seer2/` | SEER2 |
| `/glossary/hspf/` | HSPF |
| `/glossary/hspf2/` | HSPF2 |
| `/glossary/cop/` | COP |
| `/glossary/eer/` | EER |
| `/glossary/afue/` | AFUE |
| `/glossary/ahri/` | AHRI |
| `/glossary/acca/` | ACCA |
| `/glossary/ashrae/` | ASHRAE |
| `/glossary/iecc/` | IECC |
| `/glossary/manual-j/` | Manual J (short reference, different from `/manual-j/` cornerstone) |
| ... (50+ total) |

---

## Wave 4 — Programmatic templates

Each template generates N variant pages from a data row. Templates live in `content/briefs/programmatic-templates/`.

| Template URL pattern | Variants | Brief file |
|---|---|---|
| `/heat-pump/sizing/{N}-sq-ft/` | 13 sqft values: 600, 800, 1000, 1200, 1500, 1800, 2000, 2200, 2500, 3000, 3500, 4000, 5000 | `heat-pump-sizing-by-sqft.md` |
| `/heat-pump/sizing/{state}/` | 50 states | `heat-pump-sizing-by-state.md` |
| `/heat-pump/sizing/{city}/` | top 100 metros | `heat-pump-sizing-by-city.md` |
| `/manual-d/return-air-grille/{WxH}/` | ~60 standard sizes (10x10, 12x12, 14x14, 20x20, 20x25, 20x30, etc.) | `return-air-grille-by-size.md` |
| `/mini-split/{N}-btu-coverage/` | 12 BTU sizes: 6k, 9k, 12k, 18k, 24k, 30k, 36k, 48k, 60k | `mini-split-btu-coverage.md` |
| `/glossary/{term}/` | 50+ glossary terms | `glossary-term.md` |
| `/building-science/r-value/{state}/` | 50 states | `r-value-by-state.md` |
| `/heat-pump/aux-heat/{thermostat-brand}/` | 8-12 brands | `aux-heat-by-thermostat.md` |

**Total Wave 4 pages**: ~400

---

## Wave 5 — Backlink magnets

| URL | Asset | Brief file |
|---|---|---|
| `/heat-pump/neep-database/` | Interactive NEEP explorer | `neep-explorer.md` |
| `/building-science/climate-zones/map/` | Interactive IECC map | `iecc-map-interactive.md` |
| `/research/90-percent-sized-wrong/` | Original analysis | `90-percent-sized-wrong.md` |
| `/manual-j/verify-contractor-report/` | Audit tool | `verify-manual-j.md` |
| `/tools/fuel-use-load-calculator/` | Fuel-use methodology calc | (in tools wave) |
| `/manual-j/htm-tables/` | Digitized HTM tables | `htm-tables.md` |
| `/research/heat-pump-rebate-database/` | State rebate DB | `rebate-database.md` |
| `/research/ahri-search/` | Better AHRI lookup | (linked from tools) |
| `/building-science/design-temp-by-zip/` | ASHRAE design temp lookup | `design-temp-lookup.md` |
| `/manual-d/return-air-grille-calculator/` | CFM-to-grille calc | (in tools wave) |

---

## URL canonicalization rules

- **Trailing slash always**: `/heat-pump/aux-heat/` (configured in next.config.mjs)
- **www → non-www**: redirect at Vercel level
- **HTTPS only**: enforced at Vercel level
- **Lowercase always**: any uppercase URL 301-redirects to lowercase
- **No duplicate content under multiple URLs** — every page has exactly one canonical URL

---

## XML sitemap strategy

- Auto-generated by `app/sitemap.ts` from this doc + actual filesystem
- Paginated if >50k URLs (we're well under for now)
- Includes lastmod from frontmatter `last_reviewed` field
- Excludes: `/about/`, `/privacy/`, `/terms/` from sitemap (still indexable, but not promoted)
- Calculator pages with `/examples/` sub-pages: examples listed individually

---

## Internal link graph density

Target after full build:
- Average internal links per article: 8-15
- Every URL must be reachable from `/` within 3 clicks
- Every URL must be reachable from at least 2 other URLs (no orphans)
- Hub pages link to every direct spoke
- Spoke pages link back to hub + 3-5 sibling spokes
- Calculator pages link from every article whose topic relates

See `05-internal-linking.md` for the linking matrix.

---

## Updates to this doc

This is a living document for the project lifetime. When adding URLs:

1. Add the URL to the appropriate wave table
2. Update the build wave assignment if needed
3. Update the total counts at the bottom of each wave
4. Commit with `Update sitemap: add /url/` as the subject

**Do not delete URLs from this doc** even if a page is removed. Mark with strikethrough and add a "redirects to" note.
