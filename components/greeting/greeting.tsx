import clsx from 'clsx';
import * as motion from 'motion/react-client';
import { useTranslations } from 'next-intl';

import { CustomComponentProps } from '@/types';

import { sourceCodePro } from '@/ui/fonts';

import SVGIcon from '@/components/svg-icon/svg-icon';

type GreetingProps = CustomComponentProps;

const Line = {
  DELAY: 0.4,
  TYPE: 'spring',
  DURATION: 0.4,
  OFFSET_Y: 200,
  BOUNCE: 0.4
};

export default function Greeting({ className }: GreetingProps) {
  const t = useTranslations('AboutMe');

  return (
    <div
      className={clsx(
        className,
        sourceCodePro.className,
        'space-y-4 text-4xl leading-[3.75rem] [font-weight:315] lg:text-[1.75rem] lg:leading-[3.25rem] md:text-[1.5rem] md:leading-[3rem] md:[font-weight:375] sm:text-[1.25rem] sm:leading-[2.75rem]'
      )}
    >
      <motion.p
        className="no-js-motion"
        initial={{ y: Line.OFFSET_Y, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: Line.DURATION,
          y: { type: Line.TYPE, bounce: Line.BOUNCE }
        }}
      >
        {t('hi')}
      </motion.p>
      <motion.p
        className="no-js-motion"
        initial={{ y: Line.OFFSET_Y, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: Line.DURATION,
          y: {
            delay: Line.DELAY,
            type: Line.TYPE,
            bounce: Line.BOUNCE
          },
          opacity: {
            delay: Line.DELAY
          }
        }}
      >
        {t('who')}
      </motion.p>
      <motion.p
        className="no-js-motion"
        initial={{ y: Line.OFFSET_Y, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: Line.DURATION,
          y: {
            delay: Line.DELAY * 2,
            type: Line.TYPE,
            bounce: Line.BOUNCE
          },
          opacity: {
            delay: Line.DELAY * 2
          }
        }}
      >
        {t('i')}{' '}
        <motion.span
          className="inline-block"
          whileHover={{ scale: 1.4 }}
          whileTap={{ scale: 1.4 }}
          tabIndex={-1}
        >
          <SVGIcon
            className="relative -top-[3px] inline-block h-[32px] w-[32px] lg:h-[24px] lg:w-[24px] md:-top-[2px] md:h-[20px] md:w-[20px] sm:h-[16px] sm:w-[16px]"
            icon="heart"
          />
        </motion.span>
        <span className="sr-only">🤍</span> {t('what')}
      </motion.p>
    </div>
  );
}
