import { GetStaticProps, GetStaticPaths } from 'next';
import React from "react";
import ImageGallery from "@/components/imageGallary";
import Header from "@/components/Navigation/header";
import Footer from "@/components/footer";
import Head from "next/head";
import portfolioData from "@/data/portfolio.json";
import { getWorksByCategory, WorkItem } from '@/lib/portfolio';
import { useServiceContext } from "@/store/serviceContext";
import Link from 'next/link';

interface CategoryPageProps {
  slug: string;
  categoryInfo: {
    slug: string;
    title: string;
    icon: string;
    description: string;
  };
  works: WorkItem[];
}

export default function CategoryPage({ slug, categoryInfo, works }: CategoryPageProps) {
  const { isDarkMode } = useServiceContext();

  const title = categoryInfo ? `${categoryInfo.title} | Comfort Portfolio` : "Portfolio Category | Comfort Furniture Dubai";
  const description = categoryInfo?.description || "Explore luxury contract furniture and custom interior works by Comfort Furniture Dubai.";
  const canonicalUrl = `https://www.comfortsplus.com/portfolio/${slug}`;

  return (
    <div className={`min-h-[100dvh] transition-colors duration-500 ${isDarkMode ? 'bg-[#0c0a09]' : 'bg-[#fafaf9]'}`}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonicalUrl} />
      </Head>
      <Header />
      
      <main className="pt-32 pb-24 px-4 sm:px-6 max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-medium text-foreground/60 mb-8">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link href="/portfolio" className="hover:text-primary transition-colors">Portfolio</Link>
          <span>/</span>
          <span className="text-primary font-bold">{categoryInfo?.title || slug}</span>
        </div>

        {/* Header */}
        <div className="mb-12 animate-fade-in">
          <span className="text-3xl mb-2 block">{categoryInfo?.icon}</span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold mb-4">
            {categoryInfo?.title || "Project Gallery"}
          </h1>
          <p className="text-foreground/70 max-w-2xl text-base sm:text-lg font-light leading-relaxed">
            {categoryInfo?.description}
          </p>
          <div className="w-20 h-1 bg-primary rounded-full mt-6" />
        </div>

        {/* Gallery */}
        <ImageGallery selectedImages={works} />
      </main>

      <Footer />
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = portfolioData.serviceInfo.map((service) => ({
    params: { slug: service.slug },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const categoryInfo = portfolioData.serviceInfo.find((s) => s.slug === slug) || {
    slug,
    title: slug,
    icon: "🛋️",
    description: "High quality contract furniture craftsmanship by Comfort Furniture Dubai."
  };

  const works = getWorksByCategory(slug);

  return {
    props: {
      slug,
      categoryInfo,
      works,
    },
  };
};
