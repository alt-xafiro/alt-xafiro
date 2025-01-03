'use client';

import { useTranslations } from 'next-intl';
import { Tooltip } from 'react-tooltip';

import projectsJson from '@/data/projects.json';

import { ProjectData } from '@/types';

import Projects from '@/components/projects/projects';

const projectsData = projectsJson as unknown as ProjectData[];

export default function Page() {
  const t = useTranslations('Pages');

  return (
    <>
      <h1 className="sr-only">{t('projects')}</h1>

      <Projects projects={projectsData} />

      <Tooltip
        className="!z-[9000] !rounded-[16px] !bg-space-700/95 !text-base !transition-none !duration-0 h-md:!text-sm sm:!text-sm"
        anchorSelect=".tooltip"
        opacity={1}
        place="top"
        noArrow
        globalCloseEvents={{
          escape: true,
          scroll: true
        }}
        render={({ content }) => <div>{content}</div>}
      />
    </>
  );
}
