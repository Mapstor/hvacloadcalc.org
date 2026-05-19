import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.mdx',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#1e40af',
          accent: '#0891b2',
        },
        ink: {
          900: '#0f172a',
          700: '#334155',
          500: '#64748b',
          300: '#cbd5e1',
          100: '#f1f5f9',
        },
        warn: '#d97706',
        danger: '#dc2626',
        good: '#059669',
      },
      fontFamily: {
        sans: [
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'monospace'],
      },
      maxWidth: {
        prose: '68ch',
        wide: '76rem',
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#334155',
            maxWidth: '68ch',
          },
        },
      },
    },
  },
  plugins: [typography],
};

export default config;
