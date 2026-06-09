import { AUTHOR, SITE } from '@/lib/seo/site';

export interface LearningResourceData {
  /** Resource name (typically the H1). */
  name: string;
  /** One-line description. */
  description: string;
  /** Canonical URL path. */
  url: string;
  /** Subject matter the resource teaches (e.g., 'Manual J load calculation methodology'). */
  about: string;
  /** Optional educational level (one of: Beginner, Intermediate, Advanced). */
  educationalLevel?: 'Beginner' | 'Intermediate' | 'Advanced';
  /** Resource type (Reference Material, Tutorial, etc.). */
  learningResourceType?: string;
  /** Publication date ISO 8601 (e.g., '2026-05-30'). */
  datePublished?: string;
  /** Last reviewed date ISO 8601. */
  dateModified?: string;
}

interface Props {
  resource: LearningResourceData;
}

/**
 * Emits Schema.org LearningResource JSON-LD for educational content like
 * methodology articles and reference documentation.
 *
 * Per Schema.org LearningResource:
 *   https://schema.org/LearningResource
 *
 * LearningResource is a child of CreativeWork that indicates the page teaches
 * something. Useful for methodology pages, reference guides, and how-to
 * articles where the educational angle is primary. Distinct from Article
 * (which emphasizes news/journalism) and Course (which implies enrollment).
 */
export function JsonLdLearningResource({ resource }: Props) {
  const json: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    name: resource.name,
    description: resource.description,
    url: `${SITE.url}${resource.url}`,
    about: resource.about,
    learningResourceType: resource.learningResourceType ?? 'Reference Material',
    educationalLevel: resource.educationalLevel ?? 'Intermediate',
    inLanguage: 'en-US',
    isFamilyFriendly: true,
    isAccessibleForFree: true,
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
    audience: {
      '@type': 'Audience',
      audienceType: 'Homeowners, HVAC students, energy auditors, building professionals',
    },
  };

  if (resource.datePublished) {
    json.datePublished = resource.datePublished;
  }
  if (resource.dateModified) {
    json.dateModified = resource.dateModified;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
