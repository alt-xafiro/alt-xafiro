import { SVGIcon } from '@/components/svg-icon/svg-icon';

export type StackList = string[] | null;

export type StackItem = {
  name: string;
  icon: SVGIcon;
  link: string | null;
  main: boolean;
  order: number;
};

export type StackMeta = {
  [key: string]: StackItem;
};
