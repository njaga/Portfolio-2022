const fs = require('fs');
const path = require('path');

const routes = require('./routes');

const BASE_URL = 'https://ndiagandiaye.com/';

const generateSitemap = () => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${routes.map(route => `
  <url>
    <loc>${BASE_URL}${route === '/' ? '' : route}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>
  `).join('')}
</urlset>`;

  const outputPath = path.resolve(__dirname, 'public', 'sitemap.xml');
  fs.writeFileSync(outputPath, sitemap);
  console.log(`Sitemap generated successfully at ${outputPath}`);
};

generateSitemap();