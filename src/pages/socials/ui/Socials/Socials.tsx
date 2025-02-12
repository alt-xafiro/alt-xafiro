import clsx from 'clsx';
import { useTranslations } from 'next-intl';

import { CustomComponentProps } from '@shared/lib';
import { ExternalLink } from '@shared/ui';

import { SocialsLinks } from '../../model/socials';

type LinksProps = CustomComponentProps & {
  socialLinks: SocialsLinks;
};

export function Socials({ className, socialLinks }: LinksProps) {
  const t = useTranslations('Socials');

  return (
    <ul
      className={clsx(
        className,
        'text-center text-4xl leading-[3.25rem] md:text-3xl md:leading-[2.75rem]'
      )}
    >
      {socialLinks.map((social) => {
        return (
          <li key={social.locale}>
            <ExternalLink href={social.href}>{t(social.locale)}</ExternalLink>
          </li>
        );
      })}
    </ul>
  );
}
