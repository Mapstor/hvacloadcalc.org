import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Breadcrumbs } from '@/components/article/Breadcrumbs';
import { KeyTakeaways } from '@/components/article/KeyTakeaways';
import { Callout } from '@/components/article/Callout';
import { DataTable } from '@/components/data/DataTable';
import { FAQ } from '@/components/article/FAQ';
import { JsonLdBreadcrumb } from '@/components/seo/JsonLdBreadcrumb';

const BREADCRUMBS = [{ name: 'Home', url: '/' }, { name: 'Contact' }];

const CONTACT_EMAIL = 'info@hvacloadcalc.org';

export const metadata: Metadata = {
  alternates: { canonical: '/contact/' },
  title: 'Contact hvacloadcalc.org: How to Reach the Site and What to Expect',
  description:
    'Contact hvacloadcalc.org by email at info@hvacloadcalc.org. Category guidance for correction reports, methodology questions, accessibility issues, topic suggestions, press inquiries, and privacy requests with response timelines.',
  openGraph: {
    title: 'Contact hvacloadcalc.org',
    description:
      'Single contact channel: info@hvacloadcalc.org. Categories: corrections, methodology questions, accessibility, press, privacy. Response timelines documented.',
    type: 'article',
    images: ['/opengraph-image'],
  },
};

const CATEGORY_GUIDANCE = [
  {
    category: 'Correction',
    description: 'Factual, numeric, or methodology error in a published article or calculator',
    response: 'Acknowledged within 14 days; logged at /corrections/ when implemented',
    bestInput: 'Article URL + exact quoted text + corrected text + supporting primary source',
  },
  {
    category: 'Methodology question',
    description: 'How a specific formula or default was chosen, or how to interpret calculator output',
    response: 'Response within 30 days for substantive questions',
    bestInput: 'Specific calculator URL + input values you tried + question about output interpretation',
  },
  {
    category: 'Accessibility issue',
    description: 'Difficulty using the site with screen reader, keyboard navigation, mobile, or specific browser',
    response: 'Treated as a bug; fix attempted within 30 days',
    bestInput: 'Page URL + assistive technology used (VoiceOver, NVDA, keyboard-only) + specific problem',
  },
  {
    category: 'Topic suggestion',
    description: 'Suggestion for a topic not yet covered on the site',
    response: 'Informs editorial roadmap; no individual response guaranteed',
    bestInput: 'Topic + why it would help readers + (if known) primary sources that cover it',
  },
  {
    category: 'Press / Outreach',
    description: 'Press inquiry, podcast invitation, or research collaboration',
    response: 'Response within 14 days when in scope',
    bestInput: 'Publication or program + topic + timeline + permission to reference the site by name',
  },
  {
    category: 'Privacy',
    description: 'Privacy concern, GDPR or CCPA request, legal takedown notice, or DMCA',
    response: 'Acknowledged within 7 days; processed per applicable law',
    bestInput: 'Specific URL + nature of request + legal basis if applicable',
  },
  {
    category: 'Other',
    description: 'Anything else that does not fit the categories above',
    response: 'Response time depends on category',
    bestInput: 'Clear description of what you need help with',
  },
];

const FAQ_ITEMS = [
  {
    q: 'Will you do a Manual J for my specific house?',
    a: "No. The site does not provide individual Manual J consultations on a paid or unpaid basis. The calculators on the site produce planning-grade output sufficient for evaluating contractor quotes and understanding magnitudes. For permit-grade Manual J on a specific home, hire a credentialed party (HVAC contractor with ACCA-approved software, or an independent HERS rater). Expected cost is $300-$800 depending on home complexity.",
  },
  {
    q: 'Will you recommend a contractor in my area?',
    a: 'No. The site does not maintain a contractor directory, does not receive referral fees, and does not have visibility into contractors in any specific area. For finding contractors, the most useful starting points are: state HVAC licensing board lists (typically searchable by zip code), ACCA member directory (acca.org), NEEP CCASHP installer locator for cold-climate heat pump work, and your state energy office HEEHRA-participating contractor list. Verify any contractor against your state licensing board before signing.',
  },
  {
    q: 'Can you recommend a specific equipment brand or model?',
    a: 'No, because equipment selection for a specific home depends on local climate, electricity and gas prices, contractor availability, and other factors the site cannot evaluate from an email exchange. The content points at authoritative product lists (ENERGY STAR Most Efficient, NEEP CCASHP product list, AHRI Directory) where every qualifying model is published with independently-verified specs — those lists are more reliable than any opinion the site could offer.',
  },
  {
    q: 'How fast do you respond to email?',
    a: 'Depends on category. Correction reports: acknowledged within 14 days. Methodology questions: response within 30 days for substantive questions. Accessibility issues: investigated within 30 days. Privacy/takedown: acknowledged within 7 days. Topic suggestions: informs the editorial roadmap but individual response not guaranteed. Press inquiries: response within 14 days when in scope.',
  },
  {
    q: 'Do you accept guest articles?',
    a: 'Not currently. The editorial voice and quality bar require careful single-author maintenance. We do welcome corrections, methodology feedback, and topic suggestions by email, but full article contributions are outside scope. If you have written content that you think would fit the site\'s editorial standards, you can describe it in a topic suggestion email for editorial consideration.',
  },
  {
    q: 'Is there a phone number, contact form, or physical address?',
    a: 'No. Email at info@hvacloadcalc.org is the sole communication channel. Owner identity and address are on file with hosting and infrastructure providers and disclosed where legally required. For editorial purposes, email is sufficient — the site is not large enough to support phone support, and other channels would create message-fragmentation problems.',
  },
];

export default function ContactPage() {
  return (
    <>
      <JsonLdBreadcrumb items={BREADCRUMBS} />
      <Container>
        <div className="py-12 md:py-16">
          <Breadcrumbs items={BREADCRUMBS} />

          <header className="not-prose mb-8">
            <h1 className="text-3xl font-bold text-ink-900 sm:text-4xl">
              Contact hvacloadcalc.org
            </h1>
            <p className="mt-4 max-w-prose text-lg text-ink-700">
              Single contact channel: <a href={`mailto:${CONTACT_EMAIL}`} className="text-brand hover:underline">{CONTACT_EMAIL}</a>.
              Use it for correction reports, methodology questions, accessibility issues,
              topic suggestions, press inquiries, and privacy or takedown requests. Category-specific
              guidance and response timelines documented below.
            </p>
          </header>

          <div className="my-10 max-w-prose rounded-lg border border-brand bg-brand/5 p-6">
            <p className="text-sm uppercase tracking-wide text-ink-500">Email the site</p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-2 block text-2xl font-bold text-brand hover:underline sm:text-3xl"
            >
              {CONTACT_EMAIL}
            </a>
            <p className="mt-3 text-sm text-ink-700">
              Choose a subject line that matches one of the categories below
              (Correction, Methodology question, Accessibility issue, Topic suggestion,
              Press / Outreach, Privacy, Other) — it helps prioritize and route the message.
            </p>
          </div>

          <KeyTakeaways
            items={[
              `Email info@hvacloadcalc.org for all communication with the site — correction reports, methodology questions, accessibility issues, topic suggestions, press inquiries, and privacy/takedown requests.`,
              'Correction reports get fastest resolution when they include: article URL, exact quoted text, proposed corrected text, supporting primary source. Acknowledgment within 14 days; correction logged at /corrections/ when implemented.',
              'The site does not provide: individual Manual J consultations, contractor referrals, equipment brand recommendations, paid sizing services, or repair/installation guidance for specific homes.',
              'Reporter attribution on corrections is opt-in: default is no attribution unless the reporter explicitly requests it by writing "attribute as [name, affiliation]" in their message. Privacy is the default; visibility requires consent.',
              'The site is small. Routine questions may receive only acknowledgment without detailed individual response — but substantive correction reports and methodology feedback are always read and processed.',
            ]}
          />

          <section className="mt-16 max-w-prose">
            <h2 className="text-2xl font-bold text-ink-900">
              What this site can and cannot help with
            </h2>
            <p className="mt-3 text-ink-700">
              Email contact is designed for editorial feedback (corrections, methodology
              questions, accessibility issues, topic suggestions) and a few specific
              administrative categories (press inquiries, privacy/takedown). Categories
              the site does NOT help with are listed below so the inbox does not become a
              dead-letter office for misdirected requests.
            </p>
          </section>

          <DataTable
            caption="What the site does (yes) and does not (no) help with by email"
            columns={[
              { key: 'request', label: 'Request type' },
              { key: 'response', label: 'Response' },
            ]}
            rows={[
              { request: 'Report a factual or methodology error in published content', response: 'Yes — acknowledged within 14 days, logged at /corrections/' },
              { request: 'Ask a methodology question about how a calculator computes', response: 'Yes — response within 30 days for substantive questions' },
              { request: 'Report an accessibility issue (screen reader, mobile, keyboard)', response: 'Yes — treated as a bug, fix attempted within 30 days' },
              { request: 'Suggest a topic for future coverage', response: 'Yes — informs editorial roadmap, no individual response guaranteed' },
              { request: 'Press inquiry, podcast invitation, research collaboration', response: 'Yes — response within 14 days when in scope' },
              { request: 'Privacy concern, takedown notice, or DMCA request', response: 'Yes — acknowledged within 7 days, processed per applicable law' },
              { request: '"What size heat pump do I need for my house?"', response: 'No — use the calculators at /tools/heat-pump-size-calculator/; we do not provide individual consultations' },
              { request: '"Can you recommend a contractor near me?"', response: 'No — use state HVAC licensing board lists, ACCA member directory, or your state energy office HEEHRA-participating contractor list' },
              { request: '"Which brand should I buy?"', response: 'No — see ENERGY STAR Most Efficient, NEEP CCASHP product list, or AHRI Directory for authoritative product information' },
              { request: '"My AC is making a strange noise, what is wrong?"', response: 'No — call a licensed HVAC contractor for diagnostic service; the site does not provide remote diagnostics' },
              { request: '"I want to learn HVAC professionally — how do I start?"', response: 'No — contact your state HVAC trade association or community college HVAC program; the site is not a training resource for credentialing' },
              { request: '"Can I purchase a sizing consultation or paid Manual J?"', response: 'No — for site-specific Manual J, hire a credentialed contractor or HERS rater using ACCA-approved software' },
            ]}
          />

          <section className="mt-16 max-w-prose">
            <h2 className="text-2xl font-bold text-ink-900">
              Subject line guidance
            </h2>
            <p className="mt-3 text-ink-700">
              Using a clear subject line ensures the message is routed appropriately and
              processed with the right priority. The guidance below describes each category,
              the expected response timeline, and the input that produces the fastest resolution.
            </p>
          </section>

          <DataTable
            caption="Email subject categories with response timelines"
            columns={[
              { key: 'category', label: 'Subject line' },
              { key: 'description', label: 'When to use' },
              { key: 'response', label: 'Response' },
              { key: 'bestInput', label: 'Best input for fast resolution' },
            ]}
            rows={CATEGORY_GUIDANCE}
          />

          <section className="mt-16 max-w-prose">
            <h2 className="text-2xl font-bold text-ink-900">
              How correction reports are processed
            </h2>
            <p className="mt-3 text-ink-700">
              Correction reports are the highest-priority category. The process is
              deliberate and documented at <Link href="/corrections/" className="text-brand hover:underline">/corrections/</Link>.
            </p>
          </section>

          <ol className="mt-6 max-w-prose space-y-4 text-ink-700">
            <li>
              <strong className="text-ink-900">Step 1: Send.</strong> Email
              {' '}<a href={`mailto:${CONTACT_EMAIL}?subject=Correction`} className="text-brand hover:underline">{CONTACT_EMAIL}</a>{' '}
              with subject "Correction" and include the article URL, the exact quoted
              original text, your proposed corrected text, and the primary source
              supporting the correction.
            </li>
            <li>
              <strong className="text-ink-900">Step 2: Acknowledge (within 14 days).</strong>
              {' '}We confirm receipt and indicate the expected processing timeline based on
              severity (critical safety: 14 days; material methodology: 30 days; typo: 7
              days).
            </li>
            <li>
              <strong className="text-ink-900">Step 3: Verify.</strong> The cited primary
              source is checked. If the source supports the correction, the article is
              updated. If the source is ambiguous or contests the correction, we may
              respond with follow-up questions before implementing.
            </li>
            <li>
              <strong className="text-ink-900">Step 4: Implement.</strong> The article is
              updated, the last-reviewed date refreshed, and the correction logged at{' '}
              <Link href="/corrections/" className="text-brand hover:underline">
                /corrections/
              </Link>{' '}
              with original claim, corrected claim, date, and supporting source.
            </li>
            <li>
              <strong className="text-ink-900">Step 5: Attribute (with consent).</strong>
              {' '}If the reporter opted in to attribution (by writing "attribute as [name,
              affiliation]" in the original message), the correction log entry includes the
              attribution. Default is no attribution unless explicitly requested.
            </li>
          </ol>

          <Callout type="info" title="Why opt-in attribution by default">
            Some reporters prefer not to be publicly associated with their HVAC commentary
            (industry practitioners commenting on a competitor's resource, for example).
            The opt-in default treats privacy as the safer assumption. Reporters who want
            public credit can affirmatively request it; the credit is given when requested
            without question.
          </Callout>

          <section className="mt-16 max-w-prose">
            <h2 className="text-2xl font-bold text-ink-900">Privacy and data requests</h2>
            <p className="mt-3 text-ink-700">
              For GDPR, CCPA, or equivalent privacy requests — access, correction, deletion,
              portability, opt-out — email{' '}
              <a href={`mailto:${CONTACT_EMAIL}?subject=Privacy`} className="text-brand hover:underline">
                {CONTACT_EMAIL}
              </a>{' '}
              with subject "Privacy" and describe the request. Acknowledgment within 7 days;
              substantive response within 30 days. See the{' '}
              <Link href="/privacy/" className="text-brand hover:underline">privacy policy</Link>
              {' '}for what data is held and how it is processed.
            </p>
          </section>

          <section className="mt-16">
            <FAQ items={FAQ_ITEMS} />
          </section>
        </div>
      </Container>
    </>
  );
}
