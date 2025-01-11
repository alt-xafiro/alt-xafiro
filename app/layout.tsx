import clsx from 'clsx';
import { getLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';

import '@/styles/globals.css';

import { exo2 } from '@/ui/fonts';

import Background from '@/components/background/background';
import Header from '@/components/header/header';

type generateMetadataProps = {
  params: { locale: string };
};

export async function generateMetadata({
  params: { locale }
}: generateMetadataProps) {
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    metadataBase: new URL('https://xafiro.site'),
    title: t('title'),
    description: t('description'),
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
    manifest: '/manifest.webmanifest',
    openGraph: {
      siteName: t('site-name'),
      url: 'https://xafiro.site',
      images: [
        {
          url: 'https://xafiro.site/opengraph-image.png',
          width: 1200,
          height: 630
        }
      ]
    },
    twitter: {
      images: ['https://xafiro.site/opengraph-image.png']
    }
  };
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang={locale} className="scrollbar-gutter-stable h-full min-h-full">
      <body
        className={clsx(
          exo2.className,
          'grid h-full min-h-full w-full min-w-[360px] grid-cols-1 grid-rows-[min-content_1fr] pb-12 pl-[48px] pr-[48px] md:pl-[36px] md:pr-[36px] sm:pl-[24px] sm:pr-[24px]',
          'break-words bg-space-900 text-white',
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
