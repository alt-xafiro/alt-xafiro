import projectsJson from '@/data/projects.json';

import { getProjectDataById } from '@/utils';

import { ProjectData } from '@/types';

const projectsData = projectsJson as unknown as ProjectData[];

export const Js30Project = {
  ROOT: '/projects/js30',
  SOURCE: `${getProjectDataById(projectsData, 'js30')?.sourceURL}`
} as const;

export const Js30Day = {
  DAY_PREFIX: 'day',
  INDEX: 'index.html',
  SCRIPT: 'script.js'
} as const;

export const CHALLENGE_LINK = 'https://javascript30.com/';
