import { SvgWrapper } from '../SvgWrapper';
import { colors, typography } from '../tokens';

const FONT = typography.fontFamily;

interface Brand {
  name: string;
  displayLabel: string;
  iconType: 'flame' | 'thermometer' | 'red';
  color: string;
  visibility: string;
}

const BRANDS: Brand[] = [
  {
    name: 'Nest',
    displayLabel: 'Aux Heat',
    iconType: 'flame',
    color: '#fb923c',
    visibility: 'Energy History in mobile app',
  },
  {
    name: 'Ecobee',
    displayLabel: 'Auxiliary Heat',
    iconType: 'thermometer',
    color: '#0ea5e9',
    visibility: 'HomeIQ reports + on-device',
  },
  {
    name: 'Honeywell',
    displayLabel: 'Aux Heat / AUX',
    iconType: 'red',
    color: '#ef4444',
    visibility: 'On-device + Resideo app (model-dependent)',
  },
];

function BrandIcon({ type, color }: { type: Brand['iconType']; color: string }) {
  switch (type) {
    case 'flame':
      return (
        <g>
          <path
            d="M 20 4 Q 14 16 18 24 Q 12 22 14 30 Q 18 36 24 36 Q 30 36 32 30 Q 28 26 30 22 Q 26 14 20 4 Z"
            fill={color}
            fillOpacity={0.85}
            stroke={color}
            strokeWidth={1.5}
          />
        </g>
      );
    case 'thermometer':
      return (
        <g>
          <rect x={14} y={4} width={12} height={24} rx={6} fill={colors.surface.canvas} stroke={color} strokeWidth={2} />
          <rect x={17} y={12} width={6} height={16} fill={color} fillOpacity={0.85} />
          <circle cx={20} cy={32} r={8} fill={color} fillOpacity={0.85} stroke={color} strokeWidth={1.5} />
          {/* Small flame on side */}
          <path d="M 32 12 Q 28 16 30 20 Q 28 18 28 22 Q 30 24 33 22" fill={colors.warn} fillOpacity={0.85} />
        </g>
      );
    case 'red':
      return (
        <g>
          <circle cx={20} cy={20} r={14} fill={color} fillOpacity={0.85} stroke={color} strokeWidth={2} />
          <text x={20} y={26} textAnchor="middle" fontFamily={FONT} fontSize={14} fontWeight={typography.weight.title} fill={colors.surface.canvas}>
            !
          </text>
        </g>
      );
  }
}

export function AuxHeatByThermostatBrand({ className }: { className?: string }) {
  return (
    <figure className={`not-prose my-8 ${className ?? ''}`}>
      <SvgWrapper
        viewBox="0 0 1000 540"
        titleId="aux-heat-by-thermostat-brand-title"
        descId="aux-heat-by-thermostat-brand-desc"
        title="How Nest, Ecobee, and Honeywell thermostats display auxiliary heat"
        desc="Reference grid showing how three major smart thermostat brands display aux heat. Top row Nest: display shows Aux Heat with orange flame icon, also visible in app under Energy History. Middle row Ecobee: display shows Auxiliary Heat with thermometer icon and small flame, visible in HomeIQ reports. Bottom row Honeywell: display shows Aux Heat or AUX with red indicator, model-dependent across T6 T9 Vision Pro and others. Right column for each shows visibility in mobile app or on-device. All three brands distinguish aux heat from regular heating, but the visual cue differs by brand."
        className="w-full"
      >
        <rect width={1000} height={540} fill={colors.surface.canvas} />

        <text x={500} y={36} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.chartTitle} fontWeight={typography.weight.title} fill={colors.ink[900]}>
          How three brands show aux heat
        </text>
        <text x={500} y={58} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fill={colors.ink[500]}>
          Display style varies, the underlying meaning is the same
        </text>

        {/* Header */}
        <g transform="translate(60,90)">
          <rect width={880} height={40} rx={4} fill={colors.brand.primary} fillOpacity={0.15} stroke={colors.brand.primary} strokeWidth={1.5} />
          <text x={80} y={24} fontFamily={FONT} fontSize={typography.size.legend} fontWeight={typography.weight.title} fill={colors.brand.primaryDark}>
            Brand
          </text>
          <text x={250} y={24} fontFamily={FONT} fontSize={typography.size.legend} fontWeight={typography.weight.title} fill={colors.brand.primaryDark}>
            What you see on the display
          </text>
          <text x={580} y={24} fontFamily={FONT} fontSize={typography.size.legend} fontWeight={typography.weight.title} fill={colors.brand.primaryDark}>
            Icon
          </text>
          <text x={720} y={24} fontFamily={FONT} fontSize={typography.size.legend} fontWeight={typography.weight.title} fill={colors.brand.primaryDark}>
            Also visible in
          </text>
        </g>

        {/* Brand rows */}
        {BRANDS.map((brand, i) => {
          const y = 150 + i * 110;
          return (
            <g key={brand.name} transform={`translate(60,${y})`}>
              <rect width={880} height={100} rx={6} fill={colors.surface.canvas} stroke={colors.ink[300]} strokeWidth={1} />

              {/* Brand name */}
              <text x={80} y={36} fontFamily={FONT} fontSize={typography.size.axisLabel} fontWeight={typography.weight.title} fill={brand.color}>
                {brand.name}
              </text>
              <text x={80} y={58} fontFamily={FONT} fontSize={10} fontStyle="italic" fill={colors.ink[500]}>
                smart thermostat
              </text>

              {/* Display label */}
              <g transform="translate(220,28)">
                <rect width={280} height={50} rx={6} fill={colors.ink[900]} />
                <text x={140} y={32} textAnchor="middle" fontFamily={FONT} fontSize={16} fontWeight={typography.weight.title} fill={brand.color}>
                  {brand.displayLabel}
                </text>
              </g>

              {/* Icon */}
              <g transform="translate(580,30)">
                <BrandIcon type={brand.iconType} color={brand.color} />
              </g>

              {/* Visibility */}
              <foreignObject x={680} y={26} width={190} height={56}>
                <div style={{ fontFamily: FONT, fontSize: 11, color: '#334155', lineHeight: '1.4' }}>
                  {brand.visibility}
                </div>
              </foreignObject>
            </g>
          );
        })}

        {/* Footer */}
        <g transform="translate(60,490)">
          <text x={440} y={20} textAnchor="middle" fontFamily={FONT} fontSize={typography.size.legend} fontStyle="italic" fill={colors.ink[500]}>
            Some thermostats use &quot;Stage 2 Heat&quot; or &quot;Heat 2&quot; for the same thing. All refer to the electric resistance strips.
          </text>
        </g>
      </SvgWrapper>
      <figcaption className="mt-2 text-center text-sm text-ink-500">
        The label and icon change by brand. The underlying hardware (electric resistance backup) and meaning are the same.
      </figcaption>
    </figure>
  );
}
