'use client';

import { useWindowSize } from '@uidotdev/usehooks';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { MouseEventHandler, useEffect, useState } from 'react';

import { PAGES } from '@/consts';

import { CustomComponentProps } from '@/types';

import { getBreakpoint } from '@/ui/tailwind-config';

import MenuItem from '@/components/menu-item/menu-item';
import Modal from '@/components/modal/modal';

type NavigationProps = CustomComponentProps & {
  locales: {
    pages: string[];
    burgerButton: string;
  };
};

export default function Navigation({ className, locales }: NavigationProps) {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const { width: windowWidth } = useWindowSize();

  const wideScreenBreakpoint = getBreakpoint('3lg');

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    const isScreenWide = windowWidth
      ? windowWidth >= wideScreenBreakpoint
      : false;

    if (isScreenWide && modalOpen) {
      closeModal();
    }
  }, [windowWidth, modalOpen, wideScreenBreakpoint]);

  const handleNavigationButtonClick = () => {
    openModal();
  };

  return (
    <>
      <nav className={clsx(className, 'inline-flex 3lg:hidden')}>
        <Links
          className="inline-flex h-full w-full flex-row flex-wrap items-center justify-end space-x-11"
          onLinkClick={closeModal}
          pageLocales={locales.pages}
        />
      </nav>

      <BurgerMenu
        className={clsx(className, 'hidden 3lg:block')}
        onClick={handleNavigationButtonClick}
        burgerButtonLocale={locales.burgerButton}
      />

      <Modal open={modalOpen} closeModal={closeModal}>
        <nav className="flex">
          <Links
            className="inline-flex flex-col items-center space-y-4"
            onLinkClick={closeModal}
            pageLocales={locales.pages}
          />
        </nav>
      </Modal>
    </>
  );
}

type LinksProps = CustomComponentProps & {
  onLinkClick?: () => void;
  pageLocales: string[];
};

function Links({ className, onLinkClick = () => {}, pageLocales }: LinksProps) {
  const currentPathname = usePathname();

  return (
    <ul className={clsx(className, 'h-full w-full')}>
      {PAGES.map((page, i) => {
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
type BurgerMenuProps = CustomComponentProps & {
  onClick: MouseEventHandler<HTMLButtonElement> | undefined;
  burgerButtonLocale: string;
};

function BurgerMenu({
  className,
  onClick,
  burgerButtonLocale
}: BurgerMenuProps) {
  return (
    <div className={className}>
      <button
        className="group/burger flex h-[64px] w-[64px] items-center justify-center"
        onClick={onClick}
        type="button"
      >
        <span className="sr-only">{burgerButtonLocale}</span>
        <span className="relative h-[41px] w-full lg:h-[32px] lg:w-[48px] sm:h-[27px] sm:w-[36px]">
          <BurgerDash className="top-0" />
          <BurgerDash className="top-[18px] lg:top-[14px] sm:top-[12px]" />
          <BurgerDash className="top-[36px] lg:top-[28px] sm:top-[24px]" />
        </span>
      </button>
    </div>
  );
}

type BurgerDashProps = CustomComponentProps;

function BurgerDash({ className }: BurgerDashProps) {
  return (
    <span
      className={clsx(
        className,
        'absolute left-0 top-0 h-[5px] w-full lg:h-[4px] sm:h-[3px]',
        'rounded-full bg-white transition-colors group-hover/burger:bg-space-100 group-active/burger:bg-space-200'
      )}
    ></span>
  );
}
