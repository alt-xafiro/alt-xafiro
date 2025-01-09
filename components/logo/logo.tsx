'use client';

import clsx from 'clsx';
import { useRef } from 'react';

import { CustomComponentProps } from '@/types';

type LogoProps = CustomComponentProps & {
  link?: boolean;
};

export default function Logo({ className }: LogoProps) {
  return (
    <div className={clsx(className, 'inline-flex items-center')}>
      <X />
      <Safiro />
    </div>
  );
}

type XafiroProps = CustomComponentProps;

function Safiro({ className }: XafiroProps) {
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

type XProps = CustomComponentProps & {
  rotatable?: boolean;
};

function X({ className }: XProps) {
  const xRef = useRef<HTMLDivElement>(null);

  const resetRotation = () => {
    if (!xRef.current) {
      return null;
    }

    xRef.current.style.animation = 'none';
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    xRef.current.offsetHeight;
    xRef.current.style.animation = '';
  };

  const handleClick = () => {
    if (!xRef.current) {
      return null;
    }

    if (!xRef.current.classList.contains('animate-rotate')) {
      xRef.current.classList.add('animate-rotate');
    } else {
      resetRotation();
    }
  };

  return (
    <div
      className={clsx(
        className,
        'flex h-[160px] w-[160px] cursor-pointer items-center justify-center lg:h-[120px] lg:w-[120px] h-md:h-[80px] h-md:w-[80px] sm:h-[80px] sm:w-[80px]'
      )}
      onClick={handleClick}
    >
      <div
        className="h-[116px] w-[118px] origin-[59px_58px] lg:h-[87px] lg:w-[89px] lg:origin-[45px_44px] h-md:h-[58px] h-md:w-[59px] h-md:origin-[29px_29px] sm:h-[58px] sm:w-[59px] sm:origin-[29px_29px]"
        ref={xRef}
      >
        <XDash
          className="-translate-x-[7px] translate-y-[19px] lg:-translate-x-[5px] lg:translate-y-[15px] h-md:-translate-x-[4px] h-md:translate-y-[9px] sm:-translate-x-[4px] sm:translate-y-[9px]"
          angle="\"
        />
        <XDash
          className="translate-x-[56px] translate-y-[3px] lg:translate-x-[43px] lg:translate-y-[3px] h-md:translate-x-[28px] h-md:translate-y-[2px] sm:translate-x-[28px] sm:translate-y-[2px]"
          angle="/"
        />
        <XDash
          className="-translate-x-[7px] translate-y-[49px] lg:-translate-x-[5px] lg:translate-y-[37px] h-md:-translate-x-[4px] h-md:translate-y-[25px] sm:-translate-x-[4px] sm:translate-y-[25px]"
          angle="/"
        />
        <XDash
          className="translate-x-[56px] translate-y-[33px] lg:translate-x-[43px] lg:translate-y-[25px] h-md:translate-x-[28px] h-md:translate-y-[17px] sm:translate-x-[28px] sm:translate-y-[17px]"
          angle="\"
        />
      </div>
    </div>
  );
}

type DashProps = CustomComponentProps & {
  angle?: '\\' | '/';
};

function XDash({ className, angle = '\\' }: DashProps) {
  return (
    <div
      className={clsx(
        className,
        'h-[16px] w-[69px] rounded-full bg-white lg:h-[12px] lg:w-[52px] h-md:h-[8px] h-md:w-[35px] sm:h-[8px] sm:w-[35px]',
        angle === '\\' ? 'rotate-45' : '-rotate-45'
      )}
    ></div>
  );
}
