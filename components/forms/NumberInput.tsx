'use client';

import { useEffect, useState } from 'react';

interface Props {
  value: number;
  onChange: (n: number) => void;
  min?: number;
  max?: number;
  step?: number;
  id?: string;
  className?: string;
  placeholder?: string;
  'aria-label'?: string;
  'aria-describedby'?: string;
}

/**
 * Number input that decouples the displayed text from the committed numeric
 * value. Solves the "can't clear the field" bug that controlled number inputs
 * have when onChange coerces empty → 0 → re-renders as "0".
 *
 * Behavior:
 * - Text state is local so the user can transiently have empty or partial
 *   values ("", "1.", "-") while typing.
 * - On every keystroke, if the text parses to a finite number, the parent's
 *   numeric value is updated (no clamping during typing — clamping mid-type
 *   blocks valid input).
 * - On blur, the value is normalized: empty/invalid → falls back to `min`
 *   (or 0); out-of-range → clamped to [min, max].
 * - When the parent's `value` prop changes externally (Reset button,
 *   example pre-fill), the displayed text syncs.
 */
export function NumberInput({
  value,
  onChange,
  min,
  max,
  step,
  id,
  className,
  placeholder,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedby,
}: Props) {
  const [text, setText] = useState<string>(() => String(value));

  // Sync local text when the parent value changes from outside. Skip if the
  // current text already parses to the same number — avoids clobbering
  // partial input like "1." with "1" while the user is typing.
  useEffect(() => {
    const numFromText = Number(text);
    if (!Number.isFinite(numFromText) || numFromText !== value) {
      setText(String(value));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <input
      id={id}
      type="number"
      inputMode="decimal"
      value={text}
      onChange={(e) => {
        const raw = e.target.value;
        setText(raw);
        if (raw.trim() === '') {
          // Allow transient empty; don't propagate to parent state.
          return;
        }
        const n = Number(raw);
        if (Number.isFinite(n)) {
          // Don't clamp during typing — that prevents typing "1500" when
          // min=100 (snaps to 100 after the "1"). Clamp on blur instead.
          onChange(n);
        }
      }}
      onBlur={(e) => {
        const raw = e.target.value.trim();
        if (raw === '' || !Number.isFinite(Number(raw))) {
          const fallback = min ?? 0;
          setText(String(fallback));
          onChange(fallback);
          return;
        }
        let n = Number(raw);
        if (min !== undefined && n < min) n = min;
        if (max !== undefined && n > max) n = max;
        if (String(n) !== raw) {
          setText(String(n));
        }
        onChange(n);
      }}
      min={min}
      max={max}
      step={step}
      className={className}
      placeholder={placeholder}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedby}
    />
  );
}
