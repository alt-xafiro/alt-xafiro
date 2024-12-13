import clsx from 'clsx';
import type { Metadata } from 'next';

import '@/styles/globals.css';

import { exo2 } from '@/ui/fonts';

import Background from '@/components/background/background';
import Header from '@/components/header/header';

export const metadata: Metadata = {
  metadataBase: new URL('https://xafiro.site'),
  title: 'Safiro | Front-End Developer',
  description: "Hi! I'm Maxim, a front-end developer.",
  authors: [
    {
      name: 'Safiro',
      url: 'https://github.com/alt-xafiro'
    }
  ],
  icons: [
    '/favicon.ico',
    {
      rel: 'apple-touch-icon',
      url: '/favicon-apple.png'
    }
  ],
  manifest: '/favicon.webmanifest',
  openGraph: {
    siteName: 'Safiro | Front-End Developer',
    url: 'https://xafiro.site'
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scrollbar-gutter-stable h-full min-h-full">
      <body
        className={clsx(
          exo2.className,
          'grid h-full min-h-full w-full min-w-[360px] grid-cols-1 grid-rows-[min-content_1fr] break-words bg-space-900 pb-12 pl-[48px] pr-[48px] text-white md:pl-[36px] md:pr-[36px] sm:pl-[24px] sm:pr-[24px]',
          'scrollbar scrollbar-track-space-900 scrollbar-thumb-space-800'
        )}
      >
        <Background />
        <Header />
        <main className="flex items-start justify-center">
          <div className="h-full w-[1440px] 2xl:w-full">{children}</div>
        </main>
      </body>
    </html>
  );
}
