import clsx from 'clsx';

import { CustomComponentProps } from '@shared/lib';

type SafiroProps = CustomComponentProps;

export function Safiro({ className }: SafiroProps) {
  return (
    <p
      className={clsx(
        className,
        'text-[60px] uppercase leading-none [font-weight:725] lg:text-[48px]'
      )}
    >
      <span className="sr-only">S</span>
      <span className="md:sr-only">af</span>
      <span className="-tracking-[2px] md:sr-only">ir</span>
      <span className="md:sr-only">o</span>
    </p>
  );
}
