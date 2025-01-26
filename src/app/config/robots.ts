import type { MetadataRoute } from 'next';

export function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/'
    },
    sitemap: 'https://xafiro.site/sitemap.xml'
  };
}
