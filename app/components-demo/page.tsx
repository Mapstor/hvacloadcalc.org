import type { Metadata } from 'next';
import { Container } from '@/components/layout/Container';
import { ArticleHeader } from '@/components/article/ArticleHeader';
import { KeyTakeaways } from '@/components/article/KeyTakeaways';
import { TableOfContents } from '@/components/article/TableOfContents';
import { FAQ } from '@/components/article/FAQ';
import { RelatedArticles } from '@/components/article/RelatedArticles';
import { Sources } from '@/components/article/Sources';
import { SourceCite } from '@/components/article/SourceCite';
import { AuthorByline } from '@/components/article/AuthorByline';
import { Callout } from '@/components/article/Callout';
import { DataTable, type DataTableColumn } from '@/components/data/DataTable';
import { HubGrid } from '@/components/hub/HubGrid';
import { HubCard } from '@/components/hub/HubCard';
import { SvgWrapper } from '@/components/svg/SvgWrapper';
import { ChartGrid } from '@/components/svg/ChartGrid';
import { ChartAxis } from '@/components/svg/ChartAxis';
import { DataSeries } from '@/components/svg/DataSeries';
import { Annotation } from '@/components/svg/Annotation';
import { colors } from '@/components/svg/tokens';
import type { Source, FaqItem, RelatedArticle, Heading } from '@/components/seo/types';

export const metadata: Metadata = {
  title: 'Components demo (internal)',
  description:
    'Internal demo page rendering every Gate 2 component for review. Not for production.',
  robots: { index: false, follow: false },
};

const SAMPLE_SOURCES: Source[] = [
  {
    id: 'acca-mj',
    title: 'ACCA Manual J 8th Edition — Residential Load Calculation',
    publisher: 'ACCA',
    year: 2016,
    url: 'https://www.acca.org/standards/technical-manuals/manual-j',
    accessed: '2026-05-18',
    tier: 1,
  },
  {
    id: 'ashrae-2021',
    title: 'ASHRAE Handbook of Fundamentals 2021',
    publisher: 'ASHRAE',
    year: 2021,
    url: 'https://www.ashrae.org/technical-resources/ashrae-handbook',
    accessed: '2026-05-18',
    tier: 1,
  },
  {
    id: 'neep-ccashp',
    title: 'NEEP Cold Climate Air Source Heat Pump Specification',
    publisher: 'NEEP',
    year: 2024,
    url: 'https://neep.org/heating-electrification/ccashp-specification-product-list',
    accessed: '2026-05-18',
    tier: 1,
  },
];

const SAMPLE_FAQ: FaqItem[] = [
  {
    q: 'What is auxiliary heat on a heat pump?',
    a: 'Auxiliary heat is supplemental electric resistance heat (or in a dual-fuel system, a gas furnace) that the heat pump engages when its compressor alone cannot meet the heating demand.',
  },
  {
    q: 'When should auxiliary heat run?',
    a: 'Aux heat is appropriate during defrost cycles, recovery from setbacks of more than 2°F, and outdoor temperatures below the system\'s balance point.',
  },
  {
    q: 'Is constant aux heat normal?',
    a: 'No. If aux heat runs continuously in mild weather, the most common causes are an oversized aux heat strip, an undersized heat pump, or a thermostat configured to engage aux heat too aggressively.',
  },
];

const SAMPLE_HEADINGS: Heading[] = [
  { id: 'sec-1', text: 'What auxiliary heat does', level: 2 },
  { id: 'sec-2', text: 'When it should run', level: 2 },
  { id: 'sec-2-1', text: 'Setback recovery', level: 3 },
  { id: 'sec-3', text: 'When it should not run', level: 2 },
];

const SAMPLE_RELATED: RelatedArticle[] = [
  {
    title: 'Heat pump balance point',
    url: '/heat-pump/cold-climate/balance-point/',
    description: 'The temperature below which auxiliary heat engages to meet demand.',
  },
  {
    title: 'Configuring aux heat on Ecobee thermostats',
    url: '/heat-pump/aux-heat/ecobee/',
    description: 'Staging walkthrough for Ecobee 3, 4, and Smart Premium models.',
  },
  {
    title: 'Defrost cycles and aux heat',
    url: '/heat-pump/cold-climate/defrost-cycle/',
    description: 'Why aux heat engages during defrost and how long the cycle lasts.',
  },
];

interface RValueRow extends Record<string, unknown> {
  zone: string;
  attic: string;
  walls: string;
}

const RVALUE_COLUMNS: DataTableColumn<RValueRow>[] = [
  { key: 'zone', label: 'Climate zone' },
  { key: 'attic', label: 'Attic R-value', align: 'right' },
  { key: 'walls', label: 'Walls R-value', align: 'right' },
];

const RVALUE_ROWS: RValueRow[] = [
  { zone: '3 (Atlanta)', attic: 'R-38', walls: 'R-13' },
  { zone: '4 (Kansas City)', attic: 'R-49', walls: 'R-13 to R-20' },
  { zone: '5 (Chicago)', attic: 'R-49 to R-60', walls: 'R-20 or R-13+5' },
  { zone: '6 (Minneapolis)', attic: 'R-60', walls: 'R-20+5' },
  { zone: '7 (Duluth)', attic: 'R-60', walls: 'R-20+5 to R-30' },
];

export default function ComponentsDemoPage() {
  return (
    <Container>
      <div className="py-12">
        <ArticleHeader
          h1="Components demo — Gate 2 review"
          description="Every component in the Gate 2 library renders on this page. Internal: excluded from search indexing."
          datePublished="2026-05-19"
          lastReviewed="2026-05-19"
          readingTimeMinutes={3}
        />

        <KeyTakeaways
          items={[
            'Each section below renders one or more components from the Gate 2 library.',
            'Every component uses design tokens from components/svg/tokens.ts.',
            'TypeScript strict mode: no `any`, all imports resolve through @/* path aliases.',
            'The page is excluded from search indexing via metadata.robots.',
          ]}
        />

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_240px]">
          <article className="prose prose-slate max-w-prose prose-headings:text-ink-900 prose-a:text-brand">
            <h2 id="sec-1">What auxiliary heat does</h2>
            <p>
              Heat pumps deliver less capacity as outdoor temperature falls. Below the balance
              point, the home&rsquo;s heat loss exceeds the heat pump&rsquo;s output and
              supplemental resistance heat (or a gas furnace in dual-fuel systems) must fill
              the gap.<SourceCite id="acca-mj" number={1} />
            </p>

            <h2 id="sec-2">When it should run</h2>
            <p>
              Aux heat is appropriate during defrost cycles, recovery from setbacks of more
              than 2°F, and outdoor temperatures below the system&rsquo;s balance
              point.<SourceCite id="ashrae-2021" number={2} />
            </p>
            <h3 id="sec-2-1">Setback recovery</h3>
            <p>
              Lifting setpoint by more than 2°F can trigger aux heat as the thermostat
              detects a fast-rise demand it can&rsquo;t satisfy with the compressor alone.
            </p>

            <h2 id="sec-3">When it should not run</h2>
            <p>
              Above the balance point, aux heat indicates a control problem rather than a
              load problem. Diagnostics start with thermostat staging settings and the
              relay wiring on the air handler.<SourceCite id="neep-ccashp" number={3} />
            </p>
          </article>

          <aside>
            <TableOfContents headings={SAMPLE_HEADINGS} sticky />
          </aside>
        </div>

        <Callout type="planning-grade" title="Planning-grade estimate">
          This calculator provides educational estimates based on industry-standard
          methodology. Results are not a substitute for an ACCA Manual J load calculation
          performed by a licensed HVAC contractor. Do not use for permit submission or
          equipment specification.
        </Callout>

        <div className="grid gap-4 md:grid-cols-2">
          <Callout type="info" title="Info">
            Context that helps the reader without implying urgency.
          </Callout>
          <Callout type="warn" title="Warning">
            A condition worth attention — e.g., oversized equipment risk.
          </Callout>
          <Callout type="danger" title="Danger">
            A safety-critical concern — e.g., refrigerant handling without certification.
          </Callout>
          <Callout type="good" title="Good practice">
            A confirmed sound approach worth following.
          </Callout>
        </div>

        <DataTable
          caption="DOE recommended insulation R-values by IECC climate zone (Energy Saver guidance)"
          columns={RVALUE_COLUMNS}
          rows={RVALUE_ROWS}
        />

        <section aria-labelledby="hub-demo-heading" className="mt-12">
          <h2
            id="hub-demo-heading"
            className="text-2xl font-bold text-ink-900"
          >
            HubGrid + HubCard
          </h2>
          <HubGrid ariaLabel="Sample hub cards">
            <HubCard
              title="Heat pump sizing"
              href="/heat-pump/sizing/"
              description="Compute heating and cooling loads, then translate to capacity at design temperature."
              badge="Wave 1"
            />
            <HubCard
              title="Aux heat explained"
              href="/heat-pump/aux-heat/"
              description="When aux heat is normal and when it signals a problem."
              badge="Wave 1"
            />
            <HubCard
              title="Manual J methodology"
              href="/manual-j/"
              description="The standard for residential load calculation."
            />
          </HubGrid>
        </section>

        <section aria-labelledby="svg-demo-heading" className="mt-12">
          <h2
            id="svg-demo-heading"
            className="text-2xl font-bold text-ink-900"
          >
            SVG primitives — balance point sketch
          </h2>
          <p className="mt-2 text-sm text-ink-500">
            Demonstrates SvgWrapper, ChartGrid, ChartAxis (x and y with rotation), DataSeries
            (two series with dots), and Annotation (text + dashed arrow).
          </p>
          <div className="mt-4 max-w-3xl">
            <SvgWrapper
              viewBox="0 0 800 500"
              titleId="demo-svg-title"
              descId="demo-svg-desc"
              title="Heat pump balance point sketch"
              desc="Sketch chart showing heat pump capacity (blue) declining and home heat loss (amber) rising as outdoor temperature drops; the intersection near 30 degrees Fahrenheit is the balance point."
              className="w-full"
            >
              <rect width="800" height="500" fill={colors.surface.canvas} />
              <ChartGrid xStart={70} xEnd={760} yStart={50} yEnd={420} xSteps={6} ySteps={5} />
              <ChartAxis
                orientation="x"
                start={70}
                end={760}
                perpendicular={420}
                label="Outdoor temperature (°F)"
                ticks={[
                  { position: 70, label: '0' },
                  { position: 185, label: '15' },
                  { position: 300, label: '30' },
                  { position: 415, label: '45' },
                  { position: 530, label: '60' },
                  { position: 645, label: '75' },
                  { position: 760, label: '90' },
                ]}
              />
              <ChartAxis
                orientation="y"
                start={50}
                end={420}
                perpendicular={70}
                label="kBTU/hr"
                ticks={[
                  { position: 50, label: '60' },
                  { position: 124, label: '48' },
                  { position: 198, label: '36' },
                  { position: 272, label: '24' },
                  { position: 346, label: '12' },
                  { position: 420, label: '0' },
                ]}
              />
              <DataSeries
                points={[
                  { x: 70, y: 100 },
                  { x: 185, y: 145 },
                  { x: 300, y: 195 },
                  { x: 415, y: 250 },
                  { x: 530, y: 305 },
                  { x: 645, y: 350 },
                  { x: 760, y: 395 },
                ]}
                color={colors.series.primary}
                showDots
              />
              <DataSeries
                points={[
                  { x: 70, y: 80 },
                  { x: 185, y: 130 },
                  { x: 300, y: 195 },
                  { x: 415, y: 270 },
                  { x: 530, y: 340 },
                  { x: 645, y: 400 },
                  { x: 760, y: 415 },
                ]}
                color={colors.series.secondary}
                showDots
              />
              <Annotation
                x={330}
                y={175}
                text="Balance point ~30°F"
                arrowTo={{ x: 302, y: 195 }}
              />
            </SvgWrapper>
          </div>
        </section>

        <FAQ items={SAMPLE_FAQ} />

        <RelatedArticles items={SAMPLE_RELATED} />

        <Sources sources={SAMPLE_SOURCES} />

        <section aria-labelledby="byline-demo-heading" className="mt-12">
          <h2
            id="byline-demo-heading"
            className="text-2xl font-bold text-ink-900"
          >
            AuthorByline (md and sm sizes)
          </h2>
          <div className="not-prose mt-4 flex flex-col gap-4">
            <AuthorByline lastReviewed="2026-05-19" />
            <AuthorByline lastReviewed="2026-05-19" size="sm" />
          </div>
        </section>
      </div>
    </Container>
  );
}
