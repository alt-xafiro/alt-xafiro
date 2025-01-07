'use client';

import { useTranslations } from 'next-intl';

import projectsJson from '@/data/projects.json';

import { ProjectData } from '@/types';

import CommonTooltip from '@/components/common-tooltip/common-tooltip';
import Projects from '@/components/projects/projects';

const projectsData = projectsJson as unknown as ProjectData[];

export default function Page() {
  const t = useTranslations('Pages');

  return (
    <>
      <h1 className="sr-only">{t('projects')}</h1>

      <Projects projects={projectsData} />

      <CommonTooltip />
    </>
  );
}
