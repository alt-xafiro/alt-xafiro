import clsx from 'clsx';
import * as motion from 'motion/react-client';

import { CustomComponentProps } from '@shared/lib';

const Config = {
  DURATION: 0.3,
  DELAY: 0.3,
  OFFSET_Y: 200,
  TYPE: 'spring',
  BOUNCE: 0.4
} as const;

type SlideInProps = CustomComponentProps & {
  step?: number;
};

export function SlideIn({ children, className, step = 0 }: SlideInProps) {
  return (
    <motion.p
      className={clsx(className, 'no-js-motion')}
      initial={{ y: Config.OFFSET_Y, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: Config.DURATION,
        y: {
          delay: Config.DELAY * step,
          type: Config.TYPE,
          bounce: Config.BOUNCE
        },
        opacity: {
          delay: Config.DELAY * step
        }
      }}
    >
      {children}
    </motion.p>
  );
}
