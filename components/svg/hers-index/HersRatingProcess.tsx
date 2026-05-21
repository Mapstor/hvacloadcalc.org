import { SvgWrapper } from '../SvgWrapper';
import { colors, typography } from '../tokens';

const FONT = typography.fontFamily;

interface StepProps {
  x: number;
  num: number;
  title: string;
  description: string;
  icon: 'hire' | 'inspect' | 'test' | 'model' | 'certify';
}

function StepIcon({ icon }: { icon: StepProps['icon'] }) {
  switch (icon) {
    case 'hire':
      return (
        <g>
          <circle cx={30} cy={30} r={26} fill={colors.brand.primary} fillOpacity={0.15} stroke={colors.brand.primary} strokeWidth={2} />
          <circle cx={22} cy={24} r={8} fill={colors.brand.primary} />
          <path d="M 12 44 Q 22 36 32 44" fill="none" stroke={colors.brand.primary} strokeWidth={3} />
          <circle cx={42} cy={20} r={6} fill={colors.good} />
          <path d="M 38 20 L 42 24 L 48 16" fill="none" stroke={colors.surface.canvas} strokeWidth={2} />
        </g>
      );
    case 'inspect':
      return (
        <g>
          <circle cx={30} cy={30} r={26} fill={colors.warn} fillOpacity={0.15} stroke={colors.warn} strokeWidth={2} />
          <rect x={14} y={18} width={32} height={24} fill="none" stroke={colors.warn} strokeWidth={2} />
          <line x1={14} y1={26} x2={46} y2={26} stroke={colors.warn} strokeWidth={1.5} />
          <line x1={20} y1={32} x2={40} y2={32} stroke={colors.warn} strokeWidth={1.5} />
          <line x1={20} y1={36} x2={40} y2={36} stroke={colors.warn} strokeWidth={1.5} />
        </g>
      );
    case 'test':
      return (
        <g>
          <circle cx={30} cy={30} r={26} fill={colors.danger} fillOpacity={0.15} stroke={colors.danger} strokeWidth={2} />
          {/* Blower door style */}
          <rect x={18} y={14} width={24} height={32} fill="none" stroke={colors.danger} strokeWidth={2} />
          <circle cx={30} cy={30} r={8} fill="none" stroke={colors.danger} strokeWidth={2} />
          <line x1={30} y1={22} x2={30} y2={38} stroke={colors.danger} strokeWidth={1.5} />
          <line x1={22} y1={30} x2={38} y2={30} stroke={colors.danger} strokeWidth={1.5} />
        </g>
      );
    case 'model':
      return (
        <g>
          <circle cx={30} cy={30} r={26} fill={colors.brand.accent} fillOpacity={0.15} stroke={colors.brand.accent} strokeWidth={2} />
          <rect x={12} y={16} width={36} height={24} rx={2} fill="none" stroke={colors.brand.accent} strokeWidth={2} />
          <line x1={26} y1={40} x2={34} y2={40} stroke={colors.brand.accent} strokeWidth={2} />
          <line x1={22} y1={46} x2={38} y2={46} stroke={colors.brand.accent} strokeWidth={2} />
          <text x={30} y={32} textAnchor="middle" fontFamily={FONT} fontSize={9} fontWeight={typography.weight.title} fill={colors.brand.accent}>
            HERS
          </text>
        </g>
      );
    case 'certify':
      return (
        <g>
          <circle cx={30} cy={30} r={26} fill={colors.good} fillOpacity={0.15} stroke={colors.good} strokeWidth={2} />
          <rect x={14} y={14} width={32} height={32} rx={2} fill="none" stroke={colors.good} strokeWidth={2} />
          <text x={30} y={28} textAnchor="middle" fontFamily={FONT} fontSize={12} fontWeight={typography.weight.title} fill={colors.good}>
            HERS
          </text>
          <text x={30} y={42} textAnchor="middle" fontFamily={FONT} fontSize={14} fontWeight={typography.weight.title} fill={colors.good}>
            67
          </text>
        </g>
      );
  }
}

function Step({ x, num, title, description, icon }: StepProps) {
  return (
    <g transform={`translate(${x},90)`}>
      <rect width={170} height={300} rx={10} fill={colors.surface.canvas} stroke={colors.ink[300]} strokeWidth={1.5} />

      <g transform="translate(8,8)">
        <circle r={14} cx={14} cy={14} fill={colors.ink[900]} />
        <text x={14} y={19} textAnchor="middle" fontFamily={FONT} fontSize={13} fontWeight={typography.weight.title} fill={colors.surface.canvas}>
          {num}
        </text>
      </g>

      <text x={85} y={30} textAnchor="middle" fontFamily={FONT} fontSize={12} fontWeight={typography.weight.title} fill={colors.ink[900]}>
        {title}
      </text>

      <g transform="translate(55,60)">
        <StepIcon icon={icon} />
      </g>

      <foreignObject x={10} y={150} width={150} height={140}>
        <div style={{ fontFamily: FONT, fontSize: 11, color: '#334155', lineHeight: '1.45', textAlign: 'center' }}>
          {description}
        </div>
      </foreignObject>
    </g>
  );
}

export function HersRatingProcess({ className }: { className?: string }) {
  return (
    <figure className={`not-prose my-8 ${className ?? ''}`}>
      <SvgWrapper
        viewBox="0 0 1000 500"
        titleId="hers-rating-process-title"
        descId="hers-rating-process-desc"
        title="The five-step process to get a certified HERS rating"
        desc="Process flow diagram with five steps. Step 1: hire a RESNET-certified rater from the national directory. Step 2: on-site inspection of insulation depth, windows, ductwork, and HVAC equipment. Step 3: diagnostic testing with blower door for air leakage rate and duct blaster for duct leakage. Step 4: software modeling in REM/Rate or Ekotrope using all collected data plus equipment specs. Step 5: HERS score certificate issued with numeric score, for example HERS 67. Typical timeline is 1 to 3 weeks from inspection to certificate. Cost ranges 400 to 1,000 dollars for new construction; existing homes may cost more due to required investigation."
        className="w-full"
      >
        <defs>
          <marker id="hers-process-arrow" markerWidth={8} markerHeight={8} refX={7} refY={4} orient="auto" markerUnits="strokeWidth">
            <path d="M 0 0 L 8 4 L 0 8 z" fill={colors.ink[500]} />
          </marker>
        </defs>

        <rect width={1000} height={500} fill={colors.surface.canvas} />

        <text x={500} y={36} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.chartTitle} fontWeight={typography.weight.title} fill={colors.ink[900]}>
          Getting a certified HERS rating: 5 steps
        </text>
        <text x={500} y={58} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fill={colors.ink[500]}>
          Total timeline: 1-3 weeks from start to certificate
        </text>

        {/* Arrows between steps */}
        {[195, 375, 555, 735].map((ax, i) => (
          <line key={i} x1={ax} y1={240} x2={ax + 15} y2={240} stroke={colors.ink[500]} strokeWidth={2} markerEnd="url(#hers-process-arrow)" />
        ))}

        <Step
          x={20}
          num={1}
          title="Hire rater"
          icon="hire"
          description="Find a RESNET-certified HERS rater via the RESNET national directory. New construction: usually arranged by builder."
        />
        <Step
          x={210}
          num={2}
          title="Inspection"
          icon="inspect"
          description="On-site review: insulation depth, windows, ducts, HVAC equipment specs, water heater, air sealing details."
        />
        <Step
          x={400}
          num={3}
          title="Diagnostics"
          icon="test"
          description="Blower-door test for ACH50 air leakage. Duct blaster test for duct leakage. ENERGY STAR thresholds verified."
        />
        <Step
          x={590}
          num={4}
          title="Modeling"
          icon="model"
          description="Software (REM/Rate, Ekotrope, etc.) computes the HERS Index from all collected inputs vs the 2006 reference home."
        />
        <Step
          x={780}
          num={5}
          title="Certificate"
          icon="certify"
          description="HERS certificate issued with the numeric score. Builder gets it; you can request a copy when buying."
        />

        <text x={500} y={460} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fontStyle="italic" fill={colors.ink[500]}>
          Cost: $400-1,000 for new construction. $500-1,500 for existing homes (more investigation required).
        </text>
      </SvgWrapper>
      <figcaption className="mt-2 text-center text-sm text-ink-500">
        Only RESNET-certified raters can issue a HERS Index. The score is calibrated to standardized software so different raters in different locations produce comparable numbers.
      </figcaption>
    </figure>
  );
}
