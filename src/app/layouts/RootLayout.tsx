import clsx from 'clsx';
import { getLocale } from 'next-intl/server';

import { Header } from '@widgets/header';

import { Background, exo2 } from '@shared/ui';

import '../styles/globals.css';

import { NoJs } from '../styles/NoJs';

export async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang={locale} className="scrollbar-gutter-stable h-full min-h-full">
      <head>
        <NoJs />
      </head>

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
