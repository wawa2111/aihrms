/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
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