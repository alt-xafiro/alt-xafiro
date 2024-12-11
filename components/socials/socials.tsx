import clsx from 'clsx';

import socialsJson from '@/data/socials.json';

import { CustomComponentProps, SocialsLinks } from '@/types';

type SocialsProps = CustomComponentProps;

const socialLinks = socialsJson as unknown as SocialsLinks;

export default function Socials({ className }: SocialsProps) {
  return (
    <ul
      className={clsx(
        className,
        'text-center text-4xl leading-[3.25rem] md:text-3xl md:leading-[2.75rem]'
      )}
    >
      {socialLinks.map((social) => {
        return (
          <li key={social.name}>
            <a
              className={clsx(
                className,
                'transition-colors hover:text-space-100 active:text-space-200'
              )}
              href={social.href}
              target="_blank"
              rel="noreferrer"
            >
              {social.name}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
