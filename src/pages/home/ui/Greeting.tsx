import clsx from 'clsx';
import * as motion from 'motion/react-client';
import { useTranslations } from 'next-intl';

import { CustomComponentProps } from '@shared/lib';
import { SvgIcon, sourceCodePro } from '@shared/ui';

import { SlideIn } from './SlideIn';

type GreetingProps = CustomComponentProps;

export function Greeting({ className }: GreetingProps) {
  const t = useTranslations('AboutMe');

  return (
    <div
      className={clsx(
        className,
        sourceCodePro.className,
        'space-y-4 text-4xl leading-[3.75rem] [font-weight:315] lg:space-y-3 lg:text-[1.75rem] lg:leading-[3.25rem] md:text-[1.5rem] md:leading-[3rem] md:[font-weight:375] sm:text-[1.25rem] sm:leading-[2.75rem]'
      )}
    >
      <SlideIn step={0}>{t('hi')}</SlideIn>
      <SlideIn step={1}>{t('who')}</SlideIn>
      <SlideIn step={2}>
        {t('i')}{' '}
        <motion.span
          className="inline-block"
          whileHover={{ scale: 1.4 }}
          whileTap={{ scale: 1.4 }}
          tabIndex={-1}
        >
          <SvgIcon
            className="relative -top-[3px] inline-block h-[32px] w-[32px] lg:h-[24px] lg:w-[24px] md:-top-[2px] md:h-[20px] md:w-[20px] sm:h-[16px] sm:w-[16px]"
            icon="heart"
          />
        </motion.span>
        <span className="sr-only">🤍</span> {t('what')}
      </SlideIn>
    </div>
  );
}
