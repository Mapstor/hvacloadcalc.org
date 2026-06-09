import Script from 'next/script';

/**
 * Google Analytics 4 (gtag.js) loader.
 *
 * Measurement ID defaults to G-8JKRL1W32Q (the production property) and can
 * be overridden per environment via NEXT_PUBLIC_GA4_MEASUREMENT_ID.
 *
 * Loads with strategy="afterInteractive" so it does not block first paint
 * or Core Web Vitals. The privacy policy at /privacy/ discloses the GA4
 * cookies (_ga, _ga_*) and how users can opt out.
 */
const DEFAULT_GA_ID = 'G-8JKRL1W32Q';

export function GoogleAnalyticsScript() {
  const gaId = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID || DEFAULT_GA_ID;

  if (!gaId) {
    return null;
  }

  return (
    <>
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}');
        `}
      </Script>
    </>
  );
}
