import type { MetadataRoute } from 'next';

export function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://xafiro.site',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1
    },
    {
      url: 'https://xafiro.site/projects',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1
    },
    {
      url: 'https://xafiro.site/projects/js30',
      lastModified: new Date(),
      changeFrequency: 'never',
      priority: 0.4
    },
    {
      url: 'https://xafiro.site/socials',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8
    }
  ];
}
