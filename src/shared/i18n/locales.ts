export const LOCALES = ['en', 'ru'] as const;

export type Locale = (typeof LOCALES)[number];

export const defaultLocale: Locale = LOCALES[0];
