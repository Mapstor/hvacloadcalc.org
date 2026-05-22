import { SITE } from '@/lib/seo/site';

export interface HowToStep {
  /** Short step name (becomes <h3> in many SERPs). */
  name: string;
  /** Step instruction text. */
  text: string;
}

export interface HowToData {
  /** HowTo name (typically the procedure goal). */
  name: string;
  /** One-line description for SERP preview. */
  description: string;
  /** Ordered steps. */
  steps: HowToStep[];
  /** Optional total time hint, ISO 8601 duration (e.g., "PT30M"). */
  totalTime?: string;
  /** Optional tools needed. */
  tools?: string[];
  /** Optional supplies needed. */
  supplies?: string[];
}

interface Props {
  howTo: HowToData;
}

/**
 * Emits Schema.org HowTo JSON-LD. Eligible for the "How to" rich result
 * in Google search when the page also passes content-quality checks.
 *
 * Per Schema.org HowTo spec:
 *   https://schema.org/HowTo
 * Per Google's structured-data guidelines:
 *   https://developers.google.com/search/docs/appearance/structured-data/how-to
 */
export function JsonLdHowTo({ howTo }: Props) {
  const json: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: howTo.name,
    description: howTo.description,
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      url: `${SITE.url}/`,
    },
    step: howTo.steps.map((step, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: step.name,
      text: step.text,
    })),
  };

  if (howTo.totalTime) {
    json.totalTime = howTo.totalTime;
  }
  if (howTo.tools && howTo.tools.length > 0) {
    json.tool = howTo.tools.map((name) => ({ '@type': 'HowToTool', name }));
  }
  if (howTo.supplies && howTo.supplies.length > 0) {
    json.supply = howTo.supplies.map((name) => ({ '@type': 'HowToSupply', name }));
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
