import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/seo/site';

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

const ALL_PAGES: PageEntry[] = [
  HOMEPAGE,
  ...HUBS,
  ...ARTICLES,
  ...CALCULATORS,
  ...META,
  ...LEGAL,
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();
  return ALL_PAGES.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE.url}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
