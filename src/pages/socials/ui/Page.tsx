import { useTranslations } from 'next-intl';

import { CenteredContent } from '@shared/ui';

import { socialLinks } from '../model/socials';
import { Socials } from './Socials';

export function Page() {
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
