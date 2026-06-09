import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0ea5e9 0%, #0e7490 100%)',
          color: '#ffffff',
          fontSize: 84,
          fontWeight: 800,
          fontFamily: 'sans-serif',
          letterSpacing: -2,
        }}
      >
        HV
      </div>
    ),
    size,
  );
}
