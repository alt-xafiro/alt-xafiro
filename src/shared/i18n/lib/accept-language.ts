import acceptLanguage from 'accept-language';

import { LOCALES } from '../config/locales';

export const parseAcceptLanguage = (value: string | null) => {
  acceptLanguage.languages(LOCALES as unknown as string[]);

  return acceptLanguage.get(value);
};
