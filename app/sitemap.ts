import fs from 'node:fs';
import path from 'node:path';
import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/seo/site';
import { btuExamples } from './tools/btu-calculator/examples-manifest';
import { acSizeExamples } from './tools/ac-size-calculator/examples-manifest';
import { heatPumpExamples } from './tools/heat-pump-size-calculator/examples-manifest';
import { atticRValueExamples } from './tools/attic-r-value-calculator/examples-manifest';
import { manualJExamples } from './tools/manual-j-calculator/examples-manifest';

type Freq = MetadataRoute.Sitemap[number]['changeFrequency'];

type PageEntry = {
  path: string;
  priority: number;
  changeFrequency: Freq;
};

const HOMEPAGE: PageEntry = {
  path: '/',
  priority: 1.0,
  changeFrequency: 'daily',
};

const HUBS: PageEntry[] = [
  { path: '/heat-pump/', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/ac/', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/furnace/', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/manual-s/', priority: 0.7, changeFrequency: 'weekly' },
  { path: '/manual-d/', priority: 0.7, changeFrequency: 'weekly' },
  { path: '/manual-t/', priority: 0.7, changeFrequency: 'weekly' },
  { path: '/building-science/', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/building-science/insulation/', priority: 0.7, changeFrequency: 'weekly' },
  { path: '/building-science/windows/', priority: 0.7, changeFrequency: 'weekly' },
  { path: '/tools/', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/glossary/', priority: 0.6, changeFrequency: 'monthly' },
];

const ARTICLES: PageEntry[] = [
  { path: '/manual-j/', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/heat-pump/sizing/', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/heat-pump/aux-heat/', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/heat-pump/aux-heat/meaning/', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/heat-pump/cold-climate/defrost-cycle/', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/heat-pump/performance/seasonal-performance-factor/', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/ac/btu/chart/', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/ac/btu/garage-mini-split/', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/ac/short-cycling/', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/manual-d/return-air-sizing/', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/methodology/how-we-verify-manual-j/', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/building-science/hers-index/', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/building-science/insulation/attic-r-value/', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/building-science/psychrometrics/wet-bulb/', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/building-science/windows/u-factor/', priority: 0.7, changeFrequency: 'monthly' },
];

const CALCULATORS: PageEntry[] = [
  { path: '/tools/btu-calculator/', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/tools/ac-size-calculator/', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/tools/heat-pump-size-calculator/', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/tools/attic-r-value-calculator/', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/tools/manual-j-calculator/', priority: 0.9, changeFrequency: 'monthly' },
];

const META: PageEntry[] = [
  { path: '/about/', priority: 0.4, changeFrequency: 'monthly' },
  { path: '/methodology/', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/editorial-standards/', priority: 0.4, changeFrequency: 'yearly' },
  { path: '/sources/', priority: 0.4, changeFrequency: 'monthly' },
  { path: '/corrections/', priority: 0.3, changeFrequency: 'monthly' },
  { path: '/contact/', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/authors/jonathan-s/', priority: 0.5, changeFrequency: 'monthly' },
];

const LEGAL: PageEntry[] = [
  { path: '/privacy/', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/terms/', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/disclaimer/', priority: 0.3, changeFrequency: 'yearly' },
];

const CALCULATOR_EXAMPLES: PageEntry[] = [
  ...btuExamples.map(({ slug }) => ({
    path: `/tools/btu-calculator/examples/${slug}/`,
    priority: 0.7,
    changeFrequency: 'monthly' as const,
  })),
  ...acSizeExamples.map(({ slug }) => ({
    path: `/tools/ac-size-calculator/examples/${slug}/`,
    priority: 0.7,
    changeFrequency: 'monthly' as const,
  })),
  ...heatPumpExamples.map(({ slug }) => ({
    path: `/tools/heat-pump-size-calculator/examples/${slug}/`,
    priority: 0.7,
    changeFrequency: 'monthly' as const,
  })),
  ...atticRValueExamples.map(({ slug }) => ({
    path: `/tools/attic-r-value-calculator/examples/${slug}/`,
    priority: 0.7,
    changeFrequency: 'monthly' as const,
  })),
  ...manualJExamples.map(({ slug }) => ({
    path: `/tools/manual-j-calculator/examples/${slug}/`,
    priority: 0.7,
    changeFrequency: 'monthly' as const,
  })),
];

const ALL_PAGES: PageEntry[] = [
  HOMEPAGE,
  ...HUBS,
  ...ARTICLES,
  ...CALCULATORS,
  ...CALCULATOR_EXAMPLES,
  ...META,
  ...LEGAL,
];

const APP_ROOT = path.join(process.cwd(), 'app');

/**
 * Resolve the on-disk page file for a sitemap URL and return its mtime.
 *
 * Search order:
 *   1. Direct (app/<path>/page.mdx or page.tsx)
 *   2. Route groups (app/(hubs)/<path>/page.mdx, app/(legal)/<path>/page.mdx)
 *   3. Calculator example slug template (any slug under
 *      tools/<calc>/examples/[slug]/page.tsx, since each generated URL shares
 *      the same template source file)
 *
 * Returns build time as a safe fallback if no match is found.
 */
function resolveMtime(urlPath: string): Date {
  const cleaned = urlPath.replace(/^\/+|\/+$/g, '');

  if (cleaned === '') {
    return safeStat(path.join(APP_ROOT, 'page.tsx'));
  }

  // Calculator example pages: all share the [slug] template's mtime
  const exampleMatch = cleaned.match(
    /^tools\/([a-z0-9-]+-calculator)\/examples\/[^/]+$/,
  );
  if (exampleMatch) {
    const calc = exampleMatch[1];
    return safeStat(
      path.join(APP_ROOT, 'tools', calc, 'examples', '[slug]', 'page.tsx'),
    );
  }

  const candidates = [
    path.join(APP_ROOT, cleaned, 'page.mdx'),
    path.join(APP_ROOT, cleaned, 'page.tsx'),
    path.join(APP_ROOT, '(hubs)', cleaned, 'page.mdx'),
    path.join(APP_ROOT, '(legal)', cleaned, 'page.mdx'),
  ];

  for (const candidate of candidates) {
    try {
      return fs.statSync(candidate).mtime;
    } catch {
      // try next
    }
  }

  return new Date();
}

function safeStat(filePath: string): Date {
  try {
    return fs.statSync(filePath).mtime;
  } catch {
    return new Date();
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  return ALL_PAGES.map(({ path: urlPath, priority, changeFrequency }) => ({
    url: `${SITE.url}${urlPath}`,
    lastModified: resolveMtime(urlPath),
    changeFrequency,
    priority,
  }));
}
