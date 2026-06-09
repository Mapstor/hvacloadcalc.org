/**
 * Universal hero SVG — "Find your IECC climate zone".
 *
 * Every HVAC sizing question depends on the reader's climate zone, so this
 * is the most useful first visualization on any page. Shows all eight IECC
 * zones with sample US cities, the 99% heating design temperature, the 1%
 * cooling design temperature, and the equipment implication.
 *
 * Used as the high-up hero on the homepage, tools hub, all five calculator
 * main pages, the glossary, and the hub pages that don't already have an
 * existing hero SVG. Sourced to ASHRAE Standard 169-2021.
 */
export function ClimateZonesQuickReference() {
  const zones = [
    {
      zone: '1',
      cities: 'Miami, Honolulu, San Juan',
      heatF: 47,
      coolF: 91,
      implication: 'Cooling-dominant. AC essential, aux heat rarely fires.',
      color: '#dc2626',
    },
    {
      zone: '2',
      cities: 'Houston, New Orleans, Tampa',
      heatF: 30,
      coolF: 95,
      implication: 'Cooling-dominant, mild winter. Standard heat pump sufficient.',
      color: '#ea580c',
    },
    {
      zone: '3',
      cities: 'Atlanta, Memphis, Charlotte',
      heatF: 22,
      coolF: 93,
      implication: 'Mostly cooling. Low aux runtime on heat pumps.',
      color: '#f59e0b',
    },
    {
      zone: '4',
      cities: 'DC, Cincinnati, St. Louis',
      heatF: 15,
      coolF: 90,
      implication: 'Balanced. Heat pump or gas furnace both economical.',
      color: '#84cc16',
    },
    {
      zone: '5',
      cities: 'Chicago, Boston, Denver',
      heatF: 5,
      coolF: 88,
      implication: 'Heating-dominant. CCASHP recommended for heat pumps.',
      color: '#06b6d4',
    },
    {
      zone: '6',
      cities: 'Minneapolis, Buffalo',
      heatF: -2,
      coolF: 86,
      implication: 'Cold. CCASHP strongly recommended; aux heat sized for design.',
      color: '#0ea5e9',
    },
    {
      zone: '7',
      cities: 'Duluth MN, mountain west',
      heatF: -10,
      coolF: 84,
      implication: 'Very cold. CCASHP required; dual-fuel often economical.',
      color: '#3b82f6',
    },
    {
      zone: '8',
      cities: 'Interior Alaska',
      heatF: -20,
      coolF: 80,
      implication: 'Extreme cold. CCASHP + dual-fuel typical architecture.',
      color: '#6366f1',
    },
  ];

  const W = 1000;
  const H = 520;
  const padL = 22;
  const padR = 22;
  const padT = 60;
  const padB = 30;
  const rowH = (H - padT - padB) / zones.length;
  const zoneCol = 60;
  const citiesCol = 240;
  const tempCol = 200;

  return (
    <figure className="not-prose my-8 rounded-lg border border-ink-300 bg-white p-4 sm:p-6">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full max-w-full"
        role="img"
        aria-labelledby="zones-quick-title zones-quick-desc"
        focusable="false"
      >
        <title id="zones-quick-title">
          Find your IECC climate zone — design temperatures and HVAC implications
        </title>
        <desc id="zones-quick-desc">
          Reference table of the eight IECC climate zones with sample US cities, the 99
          percent heating design temperature, the 1 percent cooling design temperature, and
          the practical HVAC implication for each zone. Zone 1 (south Florida, Hawaii) is
          purely cooling-dominant. Zone 8 (interior Alaska) is heating-extreme and requires
          cold-climate equipment plus dual-fuel architecture.
        </desc>

        {/* Title block */}
        <text
          x={padL}
          y={26}
          fontSize="16"
          fontWeight="700"
          fill="#0f172a"
          fontFamily="system-ui, sans-serif"
        >
          Find your IECC climate zone
        </text>
        <text
          x={padL}
          y={46}
          fontSize="12"
          fill="#475569"
          fontFamily="system-ui, sans-serif"
        >
          Design temperatures and HVAC implication for each US climate zone. Source: ASHRAE Standard 169-2021.
        </text>

        {/* Column headers */}
        <g transform={`translate(${padL}, ${padT - 6})`}>
          <text x={zoneCol / 2} y={0} fontSize="10" fontWeight="700" fill="#64748b" textAnchor="middle" fontFamily="system-ui, sans-serif">
            ZONE
          </text>
          <text x={zoneCol + 8} y={0} fontSize="10" fontWeight="700" fill="#64748b" fontFamily="system-ui, sans-serif">
            SAMPLE CITIES
          </text>
          <text x={zoneCol + citiesCol + tempCol / 2} y={0} fontSize="10" fontWeight="700" fill="#64748b" textAnchor="middle" fontFamily="system-ui, sans-serif">
            HEAT °F  /  COOL °F
          </text>
          <text x={zoneCol + citiesCol + tempCol + 8} y={0} fontSize="10" fontWeight="700" fill="#64748b" fontFamily="system-ui, sans-serif">
            HVAC IMPLICATION
          </text>
        </g>

        {/* Row per zone */}
        {zones.map((z, i) => {
          const y = padT + i * rowH;
          return (
            <g key={z.zone}>
              {/* Row background — alternating subtle */}
              <rect
                x={padL}
                y={y}
                width={W - padL - padR}
                height={rowH}
                fill={i % 2 === 0 ? '#f8fafc' : '#ffffff'}
              />

              {/* Color band on left */}
              <rect
                x={padL}
                y={y + 4}
                width={zoneCol}
                height={rowH - 8}
                fill={z.color}
                opacity="0.92"
                rx="3"
              />
              {/* Zone number */}
              <text
                x={padL + zoneCol / 2}
                y={y + rowH / 2 + 8}
                fontSize="22"
                fontWeight="800"
                fill="#ffffff"
                textAnchor="middle"
                fontFamily="system-ui, sans-serif"
              >
                {z.zone}
              </text>

              {/* Cities */}
              <text
                x={padL + zoneCol + 14}
                y={y + rowH / 2 + 4}
                fontSize="13"
                fontWeight="600"
                fill="#0f172a"
                fontFamily="system-ui, sans-serif"
              >
                {z.cities}
              </text>

              {/* Heating / Cooling design temps */}
              <text
                x={padL + zoneCol + citiesCol + tempCol / 2}
                y={y + rowH / 2 + 4}
                fontSize="14"
                fontWeight="700"
                fill="#0f172a"
                textAnchor="middle"
                fontFamily="system-ui, sans-serif"
              >
                {z.heatF >= 0 ? `+${z.heatF}` : z.heatF}°F  /  +{z.coolF}°F
              </text>

              {/* Implication */}
              <text
                x={padL + zoneCol + citiesCol + tempCol + 14}
                y={y + rowH / 2 + 4}
                fontSize="12"
                fill="#334155"
                fontFamily="system-ui, sans-serif"
              >
                {z.implication}
              </text>
            </g>
          );
        })}

        {/* Bottom border */}
        <line
          x1={padL}
          y1={padT + zones.length * rowH}
          x2={W - padR}
          y2={padT + zones.length * rowH}
          stroke="#cbd5e1"
          strokeWidth="1"
        />
      </svg>
      <figcaption className="mt-3 text-xs text-ink-500">
        IECC climate zones are defined by Heating Degree Days and Cooling Degree Days per
        ASHRAE Standard 169-2021. Heating design temperature is the 99% winter outdoor
        temperature (the temperature exceeded by 99% of winter hours); cooling design
        temperature is the 1% summer outdoor temperature. Your county-level zone is on the
        IECC climate zone map at codes.iccsafe.org.
      </figcaption>
    </figure>
  );
}
