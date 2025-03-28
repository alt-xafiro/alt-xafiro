import clsx from 'clsx';

import Link from 'next/link';

import { CustomComponentProps } from '@shared/lib';

type MenuItemProps = CustomComponentProps & {
  type: 'link' | 'button';
  active: boolean;
  onClick?: () => void;
  href?: string;
};

export function MenuItem({
  className,
  children,
  type,
  onClick = () => {},
  active,
  href = ''
}: MenuItemProps) {
  const menuItemClassMame = clsx(
    className,
    active &&
      'cursor-default after:absolute after:-bottom-1 after:left-0 after:block after:h-0.5 after:w-full after:bg-white',
    !active && 'transition-colors hover:text-space-100 active:text-space-200',
    'relative text-3xl uppercase'
  );

  return (
    <>
      {type === 'link' && (
        <Link href={href} className={menuItemClassMame} onClick={onClick}>
          {children}
        </Link>
      )}

      {type === 'button' && (
        <button className={menuItemClassMame} onClick={onClick} type="button">
          {children}
        </button>
      )}
    </>
  );
}
