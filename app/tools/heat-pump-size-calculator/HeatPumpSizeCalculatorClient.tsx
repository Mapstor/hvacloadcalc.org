'use client';

import { useMemo, useState } from 'react';
import {
  calculateHeatPumpSize,
  type HeatPumpInputs,
} from '@/lib/calculators/heat-pump-size';
import type {
  CeilingHeight,
  ClimateZone,
  InsulationLevel,
  SpaceType,
  SunExposure,
} from '@/lib/calculators/btu';

const CLIMATE_OPTIONS: Array<{ value: ClimateZone; label: string }> = [
  { value: '1', label: 'Zone 1 — South FL, Hawaii (tropical)' },
  { value: '2', label: 'Zone 2 — Gulf Coast, lower south' },
  { value: '3', label: 'Zone 3 — Mid-south, parts of CA' },
  { value: '4', label: 'Zone 4 — Mid-Atlantic, Ohio Valley' },
  { value: '5', label: 'Zone 5 — Northern states' },
  { value: '6', label: 'Zone 6 — Northern MW, NE, Rockies' },
  { value: '7', label: 'Zone 7 — Northern MN, mountain west' },
  { value: '8', label: 'Zone 8 — Interior Alaska' },
];

const CEILING_OPTIONS: Array<{ value: CeilingHeight; label: string }> = [
  { value: '8', label: '8 ft (standard)' },
  { value: '9', label: '9 ft (+10%)' },
  { value: '10', label: '10 ft (+20%)' },
  { value: '12', label: '12+ ft cathedral (+30%)' },
];

const INSULATION_OPTIONS: Array<{ value: InsulationLevel; label: string }> = [
  { value: 'poor', label: 'Poor (older home, below code) +30%' },
  { value: 'average', label: 'Average (meets current code)' },
  { value: 'good', label: 'Good (above code, recently insulated) -10%' },
];

const SUN_OPTIONS: Array<{ value: SunExposure; label: string }> = [
  { value: 'heavy', label: 'Heavy south/west exposure +15%' },
  { value: 'mixed', label: 'Mixed (typical)' },
  { value: 'shaded', label: 'Heavily shaded -8%' },
];

const SPACE_OPTIONS: Array<{ value: SpaceType; label: string }> = [
  { value: 'bedroom', label: 'Single bedroom (baseline)' },
  { value: 'living-room', label: 'Living room / whole-house (typical)' },
  { value: 'kitchen', label: 'Kitchen (+30%)' },
  { value: 'home-office', label: 'Home office (+5%)' },
  { value: 'sun-room', label: 'Sun room / conservatory (+75%)' },
  { value: 'basement-above-grade', label: 'Basement, above grade (-20%)' },
  { value: 'basement-below-grade', label: 'Basement, below grade (-40%)' },
  { value: 'attic-or-second-floor', label: 'Attic / second floor (+30%)' },
];

const RECOMMENDATION_LABEL: Record<string, { label: string; color: string }> = {
  standard: { label: 'Standard heat pump', color: 'text-good' },
  'cold-climate-recommended': { label: 'Cold-climate recommended', color: 'text-warn' },
  'cold-climate-required': { label: 'Cold-climate (CCASHP) required', color: 'text-danger' },
};

interface Props {
  defaults: HeatPumpInputs;
}

export function HeatPumpSizeCalculatorClient({ defaults }: Props) {
  const [inputs, setInputs] = useState<HeatPumpInputs>(defaults);
  const [showBreakdown, setShowBreakdown] = useState(false);

  const result = useMemo(() => {
    try {
      return calculateHeatPumpSize(inputs);
    } catch {
      return null;
    }
  }, [inputs]);

  function update<K extends keyof HeatPumpInputs>(key: K, value: HeatPumpInputs[K]) {
    setInputs((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <div className="not-prose">
      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        {/* Inputs */}
        <div className="space-y-5">
          <h2 className="text-lg font-semibold text-ink-900">Your home</h2>

          <div>
            <label htmlFor="sqft" className="block text-sm font-medium text-ink-700">
              Square footage
            </label>
            <input
              id="sqft"
              type="number"
              min={300}
              max={6000}
              step={50}
              value={inputs.squareFootage}
              onChange={(e) => update('squareFootage', Math.max(300, Math.min(6000, Number(e.target.value) || 300)))}
              className="mt-1 w-full rounded-md border border-ink-300 px-3 py-2 text-base shadow-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
            />
          </div>

          <div>
            <label htmlFor="zone" className="block text-sm font-medium text-ink-700">
              Climate zone
            </label>
            <select
              id="zone"
              value={inputs.climateZone}
              onChange={(e) => update('climateZone', e.target.value as ClimateZone)}
              className="mt-1 w-full rounded-md border border-ink-300 px-3 py-2 text-base shadow-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
            >
              {CLIMATE_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="ceiling" className="block text-sm font-medium text-ink-700">
                Ceiling height
              </label>
              <select
                id="ceiling"
                value={inputs.ceilingHeight}
                onChange={(e) => update('ceilingHeight', e.target.value as CeilingHeight)}
                className="mt-1 w-full rounded-md border border-ink-300 px-3 py-2 text-base shadow-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
              >
                {CEILING_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="insulation" className="block text-sm font-medium text-ink-700">
                Insulation
              </label>
              <select
                id="insulation"
                value={inputs.insulationLevel}
                onChange={(e) => update('insulationLevel', e.target.value as InsulationLevel)}
                className="mt-1 w-full rounded-md border border-ink-300 px-3 py-2 text-base shadow-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
              >
                {INSULATION_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="sun" className="block text-sm font-medium text-ink-700">
              Sun exposure
            </label>
            <select
              id="sun"
              value={inputs.sunExposure}
              onChange={(e) => update('sunExposure', e.target.value as SunExposure)}
              className="mt-1 w-full rounded-md border border-ink-300 px-3 py-2 text-base shadow-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
            >
              {SUN_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="space" className="block text-sm font-medium text-ink-700">
              Space type
            </label>
            <select
              id="space"
              value={inputs.spaceType ?? 'living-room'}
              onChange={(e) => update('spaceType', e.target.value as SpaceType)}
              className="mt-1 w-full rounded-md border border-ink-300 px-3 py-2 text-base shadow-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
            >
              {SPACE_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="occupants" className="block text-sm font-medium text-ink-700">
              Regular occupants
            </label>
            <input
              id="occupants"
              type="number"
              min={1}
              max={20}
              step={1}
              value={inputs.occupants}
              onChange={(e) => update('occupants', Math.max(1, Math.min(20, Number(e.target.value) || 1)))}
              className="mt-1 w-full rounded-md border border-ink-300 px-3 py-2 text-base shadow-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
            />
            <p className="mt-1 text-xs text-ink-500">+600 BTU per person above 2</p>
          </div>

          <label className="flex items-start gap-2">
            <input
              type="checkbox"
              checked={inputs.coldClimateEquipment}
              onChange={(e) => update('coldClimateEquipment', e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-ink-300 text-brand focus:ring-brand"
            />
            <span className="text-sm text-ink-700">
              <span className="font-medium">Cold-climate (CCASHP) equipment</span>
              <span className="mt-1 block text-xs text-ink-500">
                Toggles capacity model. Cold-climate units maintain ~85% capacity at 17°F vs ~60% for
                standard. See <a href="/heat-pump/cold-climate/defrost-cycle/" className="text-brand underline">cold climate heat pumps</a>.
              </span>
            </span>
          </label>

          <button
            type="button"
            onClick={() => setInputs(defaults)}
            className="text-sm font-medium text-brand hover:underline"
          >
            Reset to defaults
          </button>
        </div>

        {/* Result panel */}
        <aside className="self-start rounded-lg border border-ink-300 bg-ink-50/50 p-6">
          {result ? (
            <>
              <p className="text-xs font-medium uppercase tracking-wide text-ink-500">Recommended size</p>
              <p className="mt-1 text-4xl font-bold text-brand">
                {result.recommendedSizeBtu.toLocaleString()}
                <span className="ml-1 text-lg font-medium text-ink-700">BTU/hr</span>
              </p>
              <p className="mt-1 text-sm text-ink-700">
                ≈ {result.recommendedTons} ton{result.recommendedTons === 1 ? '' : 's'} (nominal cooling)
              </p>

              <div className="mt-4 grid grid-cols-2 gap-3 rounded-md border border-ink-300 bg-white p-3">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-ink-500">Cooling load</p>
                  <p className="text-base font-semibold text-ink-900">
                    {result.coolingLoadBtu.toLocaleString()}
                  </p>
                  <p className="text-xs text-ink-500">at {result.coolingDesignTempF}°F</p>
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-ink-500">Heating load</p>
                  <p className="text-base font-semibold text-ink-900">
                    {result.heatingLoadBtu.toLocaleString()}
                  </p>
                  <p className="text-xs text-ink-500">at {result.heatingDesignTempF}°F</p>
                </div>
              </div>

              <div className="mt-3 rounded-md border border-ink-300 bg-white p-3">
                <p className="text-xs font-medium uppercase tracking-wide text-ink-500">Balance point</p>
                <p className="mt-1 text-2xl font-bold text-ink-900">{result.balancePointF}°F</p>
                <p className="text-xs text-ink-500">
                  Aux heat fires when outdoor temp drops below this.
                </p>
              </div>

              <div className="mt-3 rounded-md border border-ink-300 bg-white p-3">
                <p className="text-xs font-medium uppercase tracking-wide text-ink-500">Aux at design</p>
                <p className="mt-1 text-base font-semibold text-ink-900">
                  {result.auxHeatAtDesignBtu.toLocaleString()} BTU/hr
                </p>
                <p className="text-xs text-ink-500">
                  Capacity needed beyond heat pump at {result.heatingDesignTempF}°F.
                </p>
              </div>

              <div className="mt-4 rounded-md border-l-4 border-brand bg-brand/5 p-3">
                <p className={`text-xs font-bold uppercase tracking-wide ${RECOMMENDATION_LABEL[result.equipmentRecommendation].color}`}>
                  {RECOMMENDATION_LABEL[result.equipmentRecommendation].label}
                </p>
                <p className="mt-1 text-xs text-ink-700">{result.sizingStrategy}</p>
              </div>

              <button
                type="button"
                onClick={() => setShowBreakdown((v) => !v)}
                className="mt-4 text-sm font-medium text-brand hover:underline"
              >
                {showBreakdown ? 'Hide' : 'Show'} sizing details
              </button>

              {showBreakdown ? (
                <div className="mt-3 space-y-1 rounded-md border border-ink-300 bg-white p-3 text-xs text-ink-700">
                  <p>Driving load: <strong>{result.drivingLoad}</strong></p>
                  <p>Heating design temp (zone): {result.heatingDesignTempF}°F</p>
                  <p>Cooling design temp (zone): {result.coolingDesignTempF}°F</p>
                  <p>Heating-to-cooling load ratio: {(result.heatingLoadBtu / result.coolingLoadBtu).toFixed(2)}</p>
                  <p>
                    Aux heat at {result.heatingDesignTempF}°F:{' '}
                    {result.auxHeatAtDesignBtu === 0 ? 'none required' : `${result.auxHeatAtDesignBtu.toLocaleString()} BTU/hr`}
                  </p>
                </div>
              ) : null}
            </>
          ) : (
            <p className="text-sm text-ink-500">Enter values to calculate.</p>
          )}
        </aside>
      </div>
    </div>
  );
}
