import clsx from 'clsx';
import { MouseEventHandler } from 'react';

import { CustomComponentProps } from '@shared/lib';

type BurgerMenuProps = CustomComponentProps & {
  onClick: MouseEventHandler<HTMLButtonElement> | undefined;
  burgerButtonLocale: string;
};

export function BurgerMenu({
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
