import clsx from 'clsx';

import { CustomComponentProps } from '@shared/lib';
import { IconName, SvgIcon } from '@shared/ui';

import { ProjectData } from '../../model/projects';

export enum PropertyType {
  Status = 'status',
  Type = 'type'
}

type PropertyProps = CustomComponentProps & {
  type: PropertyType;
  data: ProjectData;
  propertyLocale: string;
};

export function Property({
  className,
  type,
  data,
  propertyLocale
}: PropertyProps) {
  if (type === PropertyType.Status && data.status === 'done') return null;
  if (type === PropertyType.Type && data.type === 'pet') return null;

  return (
    <div
      className={clsx(
        className,
        'tooltip h-[36px] w-[36px] text-space-800 h-md:h-[28px] h-md:w-[28px] sm:h-[28px] sm:w-[28px]'
      )}
      tabIndex={0}
      data-tooltip-content={propertyLocale}
      data-tooltip-place="right"
    >
      <SvgIcon
        className="h-full w-full"
        icon={
          type === PropertyType.Status
            ? (data.status as IconName)
            : (data.type as IconName)
        }
        theme={data.iconTheme}
      />
      <span className="sr-only">{propertyLocale}</span>
    </div>
  );
}
