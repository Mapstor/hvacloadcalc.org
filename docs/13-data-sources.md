# 13 — Data Sources

## Purpose

This document is the master reference for every JSON data file in `/data/`. Each file has a schema, a source, an access date, and an update policy.

Every component that loads data from `/data/` uses the typed loaders in `lib/data-loaders/`. No component reads JSON directly.

---

## File inventory

| File | Purpose | Source tier | Update cadence |
|---|---|---|---|
| `ashrae-design-temps.json` | 99% / 1% design temperatures by location | ASHRAE (Tier 1) | Annually |
| `iecc-climate-zones.json` | IECC climate zones by county/zip | IECC (Tier 1) | When IECC revised |
| `noaa-degree-days.json` | HDD / CDD by location | NOAA (Tier 1) | Annually |
| `neep-cold-climate.json` | NEEP-listed cold-climate heat pumps | NEEP (Tier 1) | Quarterly |
| `states-us.json` | US states with abbreviations, regions, climate zones | Compiled | Static (rarely changes) |
| `grille-sizes.json` | Standard return air grille dimensions | Manufacturer specs | Annually |
| `htm-tables.json` | Manual J Heat Transfer Multipliers | ACCA Manual J (Tier 1) | When Manual J revised |
| `r-value-recommendations.json` | DOE-recommended R-values by climate zone | DOE (Tier 1) | When DOE updated |
| `btu-per-sqft-chart.json` | Approximate BTU/sqft by climate zone | Derived, planning-grade | Annually |
| `equipment-typical-cop.json` | Typical COP ranges by equipment class | DOE / NEEP | Annually |
| `electricity-rates.json` | EIA state-by-state electricity rates | EIA (Tier 1) | Monthly |
| `cities-major-us.json` | Top 200 US cities with climate data | Compiled from NOAA + Census | Annually |
| `nfrc-typical-u-factors.json` | Typical U-factors for window types | NFRC reference | Annually |
| `psychrometric-tables.json` | Wet-bulb, dew-point lookup tables | ASHRAE Handbook | Static (physics) |

---

## File-by-file specs

### `ashrae-design-temps.json`

**Purpose**: Provide 99% heating design temperature and 1% cooling design temperature for major US locations, used by load calculation calculators.

**Schema**:
```json
{
  "metadata": {
    "source": "ASHRAE Handbook of Fundamentals 2021, Chapter 14, Climatic Design Information",
    "year": 2021,
    "accessed": "2026-05-18",
    "tier": 1,
    "notes": "Heating design temp is the 99% percentile (cold side); cooling design temp is the 1% percentile (hot side)."
  },
  "data": [
    {
      "city": "Denver",
      "state": "CO",
      "climate_zone": "5B",
      "heating_99_pct_f": 4,
      "cooling_1_pct_f": 91,
      "cooling_wet_bulb_1_pct_f": 60,
      "elevation_ft": 5280
    },
    {
      "city": "Minneapolis",
      "state": "MN",
      "climate_zone": "6A",
      "heating_99_pct_f": -10,
      "cooling_1_pct_f": 89,
      "cooling_wet_bulb_1_pct_f": 74,
      "elevation_ft": 830
    }
    // ... 200+ entries for major US cities
  ]
}
```

**Loader**: `lib/data-loaders/ashrae.ts`

```ts
export interface AshraeDesignTemp {
  city: string;
  state: string;
  climateZone: string;
  heating99PctF: number;
  cooling1PctF: number;
  coolingWetBulb1PctF: number;
  elevationFt: number;
}

export function getDesignTempByCity(city: string, state: string): AshraeDesignTemp | null { ... }
export function getDesignTempsByState(state: string): AshraeDesignTemp[] { ... }
export function getAllDesignTemps(): AshraeDesignTemp[] { ... }
```

**Used by**:
- Heat pump size calculator
- Manual J calculator
- Heat loss calculator
- Programmatic pages: `/heat-pump/sizing/{city}/`, `/heat-pump/sizing/{state}/`

---

### `iecc-climate-zones.json`

**Purpose**: Map every US county (and zip-code-prefix where useful) to its IECC climate zone (1A through 8).

**Schema**:
```json
{
  "metadata": {
    "source": "2021 IECC Climate Zone Map + DOE Building America County List",
    "year": 2021,
    "accessed": "2026-05-18",
    "tier": 1
  },
  "data": {
    "counties": [
      { "fips": "08031", "name": "Denver County", "state": "CO", "zone": "5B" },
      { "fips": "27053", "name": "Hennepin County", "state": "MN", "zone": "6A" }
      // ... ~3,000 entries
    ],
    "zip_prefixes": {
      "80": "5B",  // most of Colorado
      "55": "6A",  // most of Minnesota MSP area
      // ... 1,000+ prefixes
    }
  }
}
```

**Loader**: `lib/data-loaders/climate-zones.ts`

```ts
export interface ClimateZoneEntry {
  fips: string;
  name: string;
  state: string;
  zone: string;
}

export function getClimateZoneByCounty(fips: string): string | null { ... }
export function getClimateZoneByZip(zip: string): string | null { ... }
export function getCountiesInZone(zone: string): ClimateZoneEntry[] { ... }
```

**Used by**:
- All load calculators (climate zone affects assumptions)
- Programmatic pages: `/building-science/r-value/{state}/`

---

### `noaa-degree-days.json`

**Purpose**: Heating degree days (HDD) and cooling degree days (CDD) by location, used by the fuel-use load calculator.

**Schema**:
```json
{
  "metadata": {
    "source": "NOAA / NWS Climate Prediction Center, 30-year normals (1991-2020)",
    "year": 2020,
    "accessed": "2026-05-18",
    "tier": 1
  },
  "data": [
    {
      "city": "Denver",
      "state": "CO",
      "hdd_base_65": 5524,
      "cdd_base_65": 695,
      "hdd_base_60": 3850,
      "hdd_base_55": 2350
    }
    // ... 200+ cities
  ]
}
```

**Loader**: `lib/data-loaders/degree-days.ts`

**Used by**:
- Fuel-use load calculator
- Heat loss calculator
- Heat pump cost-of-operation explainer pages

---

### `neep-cold-climate.json`

**Purpose**: NEEP-listed cold-climate heat pumps with capacity at 47°F and 5°F (or 17°F), used for performance discussions and balance point examples.

**Schema**:
```json
{
  "metadata": {
    "source": "NEEP Cold Climate Air Source Heat Pump Specification v4.0 Product List",
    "year": 2024,
    "accessed": "2026-05-18",
    "tier": 1,
    "url": "https://ashp.neep.org/"
  },
  "data": [
    {
      "manufacturer": "Mitsubishi Electric",
      "model_series": "MUZ-FS Hyper Heat",
      "outdoor_model": "MUZ-FS12NAH",
      "capacity_47f_btu": 12000,
      "capacity_17f_btu": 12000,
      "capacity_5f_btu": 11600,
      "min_operating_temp_f": -13,
      "hspf2": 9.7,
      "seer2": 19.5,
      "ahri_ref": "201234567"
    }
    // ... 500+ entries
  ]
}
```

**Loader**: `lib/data-loaders/neep.ts`

**Used by**:
- Cold-climate heat pump articles
- Balance point calculator
- Heat pump size calculator (for cold-climate variant)
- Programmatic pages: `/heat-pump/cold-climate/neep-database/`

**Update note**: NEEP refreshes their list quarterly. We refresh from their source quarterly via `scripts/refresh-neep-data.ts`.

---

### `states-us.json`

**Purpose**: List of US states with abbreviations, regions, and typical climate zones for programmatic page generation.

**Schema**:
```json
{
  "metadata": {
    "source": "Compiled from US Census Bureau + IECC zone mapping",
    "year": 2024,
    "accessed": "2026-05-18"
  },
  "data": [
    {
      "name": "Colorado",
      "abbr": "CO",
      "region": "West",
      "subregion": "Mountain",
      "predominant_climate_zone": "5B",
      "climate_zones_present": ["5B", "6B", "7B"],
      "major_city": "Denver",
      "population_2024_est": 5811297
    }
    // ... 50 entries
  ]
}
```

**Loader**: `lib/data-loaders/states.ts`

**Used by**:
- All programmatic state-variant pages (`/heat-pump/sizing/{state}/`, `/building-science/r-value/{state}/`)

---

### `grille-sizes.json`

**Purpose**: Standard return air grille dimensions and CFM capacities, used by Manual T-related pages.

**Schema**:
```json
{
  "metadata": {
    "source": "Compiled from manufacturer datasheets (Hart & Cooley, Lima, Tuttle & Bailey)",
    "year": 2024,
    "accessed": "2026-05-18"
  },
  "data": [
    {
      "width_in": 20,
      "height_in": 20,
      "free_area_sqin": 280,
      "free_area_sqft": 1.944,
      "max_cfm_500fpm": 972,
      "max_cfm_700fpm": 1361,
      "typical_application": "primary return, 2-3 ton system"
    }
    // ... 60+ standard sizes
  ]
}
```

**Loader**: `lib/data-loaders/grilles.ts`

**Used by**:
- Return air grille calculator
- Programmatic pages: `/manual-d/return-air-grille/{WxH}/`

---

### `htm-tables.json`

**Purpose**: ACCA Manual J Heat Transfer Multipliers for common wall, roof, window, and floor assemblies.

**Schema**:
```json
{
  "metadata": {
    "source": "ACCA Manual J 8th Edition (ANSI/ACCA 2 Manual J - 2016), Tables 4A-4F",
    "year": 2016,
    "accessed": "2026-05-18",
    "tier": 1,
    "notes": "These are educational summaries. The full Manual J tables include many more variants; the published standard is the authoritative source."
  },
  "data": {
    "walls": [
      {
        "type": "12W: 2x4 wood frame, R-13 cavity, no sheathing",
        "design_td_15": 0.93,
        "design_td_20": 1.24,
        "design_td_25": 1.55,
        "design_td_30": 1.86,
        "design_td_35": 2.17,
        "design_td_40": 2.48,
        "design_td_45": 2.79,
        "design_td_50": 3.10,
        "design_td_55": 3.41,
        "design_td_60": 3.72,
        "design_td_65": 4.03,
        "design_td_70": 4.34
      }
      // ... 30+ wall types
    ],
    "ceilings": [/* ... */],
    "floors": [/* ... */],
    "windows": [/* ... */],
    "doors": [/* ... */]
  }
}
```

**Loader**: `lib/data-loaders/htm.ts`

**Used by**:
- Manual J calculator
- `/manual-j/heat-transfer-multiplier/` article
- `/manual-j/htm-tables/` backlink-magnet page

**IMPORTANT**: ACCA owns Manual J. We can summarize the methodology and reproduce summary data for educational purposes (fair use), but cannot redistribute the full standard. The HTM data we include is a curated educational subset, prominently disclaimed as such.

---

### `r-value-recommendations.json`

**Purpose**: DOE-recommended R-values for attic, wall, floor, and basement insulation by climate zone.

**Schema**:
```json
{
  "metadata": {
    "source": "US DOE Energy Saver, Insulation R-Value Recommendations",
    "year": 2024,
    "accessed": "2026-05-18",
    "tier": 1,
    "url": "https://www.energy.gov/energysaver/insulation"
  },
  "data": [
    {
      "climate_zone": "1A",
      "attic_uninsulated_min": "R30",
      "attic_uninsulated_max": "R49",
      "attic_existing_min": "R25",
      "attic_existing_max": "R38",
      "wall_min": "R13",
      "wall_max": "R15",
      "floor_min": "R13",
      "floor_max": "R19",
      "basement_wall_min": "R0",
      "basement_wall_max": "R10"
    }
    // ... entries for each climate zone 1-8
  ]
}
```

**Loader**: `lib/data-loaders/r-value-recs.ts`

**Used by**:
- R-value calculator
- `/building-science/r-value/attic/`, `/building-science/r-value/walls/`, etc.
- Programmatic pages: `/building-science/r-value/{state}/`

---

### `btu-per-sqft-chart.json`

**Purpose**: Approximate BTU-per-square-foot guidance by climate zone, with explicit "planning grade only" framing.

**Schema**:
```json
{
  "metadata": {
    "source": "Derived from typical Manual J results across climate zones; representative ranges only",
    "year": 2024,
    "accessed": "2026-05-18",
    "tier": 3,
    "notes": "These rules-of-thumb are educational. Real homes vary by ±30% based on envelope quality, infiltration, internal gains, and orientation. Always confirm with proper load calculation for any actual sizing decision."
  },
  "data": [
    {
      "climate_zone": "1A",
      "cooling_btu_per_sqft_low": 20,
      "cooling_btu_per_sqft_typical": 25,
      "cooling_btu_per_sqft_high": 30,
      "heating_btu_per_sqft_low": 10,
      "heating_btu_per_sqft_typical": 15,
      "heating_btu_per_sqft_high": 20,
      "label": "Hot humid (Miami, Houston)"
    }
    // ... 8 entries, one per zone
  ]
}
```

**Loader**: `lib/data-loaders/btu-rules.ts`

**Used by**:
- AC BTU chart article (`/ac/btu-chart/`)
- BTU calculator (as a default starting point, always with disclaimer)
- Programmatic pages: `/heat-pump/sizing/{N}-sq-ft/`

**Caveat**: This data is explicitly framed as planning-grade rules-of-thumb. Every page using it must include a callout disclaiming the ±30% variance and pointing to proper load calculation for real decisions.

---

### `equipment-typical-cop.json`

**Purpose**: Typical COP ranges for major equipment categories.

**Schema**:
```json
{
  "metadata": {
    "source": "DOE Energy Saver + NEEP performance data",
    "year": 2024,
    "accessed": "2026-05-18",
    "tier": 1
  },
  "data": [
    {
      "equipment_class": "Conventional split heat pump",
      "cop_47f_low": 2.5,
      "cop_47f_typical": 3.0,
      "cop_47f_high": 3.5,
      "cop_17f_low": 1.7,
      "cop_17f_typical": 2.1,
      "cop_17f_high": 2.5,
      "notes": "Performance drops significantly below 17°F"
    },
    {
      "equipment_class": "Cold-climate inverter heat pump",
      "cop_47f_low": 3.5,
      "cop_47f_typical": 4.0,
      "cop_47f_high": 4.5,
      "cop_17f_low": 2.5,
      "cop_17f_typical": 3.0,
      "cop_17f_high": 3.5,
      "cop_5f_low": 1.8,
      "cop_5f_typical": 2.2,
      "cop_5f_high": 2.6,
      "notes": "Maintains capacity to -15°F or lower for many models"
    }
    // ... entries for: geothermal, mini-split, packaged HP, dual-fuel
  ]
}
```

**Loader**: `lib/data-loaders/equipment-cop.ts`

**Used by**:
- Heat pump performance articles
- COP explainer
- Cost comparison sections in articles

---

### `electricity-rates.json`

**Purpose**: State-by-state average residential electricity rates from EIA, used for operating cost calculations.

**Schema**:
```json
{
  "metadata": {
    "source": "EIA Electricity Monthly Update, Table 5.6.A - Average Price of Electricity to Ultimate Customers by End-Use Sector, by State",
    "year": 2025,
    "month": "March",
    "accessed": "2026-05-18",
    "tier": 1,
    "url": "https://www.eia.gov/electricity/monthly/epm_table_grapher.php?t=epmt_5_6_a"
  },
  "data": {
    "us_average_cents_per_kwh": 16.0,
    "by_state": [
      { "state": "CO", "cents_per_kwh": 14.5 },
      { "state": "CA", "cents_per_kwh": 31.8 },
      { "state": "HI", "cents_per_kwh": 43.2 },
      { "state": "WA", "cents_per_kwh": 11.2 }
      // ... 50 states + DC
    ]
  }
}
```

**Loader**: `lib/data-loaders/electricity-rates.ts`

**Used by**:
- Aux heat cost explanations
- Operating cost calculator outputs
- SEER savings calculator
- Cost comparison articles

**Update note**: EIA publishes monthly. We refresh quarterly to keep pages current without constant churn.

---

### `cities-major-us.json`

**Purpose**: Top 200 US cities by population with climate, location, and ASHRAE design temp data joined.

**Schema**:
```json
{
  "metadata": {
    "source": "Compiled from US Census + NOAA + ASHRAE Handbook 2021",
    "year": 2024,
    "accessed": "2026-05-18"
  },
  "data": [
    {
      "city": "Denver",
      "state": "CO",
      "population": 715522,
      "metro_population": 2963821,
      "climate_zone": "5B",
      "heating_99_pct_f": 4,
      "cooling_1_pct_f": 91,
      "elevation_ft": 5280,
      "latitude": 39.7392,
      "longitude": -104.9903,
      "slug": "denver-co"
    }
    // ... 200 entries
  ]
}
```

**Loader**: `lib/data-loaders/cities.ts`

**Used by**:
- Programmatic pages: `/heat-pump/sizing/{city}/`
- City pages for major HVAC topics

---

### `nfrc-typical-u-factors.json`

**Purpose**: Reference U-factors for typical window types (used in U-factor articles).

**Schema**: Similar pattern. Source: NFRC database summaries.

---

### `psychrometric-tables.json`

**Purpose**: Wet-bulb temperature lookup as a function of dry-bulb temp and relative humidity.

**Schema**: Lookup table grid.

**Source**: ASHRAE Handbook of Fundamentals 2021, psychrometric chart.

**Used by**:
- Wet-bulb calculator
- Wet-bulb article
- Dew-point article

---

## Update procedures

### Manual updates (annual)
1. Re-fetch source data
2. Validate format hasn't changed
3. Update JSON, bump `accessed` date
4. Run `pnpm run test` to ensure all loaders still work
5. Smoke-test downstream pages (a few articles, a calculator using the data)
6. Commit with message: `Refresh [source] data through [year]`

### Automated refreshes
Where the source has a stable API or scrapable structure:
- `scripts/refresh-neep-data.ts` — quarterly NEEP CCASHP refresh
- `scripts/refresh-electricity-rates.ts` — quarterly EIA refresh
- Run via cron or manual GitHub action

### Source change handling
If a source URL changes:
1. Update the `url` field in metadata
2. Update `04-content-policy.md` if the source is cited there
3. Update `09-legal-footer.md` `/sources/` page

If a source deprecates a dataset:
1. Mark the JSON file's metadata with `deprecated: true` and `deprecation_date`
2. Migrate dependent calculators to a new source
3. Update the doc accordingly

---

## Data quality standards

Every JSON file in `/data/` must:

- [ ] Have a `metadata` block with source, year, accessed date, tier
- [ ] Be valid JSON (no trailing commas, no comments)
- [ ] Have a TypeScript interface in `lib/data-loaders/`
- [ ] Be loaded only via a typed loader (no direct JSON imports in components)
- [ ] Have unit tests in `tests/data-loaders/` that verify loader return shapes
- [ ] Have a corresponding entry in this document
- [ ] Have a corresponding entry in `/sources/` (`/docs/09-legal-footer.md` page copy)

If any of these fails, the file is not ready for production use.

---

## Privacy / licensing notes

### Public domain or factual data (no license issue)
- ASHRAE design temps: factual climate data, citation suffices
- IECC climate zones: government-published code data
- NOAA degree days: federal government, public domain
- EIA electricity rates: federal government, public domain
- DOE recommendations: federal government, public domain

### Cited fair-use data (proper attribution required)
- HTM tables from Manual J: small educational subset, prominently disclaimed
- NEEP product list: cited as source, link to original
- NFRC typical U-factors: aggregated reference data

### Proprietary (must license or omit)
- Full Manual J text: NEVER reproduce; cite by section
- Manufacturer-specific full performance maps: NEVER reproduce in full; link to AHRI directory
- Building America Solution Center detailed specs: cite, link, don't reproduce

When in doubt, omit and link to the authoritative source instead.
