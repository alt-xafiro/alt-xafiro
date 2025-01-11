import clsx from 'clsx';
import { Ref } from 'react';
import { PlacesType } from 'react-tooltip';

import { SHOWN_STACK_SIZE } from '@/consts';
import { getStack, hasHiddenStack } from '@/model/stack';

import {
  CustomComponentProps,
  StackItem,
  StackList,
  StackLocales,
  StackType
} from '@/types';

import ExternalLink from '@/components/external-link/external-link';
import SVGIcon from '@/components/svg-icon/svg-icon';

type StackProps = CustomComponentProps & {
  ref?: Ref<HTMLDivElement>;
  projectID: string;
  stackList?: StackList;
  stackLocales: StackLocales;
};

export default function Stack({
  className,
  ref,
  projectID,
  stackList,
  stackLocales
}: StackProps) {
  if (!stackList) {
    return null;
  }

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

type ShownStackItemProps = CustomComponentProps & {
  data: StackItem;
  firstItem: boolean;
  lastItem: boolean;
  isHiddenStackExisting: boolean;
  stackLocale: string;
};

function ShownStackItem({
  className,
  data,
  firstItem,
  lastItem,
  isHiddenStackExisting,
  stackLocale
}: ShownStackItemProps) {
  const isTooltipPlaceLeft = firstItem;
  const isTooltipPlaceRight = lastItem && !isHiddenStackExisting;

  const tooltipPlace: PlacesType = isTooltipPlaceLeft
    ? 'left'
    : isTooltipPlaceRight
      ? 'right'
      : 'bottom';
  const tooltipOffset = isTooltipPlaceLeft || isTooltipPlaceRight ? 11 : 10;

  return data.link ? (
    <ExternalLink
      className={clsx(className, 'tooltip flex items-center justify-center')}
      overwriteClassName={true}
      href={data.link}
      data-tooltip-content={stackLocale}
      data-tooltip-place={tooltipPlace}
      data-tooltip-offset={tooltipOffset}
    >
      <ShownStackItemIcon data={data} stackLocale={stackLocale} />
    </ExternalLink>
  ) : (
    <div
      className={clsx(className, 'tooltip flex items-center justify-center')}
      tabIndex={0}
      data-tooltip-content={stackLocale}
      data-tooltip-place={tooltipPlace}
      data-tooltip-offset={tooltipOffset}
    >
      <ShownStackItemIcon data={data} stackLocale={stackLocale} />
    </div>
  );
}

type ShownStackItemIconProps = CustomComponentProps & {
  data: StackItem;
  stackLocale: string;
};

function ShownStackItemIcon({ data, stackLocale }: ShownStackItemIconProps) {
  return (
    <>
      <SVGIcon className="h-full w-full" icon={data.icon} />
      <span className="sr-only">{stackLocale}</span>
    </>
  );
}

type HiddenStackProps = CustomComponentProps & {
  projectID: string;
};

function HiddenStackButton({ className, projectID }: HiddenStackProps) {
  return (
    <div
      className={clsx(
        className,
        'hidden-stack-button flex items-center justify-center'
      )}
      tabIndex={0}
      data-project-id={projectID}
    >
      <SVGIcon className="h-full w-full" icon="more" />
    </div>
  );
}
