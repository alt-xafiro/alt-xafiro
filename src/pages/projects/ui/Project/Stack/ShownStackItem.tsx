import clsx from 'clsx';
import { PlacesType } from 'react-tooltip';

import { CustomComponentProps } from '@shared/lib';
import { ExternalLink, SvgIcon } from '@shared/ui';

import { StackItem } from '../../../model/stack-meta';

type ShownStackItemProps = CustomComponentProps & {
  data: StackItem;
  firstItem: boolean;
  lastItem: boolean;
  isHiddenStackExisting: boolean;
  stackLocale: string;
};

export function ShownStackItem({
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
      resetStyles={true}
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
      <SvgIcon className="h-full w-full" icon={data.icon} />
      <span className="sr-only">{stackLocale}</span>
    </>
  );
}
