import { GetServerSideProps } from "next";
import { getAllWorks } from "@/lib/portfolio";

const SITE_URL = "https://www.comfortsplus.com";

const STATIC_PAGES = [
  { url: "", priority: "1.0", changefreq: "daily" },
  { url: "/portfolio", priority: "0.9", changefreq: "daily" },
  { url: "/services", priority: "0.8", changefreq: "weekly" },
  { url: "/about", priority: "0.7", changefreq: "monthly" },
  { url: "/contact", priority: "0.7", changefreq: "monthly" },
  { url: "/portfolio/MajlisDesigns", priority: "0.8", changefreq: "weekly" },
  { url: "/portfolio/HotelFurnishing", priority: "0.8", changefreq: "weekly" },
  { url: "/portfolio/homeFurnishing", priority: "0.8", changefreq: "weekly" },
  { url: "/portfolio/shopFittings", priority: "0.8", changefreq: "weekly" },
];

// This component is never rendered — Next.js sends the XML response directly
function SitemapPage() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const works = getAllWorks();
  const now = new Date().toISOString();

  const urlEntries = [
    ...STATIC_PAGES.map(
      (page) =>
        `  <url>
    <loc>${SITE_URL}${page.url}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
    ),
    ...works.map(
      (work) =>
        `  <url>
    <loc>${SITE_URL}/portfolio/work/${work.slug}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`
    ),
  ].join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
    http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urlEntries}
</urlset>`;

  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=3600");
  res.write(xml);
  res.end();

  return { props: {} };
};

export default SitemapPage;
