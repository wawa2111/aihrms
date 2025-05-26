/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  images: {
    domains: ['localhost'],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: ['mongoose'],
    optimizeCss: true,
  },
  // Redirect all requests to Vite's build output
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: '/:path*',
      },
    ];
  },
  // Use Vite's output directory
  distDir: 'dist',
};

module.exports = nextConfig;