import clsx from 'clsx';

import { AnchorHTMLAttributes } from 'react';

import { CustomComponentProps } from '@shared/lib';

type ExternalLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> &
  CustomComponentProps & {
    resetStyles?: boolean;
    active?: boolean;
  };

export function ExternalLink({
  children,
  className,
  active = true,
  resetStyles = false,
  ...rest
}: ExternalLinkProps) {
  return (
    <a
      className={clsx(
        className,
        !resetStyles && !active && 'text-white/50',
        !resetStyles &&
          active &&
          'transition-colors hover:text-space-100 active:text-space-200'
      )}
      target="_blank"
      rel="noopener noreferrer"
      {...rest}
    >
      {children}
    </a>
  );
}
