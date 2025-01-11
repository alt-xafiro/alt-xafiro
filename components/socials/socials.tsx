import clsx from 'clsx';
import { useTranslations } from 'next-intl';

import { CustomComponentProps, SocialsLinks } from '@/types';

import ExternalLink from '@/components/external-link/external-link';

type SocialsProps = CustomComponentProps & {
  socialLinks: SocialsLinks;
};

export default function Socials({ className, socialLinks }: SocialsProps) {
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
