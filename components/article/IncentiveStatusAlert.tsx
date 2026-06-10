import Link from 'next/link';

/**
 * Status alert flagging that the federal §25C Energy Efficient Home Improvement
 * Credit was modified by the One Big Beautiful Bill Act (enacted 2025) and that
 * coverage for installs after December 31, 2025 differs from prior law. Readers
 * are directed to verify current IRS guidance because tax-credit timing changes
 * happen faster than annual editorial review can track.
 *
 * Used on every hub, article, and calculator page that previously presented
 * §25C as an open 2026 program. The component is intentionally compact so it
 * can render above-the-fold without dominating the page.
 */
export function IncentiveStatusAlert() {
  return (
    <aside
      role="note"
      aria-label="Federal incentive status update"
      className="my-6 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900"
    >
      <p className="font-semibold">
        Status update: §25C Energy Efficient Home Improvement Credit
      </p>
      <p className="mt-2">
        The One Big Beautiful Bill Act (enacted 2025) modified the Section 25C credit so
        that qualifying improvements must be installed on or before December 31, 2025 to
        claim the credit on a 2025 tax return. Installs completed in 2026 or later are
        not eligible for §25C under current IRS guidance. State-administered programs
        (HEEHRA / HEAR) continue where state funds remain; status varies by state.
      </p>
      <p className="mt-2">
        Verify current 2026 incentive status with{' '}
        <a
          href="https://www.irs.gov/credits-deductions/energy-efficient-home-improvement-credit"
          className="underline hover:no-underline"
          rel="noopener noreferrer"
          target="_blank"
        >
          IRS Energy Efficient Home Improvement Credit guidance
        </a>{' '}
        and your state energy office before assuming any specific credit or rebate
        amount. See the{' '}
        <Link href="/corrections/" className="underline hover:no-underline">
          corrections log
        </Link>{' '}
        for the most recent editorial update to incentive coverage on this site.
      </p>
    </aside>
  );
}
