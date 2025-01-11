import { useTranslations } from 'next-intl';

import { projectsData } from '@/model/project';

import Projects from '@/components/projects/projects';

export default function Page() {
  const t = useTranslations('Pages');

  return (
    <>
      <h1 className="sr-only">{t('projects')}</h1>

      <Projects projects={projectsData} />
    </>
  );
}
