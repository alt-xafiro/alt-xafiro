import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import { imageConfigDefault } from 'next/dist/shared/lib/image-config';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  eslint: {
    dirs: [
      'app',
      'components',
      'consts',
      'hooks',
      'i18n',
      'lib',
      'model',
      'pages',
      'public',
      'services',
      'src',
      'store',
      'types',
      'ui',
      'utils'
    ]
  },
  images: {
    contentDispositionType: 'inline',
    deviceSizes: [...imageConfigDefault.deviceSizes, 480, 960, 1440]
  }
};

export default withNextIntl(nextConfig);
