import clsx from 'clsx';
import { useTranslations } from 'next-intl';

import { stackMeta } from '@/model/stack';

import { CustomComponentProps, ProjectData, StackLocales } from '@/types';

import CommonTooltip from '@/components/common-tooltip/common-tooltip';
import HiddenStackTooltip from '@/components/hidden-stack-tooltip/hidden-stack-tooltip';
import Project from '@/components/project/project';

type ProjectsProps = CustomComponentProps & {
  projects: ProjectData[];
};

export default function Projects({ className, projects }: ProjectsProps) {
  const t = useTranslations();

  const stackLocales: StackLocales = {};

  Object.values(stackMeta).map((stackItem) => {
    stackLocales[stackItem.locale] = t(`Stack.${stackItem.locale}`);
  });

  const projectLocales = projects.map((data) => {
    return {
      data: {
        name: t(`Projects.${data.locale}`),
        type: t(`ProjectType.${data.type}`),
        status: t(`ProjectStatus.${data.status}`),
        noPreview:
          data.previewURL === null
            ? t(`Projects.${data.locale}-no-preview`)
            : null
      },
      projectLinks: {
        preview: t('ProjectLinks.preview'),
        source: t('ProjectLinks.source')
      }
    };
  });

  return (
    <>
      <ul
        className={clsx(
          className,
          'grid grid-cols-3 items-start justify-between gap-[30px] pb-[48px] 2lg:grid-cols-2 md:grid-cols-1 md:justify-center sm:gap-[24px]'
        )}
      >
        {projects.map((project, i) => {
          return (
            <li className="flex items-center justify-center" key={project.id}>
              <Project
                data={project}
                locales={{
                  project: projectLocales[i],
                  stack: stackLocales
                }}
              />
            </li>
          );
        })}
      </ul>

      <CommonTooltip />
      <HiddenStackTooltip projects={projects} stackLocales={stackLocales} />
    </>
  );
}
