'use client';

import type { HeatPumpInputs, HeatPumpResult as HeatPumpResultType } from '@/lib/calculators/heat-pump-size';
import { HeatPumpResultChart } from './HeatPumpResultChart';

interface Props {
  result: HeatPumpResultType;
  inputs: HeatPumpInputs;
}

const EQUIPMENT_REC_INFO: Record<
  HeatPumpResultType['equipmentRecommendation'],
  { label: string; description: string }
> = {
  standard: {
    label: 'Standard heat pump',
    description:
      "A standard split-system air-source heat pump is the right pick for this climate. Federal-minimum SEER2 / HSPF2 equipment meets the heating and cooling load with minimal aux heat use. The NEEP CCASHP certification is unnecessary at this climate; the additional $2,000-$5,000 equipment cost premium does not pay back over the equipment's life.",
  },
  'cold-climate-recommended': {
    label: 'Cold-climate certified (CCASHP) recommended',
    description:
      "Cold-climate certified equipment from the NEEP CCASHP product list will produce noticeably lower aux heat runtime in this climate. The premium over standard equipment ($2,000-$5,000 typical) usually pays back in 6-12 years through reduced electricity costs for aux heat operation below the balance point. The 25C federal tax credit ($2,000) applies to ENERGY STAR Cold Climate qualifying units.",
  },
  'cold-climate-required': {
    label: 'Cold-climate certified (CCASHP) required',
    description:
      "Standard heat pumps cannot maintain meaningful heating capacity at this climate's design temperature. A NEEP CCASHP-listed unit holds at least 58% of its 47°F capacity at 5°F and at least 70% at 17°F, while a standard heat pump drops to 33% and 60% respectively at those points. CCASHP equipment is the only practical option for primary heat pump heating in this zone; without it, aux heat would carry most of the winter heating load.",
  },
};

function nbsp(n: number): string {
  return n.toLocaleString();
}

const ELECTRICITY_RATE = 0.163;
const NAT_GAS_PRICE_THERM = 1.30;

export function HeatPumpResult({ result, inputs }: Props) {
  const eqInfo = EQUIPMENT_REC_INFO[result.equipmentRecommendation];

  // Operating cost estimates
  // Heat pump COP at typical winter conditions
  const hpHSPF2 = inputs.coldClimateEquipment ? 9.5 : 8.0;
  // Aux heat strip kW based on aux BTU at design
  const auxStripKw = Math.ceil(result.auxHeatAtDesignBtu / 3412 / 5) * 5;

  // Heating-season hours by climate zone
  const heatingHoursByZone: Record<string, number> = {
    '1': 200,
    '2': 600,
    '3': 1200,
    '4': 1800,
    '5': 2400,
    '6': 2800,
    '7': 3200,
    '8': 3600,
  };
  const heatingHours = heatingHoursByZone[inputs.climateZone] ?? 1800;
  const annualHeatingBtu = result.heatingLoadBtu * heatingHours * 0.4; // avg load factor

  // Heat pump electricity per year
  const hpKwhPerYear = Math.round(annualHeatingBtu / (hpHSPF2 * 1000));
  const hpAnnualCost = Math.round(hpKwhPerYear * ELECTRICITY_RATE);

  // Gas furnace alternative (95% AFUE)
  const gasThermsPerYear = Math.round(annualHeatingBtu / (0.95 * 100000));
  const gasAnnualCost = Math.round(gasThermsPerYear * NAT_GAS_PRICE_THERM);

  // Electric resistance alternative (COP 1.0)
  const resistanceKwhPerYear = Math.round(annualHeatingBtu / 3412);
  const resistanceAnnualCost = Math.round(resistanceKwhPerYear * ELECTRICITY_RATE);

  return (
    <div className="not-prose space-y-10">
      {/* Hero */}
      <section className="rounded-xl border-2 border-brand bg-brand/5 p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand">
          Recommended heat pump
        </p>
        <div className="mt-3 flex flex-wrap items-baseline gap-x-4 gap-y-2">
          <p className="text-5xl font-bold text-ink-900 sm:text-6xl">
            {result.recommendedTons}
          </p>
          <p className="text-2xl font-semibold text-ink-700">
            ton{result.recommendedTons === 1 ? '' : 's'}
          </p>
          <p className="text-lg text-ink-500">
            ({nbsp(result.recommendedSizeBtu)} BTU/hr at AHRI 47°F)
          </p>
        </div>
        <p className="mt-4 max-w-prose text-base leading-relaxed text-ink-700">
          {result.recommendedTons} ton{result.recommendedTons === 1 ? '' : 's'} is the heat pump's
          rated capacity at AHRI's 47°F heating / 95°F cooling test condition.{' '}
          {result.drivingLoad === 'cooling'
            ? `In your climate (zone ${inputs.climateZone}), cooling drives equipment selection — the cooling load (${nbsp(result.coolingLoadBtu)} BTU/hr) exceeds the heating load (${nbsp(result.heatingLoadBtu)} BTU/hr) by enough that the cooling Manual S tolerance is the binding constraint.`
            : result.drivingLoad === 'heating'
              ? `In your climate (zone ${inputs.climateZone}), heating drives equipment selection — the heating load (${nbsp(result.heatingLoadBtu)} BTU/hr) exceeds the cooling load (${nbsp(result.coolingLoadBtu)} BTU/hr) and the unit must be sized to deliver enough heating capacity at the design temperature.`
              : `In your climate (zone ${inputs.climateZone}), heating and cooling loads are roughly balanced (${nbsp(result.heatingLoadBtu)} heating, ${nbsp(result.coolingLoadBtu)} cooling). The recommended size handles both within Manual S tolerance.`}
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-ink-300 bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-500">
              Cooling load
            </p>
            <p className="mt-1 text-2xl font-bold text-ink-900">{nbsp(result.coolingLoadBtu)}</p>
            <p className="mt-1 text-xs text-ink-700">
              BTU/hr at {result.coolingDesignTempF}°F outdoor
            </p>
          </div>
          <div className="rounded-lg border border-ink-300 bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-500">
              Heating load
            </p>
            <p className="mt-1 text-2xl font-bold text-ink-900">{nbsp(result.heatingLoadBtu)}</p>
            <p className="mt-1 text-xs text-ink-700">
              BTU/hr at {result.heatingDesignTempF}°F outdoor
            </p>
          </div>
          <div className="rounded-lg border border-ink-300 bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-500">
              Balance point
            </p>
            <p className="mt-1 text-2xl font-bold text-ink-900">{result.balancePointF}°F</p>
            <p className="mt-1 text-xs text-ink-700">
              Above: heat pump alone. Below: aux supplements.
            </p>
          </div>
          <div className="rounded-lg border border-ink-300 bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-500">
              Aux at design
            </p>
            <p className="mt-1 text-2xl font-bold text-ink-900">{nbsp(result.auxHeatAtDesignBtu)}</p>
            <p className="mt-1 text-xs text-ink-700">
              BTU/hr shortfall at {result.heatingDesignTempF}°F
            </p>
          </div>
        </div>
      </section>

      {/* Capacity vs temperature chart */}
      <section>
        <header className="mb-3">
          <h3 className="text-lg font-bold text-ink-900">
            Capacity versus outdoor temperature
          </h3>
          <p className="mt-1 max-w-prose text-sm text-ink-700">
            The chart below plots heat pump heating capacity (blue/purple line) against the home's
            heating load (red line) across the outdoor temperature range. Where the two curves
            cross is the balance point. The shaded region below the balance point shows the BTU/hr
            shortfall that aux heat must cover.
          </p>
        </header>
        <div className="rounded-xl border border-ink-300 bg-white p-3 shadow-sm sm:p-4">
          <HeatPumpResultChart result={result} coldClimateEquipment={inputs.coldClimateEquipment} />
        </div>
        <p className="mt-3 text-xs text-ink-500">
          Capacity curve uses{' '}
          {inputs.coldClimateEquipment ? 'NEEP CCASHP cold-climate' : 'standard heat pump'}{' '}
          performance model. Real equipment performance is published in the manufacturer's expanded
          performance data and may differ by ±10% from this curve.
        </p>
      </section>

      {/* Sizing strategy */}
      <section>
        <header className="mb-3">
          <h3 className="text-lg font-bold text-ink-900">Sizing strategy for your climate</h3>
        </header>
        <div className="rounded-lg border border-ink-300 bg-white p-6">
          <p className="text-base leading-relaxed text-ink-700">{result.sizingStrategy}</p>
        </div>
      </section>

      {/* Equipment recommendation */}
      <section>
        <header className="mb-3">
          <h3 className="text-lg font-bold text-ink-900">{eqInfo.label}</h3>
          <p className="mt-1 max-w-prose text-sm text-ink-700">{eqInfo.description}</p>
        </header>
      </section>

      {/* Balance point and aux heat explainer */}
      <section>
        <header className="mb-3">
          <h3 className="text-lg font-bold text-ink-900">
            Balance point at {result.balancePointF}°F and aux heat sizing
          </h3>
        </header>
        <div className="overflow-hidden rounded-lg border border-ink-300 bg-white">
          <table className="w-full text-sm">
            <tbody>
              <tr className="border-b border-ink-100">
                <td className="w-1/3 bg-ink-50 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-ink-700">
                  Balance point
                </td>
                <td className="px-4 py-3 text-ink-700">
                  {result.balancePointF}°F — the outdoor temperature at which the heat pump's
                  heating capacity exactly equals your home's heating load. Above this temperature,
                  the heat pump alone keeps the house at setpoint. Below it, the heat pump still
                  produces useful heating but cannot fully meet the load, and aux heat fills the
                  gap.
                </td>
              </tr>
              <tr className="border-b border-ink-100">
                <td className="bg-ink-50 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-ink-700">
                  Design temperature
                </td>
                <td className="px-4 py-3 text-ink-700">
                  {result.heatingDesignTempF}°F — the 99% ASHRAE heating design temperature for
                  your zone (zone {inputs.climateZone}). About 87 hours per typical year fall below
                  this temperature. The heat pump must combine with aux heat to meet the load at
                  this temperature.
                </td>
              </tr>
              <tr className="border-b border-ink-100">
                <td className="bg-ink-50 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-ink-700">
                  Aux capacity at design
                </td>
                <td className="px-4 py-3 text-ink-700">
                  {nbsp(result.auxHeatAtDesignBtu)} BTU/hr — the gap between your home's heating
                  load and the heat pump's available capacity at the design temperature. This
                  determines the aux strip size.
                </td>
              </tr>
              <tr className="border-b border-ink-100">
                <td className="bg-ink-50 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-ink-700">
                  Recommended aux strip
                </td>
                <td className="px-4 py-3 text-ink-700">
                  {auxStripKw > 0 ? `${auxStripKw} kW electric resistance strip kit` : 'No aux needed at design'} —{' '}
                  {auxStripKw > 0
                    ? `delivers ${nbsp(auxStripKw * 3412)} BTU/hr at 100% (covers the ${nbsp(result.auxHeatAtDesignBtu)} BTU/hr shortfall). Standard sizes are 5, 10, 15, and 20 kW.`
                    : 'The heat pump alone meets the load at this design temperature without supplementation.'}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Operating cost comparison */}
      <section>
        <header className="mb-3">
          <h3 className="text-lg font-bold text-ink-900">Estimated annual operating cost</h3>
          <p className="mt-1 max-w-prose text-sm text-ink-700">
            Operating cost comparison for delivering your heating load over a typical winter in zone{' '}
            {inputs.climateZone} (~{heatingHours} heating-hour equivalents per year at 40% load
            factor). The heat pump cost includes some aux heat runtime below the balance point;
            actual aux contribution depends on local weather patterns.
          </p>
        </header>
        <div className="overflow-x-auto rounded-lg border border-ink-300">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-ink-300 bg-ink-100">
                <th className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wider text-ink-700">
                  System
                </th>
                <th className="px-4 py-2 text-right text-xs font-semibold uppercase tracking-wider text-ink-700">
                  Annual energy
                </th>
                <th className="px-4 py-2 text-right text-xs font-semibold uppercase tracking-wider text-ink-700">
                  Annual cost
                </th>
                <th className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wider text-ink-700">
                  Notes
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-brand/5 border-b border-ink-100">
                <td className="px-4 py-2 font-semibold text-ink-900">
                  Recommended heat pump ({inputs.coldClimateEquipment ? 'CCASHP' : 'standard'})
                </td>
                <td className="px-4 py-2 text-right font-mono text-ink-900">{nbsp(hpKwhPerYear)} kWh</td>
                <td className="px-4 py-2 text-right font-mono font-semibold text-ink-900">
                  ${nbsp(hpAnnualCost)}
                </td>
                <td className="px-4 py-2 text-xs text-ink-700">
                  HSPF2 {hpHSPF2.toFixed(1)} at ${ELECTRICITY_RATE.toFixed(3)}/kWh
                </td>
              </tr>
              <tr className="border-b border-ink-100">
                <td className="px-4 py-2 text-ink-900">95% AFUE natural gas furnace</td>
                <td className="px-4 py-2 text-right font-mono text-ink-900">
                  {nbsp(gasThermsPerYear)} therms
                </td>
                <td className="px-4 py-2 text-right font-mono text-ink-900">
                  ${nbsp(gasAnnualCost)}
                </td>
                <td className="px-4 py-2 text-xs text-ink-700">
                  At ${NAT_GAS_PRICE_THERM.toFixed(2)}/therm US average
                </td>
              </tr>
              <tr className="border-b border-ink-100">
                <td className="px-4 py-2 text-ink-900">Electric resistance baseboard</td>
                <td className="px-4 py-2 text-right font-mono text-ink-900">
                  {nbsp(resistanceKwhPerYear)} kWh
                </td>
                <td className="px-4 py-2 text-right font-mono text-ink-900">
                  ${nbsp(resistanceAnnualCost)}
                </td>
                <td className="px-4 py-2 text-xs text-ink-700">COP 1.0; baseline electric heat</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-ink-500">
          Local utility prices vary substantially. In states with electricity below $0.12/kWh
          (Tennessee, Pacific Northwest), the heat pump wins clearly. In states with electricity
          above $0.25/kWh and gas service available (parts of California, Massachusetts), gas may
          win at the operating-cost line — but the heat pump replaces both AC and furnace from one
          piece of equipment, which changes the lifecycle calculation.
        </p>
      </section>

      {/* Federal incentives */}
      <section>
        <header className="mb-3">
          <h3 className="text-lg font-bold text-ink-900">Federal incentives in 2026</h3>
        </header>
        <div className="overflow-x-auto rounded-lg border border-ink-300">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-ink-300 bg-ink-100">
                <th className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wider text-ink-700">
                  Program
                </th>
                <th className="px-4 py-2 text-right text-xs font-semibold uppercase tracking-wider text-ink-700">
                  Maximum
                </th>
                <th className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wider text-ink-700">
                  Requirements
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-ink-100">
                <td className="px-4 py-2 text-ink-900">IRA 25C tax credit</td>
                <td className="px-4 py-2 text-right font-mono font-semibold text-ink-900">$2,000</td>
                <td className="px-4 py-2 text-xs text-ink-700">
                  Heat pump must meet CEE highest tier (typically ENERGY STAR Cold Climate or HSPF2 ≥ 8.1)
                </td>
              </tr>
              <tr className="border-b border-ink-100">
                <td className="px-4 py-2 text-ink-900">HEEHRA point-of-sale rebate</td>
                <td className="px-4 py-2 text-right font-mono font-semibold text-ink-900">$8,000</td>
                <td className="px-4 py-2 text-xs text-ink-700">
                  Income test: ≤80% AMI for full / 80-150% AMI for 50%; varies by state
                </td>
              </tr>
              <tr className="border-b border-ink-100">
                <td className="px-4 py-2 text-ink-900">State/utility rebates</td>
                <td className="px-4 py-2 text-right font-mono text-ink-900">$500–$5,000+</td>
                <td className="px-4 py-2 text-xs text-ink-700">
                  Mass Save, NYSERDA, PG&E, SoCal Edison, and others — check your state energy office
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Caveats */}
      <section className="rounded-lg border-l-4 border-warn bg-warn/5 p-6">
        <p className="text-xs font-bold uppercase tracking-wider text-warn">
          What this calculator does NOT capture
        </p>
        <ul className="mt-3 space-y-2 text-sm text-ink-700">
          <li>
            <strong className="text-ink-900">Site-specific design temperature.</strong> The
            calculator uses ASHRAE zone defaults ({result.heatingDesignTempF}°F heating /{' '}
            {result.coolingDesignTempF}°F cooling). Local code or microclimate may specify different
            values; check with your building department for permit-grade work.
          </li>
          <li>
            <strong className="text-ink-900">Manufacturer expanded performance data.</strong> Each
            heat pump model has its own published capacity at multiple outdoor temperatures. The
            curves shown are typical for the equipment class; the specific model you select may
            perform better or worse by ±10%.
          </li>
          <li>
            <strong className="text-ink-900">Defrost cycle penalty.</strong> In cold humid weather,
            the heat pump periodically reverses to defrost the outdoor coil, briefly producing no
            useful heating. AHRI ratings include defrost; the calculator's capacity curves are
            already defrost-adjusted.
          </li>
          <li>
            <strong className="text-ink-900">Dual-fuel hybrid sizing.</strong> If you have existing
            gas service and want to use the furnace as backup below a chosen lockout temperature,
            the heat pump sizes differently. Dual-fuel systems typically size the heat pump to the
            cooling load and let the furnace handle deep cold; aux electric strips are not needed.
          </li>
          <li>
            <strong className="text-ink-900">Multi-zone mini-split diversity.</strong> For a
            multi-zone ductless system, you rarely heat every zone at full capacity simultaneously.
            The outdoor unit can be sized 70-85% of the sum-of-zone loads. The calculator output is
            whole-house; per-zone sizing requires a different methodology.
          </li>
        </ul>
      </section>
    </div>
  );
}
