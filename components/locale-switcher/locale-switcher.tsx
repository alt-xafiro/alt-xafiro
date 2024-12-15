'use client';

import clsx from 'clsx';
import { useLocale, useTranslations } from 'next-intl';
import { useState, useTransition } from 'react';

import { LOCALES } from '@/consts';

import { CustomComponentProps } from '@/types';

import MenuItem from '@/components/menu-item/menu-item';
import Modal from '@/components/modal/modal';

import { Locale } from '@/i18n/config';
import { setUserLocale } from '@/services/locale';

type LocaleSwitcherProps = CustomComponentProps;

export default function LocaleSwitcher({ className }: LocaleSwitcherProps) {
  const t = useTranslations('LocaleSwitcher');
  const [isPending, startTransition] = useTransition();
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const currentLocale = useLocale();

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleOnLocaleSwitcherClick = () => {
    openModal();
  };

  const handleOnLocaleItemClick = (value: string) => {
    closeModal();

    const locale = value as Locale;

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
        onClick={handleOnLocaleSwitcherClick}
      >
        <span className="sr-only">
          {t('label')} — {t(currentLocale)}
        </span>
        <span aria-hidden="true">{t(`${currentLocale}-abbr`)}</span>
      </button>

      <Modal open={modalOpen} closeModal={closeModal}>
        {LOCALES.map((locale) => {
          const isCurrentLocale = locale === currentLocale;

          return (
            <MenuItem
              key={locale}
              type="button"
              onClick={() => handleOnLocaleItemClick(locale)}
              active={isCurrentLocale}
            >
              {t(locale)}
            </MenuItem>
          );
        })}
      </Modal>
    </>
  );
}
