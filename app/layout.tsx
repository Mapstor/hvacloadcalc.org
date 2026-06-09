import type { Metadata, Viewport } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AdSenseScript } from '@/components/seo/AdSenseScript';
import { GoogleAnalyticsScript } from '@/components/seo/GoogleAnalyticsScript';
import { SITE } from '@/lib/seo/site';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: SITE.name,
  description: SITE.description,
  verification: {
    google: 'google12f8c2f9c03913a3',
    other: {
      'msvalidate.01': '57C407E8336C4915E2D28EEA649C8078',
    },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0ea5e9',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-white font-sans text-ink-900 antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <GoogleAnalyticsScript />
        <AdSenseScript />
      </body>
    </html>
  );
}
