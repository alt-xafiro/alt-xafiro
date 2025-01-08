import clsx from 'clsx';

import { CustomComponentProps } from '@/types';

type ExternalLinkProps = CustomComponentProps & {
  overwriteClassName?: boolean;
  active?: boolean;
  href?: string;
};

export default function ExternalLink({
  children,
  className,
  overwriteClassName = false,
  active = true,
  href,
  ...rest
}: ExternalLinkProps) {
  return (
    <a
      className={clsx(
        className,
        !overwriteClassName && !active && 'text-white/50',
        !overwriteClassName &&
          active &&
          'transition-colors hover:text-space-100 active:text-space-200'
      )}
      target="_blank"
      rel="noopener noreferrer"
      href={href}
      {...rest}
    >
      {children}
    </a>
  );
}
