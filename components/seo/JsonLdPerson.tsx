import { AUTHOR, SITE } from '@/lib/seo/site';

const KNOWS_ABOUT = [
  'Residential HVAC sizing',
  'ACCA Manual J load calculation',
  'ACCA Manual S equipment selection',
  'ACCA Manual D duct design',
  'Heat pump systems',
  'Cold-climate heat pumps',
  'Building science',
  'Residential energy efficiency',
  'Psychrometrics',
];

export function JsonLdPerson() {
  const json = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: AUTHOR.name,
    url: `${SITE.url}${AUTHOR.url}`,
    description: AUTHOR.shortBio,
    knowsAbout: KNOWS_ABOUT,
    worksFor: {
      '@type': 'Organization',
      name: SITE.name,
      url: `${SITE.url}/`,
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
