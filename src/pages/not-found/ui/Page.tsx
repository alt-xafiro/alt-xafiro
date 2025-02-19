import { useTranslations } from 'next-intl';

import { CenteredContent } from '@shared/ui';

export function Page() {
  const t = useTranslations('Pages');

  return (
    <CenteredContent>
      <div className="flex flex-col items-center space-y-6 text-center">
        <h1 className="text-6xl">{t('not-found')}</h1>
        <p className="text-xl">{t('not-found-description')}</p>
      </div>
    </CenteredContent>
  );
}
