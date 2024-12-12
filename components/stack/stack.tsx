import clsx from 'clsx';
import { PlacesType } from 'react-tooltip';

import { SHOWN_STACK_SIZE } from '@/consts';
import { getShownStack } from '@/model/stack';

import { CustomComponentProps, StackItem, StackList } from '@/types';

import SVGIcon from '@/components/svg-icon/svg-icon';

type StackProps = CustomComponentProps & {
  projectID: string;
  stackList?: StackList;
};

export default function Stack({ className, projectID, stackList }: StackProps) {
  if (!stackList) {
    return null;
  }

  const shownStack = getShownStack(stackList, SHOWN_STACK_SIZE);

  if (!shownStack) {
    return;
  }

  const hasHiddenStack = stackList.length > shownStack.length;

  return (
    <div
      className={clsx(
        'z-10 flex h-[32px] max-w-[272px] flex-row items-center justify-end space-x-[8px] h-md:h-[28px] h-md:max-w-[232px] h-md:space-x-[6px] sm:h-[28px] sm:max-w-[232px] sm:space-x-[6px]',
        'before:absolute before:-bottom-[8px] before:-left-[10px] before:-right-[10px] before:-top-[8px] before:-z-10 before:block before:rounded-[20px] before:bg-space-700/85',
        className
      )}
    >
      {shownStack.length > 0 && (
        <ul className="flex flex-row items-center justify-end space-x-[8px] h-md:space-x-[6px] sm:space-x-[6px]">
          {shownStack.map((stackItem, i) => {
            return (
              <li key={stackItem.name}>
                <ShownStackItem
                  className="h-[32px] w-[32px] h-md:h-[28px] h-md:w-[28px] sm:h-[28px] sm:w-[28px]"
                  data={stackItem}
                  firstItem={i === 0}
                />
              </li>
            );
          })}
        </ul>
      )}
      {hasHiddenStack && (
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
};

function ShownStackItem({ className, data, firstItem }: ShownStackItemProps) {
  const tooltipPlace: PlacesType = firstItem ? 'left' : 'bottom';
  const tooltipOffset = firstItem ? 11 : 10;

  return data.link ? (
    <a
      className={clsx(className, 'tooltip flex items-center justify-center')}
      href={data.link}
      target="_blank"
      rel="noreferrer"
      data-tooltip-content={data.name}
      data-tooltip-place={tooltipPlace}
      data-tooltip-offset={tooltipOffset}
    >
      <ShownStackItemIcon data={data} />
    </a>
  ) : (
    <div
      className={clsx(className, 'tooltip flex items-center justify-center')}
      tabIndex={0}
      data-tooltip-content={data.name}
      data-tooltip-place={tooltipPlace}
      data-tooltip-offset={tooltipOffset}
    >
      <ShownStackItemIcon data={data} />
    </div>
  );
}

type ShownStackItemIconProps = CustomComponentProps & {
  data: StackItem;
};

function ShownStackItemIcon({ data }: ShownStackItemIconProps) {
  return (
    <>
      <SVGIcon className="w-full" icon={data.icon} />
      <span className="sr-only">{data.name}</span>
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
      <SVGIcon className="w-full" icon="more" />
    </div>
  );
}
