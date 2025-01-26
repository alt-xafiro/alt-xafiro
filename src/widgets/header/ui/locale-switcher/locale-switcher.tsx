'use client';

import clsx from 'clsx';
import { useState, useTransition } from 'react';

import { LOCALES, Locale, setUserLocale } from '@shared/i18n';
import { CustomComponentProps } from '@shared/lib';
import { MenuItem, Modal } from '@shared/ui';

export type LocalesOfLocales = {
  [key in Locale]: {
    full: string;
    abbr: string;
  };
};

type LocaleSwitcherProps = CustomComponentProps & {
  currentLocale: Locale;
  locales: {
    label: string;
    locales: LocalesOfLocales;
  };
};

export function LocaleSwitcher({
  className,
  currentLocale,
  locales
}: LocaleSwitcherProps) {
  const [isPending, startTransition] = useTransition();
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleLocaleSwitcherClick = () => {
    openModal();
  };

  const handleLocaleItemClick = (value: Locale) => {
    closeModal();

    const locale = value;

    if (locale === currentLocale) return;

    startTransition(() => {
      setUserLocale(locale);
    });
  };

  return (
    <>
      <button
        className={clsx(
          className,
          isPending && 'pointer-events-none',
          'h-[36px] w-[36px] 3lg:h-[64px] 3lg:w-[64px]',
          'text-2xl font-semibold uppercase text-white/60 transition-colors hover:text-space-100/60 active:text-space-200/60 sm:text-xl'
        )}
        type="button"
        onClick={handleLocaleSwitcherClick}
      >
        <span className="sr-only">
          {locales.label} — {locales.locales[currentLocale].full}
        </span>
        <span aria-hidden="true">{locales.locales[currentLocale].abbr}</span>
      </button>

      <Modal open={modalOpen} closeModal={closeModal}>
        <ul className="inline-flex flex-col items-center space-y-4">
          {LOCALES.map((locale) => {
            const isCurrentLocale = locale === currentLocale;

            return (
              <li className="flex" key={locale}>
                <MenuItem
                  className="h-full w-full"
                  type="button"
                  onClick={() => handleLocaleItemClick(locale)}
                  active={isCurrentLocale}
                >
                  {locales.locales[locale].full}
                </MenuItem>
              </li>
            );
          })}
        </ul>
      </Modal>
    </>
  );
}
