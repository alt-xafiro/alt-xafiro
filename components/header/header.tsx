import clsx from 'clsx';

import { CustomComponentProps } from '@/types';

import LocaleSwitcher from '@/components/locale-switcher/locale-switcher';
import Logo from '@/components/logo/logo';
import Navigation from '@/components/navigation/navigation';

type HeaderProps = CustomComponentProps;

export default function Header({ className }: HeaderProps) {
  return (
    <header
      className={clsx(
        className,
        'flex h-[208px] w-full items-start justify-center lg:h-[168px] h-md:h-[128px] sm:h-[128px]'
      )}
    >
      <div
        className={clsx(
          'flex w-[1440px] items-center justify-between pb-6 pt-6'
        )}
      >
        <Logo />
        <LocaleSwitcher className="ml-10 mr-auto mt-2 3lg:ml-auto 3lg:mr-10 3lg:mt-0 lg:mr-6 sm:mr-2" />
        <Navigation />
      </div>
    </header>
  );
}
