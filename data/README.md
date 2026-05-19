# /data/ — JSON reference data

Every JSON file in this directory follows the same shape:

```json
{
  "metadata": {
    "source": "Authoritative source citation",
    "year": 2024,
    "accessed": "YYYY-MM-DD",
    "tier": 1,
    "notes": "Optional caveats or context"
  },
  "data": [ /* ... or { ... } */ ]
}
```

All files are loaded only via the typed loaders in `lib/data-loaders/`. Components never import JSON directly.

Schemas, sources, and update procedures are documented in `docs/13-data-sources.md`. This README is a quick reference; the doc is authoritative.

## Files in this directory

| File | Loader | Tier | Source |
|---|---|---|---|
| `ashrae-design-temps.json` | `lib/data-loaders/ashrae.ts` | 1 | ASHRAE Handbook of Fundamentals 2021, Chapter 14 |
| `iecc-climate-zones.json` | `lib/data-loaders/climate-zones.ts` | 1 | 2021 IECC + DOE Building America county list |
| `states-us.json` | `lib/data-loaders/states.ts` | — | Compiled from US Census + IECC zone mapping |
| `electricity-rates.json` | `lib/data-loaders/electricity-rates.ts` | 1 | EIA Electricity Monthly Update |
| `r-value-recommendations.json` | `lib/data-loaders/r-value-recs.ts` | 1 | DOE Energy Saver insulation recommendations |

## Seed-data status

These initial files are **seed datasets** sized for development and testing. Full production refresh (200+ ASHRAE cities, 3000+ counties, etc.) happens through the update procedure documented in `docs/13` §Update procedures.

Naming, schema, and loader contracts here are stable; data values will be refreshed against current authoritative sources before launch.

## Naming convention

- JSON files use kebab-case file names and snake_case field names
- TypeScript loaders use camelCase exports and interface fields
- The loader handles the snake_case → camelCase translation so components only see camelCase

## Adding a new data file

1. Add the JSON file with a `metadata` block matching the shape above
2. Add a typed loader in `lib/data-loaders/`
3. Add unit tests in `tests/data-loaders/`
4. Document the file in `docs/13-data-sources.md`
5. Add a row to the table above
6. Confirm a corresponding `/sources/` page entry exists
