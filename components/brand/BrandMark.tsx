interface Props {
  className?: string;
  title?: string;
}

/**
 * The hvacloadcalc.org brand mark — a square monogram with stacked "HV"
 * (for HVAC), set on a brand-color gradient. Used in the site Header.
 *
 * Sized by `className` (typically `h-10 w-10`). The SVG is intrinsically
 * 40×40 and scales cleanly to any size via the viewBox.
 *
 * Decorative by default (aria-hidden); pass `title` to make it accessible
 * standalone (then it announces as a graphic to assistive tech).
 */
export function BrandMark({ className, title }: Props) {
  const labelled = title !== undefined;
  return (
    <svg
      viewBox="0 0 40 40"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role={labelled ? 'img' : 'presentation'}
      aria-hidden={labelled ? undefined : true}
      aria-label={labelled ? title : undefined}
      focusable="false"
    >
      <defs>
        <linearGradient id="brandmark-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1e40af" />
          <stop offset="100%" stopColor="#0891b2" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="8" fill="url(#brandmark-grad)" />
      <text
        x="20"
        y="27"
        textAnchor="middle"
        fontSize="15"
        fontWeight="800"
        fill="white"
        fontFamily="system-ui, -apple-system, 'Segoe UI', sans-serif"
        letterSpacing="-0.5"
      >
        HV
      </text>
    </svg>
  );
}
