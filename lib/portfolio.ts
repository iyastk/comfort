import portfolioData from "@/data/portfolio.json";

export interface WorkItem {
  id: string;
  slug: string;
  url: string;
  type: "image" | "video";
  title: string;
  category: string;
  categoryName: string;
  description: string;
  client?: string;
  location?: string;
  year?: string;
  features?: string[];
  gallery?: string[];
}

export function getAllWorks(): WorkItem[] {
  const allWorks: WorkItem[] = [];
  const categories = portfolioData.categories as Record<string, any[]>;
  
  for (const catKey in categories) {
    const items = categories[catKey];
    for (const item of items) {
      allWorks.push(item as WorkItem);
    }
  }
  return allWorks;
}

export function getWorkBySlug(slug: string): WorkItem | undefined {
  const works = getAllWorks();
  return works.find((w) => w.slug === slug || w.id === slug);
}

export function getWorksByCategory(categorySlug: string): WorkItem[] {
  const categories = portfolioData.categories as Record<string, any[]>;
  return (categories[categorySlug] || []) as WorkItem[];
}
