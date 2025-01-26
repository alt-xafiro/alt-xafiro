import { StackItem, stackMeta } from '../model/stack-meta';

export type StackList = string[] | null;

const compareStackItemsByOrder = (a: StackItem, b: StackItem) => {
  if (a.order < b.order) {
    return -1;
  } else if (a.order > b.order) {
    return 1;
  }

  return 0;
};

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
  if (!stackList) return false;

  return !(stackList.length <= shownStackSize);
};

export enum StackType {
  Shown = 'shown',
  Hidden = 'hidden'
}

export const getStack = (
  type: StackType,
  stackList: StackList,
  shownStackSize: number
) => {
  const sortedStack = getSortedStack(stackList);

  if (!sortedStack) return null;

  if (!hasHiddenStack(stackList, shownStackSize)) {
    return type === StackType.Shown ? sortedStack : null;
  }

  const mainStack = getMainStack(sortedStack);
  const extraStack = getExtraStack(sortedStack);

  return type === StackType.Shown
    ? mainStack.slice(0, shownStackSize)
    : [...mainStack.slice(shownStackSize), ...extraStack];
};
