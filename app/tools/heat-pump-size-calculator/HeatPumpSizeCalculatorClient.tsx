'use client';

import { useEffect, useState } from 'react';
import {
  calculateHeatPumpSize,
  type HeatPumpInputs,
  type HeatPumpResult,
} from '@/lib/calculators/heat-pump-size';
import type {
  CeilingHeight,
  ClimateZone,
  InsulationLevel,
  SpaceType,
  SunExposure,
} from '@/lib/calculators/btu';
import { NumberInput } from '@/components/forms/NumberInput';
import { HeatPumpResult as HeatPumpResultPanel } from './HeatPumpResult';

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

interface Props {
  defaults: HeatPumpInputs;
  autoCalculate?: boolean;
}

export function HeatPumpSizeCalculatorClient({ defaults, autoCalculate = false }: Props) {
  const [inputs, setInputs] = useState<HeatPumpInputs>(defaults);
  const [calculatedResult, setCalculatedResult] = useState<HeatPumpResult | null>(
    autoCalculate ? calculateHeatPumpSize(defaults) : null,
  );
  const [resultInputs, setResultInputs] = useState<HeatPumpInputs | null>(
    autoCalculate ? defaults : null,
  );
  const [isStale, setIsStale] = useState(false);

  useEffect(() => {
    if (autoCalculate && !calculatedResult) {
      try {
        setCalculatedResult(calculateHeatPumpSize(defaults));
        setResultInputs(defaults);
      } catch {}
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function update<K extends keyof HeatPumpInputs>(key: K, value: HeatPumpInputs[K]) {
    setInputs((prev) => ({ ...prev, [key]: value }));
    if (calculatedResult) {
      setIsStale(true);
    }
  }

  function handleCalculate() {
    try {
      const r = calculateHeatPumpSize(inputs);
      setCalculatedResult(r);
      setResultInputs({ ...inputs });
      setIsStale(false);
      window.requestAnimationFrame(() => {
        document.getElementById('hp-result')?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      });
    } catch {
      setCalculatedResult(null);
    }
  }

  function handleReset() {
    setInputs(defaults);
    setCalculatedResult(null);
    setResultInputs(null);
    setIsStale(false);
  }

  return (
    <div className="not-prose">
      <div className="rounded-xl border border-ink-300 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-ink-900">Your home</h2>
        <p className="mt-1 text-sm text-ink-600">
          Enter your home characteristics, then click Calculate to see the recommended heat pump
          size, balance point, and aux heat capacity as a sized chart.
        </p>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <div>
            <label htmlFor="sqft" className="block text-sm font-medium text-ink-700">
              Square footage
            </label>
            <NumberInput
              id="sqft"
              min={300}
              max={6000}
              step={50}
              value={inputs.squareFootage}
              onChange={(n) => update('squareFootage', n)}
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
            <NumberInput
              id="occupants"
              min={1}
              max={20}
              step={1}
              value={inputs.occupants}
              onChange={(n) => update('occupants', n)}
              className="mt-1 w-full rounded-md border border-ink-300 px-3 py-2 text-base shadow-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
            />
            <p className="mt-1 text-xs text-ink-500">+600 BTU per person above 2</p>
          </div>

          <div className="flex items-end">
            <label className="flex w-full items-start gap-2 rounded-md border border-ink-300 bg-ink-50 px-3 py-2">
              <input
                type="checkbox"
                checked={inputs.coldClimateEquipment}
                onChange={(e) => update('coldClimateEquipment', e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-ink-300 text-brand focus:ring-brand"
              />
              <span className="text-sm text-ink-700">
                <span className="font-medium">Cold-climate (CCASHP) equipment</span>
                <span className="mt-1 block text-xs text-ink-500">
                  Toggles capacity model
                </span>
              </span>
            </label>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-ink-200 pt-5">
          <button
            type="button"
            onClick={handleCalculate}
            className="rounded-md bg-brand px-6 py-2.5 text-base font-semibold text-white shadow-sm transition hover:bg-brand/90 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2"
          >
            {calculatedResult ? 'Recalculate' : 'Calculate'}
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="text-sm font-medium text-ink-700 hover:text-brand"
          >
            Reset to defaults
          </button>
          {isStale ? (
            <span className="ml-auto text-sm font-medium text-warn">
              Inputs changed — click Recalculate
            </span>
          ) : null}
        </div>
      </div>

      <div id="hp-result" className={`mt-8 transition-opacity ${isStale ? 'opacity-60' : 'opacity-100'}`}>
        {calculatedResult && resultInputs ? (
          <HeatPumpResultPanel result={calculatedResult} inputs={resultInputs} />
        ) : (
          <div className="rounded-xl border border-dashed border-ink-300 bg-ink-50/50 p-12 text-center">
            <p className="text-base font-medium text-ink-700">
              Enter your inputs above, then click Calculate
            </p>
            <p className="mt-1 text-sm text-ink-500">
              Result will appear here with the recommended size, capacity-vs-temperature chart,
              balance point, aux heat sizing, operating cost comparison, and federal incentive
              eligibility.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
