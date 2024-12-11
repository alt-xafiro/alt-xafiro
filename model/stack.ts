import stackMetaJson from '@/data/stack-meta.json';

import { compareStackItemsByOrder } from '@/lib/utils';

import { StackItem, StackList, StackMeta } from '@/types';

const stackMeta = stackMetaJson as unknown as StackMeta;

const getSortedStack = (stackList: StackList) => {
  return stackList?.map((el) => stackMeta[el]).sort(compareStackItemsByOrder);
};

const getMainStack = (stack: StackItem[]) =>
  stack.filter((stackItem) => stackItem.main);

const getExtraStack = (stack: StackItem[]) =>
  stack.filter((stackItem) => !stackItem.main);

export const getShownStack = (stackList: StackList, shownStackSize: number) => {
  const stack = getSortedStack(stackList);

  if (!stack) {
    return null;
  }

  const mainStack = getMainStack(stack);

  return mainStack.slice(0, shownStackSize);
};

export const getHiddenStack = (
  stackList: StackList,
  shownStackSize: number
) => {
  const stack = getSortedStack(stackList);

  if (!stack) {
    return null;
  }

  const mainStack = getMainStack(stack);
  const extraStack = getExtraStack(stack);

  return [...mainStack.slice(shownStackSize), ...extraStack];
};
