import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

/**
 * ads.txt route — declares authorized digital sellers per IAB Tech Lab spec.
 *
 * The Google AdSense publisher ID is read from the
 * NEXT_PUBLIC_ADSENSE_PUBLISHER_ID environment variable. Set this in Vercel
 * project settings once AdSense approval lands (format: ca-pub-XXXXXXXXXXXXXXXX).
 *
 * Until the env var is set, this route returns an empty file (200 OK with no
 * content), which is the correct "I have no authorized sellers yet" response.
 */
export function GET() {
  const publisherId = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID;

  if (!publisherId) {
    return new NextResponse('', {
      status: 200,
      headers: { 'content-type': 'text/plain; charset=utf-8' },
    });
  }

  // Normalize: AdSense publisher IDs may be entered with or without the
  // "ca-" prefix. ads.txt expects the bare "pub-XXXX" form.
  const normalized = publisherId.replace(/^ca-/, '');

  const body = `google.com, ${normalized}, DIRECT, f08c47fec0942fa0\n`;

  return new NextResponse(body, {
    status: 200,
    headers: { 'content-type': 'text/plain; charset=utf-8' },
  });
}
