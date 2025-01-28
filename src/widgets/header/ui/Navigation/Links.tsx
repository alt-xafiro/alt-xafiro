'use client';

import clsx from 'clsx';

import { usePathname } from 'next/navigation';

import { CustomComponentProps } from '@shared/lib';
import { MenuItem } from '@shared/ui';

import { NAVIGATION_PAGES } from '../../config/navigation-pages';

type LinksProps = CustomComponentProps & {
  onLinkClick?: () => void;
  pageLocales: string[];
};

export function Links({
  className,
  onLinkClick = () => {},
  pageLocales
}: LinksProps) {
  const currentPathname = usePathname();

  return (
    <ul className={clsx(className, 'h-full w-full')}>
      {NAVIGATION_PAGES.map((page, i) => {
        const isActive = currentPathname === page.href;

        return (
          <li className="flex" key={page.href}>
            <MenuItem
              className="h-full w-full"
              type="link"
              href={page.href}
              onClick={onLinkClick}
              active={isActive}
            >
              {pageLocales[i]}
            </MenuItem>
          </li>
        );
      })}
    </ul>
  );
}
