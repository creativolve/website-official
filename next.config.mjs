/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'all' // Izinkan semua bot untuk mengindeks
          }
        ]
      }
    ];
  },
  

};

export default nextConfig;
