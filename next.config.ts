import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    contentDispositionType: 'inline',
    deviceSizes: [480, 640, 750, 828, 960, 1080, 1200, 1440, 1920, 2048, 3840]
  }
};

export default withNextIntl(nextConfig);
