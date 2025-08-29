/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: 'https://creativolve.agency',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: 'daily',
  priority: 0.7,
  exclude: ['/admin/*', '/login/*'],
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', allow: '/favicon.png' },
      { userAgent: '*', disallow: '/image/circle' },
    ],
    additionalSitemaps: [
      'https://creativolve.agency/sitemap.xml'
    ],
    // Buat kosong agar tidak muncul Host
    host: undefined, 
  },
};

module.exports = config;
