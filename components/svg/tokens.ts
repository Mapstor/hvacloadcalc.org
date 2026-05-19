export const colors = {
  brand: {
    primary: '#1e40af',
    primaryLight: '#3b82f6',
    primaryDark: '#1e3a8a',
    accent: '#0891b2',
    accentLight: '#22d3ee',
  },
  ink: {
    900: '#0f172a',
    700: '#334155',
    500: '#64748b',
    300: '#cbd5e1',
    100: '#f1f5f9',
  },
  good: '#059669',
  warn: '#d97706',
  danger: '#dc2626',
  info: '#0284c7',
  surface: {
    canvas: '#ffffff',
    subtle: '#f8fafc',
    contrast: '#1e293b',
  },
  series: {
    primary: '#1e40af',
    secondary: '#d97706',
    tertiary: '#059669',
    quaternary: '#7c3aed',
  },
  zones: {
    danger: 'rgba(220, 38, 38, 0.12)',
    warn: 'rgba(217, 119, 6, 0.12)',
    good: 'rgba(5, 150, 105, 0.12)',
    info: 'rgba(2, 132, 199, 0.10)',
  },
} as const;

export const typography = {
  fontFamily:
    'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  size: {
    heroTitle: 30,
    chartTitle: 22,
    axisLabel: 15,
    tickLabel: 12,
    dataPointLabel: 13,
    annotation: 12,
    legend: 13,
    caption: 14,
  },
  weight: {
    title: 600,
    label: 500,
    body: 400,
  },
} as const;
