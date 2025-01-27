import deepmerge from 'deepmerge';
import { RequestConfig, getRequestConfig } from 'next-intl/server';

import { LOCALES } from '../config/locales';
import { getUserLocale } from '../lib/user-locale';

export default getRequestConfig(async () => {
  const locale = await getUserLocale();

  const defaultMessages = (await import(`../messages/${LOCALES[0]}.json`))
    .default;
  const userMessages = (await import(`../messages/${locale}.json`)).default;

  return {
    locale,
    messages:
      locale === LOCALES[0]
        ? defaultMessages
        : deepmerge(defaultMessages, userMessages)
  } as RequestConfig;
});
