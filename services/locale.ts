'use server';

import { cookies, headers } from 'next/headers';

import { defaultLocale } from '@/i18n/config';

import { parseAcceptLanguage } from '@/utils';

import { Locale } from '@/types';

const COOKIE_NAME = 'NEXT_LOCALE';

export async function getUserLocale() {
  const userAcceptLanguage = (await headers()).get('accept-language');

  return (
    (await cookies()).get(COOKIE_NAME)?.value ||
    parseAcceptLanguage(userAcceptLanguage) ||
    defaultLocale
  );
}

export async function setUserLocale(locale: Locale) {
  (await cookies()).set(COOKIE_NAME, locale);
}
