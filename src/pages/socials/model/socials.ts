import socialsJson from './socials.json';

export type SocialsLinks = {
  locale: 'string';
  href: 'string';
}[];

export const socialLinks = socialsJson as unknown as SocialsLinks;
