import { SvgWrapper } from '../SvgWrapper';
import { colors, typography } from '../tokens';

const FONT = typography.fontFamily;

interface Cause {
  rank: number;
  name: string;
  desc: string;
  frequency: number;
  level: 'diy' | 'pro' | 'either';
}

const CAUSES: Cause[] = [
  { rank: 1, name: 'Dirty air filter', desc: 'Most common, easy fix', frequency: 95, level: 'diy' },
  { rank: 2, name: 'Oversized AC', desc: 'Structural; only fix is replacement', frequency: 75, level: 'pro' },
  { rank: 3, name: 'Frozen evaporator coil', desc: 'Usually downstream of filter or refrigerant', frequency: 65, level: 'either' },
  { rank: 4, name: 'Low refrigerant / leak', desc: 'EPA Section 608 certified tech required', frequency: 55, level: 'pro' },
  { rank: 5, name: 'Dirty condenser coil', desc: 'DIY cleanable; schedule annual', frequency: 40, level: 'diy' },
  { rank: 6, name: 'Thermostat issues', desc: 'Placement, batteries, or wiring', frequency: 25, level: 'diy' },
  { rank: 7, name: 'Electrical issues', desc: 'Capacitor, contactor, control board', frequency: 15, level: 'pro' },
];

const LEVEL_COLORS = {
  diy: colors.good,
  pro: colors.danger,
  either: colors.warn,
};

const LEVEL_LABELS = {
  diy: 'DIY',
  pro: 'Pro',
  either: 'Mixed',
};

const ROW_HEIGHT = 80;
const ROW_TOP = 70;
const ROW_LEFT = 30;
const ROW_WIDTH = 940;

export function ShortCyclingCausesRanked({ className }: { className?: string }) {
  return (
    <figure className={`not-prose my-8 ${className ?? ''}`}>
      <SvgWrapper
        viewBox="0 0 1000 700"
        titleId="short-cycling-causes-ranked-title"
        descId="short-cycling-causes-ranked-desc"
        title="Seven causes of AC short cycling ranked by frequency"
        desc="Ranked list of the seven most common causes of AC short cycling, from most frequent at the top to least frequent at the bottom: 1 Dirty air filter (DIY, most common), 2 Oversized AC (Pro, structural), 3 Frozen evaporator coil (Mixed), 4 Low refrigerant or leak (Pro, EPA Section 608 certified tech required), 5 Dirty condenser coil (DIY, annual cleaning), 6 Thermostat issues (DIY), 7 Electrical issues (Pro). Each cause shows a colored bar indicating relative frequency."
        className="w-full"
      >
        <rect width={1000} height={700} fill={colors.surface.canvas} />

        <text x={500} y={36} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.chartTitle} fontWeight={typography.weight.title} fill={colors.ink[900]}>
          Seven causes, ranked by likelihood
        </text>

        {CAUSES.map((c, i) => {
          const y = ROW_TOP + i * ROW_HEIGHT;
          const lv = LEVEL_COLORS[c.level];
          return (
            <g key={c.rank} transform={`translate(${ROW_LEFT},${y})`}>
              <rect
                width={ROW_WIDTH}
                height={ROW_HEIGHT - 12}
                rx={6}
                fill={colors.surface.subtle}
                stroke={colors.ink[300]}
                strokeWidth={1}
              />
              {/* Rank circle */}
              <circle cx={32} cy={(ROW_HEIGHT - 12) / 2} r={20} fill={lv} fillOpacity={0.18} stroke={lv} strokeWidth={2} />
              <text x={32} y={(ROW_HEIGHT - 12) / 2 + 6} textAnchor="middle" fontFamily={FONT} fontSize={18} fontWeight={typography.weight.title} fill={lv}>
                {c.rank}
              </text>

              {/* Name */}
              <text x={70} y={(ROW_HEIGHT - 12) / 2 - 6} fontFamily={FONT} fontSize={16} fontWeight={typography.weight.title} fill={colors.ink[900]}>
                {c.name}
              </text>
              <text x={70} y={(ROW_HEIGHT - 12) / 2 + 16} fontFamily={FONT} fontSize={typography.size.legend} fill={colors.ink[700]}>
                {c.desc}
              </text>

              {/* DIY/Pro badge */}
              <rect x={ROW_WIDTH - 240} y={(ROW_HEIGHT - 12) / 2 - 12} width={60} height={24} rx={4} fill={lv} fillOpacity={0.18} stroke={lv} strokeWidth={1.5} />
              <text x={ROW_WIDTH - 210} y={(ROW_HEIGHT - 12) / 2 + 5} textAnchor="middle" fontFamily={FONT} fontSize={12} fontWeight={typography.weight.title} fill={lv}>
                {LEVEL_LABELS[c.level]}
              </text>

              {/* Frequency bar */}
              <rect
                x={ROW_WIDTH - 160}
                y={(ROW_HEIGHT - 12) / 2 - 5}
                width={(c.frequency / 100) * 140}
                height={10}
                rx={2}
                fill={lv}
                fillOpacity={0.7}
              />
              <line
                x1={ROW_WIDTH - 160}
                y1={(ROW_HEIGHT - 12) / 2 - 5}
                x2={ROW_WIDTH - 20}
                y2={(ROW_HEIGHT - 12) / 2 - 5}
                stroke={colors.ink[300]}
                strokeWidth={0.5}
              />
              <line
                x1={ROW_WIDTH - 160}
                y1={(ROW_HEIGHT - 12) / 2 + 5}
                x2={ROW_WIDTH - 20}
                y2={(ROW_HEIGHT - 12) / 2 + 5}
                stroke={colors.ink[300]}
                strokeWidth={0.5}
              />
            </g>
          );
        })}

        <text x={500} y={680} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fontStyle="italic" fill={colors.ink[500]}>
          Frequency is the share of short-cycling diagnoses we&apos;d expect this cause to explain in a typical residential service population.
        </text>
      </SvgWrapper>
      <figcaption className="mt-2 text-center text-sm text-ink-500">
        Most short-cycling diagnoses resolve at the top of the list. Refrigerant work is federally regulated; do not attempt without EPA Section 608.
      </figcaption>
    </figure>
  );
}
