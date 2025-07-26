import type { MetadataRoute } from 'next';

import { SITE_URL } from '@shared/config';

export function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1
    },
    {
      url: `${SITE_URL}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1
    },
    {
      url: `${SITE_URL}/projects/js30`,
      lastModified: new Date(),
      changeFrequency: 'never',
      priority: 0.4
    },
    {
      url: `${SITE_URL}/socials`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8
    }
  ];
}
