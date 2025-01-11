import stackMetaJson from '@/data/stack-meta.json';

import { compareStackItemsByOrder } from '@/utils';

import { StackItem, StackList, StackMeta, StackType } from '@/types';

export const stackMeta = stackMetaJson as unknown as StackMeta;

const getSortedStack = (stackList: StackList) => {
  return stackList?.map((el) => stackMeta[el]).sort(compareStackItemsByOrder);
};

const getMainStack = (stack: StackItem[]) =>
  stack.filter((stackItem) => stackItem.main);

const getExtraStack = (stack: StackItem[]) =>
  stack.filter((stackItem) => !stackItem.main);

export const hasHiddenStack = (
  stackList: StackList,
  shownStackSize: number
) => {
  if (!stackList) {
    return false;
  }

  return !(stackList.length <= shownStackSize);
};

export const getStack = (
  type: StackType,
  stackList: StackList,
  shownStackSize: number
) => {
  const sortedStack = getSortedStack(stackList);

  if (!sortedStack) {
    return null;
  }

  if (!hasHiddenStack(stackList, shownStackSize)) {
    return type === StackType.Shown ? sortedStack : null;
  }

  const mainStack = getMainStack(sortedStack);
  const extraStack = getExtraStack(sortedStack);

  return type === StackType.Shown
    ? mainStack.slice(0, shownStackSize)
    : [...mainStack.slice(shownStackSize), ...extraStack];
};
