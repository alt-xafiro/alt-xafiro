import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

import CenteredContent from '@/components/centered-content/centered-content';
import Greeting from '@/components/greeting/greeting';

type generateMetadataProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params
}: generateMetadataProps): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: `${t('title')} ${t('separator')} ${t('subtitle')}`
  };
}

export default function Home() {
  const t = useTranslations('Pages');

  return (
    <>
      <h1 className="sr-only">{t('about-me')}</h1>
      <CenteredContent>
        <Greeting />
      </CenteredContent>
    </>
  );
}
