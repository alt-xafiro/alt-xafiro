import { SvgIconName } from '@/components/svg-icon/svg-icon';

export type StackList = string[] | null;

export enum StackType {
  Shown = 'shown',
  Hidden = 'hidden'
}

export type StackItem = {
  locale: string;
  icon: SvgIconName;
  link: string | null;
  main: boolean;
  order: number;
};

export type StackMeta = {
  [key: string]: StackItem;
};
