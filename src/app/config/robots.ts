import type { MetadataRoute } from 'next';

import { SITE_URL } from '@shared/config';

export function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/'
    },
    sitemap: `${SITE_URL}/sitemap.xml`
  };
}
