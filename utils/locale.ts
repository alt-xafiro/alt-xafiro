import acceptLanguage from 'accept-language';

import { LOCALES } from '@/consts';

export const parseAcceptLanguage = (value: string | null) => {
  acceptLanguage.languages(LOCALES as unknown as string[]);

  return acceptLanguage.get(value);
};
