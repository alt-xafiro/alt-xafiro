'use client';

import clsx from 'clsx';

import { CustomComponentProps } from '@/types';

import { sourceCodePro } from '@/ui/fonts';

import SVGIcon from '@/components/svg-icon/svg-icon';

type GreetingProps = CustomComponentProps;

export default function Greeting({ className }: GreetingProps) {
  return (
    <div
      className={clsx(
        className,
        sourceCodePro.className,
        'text-4xl leading-[3.75rem] [font-weight:315] lg:text-[1.75rem] lg:leading-[3.25rem] md:text-[1.5rem] md:leading-[3rem] md:[font-weight:375] sm:text-[1.25rem] sm:leading-[2.75rem]'
      )}
    >
      <p className="mb-[1em]">Hi!</p>
      <p>I&apos;m Maxim, a front-end developer. </p>
      <p>
        I{' '}
        <SVGIcon
          className="relative -top-[3px] inline-block h-[32px] w-[32px] lg:h-[24px] lg:w-[24px] md:-top-[2px] md:h-[20px] md:w-[20px] sm:h-[16px] sm:w-[16px]"
          icon="heart"
        />
        <span className="sr-only">🤍</span> creating and web technologies.
      </p>
    </div>
  );
}
