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
  
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.creativolve.agency'
          }
        ],
        destination: 'https://creativolve.agency/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'creativolve.agency',
            scheme: 'http'
          }
        ],
        destination: 'https://creativolve.agency/:path*',
        permanent: true,
      }
    ];
  }
  

};

export default nextConfig;
