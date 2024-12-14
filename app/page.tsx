import { useTranslations } from 'next-intl';

import CenteredContent from '@/components/centered-content/centered-content';
import Greeting from '@/components/greeting/greeting';

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
