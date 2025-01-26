import clsx from 'clsx';

import { CustomComponentProps } from '@shared/lib';

type ExternalLinkProps = CustomComponentProps & {
  resetStyles?: boolean;
  active?: boolean;
  href?: string;
};

export function ExternalLink({
  children,
  className,
  href,
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
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      {...rest}
    >
      {children}
    </a>
  );
}
