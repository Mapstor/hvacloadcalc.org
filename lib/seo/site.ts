export const SITE = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hvacloadcalc.org',
  name: 'hvacloadcalc.org',
  description:
    'Educational HVAC reference covering load calculation, heat pump sizing, and building science.',
  shortDescription: 'Educational HVAC sizing reference site.',
  /** Short header tagline. Single line, ≤45 characters. */
  tagline: 'Sourced HVAC sizing for homeowners',
  /** Full positioning statement for hero/about contexts. */
  longTagline:
    'Manual J load calculation, equipment sizing, and building science — every claim sourced to ACCA, ASHRAE, AHRI.',
  copyrightYear: 2026,
} as const;

export const FOOTER_DISCLAIMER =
  'hvacloadcalc.org provides educational information about residential HVAC systems. Content is not professional engineering advice. Consult a licensed HVAC contractor for system design, equipment specification, and permit-grade load calculations.';

export const AUTHOR = {
  name: 'Jonathan Stowe',
  url: '/authors/jonathan-s/',
  imageUrl: '/authors/jonathan-stowe.jpg',
  imageAlt: 'Jonathan Stowe, author and researcher at hvacloadcalc.org',
  shortBio:
    'Jonathan Stowe writes about residential HVAC design, building science, and heat pump installation, translating ACCA standards into homeowner-friendly guidance.',
} as const;

export type NavItem = {
  label: string;
  href: string;
};

export const PRIMARY_NAV: readonly NavItem[] = [
  { label: 'Heat pump', href: '/heat-pump/' },
  { label: 'AC', href: '/ac/' },
  { label: 'Furnace', href: '/furnace/' },
  { label: 'Manual J', href: '/manual-j/' },
  { label: 'Building science', href: '/building-science/' },
  { label: 'Tools', href: '/tools/' },
  { label: 'Glossary', href: '/glossary/' },
] as const;

export const ALL_HUBS: readonly NavItem[] = [
  { label: 'Heat pump', href: '/heat-pump/' },
  { label: 'Air conditioner', href: '/ac/' },
  { label: 'Furnace', href: '/furnace/' },
  { label: 'Manual J', href: '/manual-j/' },
  { label: 'Manual S', href: '/manual-s/' },
  { label: 'Manual D', href: '/manual-d/' },
  { label: 'Manual T', href: '/manual-t/' },
  { label: 'Building science', href: '/building-science/' },
  { label: 'Tools', href: '/tools/' },
  { label: 'Glossary', href: '/glossary/' },
] as const;
