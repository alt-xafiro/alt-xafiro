import { IconName } from '@shared/ui';

import stackMetaJson from './stack-meta.json';

export type StackItem = {
  locale: string;
  icon: IconName;
  link: string | null;
  main: boolean;
  order: number;
};

type StackMeta = {
  [key: string]: StackItem;
};

export const stackMeta = stackMetaJson as unknown as StackMeta;
