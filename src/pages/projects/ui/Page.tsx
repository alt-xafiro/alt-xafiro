import { useTranslations } from 'next-intl';

import { projectsData } from '../model/projects';
import { Projects } from './Projects';

export function Page() {
  const t = useTranslations('Pages');

  return (
    <>
      <h1 className="sr-only">{t('projects')}</h1>

      <Projects projects={projectsData} />
    </>
  );
}
