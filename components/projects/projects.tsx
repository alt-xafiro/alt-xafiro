import clsx from 'clsx';

import { CustomComponentProps, ProjectData } from '@/types';

import HiddenStackTooltip from '@/components/hidden-stack-tooltip/hidden-stack-tooltip';
import Project from '@/components/project/project';

type ProjectsProps = CustomComponentProps & {
  projects: ProjectData[];
};

export default function Projects({ className, projects }: ProjectsProps) {
  return (
    <>
      <ul
        className={clsx(
          className,
          'grid grid-cols-3 items-start justify-between gap-[30px] pb-[48px] 2lg:grid-cols-2 md:grid-cols-1 md:justify-center sm:gap-[24px]'
        )}
      >
        {projects.map((project) => {
          return (
            <li className="flex items-center justify-center" key={project.id}>
              <Project data={project} />
            </li>
          );
        })}
      </ul>

      <HiddenStackTooltip projects={projects} />
    </>
  );
}
