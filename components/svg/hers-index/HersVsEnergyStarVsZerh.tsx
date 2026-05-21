import { SvgWrapper } from '../SvgWrapper';
import { colors, typography } from '../tokens';

const FONT = typography.fontFamily;

interface ColumnProps {
  x: number;
  title: string;
  subtitle: string;
  badge: string;
  badgeColor: string;
  outputType: string;
  whoIssues: string;
  whatMeasured: string;
  thresholds: string;
  certifies: string;
  highlightTitle: boolean;
}

function Column({ x, title, subtitle, badge, badgeColor, outputType, whoIssues, whatMeasured, thresholds, certifies, highlightTitle }: ColumnProps) {
  return (
    <g transform={`translate(${x},80)`}>
      <rect width={300} height={440} rx={10} fill={colors.surface.canvas} stroke={highlightTitle ? badgeColor : colors.ink[300]} strokeWidth={highlightTitle ? 2.5 : 1.5} />

      <text x={150} y={36} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.axisLabel} fontWeight={typography.weight.title} fill={highlightTitle ? badgeColor : colors.ink[900]}>
        {title}
      </text>
      <text x={150} y={56} textAnchor="middle" fontFamily={FONT} fontSize={11} fontStyle="italic" fill={colors.ink[500]}>
        {subtitle}
      </text>

      <g transform="translate(70,72)">
        <rect width={160} height={26} rx={13} fill={badgeColor} fillOpacity={0.18} stroke={badgeColor} strokeWidth={1.5} />
        <text x={80} y={17} textAnchor="middle" fontFamily={FONT} fontSize={11} fontWeight={typography.weight.title} fill={badgeColor}>
          {badge}
        </text>
      </g>

      <g transform="translate(20,120)">
        <text fontFamily={FONT} fontSize={11} fontWeight={typography.weight.title} fill={colors.ink[900]}>
          Output type
        </text>
        <foreignObject x={0} y={6} width={260} height={40}>
          <div style={{ fontFamily: FONT, fontSize: 11, color: '#334155', lineHeight: '1.4' }}>{outputType}</div>
        </foreignObject>

        <text y={64} fontFamily={FONT} fontSize={11} fontWeight={typography.weight.title} fill={colors.ink[900]}>
          Who issues it
        </text>
        <foreignObject x={0} y={70} width={260} height={40}>
          <div style={{ fontFamily: FONT, fontSize: 11, color: '#334155', lineHeight: '1.4' }}>{whoIssues}</div>
        </foreignObject>

        <text y={128} fontFamily={FONT} fontSize={11} fontWeight={typography.weight.title} fill={colors.ink[900]}>
          What it measures
        </text>
        <foreignObject x={0} y={134} width={260} height={56}>
          <div style={{ fontFamily: FONT, fontSize: 11, color: '#334155', lineHeight: '1.4' }}>{whatMeasured}</div>
        </foreignObject>

        <text y={208} fontFamily={FONT} fontSize={11} fontWeight={typography.weight.title} fill={colors.ink[900]}>
          Thresholds
        </text>
        <foreignObject x={0} y={214} width={260} height={48}>
          <div style={{ fontFamily: FONT, fontSize: 11, color: '#334155', lineHeight: '1.4' }}>{thresholds}</div>
        </foreignObject>

        <text y={282} fontFamily={FONT} fontSize={11} fontWeight={typography.weight.title} fill={colors.ink[900]}>
          Used for
        </text>
        <foreignObject x={0} y={288} width={260} height={48}>
          <div style={{ fontFamily: FONT, fontSize: 11, color: '#334155', lineHeight: '1.4' }}>{certifies}</div>
        </foreignObject>
      </g>
    </g>
  );
}

export function HersVsEnergyStarVsZerh({ className }: { className?: string }) {
  return (
    <figure className={`not-prose my-8 ${className ?? ''}`}>
      <SvgWrapper
        viewBox="0 0 1000 580"
        titleId="hers-vs-energy-star-vs-zerh-title"
        descId="hers-vs-energy-star-vs-zerh-desc"
        title="HERS Index compared to ENERGY STAR Certified New Home and DOE Zero Energy Ready Home"
        desc="Three-column comparison matrix. Column 1 HERS Index: scale 0 to 200 plus, issued by RESNET-certified raters, measures whole-home energy performance versus reference home, output is a numeric score, used for code compliance, tax credits, and benchmarking. Column 2 ENERGY STAR Certified New Home: pass-fail certification, issued by ENERGY STAR partner verifier, measures envelope, mechanical, ducts and lighting against specific thresholds including HERS, output is a certification. Column 3 DOE Zero Energy Ready Home: pass-fail certification, issued by DOE-approved verifier, measures ENERGY STAR requirements plus tighter envelope, indoor air quality, and ready for renewables, output is certification. HERS is the underlying score; ENERGY STAR and ZERH are certifications using HERS as one criterion."
        className="w-full"
      >
        <rect width={1000} height={580} fill={colors.surface.canvas} />

        <text x={500} y={36} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.chartTitle} fontWeight={typography.weight.title} fill={colors.ink[900]}>
          HERS Index vs ENERGY STAR vs DOE Zero Energy Ready Home
        </text>
        <text x={500} y={58} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fill={colors.ink[500]}>
          One is a number, the other two are certifications
        </text>

        <Column
          x={20}
          title="HERS Index"
          subtitle="(the score itself)"
          badge="NUMERIC SCORE"
          badgeColor={colors.brand.primary}
          outputType="A number 0 to 200+. Lower = better."
          whoIssues="RESNET-certified HERS rater."
          whatMeasured="Whole-home modeled annual energy use vs 2006 reference home."
          thresholds="No pass/fail. The score is the result."
          certifies="Code compliance, tax credit qualification, benchmarking, ENERGY STAR / ZERH input."
          highlightTitle={true}
        />

        <Column
          x={340}
          title="ENERGY STAR Cert."
          subtitle="(new home program)"
          badge="PASS / FAIL"
          badgeColor={colors.good}
          outputType="A certification label. Either earned or not."
          whoIssues="ENERGY STAR partner verifier (uses HERS rater data)."
          whatMeasured="Envelope, ducts, mechanical, lighting, plus HERS threshold for climate."
          thresholds="HERS typically 50-60 by climate zone, plus 30+ checklist items."
          certifies="Marketing, $2,500 federal 45L credit, utility rebates."
          highlightTitle={false}
        />

        <Column
          x={660}
          title="DOE Zero Energy Ready"
          subtitle="(tighter program)"
          badge="PASS / FAIL"
          badgeColor={colors.brand.accent}
          outputType="A certification label. Either earned or not."
          whoIssues="DOE-approved verifier (uses HERS rater data)."
          whatMeasured="ENERGY STAR + tighter envelope + IAQ + electric-ready + WaterSense."
          thresholds="HERS typically 30-45 by climate, plus extensive checklist."
          certifies="Marketing, $5,000 federal 45L credit, premium utility rebates."
          highlightTitle={false}
        />

        <text x={500} y={550} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fontStyle="italic" fill={colors.ink[500]}>
          The HERS Index is the input. The two certifications layer additional requirements on top of the HERS threshold.
        </text>
      </SvgWrapper>
      <figcaption className="mt-2 text-center text-sm text-ink-500">
        HERS is the number on the report. ENERGY STAR and DOE ZERH are pass-fail certifications that use HERS plus additional criteria.
      </figcaption>
    </figure>
  );
}
