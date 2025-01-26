import { ProjectData } from '../model/projects';

export const getProjectDataById = (projects: ProjectData[], id: string) => {
  return projects.find((project) => project.id === id);
};
