/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://www.comfortsplus.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false, // Outputs direct sitemap.xml instead of sitemap index
  sitemapSize: 7000,
};
  