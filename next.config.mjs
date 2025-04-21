/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'all',
          },
        ],
      },
    ];
  },

  // Redirect HTTP to HTTPS (canonical)
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'creativolve.agency', // Ganti dengan domain kamu TANPA https
          },
        ],
        permanent: true,
        destination: 'https://creativolve.agency/:path*', // Ganti juga
      },
    ];
  },
};

export default nextConfig;
