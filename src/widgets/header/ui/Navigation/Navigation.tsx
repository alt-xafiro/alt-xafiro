'use client';

import { useWindowSize } from '@uidotdev/usehooks';
import clsx from 'clsx';

import { useEffect, useState } from 'react';

import { CustomComponentProps, getBreakpoint } from '@shared/lib';
import { Modal } from '@shared/ui';

import { BurgerMenu } from './BurgerMenu/BurgerMenu';
import { Links } from './Links/Links';

type NavigationProps = CustomComponentProps & {
  locales: {
    pages: string[];
    burgerButton: string;
  };
};

export function Navigation({ className, locales }: NavigationProps) {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const { width: windowWidth } = useWindowSize();

  const breakpoint3lg = getBreakpoint('3lg');

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    if (modalOpen && windowWidth ? windowWidth >= breakpoint3lg : false) {
      closeModal();
    }
  }, [windowWidth, modalOpen, breakpoint3lg]);

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
