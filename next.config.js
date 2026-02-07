/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // <--- AJOUTE CETTE LIGNE ICI
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    webpackBuildWorker: true,
  },
};

module.exports = nextConfig;
