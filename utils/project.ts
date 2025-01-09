import { ProjectData } from '@/types';

export const getProjectDataById = (projects: ProjectData[], id: string) => {
  return projects.find((project) => project.id === id);
};
