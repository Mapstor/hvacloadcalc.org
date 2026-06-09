import { SITE } from '@/lib/seo/site';

export interface SoftwareApplicationData {
  /** Calculator name (typically the H1). */
  name: string;
  /** One-line description shown in SERP. */
  description: string;
  /** Canonical URL path (e.g., '/tools/btu-calculator/'). */
  url: string;
  /** Optional list of feature bullet points for richer schema. */
  featureList?: string[];
}

interface Props {
  application: SoftwareApplicationData;
}

/**
 * Emits Schema.org SoftwareApplication JSON-LD for free calculators.
 *
 * Per Schema.org SoftwareApplication:
 *   https://schema.org/SoftwareApplication
 *
 * Notes:
 *   - applicationCategory "UtilitiesApplication" is the most fitting bucket
 *     for sizing calculators.
 *   - operatingSystem "Any" indicates browser-based.
 *   - offers.price "0" with priceCurrency "USD" marks the tool as free,
 *     which is required by Google for the SoftwareApplication rich result
 *     to surface a "Free" badge.
 *   - aggregateRating is intentionally omitted. Inventing review counts
 *     would violate Google's structured-data guidelines and Schema.org spec.
 */
export function JsonLdSoftwareApplication({ application }: Props) {
  const json: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: application.name,
    description: application.description,
    url: `${SITE.url}${application.url}`,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    browserRequirements: 'Requires JavaScript enabled',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      url: `${SITE.url}/`,
    },
    inLanguage: 'en-US',
  };

  if (application.featureList && application.featureList.length > 0) {
    json.featureList = application.featureList;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
