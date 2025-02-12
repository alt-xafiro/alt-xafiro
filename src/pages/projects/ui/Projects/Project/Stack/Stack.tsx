import clsx from 'clsx';

import { Ref } from 'react';

import { CustomComponentProps } from '@shared/lib';

import { SHOWN_STACK_SIZE } from '../../../../config/stack';
import {
  StackList,
  StackType,
  getStack,
  hasHiddenStack
} from '../../../../lib/stack';
import { HiddenStackButton } from './HiddenStackButton/HiddenStackButton';
import { ShownStackItem } from './ShownStackItem/ShownStackItem';

export type StackLocales = {
  [key: string]: string;
};

type StackProps = CustomComponentProps & {
  ref?: Ref<HTMLDivElement>;
  projectID: string;
  stackList?: StackList;
  stackLocales: StackLocales;
};

export function Stack({
  className,
  ref,
  projectID,
  stackList,
  stackLocales
}: StackProps) {
  if (!stackList) return null;

  const shownStack = getStack(StackType.Shown, stackList, SHOWN_STACK_SIZE);

  if (!shownStack) return;

  const isHiddenStackExisting = hasHiddenStack(stackList, SHOWN_STACK_SIZE);

  return (
    <div
      className={clsx(
        className,
        'z-10 flex h-[32px] max-w-[272px] flex-row items-center justify-end space-x-[8px] h-md:h-[28px] h-md:max-w-[232px] h-md:space-x-[6px] sm:h-[28px] sm:max-w-[232px] sm:space-x-[6px]',
        'before:absolute before:-bottom-[8px] before:-left-[10px] before:-right-[10px] before:-top-[8px] before:-z-10 before:block before:rounded-[20px] before:bg-space-700/85'
      )}
      ref={ref}
    >
      {shownStack.length > 0 && (
        <ul className="flex flex-row items-center justify-end space-x-[8px] h-md:space-x-[6px] sm:space-x-[6px]">
          {shownStack.map((stackItem, i) => {
            return (
              <li key={stackItem.locale}>
                <ShownStackItem
                  className="h-[32px] w-[32px] h-md:h-[28px] h-md:w-[28px] sm:h-[28px] sm:w-[28px]"
                  data={stackItem}
                  firstItem={i === 0}
                  lastItem={i === stackList.length - 1}
                  isHiddenStackExisting={isHiddenStackExisting}
                  stackLocale={stackLocales[stackItem.locale]}
                />
              </li>
            );
          })}
        </ul>
      )}
      {isHiddenStackExisting && (
        <HiddenStackButton
          className="h-[32px] w-[32px] h-md:h-[28px] h-md:w-[28px] sm:h-[28px] sm:w-[28px]"
          projectID={projectID}
        />
      )}
    </div>
  );
}
