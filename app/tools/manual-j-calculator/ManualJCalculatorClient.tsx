'use client';

import { useEffect, useState } from 'react';
import {
  calculateManualJ,
  type ConstructionEra,
  type ManualJInputs,
  type ManualJResult,
} from '@/lib/calculators/manual-j';
import type { ClimateZone } from '@/lib/calculators/btu';
import { NumberInput } from '@/components/forms/NumberInput';
import { ManualJResult as ManualJResultPanel } from './ManualJResult';

const CLIMATE_OPTIONS: Array<{ value: ClimateZone; label: string }> = [
  { value: '1', label: 'Zone 1 — South FL, Hawaii' },
  { value: '2', label: 'Zone 2 — Gulf Coast, lower south' },
  { value: '3', label: 'Zone 3 — Mid-south' },
  { value: '4', label: 'Zone 4 — Mid-Atlantic, Ohio Valley' },
  { value: '5', label: 'Zone 5 — Northern states' },
  { value: '6', label: 'Zone 6 — Northern MW, Rockies' },
  { value: '7', label: 'Zone 7 — Northern MN, mountain west' },
  { value: '8', label: 'Zone 8 — Interior Alaska' },
];

const ERA_OPTIONS: Array<{ value: ConstructionEra; label: string }> = [
  { value: 'pre-1980', label: 'Pre-1980 (R-7 walls, single-pane)' },
  { value: '1980-1999', label: '1980-1999 (R-11 walls, double-pane)' },
  { value: '2000-2009', label: '2000-2009 (R-13 walls, Low-E)' },
  { value: '2010-2019', label: '2010-2019 (R-19 walls, U-0.35)' },
  { value: '2020+', label: '2020+ (R-21 walls, U-0.30)' },
];

interface Props {
  defaults: ManualJInputs;
  autoCalculate?: boolean;
}

export function ManualJCalculatorClient({ defaults, autoCalculate = false }: Props) {
  const [inputs, setInputs] = useState<ManualJInputs>(defaults);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [result, setResult] = useState<ManualJResult | null>(
    autoCalculate ? calculateManualJ(defaults) : null,
  );
  const [resultInputs, setResultInputs] = useState<ManualJInputs | null>(
    autoCalculate ? defaults : null,
  );
  const [isStale, setIsStale] = useState(false);

  useEffect(() => {
    if (autoCalculate && !result) {
      try {
        setResult(calculateManualJ(defaults));
        setResultInputs(defaults);
      } catch {}
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function update<K extends keyof ManualJInputs>(key: K, value: ManualJInputs[K]) {
    setInputs((prev) => ({ ...prev, [key]: value }));
    if (result) setIsStale(true);
  }

  function handleCalculate() {
    try {
      const r = calculateManualJ(inputs);
      setResult(r);
      setResultInputs({ ...inputs });
      setIsStale(false);
      window.requestAnimationFrame(() => {
        document.getElementById('mj-result')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    } catch {
      setResult(null);
    }
  }

  function handleReset() {
    setInputs(defaults);
    setShowAdvanced(false);
    setResult(null);
    setResultInputs(null);
    setIsStale(false);
  }

  return (
    <div className="not-prose">
      <div className="rounded-xl border border-ink-300 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-ink-900">Your home</h2>
        <p className="mt-1 text-sm text-ink-600">
          Enter whole-house characteristics, then click Calculate to see Manual J-style heating and
          cooling loads with full component breakdown, an envelope-component chart, equipment sizing
          implication, and the design conditions used.
        </p>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <div>
            <label htmlFor="sqft" className="block text-sm font-medium text-ink-700">
              Total conditioned square footage
            </label>
            <NumberInput
              id="sqft"
              min={500}
              max={8000}
              step={50}
              value={inputs.squareFootage}
              onChange={(n) => update('squareFootage', n)}
              className="mt-1 w-full rounded-md border border-ink-300 px-3 py-2 text-base shadow-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
            />
          </div>

          <div>
            <label htmlFor="zone" className="block text-sm font-medium text-ink-700">Climate zone</label>
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
            <label htmlFor="stories" className="block text-sm font-medium text-ink-700">Stories</label>
            <select
              id="stories"
              value={inputs.stories}
              onChange={(e) => update('stories', Number(e.target.value) as 1 | 2 | 3)}
              className="mt-1 w-full rounded-md border border-ink-300 px-3 py-2 text-base shadow-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
            >
              <option value={1}>1 story</option>
              <option value={2}>2 stories</option>
              <option value={3}>3 stories</option>
            </select>
          </div>

          <div>
            <label htmlFor="ceiling" className="block text-sm font-medium text-ink-700">Ceiling height</label>
            <select
              id="ceiling"
              value={inputs.ceilingHeight}
              onChange={(e) => update('ceilingHeight', Number(e.target.value) as 8 | 9 | 10 | 12)}
              className="mt-1 w-full rounded-md border border-ink-300 px-3 py-2 text-base shadow-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
            >
              <option value={8}>8 ft</option>
              <option value={9}>9 ft</option>
              <option value={10}>10 ft</option>
              <option value={12}>12+ ft (cathedral)</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label htmlFor="era" className="block text-sm font-medium text-ink-700">Construction era</label>
            <select
              id="era"
              value={inputs.constructionEra}
              onChange={(e) => update('constructionEra', e.target.value as ConstructionEra)}
              className="mt-1 w-full rounded-md border border-ink-300 px-3 py-2 text-base shadow-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
            >
              {ERA_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <p className="mt-1 text-xs text-ink-500">
              Drives default envelope R-values, window U-factor, and air leakage. Override below if you know the specifics.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowAdvanced((v) => !v)}
          className="mt-4 text-sm font-medium text-brand hover:underline"
        >
          {showAdvanced ? 'Hide' : 'Show'} advanced envelope inputs (override era defaults)
        </button>

        {showAdvanced ? (
          <div className="mt-4 space-y-4 rounded-md border border-ink-300 bg-ink-50 p-4">
            <p className="text-xs text-ink-500">Leave blank to use era defaults.</p>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
              <div>
                <label htmlFor="wallR" className="block text-xs font-medium text-ink-700">Wall R-value</label>
                <input
                  id="wallR" type="number" min={0} max={50} step={1}
                  value={inputs.wallRValue ?? ''}
                  placeholder="auto"
                  onChange={(e) => update('wallRValue', e.target.value === '' ? undefined : Number(e.target.value))}
                  className="mt-1 w-full rounded-md border border-ink-300 px-3 py-2 text-sm shadow-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                />
              </div>
              <div>
                <label htmlFor="ceilR" className="block text-xs font-medium text-ink-700">Ceiling R-value</label>
                <input
                  id="ceilR" type="number" min={0} max={100} step={1}
                  value={inputs.ceilingRValue ?? ''}
                  placeholder="auto"
                  onChange={(e) => update('ceilingRValue', e.target.value === '' ? undefined : Number(e.target.value))}
                  className="mt-1 w-full rounded-md border border-ink-300 px-3 py-2 text-sm shadow-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                />
              </div>
              <div>
                <label htmlFor="floorR" className="block text-xs font-medium text-ink-700">Floor R-value</label>
                <input
                  id="floorR" type="number" min={0} max={50} step={1}
                  value={inputs.floorRValue ?? ''}
                  placeholder="auto"
                  onChange={(e) => update('floorRValue', e.target.value === '' ? undefined : Number(e.target.value))}
                  className="mt-1 w-full rounded-md border border-ink-300 px-3 py-2 text-sm shadow-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                />
              </div>
              <div>
                <label htmlFor="winU" className="block text-xs font-medium text-ink-700">Window U-factor</label>
                <input
                  id="winU" type="number" min={0.1} max={1.5} step={0.05}
                  value={inputs.windowUFactor ?? ''}
                  placeholder="auto"
                  onChange={(e) => update('windowUFactor', e.target.value === '' ? undefined : Number(e.target.value))}
                  className="mt-1 w-full rounded-md border border-ink-300 px-3 py-2 text-sm shadow-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                />
              </div>
              <div>
                <label htmlFor="winRatio" className="block text-xs font-medium text-ink-700">Window-to-floor ratio</label>
                <input
                  id="winRatio" type="number" min={0.05} max={0.5} step={0.01}
                  value={inputs.windowToFloorRatio ?? ''}
                  placeholder="0.15"
                  onChange={(e) => update('windowToFloorRatio', e.target.value === '' ? undefined : Number(e.target.value))}
                  className="mt-1 w-full rounded-md border border-ink-300 px-3 py-2 text-sm shadow-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                />
              </div>
              <div>
                <label htmlFor="ach50" className="block text-xs font-medium text-ink-700">ACH50 (blower door)</label>
                <input
                  id="ach50" type="number" min={1} max={30} step={0.5}
                  value={inputs.ach50 ?? ''}
                  placeholder="auto"
                  onChange={(e) => update('ach50', e.target.value === '' ? undefined : Number(e.target.value))}
                  className="mt-1 w-full rounded-md border border-ink-300 px-3 py-2 text-sm shadow-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                />
              </div>
              <div>
                <label htmlFor="occ" className="block text-xs font-medium text-ink-700">Occupants</label>
                <input
                  id="occ" type="number" min={1} max={12} step={1}
                  value={inputs.occupants ?? ''}
                  placeholder="3"
                  onChange={(e) => update('occupants', e.target.value === '' ? undefined : Number(e.target.value))}
                  className="mt-1 w-full rounded-md border border-ink-300 px-3 py-2 text-sm shadow-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                />
              </div>
              <div>
                <label htmlFor="shgc" className="block text-xs font-medium text-ink-700">Window SHGC</label>
                <input
                  id="shgc" type="number" min={0.1} max={0.9} step={0.05}
                  value={inputs.windowSHGC ?? ''}
                  placeholder="auto"
                  onChange={(e) => update('windowSHGC', e.target.value === '' ? undefined : Number(e.target.value))}
                  className="mt-1 w-full rounded-md border border-ink-300 px-3 py-2 text-sm shadow-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                />
              </div>
            </div>
          </div>
        ) : null}

        <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-ink-200 pt-5">
          <button
            type="button"
            onClick={handleCalculate}
            className="rounded-md bg-brand px-6 py-2.5 text-base font-semibold text-white shadow-sm transition hover:bg-brand/90 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2"
          >
            {result ? 'Recalculate' : 'Calculate'}
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

      <div id="mj-result" className={`mt-8 transition-opacity ${isStale ? 'opacity-60' : 'opacity-100'}`}>
        {result && resultInputs ? (
          <ManualJResultPanel result={result} inputs={resultInputs} />
        ) : (
          <div className="rounded-xl border border-dashed border-ink-300 bg-ink-50/50 p-12 text-center">
            <p className="text-base font-medium text-ink-700">
              Enter your inputs above, then click Calculate
            </p>
            <p className="mt-1 text-sm text-ink-500">
              Result will appear here with heating and cooling loads, a stacked-bar chart of
              envelope component contributions, equipment sizing implication, per-component
              breakdown tables, and the design conditions used.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
