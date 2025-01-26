import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

type generateMetadataProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params
}: generateMetadataProps): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    metadataBase: new URL('https://xafiro.site'),
    title: {
      template: `%s · ${t('title')}`,
      default: `${t('title')} · ${t('subtitle')}`
    },
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
      siteName: `${t('title')} — ${t('subtitle')}`,
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
