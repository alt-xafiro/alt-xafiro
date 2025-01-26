import clsx from 'clsx';

import { CustomComponentProps } from '@shared/lib';

type CenteredContentProps = CustomComponentProps;

export function CenteredContent({ className, children }: CenteredContentProps) {
  return (
    <>
      <div
        className={clsx(
          className,
          'flex h-full w-full items-center justify-center pb-64 pt-12 md:pb-28 md:pt-0'
        )}
      >
        {children}
      </div>
    </>
  );
}
