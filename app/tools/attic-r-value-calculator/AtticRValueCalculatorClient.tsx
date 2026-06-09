'use client';

import { useEffect, useState } from 'react';
import {
  calculateAtticRValue,
  INSULATION_DISPLAY_NAMES,
  type AtticRValueInputs,
  type AtticRValueResult as AtticResultType,
  type InsulationLayer,
  type InsulationType,
} from '@/lib/calculators/attic-r-value';
import type { ClimateZone } from '@/lib/calculators/btu';
import { NumberInput } from '@/components/forms/NumberInput';
import { AtticRValueResult } from './AtticRValueResult';

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

const INSULATION_OPTIONS: InsulationType[] = [
  'fiberglass-batt',
  'loose-fill-fiberglass',
  'loose-fill-cellulose',
  'mineral-wool-batt',
  'open-cell-spray-foam',
  'closed-cell-spray-foam',
  'polyiso-rigid-foam',
  'xps-rigid-foam',
  'eps-rigid-foam',
];

interface Props {
  defaults: AtticRValueInputs;
  autoCalculate?: boolean;
}

export function AtticRValueCalculatorClient({ defaults, autoCalculate = false }: Props) {
  const [layers, setLayers] = useState<InsulationLayer[]>(defaults.layers);
  const [climateZone, setClimateZone] = useState<ClimateZone>(defaults.climateZone);
  const [result, setResult] = useState<AtticResultType | null>(
    autoCalculate ? calculateAtticRValue(defaults) : null,
  );
  const [resultInputs, setResultInputs] = useState<AtticRValueInputs | null>(
    autoCalculate ? defaults : null,
  );
  const [isStale, setIsStale] = useState(false);

  useEffect(() => {
    if (autoCalculate && !result) {
      try {
        setResult(calculateAtticRValue(defaults));
        setResultInputs(defaults);
      } catch {}
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function updateLayer(idx: number, key: keyof InsulationLayer, value: InsulationLayer[keyof InsulationLayer]) {
    setLayers((prev) => prev.map((l, i) => (i === idx ? { ...l, [key]: value } : l)));
    if (result) setIsStale(true);
  }

  function addLayer() {
    setLayers((prev) => [...prev, { type: 'loose-fill-cellulose', depthInches: 6 }]);
    if (result) setIsStale(true);
  }

  function removeLayer(idx: number) {
    setLayers((prev) => prev.filter((_, i) => i !== idx));
    if (result) setIsStale(true);
  }

  function updateZone(z: ClimateZone) {
    setClimateZone(z);
    if (result) setIsStale(true);
  }

  function handleCalculate() {
    try {
      const r = calculateAtticRValue({ layers, climateZone });
      setResult(r);
      setResultInputs({ layers: [...layers], climateZone });
      setIsStale(false);
      window.requestAnimationFrame(() => {
        document.getElementById('attic-result')?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      });
    } catch {
      setResult(null);
    }
  }

  function handleReset() {
    setLayers(defaults.layers);
    setClimateZone(defaults.climateZone);
    setResult(null);
    setResultInputs(null);
    setIsStale(false);
  }

  return (
    <div className="not-prose">
      <div className="rounded-xl border border-ink-300 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-ink-900">Your attic insulation</h2>
        <p className="mt-1 text-sm text-ink-600">
          Add one layer per distinct material in your attic (e.g., original fiberglass batts plus
          newer blown-in cellulose). Measure depth in inches at multiple points and use a typical
          value. Click Calculate to see your total R-value, status against DOE recommendations, an
          R-value gauge, and upgrade depth by material if needed.
        </p>

        <div className="mt-6 grid gap-5">
          <div>
            <label htmlFor="zone" className="block text-sm font-medium text-ink-700">
              Climate zone
            </label>
            <select
              id="zone"
              value={climateZone}
              onChange={(e) => updateZone(e.target.value as ClimateZone)}
              className="mt-1 w-full rounded-md border border-ink-300 px-3 py-2 text-base shadow-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
            >
              {CLIMATE_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>

          <div>
            <p className="text-sm font-medium text-ink-700">Insulation layers</p>
            <div className="mt-3 space-y-3">
              {layers.map((layer, idx) => (
                <div key={idx} className="rounded-md border border-ink-300 bg-ink-50 p-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-ink-900">Layer {idx + 1}</p>
                    {layers.length > 1 ? (
                      <button
                        type="button"
                        onClick={() => removeLayer(idx)}
                        className="text-xs text-danger hover:underline"
                      >
                        Remove
                      </button>
                    ) : null}
                  </div>
                  <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-[1fr_140px]">
                    <select
                      value={layer.type}
                      onChange={(e) => updateLayer(idx, 'type', e.target.value as InsulationType)}
                      className="rounded-md border border-ink-300 px-3 py-2 text-sm shadow-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                    >
                      {INSULATION_OPTIONS.map((t) => (
                        <option key={t} value={t}>{INSULATION_DISPLAY_NAMES[t]}</option>
                      ))}
                    </select>
                    <div>
                      <NumberInput
                        min={0}
                        max={48}
                        step={0.5}
                        value={layer.depthInches}
                        onChange={(n) => updateLayer(idx, 'depthInches', n)}
                        className="w-full rounded-md border border-ink-300 px-3 py-2 text-sm shadow-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                        aria-label={`Layer ${idx + 1} inches deep`}
                      />
                      <p className="mt-1 text-xs text-ink-500">inches deep</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addLayer}
              className="mt-3 text-sm font-medium text-brand hover:underline"
            >
              + Add another layer
            </button>
          </div>
        </div>

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

      <div id="attic-result" className={`mt-8 transition-opacity ${isStale ? 'opacity-60' : 'opacity-100'}`}>
        {result && resultInputs ? (
          <AtticRValueResult result={result} inputs={resultInputs} />
        ) : (
          <div className="rounded-xl border border-dashed border-ink-300 bg-ink-50/50 p-12 text-center">
            <p className="text-base font-medium text-ink-700">
              Enter your insulation layers above, then click Calculate
            </p>
            <p className="mt-1 text-sm text-ink-500">
              Result will appear here with the total R-value, R-value gauge, layer breakdown,
              upgrade material options, and energy savings estimate.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
