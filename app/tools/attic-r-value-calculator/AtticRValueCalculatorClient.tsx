'use client';

import { useMemo, useState } from 'react';
import {
  calculateAtticRValue,
  INSULATION_DISPLAY_NAMES,
  type AtticRValueInputs,
  type InsulationLayer,
  type InsulationType,
} from '@/lib/calculators/attic-r-value';
import type { ClimateZone } from '@/lib/calculators/btu';

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

const STATUS_COLORS: Record<string, { bg: string; border: string; text: string; label: string }> = {
  'below-doe-low': {
    bg: 'bg-danger/10',
    border: 'border-danger',
    text: 'text-danger',
    label: 'Below DOE recommendation',
  },
  'meets-iecc-only': {
    bg: 'bg-warn/10',
    border: 'border-warn',
    text: 'text-warn',
    label: 'Meets IECC code only',
  },
  'in-doe-range': {
    bg: 'bg-good/10',
    border: 'border-good',
    text: 'text-good',
    label: 'Within DOE recommended range',
  },
  'at-or-above-doe-high': {
    bg: 'bg-good/15',
    border: 'border-good',
    text: 'text-good',
    label: 'At or above DOE recommended high',
  },
};

interface Props {
  defaults: AtticRValueInputs;
}

export function AtticRValueCalculatorClient({ defaults }: Props) {
  const [layers, setLayers] = useState<InsulationLayer[]>(defaults.layers);
  const [climateZone, setClimateZone] = useState<ClimateZone>(defaults.climateZone);

  const result = useMemo(() => {
    try {
      return calculateAtticRValue({ layers, climateZone });
    } catch {
      return null;
    }
  }, [layers, climateZone]);

  function updateLayer(idx: number, key: keyof InsulationLayer, value: InsulationLayer[keyof InsulationLayer]) {
    setLayers((prev) => prev.map((l, i) => (i === idx ? { ...l, [key]: value } : l)));
  }

  function addLayer() {
    setLayers((prev) => [...prev, { type: 'loose-fill-cellulose', depthInches: 6 }]);
  }

  function removeLayer(idx: number) {
    setLayers((prev) => prev.filter((_, i) => i !== idx));
  }

  function reset() {
    setLayers(defaults.layers);
    setClimateZone(defaults.climateZone);
  }

  const statusStyle = result ? STATUS_COLORS[result.status] : null;

  return (
    <div className="not-prose">
      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        {/* Inputs */}
        <div className="space-y-5">
          <h2 className="text-lg font-semibold text-ink-900">Your attic</h2>

          <div>
            <label htmlFor="zone" className="block text-sm font-medium text-ink-700">
              Climate zone
            </label>
            <select
              id="zone"
              value={climateZone}
              onChange={(e) => setClimateZone(e.target.value as ClimateZone)}
              className="mt-1 w-full rounded-md border border-ink-300 px-3 py-2 text-base shadow-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
            >
              {CLIMATE_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>

          <div>
            <p className="text-sm font-medium text-ink-700">Insulation layers</p>
            <p className="mt-1 text-xs text-ink-500">
              Measure depth in inches at multiple spots in the attic; use a typical value. Add a layer
              for each distinct material (e.g., original fiberglass + newer blown-in cellulose).
            </p>

            <div className="mt-3 space-y-3">
              {layers.map((layer, idx) => (
                <div key={idx} className="rounded-md border border-ink-300 bg-white p-3">
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
                  <div className="mt-2 grid grid-cols-[1fr_120px] gap-3">
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
                      <input
                        type="number"
                        min={0}
                        max={48}
                        step={0.5}
                        value={layer.depthInches}
                        onChange={(e) => updateLayer(idx, 'depthInches', Math.max(0, Math.min(48, Number(e.target.value) || 0)))}
                        className="w-full rounded-md border border-ink-300 px-3 py-2 text-sm shadow-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
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

          <button
            type="button"
            onClick={reset}
            className="text-sm font-medium text-brand hover:underline"
          >
            Reset to defaults
          </button>
        </div>

        {/* Result panel */}
        <aside className="self-start space-y-4">
          {result ? (
            <>
              <div className="rounded-lg border border-ink-300 bg-ink-50/50 p-6">
                <p className="text-xs font-medium uppercase tracking-wide text-ink-500">Total R-value</p>
                <p className="mt-1 text-4xl font-bold text-brand">R-{result.totalRValue.toFixed(1)}</p>

                {statusStyle ? (
                  <div className={`mt-4 rounded-md border-l-4 ${statusStyle.border} ${statusStyle.bg} p-3`}>
                    <p className={`text-xs font-bold uppercase tracking-wide ${statusStyle.text}`}>
                      {statusStyle.label}
                    </p>
                    <p className="mt-1 text-xs text-ink-700">
                      DOE recommended: R-{result.doeRecommendedRange.low} to R-{result.doeRecommendedRange.high}.
                      IECC 2021 code minimum: R-{result.ieccCodeMinimum}.
                    </p>
                  </div>
                ) : null}

                {result.perLayerRValues.length > 0 ? (
                  <div className="mt-4 rounded-md border border-ink-300 bg-white p-3">
                    <p className="text-xs font-medium uppercase tracking-wide text-ink-500">By layer</p>
                    <ul className="mt-2 space-y-1 text-xs text-ink-700">
                      {result.perLayerRValues.map((l, i) => (
                        <li key={i}>
                          {l.depthInches}″ {INSULATION_DISPLAY_NAMES[l.type]} = R-{l.rValue.toFixed(1)}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>

              {result.upgradeRecommendation ? (
                <div className="rounded-lg border border-warn bg-warn/5 p-6">
                  <p className="text-xs font-bold uppercase tracking-wide text-warn">Upgrade to reach R-{result.upgradeRecommendation.targetR}</p>
                  <p className="mt-2 text-sm text-ink-700">
                    Add R-{result.upgradeRecommendation.additionalRNeeded.toFixed(1)} on top of existing.
                    Required depth by material:
                  </p>
                  <ul className="mt-2 space-y-1 text-xs text-ink-700">
                    {result.upgradeRecommendation.depthsByMaterial.map((d) => (
                      <li key={d.type}>
                        <strong>{d.depthInches}″</strong> of {INSULATION_DISPLAY_NAMES[d.type]}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 text-xs text-ink-500">
                    Air seal first; insulation over leaky penetrations underperforms.
                  </p>
                </div>
              ) : null}
            </>
          ) : (
            <p className="text-sm text-ink-500">Enter insulation layers to calculate.</p>
          )}
        </aside>
      </div>
    </div>
  );
}
