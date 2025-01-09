import { StackItem } from '@/types';

export const compareStackItemsByOrder = (a: StackItem, b: StackItem) => {
  if (a.order < b.order) {
    return -1;
  } else if (a.order > b.order) {
    return 1;
  }

  return 0;
};
