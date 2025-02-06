import { useTranslations } from 'next-intl';

import './styles.css';

import { CenteredContent } from '../CenteredContent/CenteredContent';

export function Loading() {
  const t = useTranslations('General');

  return (
    <>
      <p className="sr-only">{t('loading')}</p>
      <CenteredContent>
        <div className="loading"></div>
      </CenteredContent>
    </>
  );
}
