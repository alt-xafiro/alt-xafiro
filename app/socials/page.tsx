import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

import { socialLinks } from '@/model/socials';

import CenteredContent from '@/components/centered-content/centered-content';
import Socials from '@/components/socials/socials';

type generateMetadataProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params
}: generateMetadataProps): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({ locale, namespace: 'Pages' });

  return {
    title: `${t('socials')}`
  };
}

export default function Page() {
  const t = useTranslations('Pages');

  return (
    <>
      <h1 className="sr-only">{t('socials')}</h1>
      <CenteredContent>
        <Socials socialLinks={socialLinks} />
      </CenteredContent>
    </>
  );
}
