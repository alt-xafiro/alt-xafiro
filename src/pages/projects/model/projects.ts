import { IconTheme } from '@shared/ui';

import projectsJson from './projects.json';

import { StackList } from '../lib/stack';

export type ProjectStatus = 'done' | 'development';

export type ProjectType = 'pet' | 'test-assignment' | 'training' | 'learning';

export type ProjectData = {
  id: string;
  locale: string;
  sourceURL: string;
  previewURL: string | null;
  previewInternal: boolean;
  previewImage: string;
  centeredPreviewImage: boolean;
  iconTheme: IconTheme;
  type: ProjectType;
  status: ProjectStatus;
  stackList: StackList;
};

export const projectsData = projectsJson as unknown as ProjectData[];
