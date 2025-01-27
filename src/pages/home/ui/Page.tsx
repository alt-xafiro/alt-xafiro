import { useTranslations } from 'next-intl';

import { CenteredContent } from '@shared/ui';

import { Greeting } from './Greeting';

export function Page() {
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
