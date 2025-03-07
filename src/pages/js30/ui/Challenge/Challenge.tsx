import clsx from 'clsx';
import { useTranslations } from 'next-intl';

import { CustomComponentProps } from '@shared/lib';
import { ExternalLink, sourceCodePro } from '@shared/ui';

import { CURRENT_DAY } from '../../config/challenge';
import { ChallengeData, challengeData } from '../../model/challenge';
import { Day } from './Day/Day';

type ChallengeProps = CustomComponentProps & {
  data: ChallengeData;
};

export function Challenge({ className, data }: ChallengeProps) {
  const t = useTranslations();

  return (
    <div
      className={clsx(
        className,
        sourceCodePro.className,
        'flex flex-col items-center justify-start gap-12 pb-32 lg:gap-10 lg:pb-20 sm:gap-6 sm:pb-16'
      )}
    >
      <h1 className="text-center text-6xl font-bold lg:text-5xl sm:text-4xl">
        <ExternalLink href={challengeData.challengeLink}>
          {t('Pages.js30')}
        </ExternalLink>
      </h1>

      <p className="mb-4 max-w-3xl text-justify text-xl lg:text-lg sm:text-base">
        {t('Js30.description')}
      </p>

      <ol className="flex max-w-2xl flex-col items-start justify-start gap-8 text-left lg:gap-6 sm:gap-4">
        {data.projectLocales.map((projectLocale, i) => {
          const day = ++i;
          const isActive = day <= CURRENT_DAY;
          return (
            <Day
              key={projectLocale}
              day={day}
              name={t(`Js30.Days.${projectLocale}`)}
              active={isActive}
            />
          );
        })}
      </ol>
    </div>
  );
}
