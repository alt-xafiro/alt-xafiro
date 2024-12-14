'use client';

import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import clsx from 'clsx';
import { useLocale, useTranslations } from 'next-intl';
import { useState, useTransition } from 'react';

import { LOCALES } from '@/consts';

import { CustomComponentProps } from '@/types';

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

  const onLocaleSwitcherClick = () => {
    openModal();
  };

  const onLocaleItemClick = (value: string) => {
    closeModal();

    const locale = value as Locale;

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
          'text-2xl font-semibold uppercase text-white/60 hover:text-space-100/60 active:text-space-200/60 sm:text-xl',
          'transition-colors'
        )}
        onClick={onLocaleSwitcherClick}
      >
        <span className="sr-only">{t('label')} — {t(currentLocale)}</span>
        <span aria-hidden="true">{t(`${currentLocale}-abbr`)}</span>
      </button>

      <Dialog
        className={clsx('relative z-50 transition data-[closed]:opacity-0')}
        open={modalOpen}
        onClose={closeModal}
        transition
      >
        <DialogBackdrop className="fixed inset-0 bg-space-900/70" />

        <div className="fixed inset-0 w-screen overflow-y-auto p-4">
          <div className="flex min-h-full items-center justify-center">
            <DialogPanel className="inline-flex w-[320px] justify-center rounded-lg bg-space-800 p-12">
              <div className="inline-flex flex-col items-center space-y-4">
                {LOCALES.map((locale) => {
                  const isCurrentLocale = locale === currentLocale;

                  return (
                    <button
                      key={locale}
                      className={clsx(
                        isCurrentLocale &&
                          'cursor-default after:absolute after:-bottom-1 after:left-0 after:block after:h-0.5 after:w-full after:bg-white',
                        'relative text-3xl uppercase',
                        !isCurrentLocale &&
                          'transition-colors hover:text-space-100 active:text-space-200'
                      )}
                      disabled={isCurrentLocale}
                      onClick={() => onLocaleItemClick(locale)}
                    >
                      <p>{t(locale)}</p>
                    </button>
                  );
                })}
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
