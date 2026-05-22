import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'hvacloadcalc.org — educational HVAC reference';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #0e7490 100%)',
          color: '#f8fafc',
          padding: 80,
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            fontSize: 24,
            fontWeight: 600,
            color: '#7dd3fc',
            letterSpacing: 1,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 12,
              background: '#0ea5e9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 32,
              fontWeight: 800,
              color: '#0f172a',
            }}
          >
            HV
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 30, color: '#f8fafc', fontWeight: 700 }}>hvacloadcalc.org</span>
            <span style={{ fontSize: 16, color: '#94a3b8', fontWeight: 400 }}>
              Educational HVAC reference
            </span>
          </div>
        </div>

        <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div
              style={{
                fontSize: 72,
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: -1,
              }}
            >
              Manual J · Heat Pump Sizing · Building Science
            </div>
            <div
              style={{
                fontSize: 28,
                color: '#cbd5e1',
                fontWeight: 400,
                lineHeight: 1.3,
                maxWidth: 1000,
              }}
            >
              Free calculators with documented methodology, verified against ACCA reference cases. No
              affiliate links, no rule-of-thumb sizing.
            </div>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: 18,
            color: '#94a3b8',
            borderTop: '1px solid #334155',
            paddingTop: 24,
          }}
        >
          <div style={{ display: 'flex', gap: 32 }}>
            <span>15 articles</span>
            <span>5 calculators</span>
            <span>32 sources cited</span>
          </div>
          <span style={{ color: '#7dd3fc', fontWeight: 600 }}>hvacloadcalc.org</span>
        </div>
      </div>
    ),
    size,
  );
}
