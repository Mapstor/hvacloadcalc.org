import { acSizeExamples } from '@/app/tools/ac-size-calculator/examples-manifest';
import { atticRValueExamples } from '@/app/tools/attic-r-value-calculator/examples-manifest';
import { btuExamples } from '@/app/tools/btu-calculator/examples-manifest';
import { heatPumpExamples } from '@/app/tools/heat-pump-size-calculator/examples-manifest';
import { manualJExamples } from '@/app/tools/manual-j-calculator/examples-manifest';

/**
 * Build-time inventory counts surfaced across the site (homepage, author page,
 * about, tools hub). Centralized here so the "we have N articles / N hubs /
 * N worked examples" statements do not drift across pages as the inventory
 * changes. Numbers derived from the source of truth wherever possible — the
 * worked-example count is summed directly from the manifests rather than
 * hand-maintained.
 *
 * Update the hub and article counts here when content is added. The annual
 * editorial review covers a sweep of these constants against the live route
 * tree to catch silent drift.
 */
export const INVENTORY = {
  hubs: 11,
  inDepthArticles: 15,
  glossaryTermsApprox: 60,
  calculators: 5,
  workedExamples:
    acSizeExamples.length +
    atticRValueExamples.length +
    btuExamples.length +
    heatPumpExamples.length +
    manualJExamples.length,
  perCalculatorExamples: {
    btu: btuExamples.length,
    acSize: acSizeExamples.length,
    heatPump: heatPumpExamples.length,
    atticRValue: atticRValueExamples.length,
    manualJ: manualJExamples.length,
  },
} as const;
