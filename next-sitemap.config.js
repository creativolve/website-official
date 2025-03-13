/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: 'https://creativolve.agency', // Ganti dengan domain kamu
  generateRobotsTxt: true, // Buat robots.txt juga
  sitemapSize: 7000, // Ukuran sitemap maksimum
  changefreq: 'daily', // Frekuensi perubahan konten
  priority: 0.7, // Prioritas pengindeksan (0.0 - 1.0)
};

module.exports = config;