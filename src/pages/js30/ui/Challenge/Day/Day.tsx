import clsx from 'clsx';
import { useTranslations } from 'next-intl';

import { CustomComponentProps } from '@shared/lib';
import { ExternalLink, SvgIcon } from '@shared/ui';

import { DayContent, Js30Project } from '../../../config/challenge';

type DayProps = CustomComponentProps & {
  day: number;
  name: string;
  active: boolean;
};

export function Day({ className, day, name, active }: DayProps) {
  const t = useTranslations('Js30');

  const previewLink = `${Js30Project.ROOT}/${DayContent.FOLDER_PREFIX}${day}/${DayContent.INDEX}`;
  const scriptLink = `${Js30Project.SOURCE}/${DayContent.FOLDER_PREFIX}${day}/${DayContent.SCRIPT}`;

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
            <SvgIcon
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
            <SvgIcon
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
