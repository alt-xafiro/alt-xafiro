import clsx from 'clsx';

import { CustomComponentProps } from '@shared/lib';
import { SvgIcon } from '@shared/ui';

type HiddenStackProps = CustomComponentProps & {
  projectID: string;
};

export function HiddenStackButton({ className, projectID }: HiddenStackProps) {
  return (
    <div
      className={clsx(
        className,
        'hidden-stack-button flex items-center justify-center'
      )}
      tabIndex={0}
      data-project-id={projectID}
    >
      <SvgIcon className="h-full w-full" icon="more" />
    </div>
  );
}
