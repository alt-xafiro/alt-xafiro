import { useTranslations } from 'next-intl';

import CenteredContent from '@/components/centered-content/centered-content';
import Socials from '@/components/socials/socials';

export default function Page() {
  const t = useTranslations('Pages');

  return (
    <>
      <h1 className="sr-only">{t('socials')}</h1>
      <CenteredContent>
        <Socials />
      </CenteredContent>
    </>
  );
}
