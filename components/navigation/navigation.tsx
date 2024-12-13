'use client';

import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { useWindowSize } from '@uidotdev/usehooks';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MouseEventHandler, useEffect, useState } from 'react';

import { PAGES } from '@/consts';

import { CustomComponentProps } from '@/types';

import { getBreakpoint } from '@/ui/tailwind-config';

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
      <Links
        className={clsx(
          className,
          'inline-flex flex-row flex-wrap items-center justify-end space-x-11 3lg:hidden'
        )}
      />

      <BurgerMenu
        className="hidden 3lg:block"
        onClick={handleNavigationButtonClick}
      />

      <Dialog
        className="relative z-50 transition data-[closed]:opacity-0"
        open={modalOpen}
        onClose={closeModal}
        transition
      >
        <DialogBackdrop className="fixed inset-0 bg-space-900/70" />

        <div className="fixed inset-0 w-screen overflow-y-auto p-4">
          <div className="flex min-h-full items-center justify-center">
            <DialogPanel className="inline-flex w-[320px] justify-center rounded-lg bg-space-800 p-12">
              <Links
                className={clsx(
                  className,
                  'inline-flex flex-col items-center space-y-4'
                )}
                onLinkClick={closeModal}
              />
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}

type LinksProps = CustomComponentProps & {
  onLinkClick?: () => void;
};

function Links({ className, onLinkClick = () => {} }: LinksProps) {
  const currentPathname = usePathname();

  return (
    <div className={className}>
      {PAGES.map((page) => {
        const isActive = currentPathname === page.href;

        return (
          <Link
            key={page.name}
            href={page.href}
            className={clsx(
              isActive &&
                'cursor-default after:absolute after:-bottom-1 after:left-0 after:block after:h-0.5 after:w-full after:bg-white',
              'relative text-3xl uppercase',
              !isActive &&
                'transition-colors hover:text-space-100 active:text-space-200'
            )}
            onClick={onLinkClick}
          >
            <p>{page.name}</p>
          </Link>
        );
      })}
    </div>
  );
}
type BurgerMenuProps = CustomComponentProps & {
  onClick: MouseEventHandler<HTMLButtonElement> | undefined;
};

function BurgerMenu({ className, onClick }: BurgerMenuProps) {
  return (
    <div className={className}>
      <button
        className="group/burger flex h-[64px] w-[64px] items-center justify-center"
        onClick={onClick}
      >
        <span className="sr-only">Open navigation menu</span>
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
        'absolute left-0 top-0 h-[5px] w-full rounded-full bg-white transition-colors group-hover/burger:bg-space-100 group-active/burger:bg-space-200 lg:h-[4px] sm:h-[3px]'
      )}
    ></div>
  );
}
