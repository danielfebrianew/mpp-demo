import type { Metadata } from 'next';
import { Suspense } from 'react';
import '@fontsource-variable/plus-jakarta-sans';
import { DemoNavigator } from '@/components/demo-navigator';
import './globals.css';

export const metadata: Metadata = {
  title: 'MPP Kabupaten Wakanda | Demo Pelayanan Publik',
  description:
    'Prototype read-only alur pelayanan dan antrean Mal Pelayanan Publik Kabupaten Wakanda.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="antialiased">
        <a className="skip-link" href="#main-content">Langsung ke konten</a>
        {children}
        <Suspense fallback={null}>
          <DemoNavigator />
        </Suspense>
      </body>
    </html>
  );
}
