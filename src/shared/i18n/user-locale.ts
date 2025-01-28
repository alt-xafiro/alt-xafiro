'use server';

import acceptLanguage from 'accept-language';

import { cookies, headers } from 'next/headers';

import { Locale, defaultLocale } from './locales';
import { LOCALES } from './locales';

const COOKIE_NAME = 'NEXT_LOCALE';

export async function getUserLocale() {
  const userAcceptLanguage = (await headers()).get('accept-language');
  acceptLanguage.languages(LOCALES as unknown as string[]);

  return (
    (await cookies()).get(COOKIE_NAME)?.value ||
    acceptLanguage.get(userAcceptLanguage) ||
    defaultLocale
  );
}

export async function setUserLocale(locale: Locale) {
  (await cookies()).set(COOKIE_NAME, locale);
}
