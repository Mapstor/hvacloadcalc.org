import { AUTHOR, SITE } from '@/lib/seo/site';
import type { ArticleFrontmatter } from './types';

interface Props {
  frontmatter: ArticleFrontmatter;
  wordCount?: number;
}

function toIsoZ(date: string): string {
  return date.includes('T') ? date : `${date}T00:00:00Z`;
}

export function JsonLdArticle({ frontmatter, wordCount }: Props) {
  const slug = frontmatter.url.replace(/\/+$/, '').split('/').pop() ?? 'index';

  const json: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: frontmatter.h1,
    alternativeHeadline: frontmatter.title,
    description: frontmatter.meta_description,
    image: [`${SITE.url}/og-images/${slug}.png`],
    datePublished: toIsoZ(frontmatter.date_published),
    dateModified: toIsoZ(frontmatter.last_reviewed),
    author: {
      '@type': 'Person',
      name: AUTHOR.name,
      url: `${SITE.url}${AUTHOR.url}`,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      url: `${SITE.url}/`,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE.url}${frontmatter.url}`,
    },
    inLanguage: 'en-US',
  };

  if (wordCount !== undefined) {
    json.wordCount = wordCount;
  }
  if (frontmatter.parent_title) {
    json.articleSection = frontmatter.parent_title;
  }

  const keywords = [
    frontmatter.target_keyword,
    ...(frontmatter.secondary_keywords ?? []),
  ].filter((k): k is string => Boolean(k));
  if (keywords.length > 0) {
    json.keywords = keywords.join(', ');
  }

  const citationUrls = (frontmatter.sources ?? [])
    .map((s) => s.url)
    .filter((u): u is string => Boolean(u));
  if (citationUrls.length > 0) {
    json.citation = citationUrls;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
