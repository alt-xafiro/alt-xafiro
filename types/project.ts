import { StackList } from '@/types';

export type IconsTheme = 'dark' | 'light';

export type ProjectStatus = 'active' | 'archive' | 'development';

export type ProjectType = 'pet' | 'test-assignment' | 'training' | 'learning';

export type ProjectData = {
  id: string;
  name: string;
  sourceURL: string;
  previewURL: string | null;
  noPreviewURLComment: string | null;
  previewImage: string;
  centeredPreviewImage: boolean;
  iconsTheme: IconsTheme;
  type: ProjectType;
  status: ProjectStatus;
  stackList: StackList;
};
