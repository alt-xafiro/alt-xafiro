import clsx from 'clsx';
import { useTranslations } from 'next-intl';

import { CHALLENGE_LINK, Js30Day, Js30Project } from '@/consts';

import { CustomComponentProps, Js30ChallengeData } from '@/types';

import { sourceCodePro } from '@/ui/fonts';

import ExternalLink from '@/components/external-link/external-link';
import SVGIcon from '@/components/svg-icon/svg-icon';

type Js30ChallengeProps = CustomComponentProps & {
  data: Js30ChallengeData;
};

export default function Js30Challenge({ className, data }: Js30ChallengeProps) {
  const t = useTranslations();

  return (
    <div
      className={clsx(
        sourceCodePro.className,
        'flex flex-col items-center justify-start gap-16 pb-32 lg:gap-10 lg:pb-20 sm:gap-6 sm:pb-16',
        className
      )}
    >
      <h1 className="text-center text-6xl font-bold lg:text-5xl sm:text-4xl">
        <ExternalLink href={CHALLENGE_LINK}>{t('Pages.js30')}</ExternalLink>
      </h1>

      <ul className="flex max-w-2xl flex-col items-start justify-start gap-8 text-left lg:gap-6 sm:gap-4">
        {data.projectLocales.map((projectLocale, i) => {
          const day = ++i;
          const isActive = day <= data.currentDay;
          return (
            <DayN
              key={projectLocale}
              day={day}
              name={t(`Js30.Days.${projectLocale}`)}
              active={isActive}
            />
          );
        })}
      </ul>
    </div>
  );
}

type DayNProps = CustomComponentProps & {
  day: number;
  name: string;
  active: boolean;
};

function DayN({ className, day, name, active }: DayNProps) {
  const t = useTranslations('Js30');

  const previewLink = `${Js30Project.ROOT}/${Js30Day.DAY_PREFIX}${day}/${Js30Day.INDEX}`;
  const scriptLink = `${Js30Project.SOURCE}/${Js30Day.DAY_PREFIX}${day}/${Js30Day.SCRIPT}`;

  return (
    <li
      className={clsx(
        className,
        !active && 'text-white/50',
        'text-2xl lg:text-xl sm:text-lg'
      )}
    >
      <h2 className="font-bold">
        {t('day')} {day}
      </h2>
      <ul className="pl-5 text-xl lg:pl-[1.125rem] lg:text-lg sm:pl-4 sm:text-base">
        <li>
          <ExternalLink
            className="flex flex-row items-center gap-2"
            href={active ? previewLink : undefined}
            active={active}
          >
            <SVGIcon
              icon="preview"
              className="h-5 w-5 flex-shrink-0 lg:h-[1.125rem] lg:w-[1.125rem] sm:h-4 sm:w-4"
            />{' '}
            {name}
          </ExternalLink>
        </li>
        <li>
          <ExternalLink
            className="flex flex-row items-center gap-2"
            href={active ? scriptLink : undefined}
            active={active}
          >
            <SVGIcon
              icon="code"
              className="h-5 w-5 flex-shrink-0 lg:h-[1.125rem] lg:w-[1.125rem] sm:h-4 sm:w-4"
            />
            {t('script')}
          </ExternalLink>
        </li>
      </ul>
    </li>
  );
}
