/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: '/adaptplanner',
  assetPrefix: '/adaptplanner/',
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
