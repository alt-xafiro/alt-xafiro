'use client';

import { useWindowSize } from '@uidotdev/usehooks';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { MouseEventHandler, useEffect, useState } from 'react';

import { PAGES } from '@/consts';

import { CustomComponentProps } from '@/types';

import { getBreakpoint } from '@/ui/tailwind-config';

import MenuItem from '@/components/menu-item/menu-item';
import Modal from '@/components/modal/modal';

type NavigationProps = CustomComponentProps;

export default function Navigation({ className }: NavigationProps) {
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
        />
      </nav>

      <BurgerMenu
        className={clsx(className, 'hidden 3lg:block')}
        onClick={handleNavigationButtonClick}
      />

      <Modal open={modalOpen} closeModal={closeModal}>
        <nav className="flex">
          <Links
            className="inline-flex flex-col items-center space-y-4"
            onLinkClick={closeModal}
          />
        </nav>
      </Modal>
    </>
  );
}

type LinksProps = CustomComponentProps & {
  onLinkClick?: () => void;
};

function Links({ className, onLinkClick = () => {} }: LinksProps) {
  const t = useTranslations('Pages');

  const currentPathname = usePathname();

  return (
    <ul className={clsx(className, 'h-full w-full')}>
      {PAGES.map((page) => {
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
              {t(page.locale)}
            </MenuItem>
          </li>
        );
      })}
    </ul>
  );
}
type BurgerMenuProps = CustomComponentProps & {
  onClick: MouseEventHandler<HTMLButtonElement> | undefined;
};

function BurgerMenu({ className, onClick }: BurgerMenuProps) {
  const t = useTranslations('Navigation');

  return (
    <div className={className}>
      <button
        className="group/burger flex h-[64px] w-[64px] items-center justify-center"
        onClick={onClick}
      >
        <span className="sr-only">{t('burger-button')}</span>
        <div className="relative h-[41px] w-full lg:h-[32px] lg:w-[48px] sm:h-[27px] sm:w-[36px]">
          <BurgerDash className="top-0" />
          <BurgerDash className="top-[18px] lg:top-[14px] sm:top-[12px]" />
          <BurgerDash className="top-[36px] lg:top-[28px] sm:top-[24px]" />
        </div>
      </button>
    </div>
  );
}

type BurgerDashProps = CustomComponentProps;

function BurgerDash({ className }: BurgerDashProps) {
  return (
    <div
      className={clsx(
        className,
        'absolute left-0 top-0 h-[5px] w-full lg:h-[4px] sm:h-[3px]',
        'rounded-full bg-white transition-colors group-hover/burger:bg-space-100 group-active/burger:bg-space-200'
      )}
    ></div>
  );
}
