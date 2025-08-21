/** @type {import('next').NextConfig} */
const nextConfig = {
  // 🚫 Jangan build untuk browser lama
  experimental: {
    legacyBrowsers: false,
  },

  // ⚡ Minify pakai SWC
  swcMinify: true,

  // 📷 Remote image config
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'drive.google.com',
        pathname: '/uc/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',
      },
    ],
  },

  // 🌐 Headers tambahan (optional SEO/robots control)
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'all', // default aja, bisa dihapus kalau ga kepake
          },
        ],
      },
    ];
  },
};

export default nextConfig;
