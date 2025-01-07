import { StackList } from '@/types';

export type IconsTheme = 'dark' | 'light';

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
  iconsTheme: IconsTheme;
  type: ProjectType;
  status: ProjectStatus;
  stackList: StackList;
};
