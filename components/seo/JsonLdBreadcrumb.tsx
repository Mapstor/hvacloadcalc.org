import { SITE } from '@/lib/seo/site';
import type { BreadcrumbItem } from '@/components/article/Breadcrumbs';

interface ListItemSchema {
  '@type': 'ListItem';
  position: number;
  name: string;
  item?: string;
}

interface Props {
  items: BreadcrumbItem[];
}

export function JsonLdBreadcrumb({ items }: Props) {
  const json = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx): ListItemSchema => {
      const entry: ListItemSchema = {
        '@type': 'ListItem',
        position: idx + 1,
        name: item.name,
      };
      if (item.url) {
        entry.item = `${SITE.url}${item.url}`;
      }
      return entry;
    }),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
