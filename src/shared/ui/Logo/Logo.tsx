import clsx from 'clsx';

import { CustomComponentProps } from '@shared/lib';

import { Safiro } from './Safiro/Safiro';
import { X } from './X/X';

type LogoProps = CustomComponentProps & {
  link?: boolean;
};

export function Logo({ className }: LogoProps) {
  return (
    <div className={clsx(className, 'inline-flex items-center')}>
      <X />
      <Safiro />
    </div>
  );
}
