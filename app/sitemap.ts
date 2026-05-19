import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/seo/site';

const STATIC_PATHS = [
  '/',
  '/heat-pump/',
  '/ac/',
  '/furnace/',
  '/manual-j/',
  '/manual-s/',
  '/manual-d/',
  '/manual-t/',
  '/building-science/',
  '/tools/',
  '/glossary/',
  '/methodology/',
  '/editorial-standards/',
  '/sources/',
  '/corrections/',
  '/contact/',
  '/authors/jonathan-s/',
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();
  return STATIC_PATHS.map((path) => ({
    url: `${SITE.url}${path}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: path === '/' ? 1 : 0.6,
  }));
}
