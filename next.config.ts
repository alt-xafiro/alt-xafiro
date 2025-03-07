import createNextIntlPlugin from 'next-intl/plugin';

import type { NextConfig } from 'next';
import { imageConfigDefault } from 'next/dist/shared/lib/image-config';

const withNextIntl = createNextIntlPlugin('./src/shared/i18n/request.ts');

const nextConfig: NextConfig = {
  images: {
    contentDispositionType: 'inline',
    deviceSizes: [...imageConfigDefault.deviceSizes, 480, 960, 1440]
  },
  experimental: {
    staleTimes: {
      dynamic: 600
    }
  }
};

export default withNextIntl(nextConfig);
