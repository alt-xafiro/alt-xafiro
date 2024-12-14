import { LOCALES } from '@/consts';

export type Locale = (typeof locales)[number];

export const locales = LOCALES;
export const defaultLocale: Locale = LOCALES[0];
