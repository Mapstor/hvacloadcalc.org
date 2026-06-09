import Script from 'next/script';

/**
 * Loads the Google AdSense script when the NEXT_PUBLIC_ADSENSE_PUBLISHER_ID
 * environment variable is set. Until the env var is set, this component
 * renders nothing — safe to include in the root layout from day one.
 *
 * Expected env var format: "ca-pub-XXXXXXXXXXXXXXXX" (with or without the
 * "ca-" prefix — both forms are accepted).
 *
 * Once AdSense approval lands, set NEXT_PUBLIC_ADSENSE_PUBLISHER_ID in the
 * Vercel project settings and redeploy. No code change required.
 */
export function AdSenseScript() {
  const publisherId = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID;

  if (!publisherId) {
    return null;
  }

  const normalized = publisherId.startsWith('ca-')
    ? publisherId
    : `ca-${publisherId}`;

  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${normalized}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
