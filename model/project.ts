import projectsJson from '@/data/projects.json';

import { ProjectData } from '@/types';

export const projectsData = projectsJson as unknown as ProjectData[];
