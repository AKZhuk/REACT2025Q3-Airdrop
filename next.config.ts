import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig:NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        pathname: '/PokeAPI/sprites/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
