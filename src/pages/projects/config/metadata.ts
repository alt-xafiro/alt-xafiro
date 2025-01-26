import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

type generateMetadataProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params
}: generateMetadataProps): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({ locale, namespace: 'Pages' });

  return {
    title: `${t('projects')}`
  };
}
