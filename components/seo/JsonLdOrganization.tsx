import { SITE } from '@/lib/seo/site';

const KNOWS_ABOUT = [
  'HVAC',
  'Residential air conditioning',
  'Heat pump systems',
  'ACCA Manual J',
  'Building science',
  'Energy efficiency',
];

export function JsonLdOrganization() {
  const json = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.name,
    url: `${SITE.url}/`,
    description:
      'Educational HVAC reference site. Free calculators and methodology-transparent guides on heat pump sizing, load calculation, and building science.',
    foundingDate: '2026',
    knowsAbout: KNOWS_ABOUT,
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
