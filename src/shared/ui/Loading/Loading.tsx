import { useTranslations } from 'next-intl';

import { CenteredContent } from '../CenteredContent/CenteredContent';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';

export function Loading() {
  const t = useTranslations('General');
  return (
    <CenteredContent>
      <p className="sr-only">{t('loading')}</p>
      <LoadingSpinner className="h-[64px] w-[64px] sm:h-[48px] sm:w-[48px]" />
    </CenteredContent>
  );
}
