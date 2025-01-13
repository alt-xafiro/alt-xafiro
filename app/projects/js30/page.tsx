import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { js30ChallengeData } from '@/model/js30-challenge';

import Js30Challenge from '@/components/js30-challenge/js30-challenge';

type generateMetadataProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params
}: generateMetadataProps): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({ locale, namespace: 'Pages' });

  return {
    title: `${t('js30')}`
  };
}

export default function Page() {
  return <Js30Challenge data={js30ChallengeData} />;
}
