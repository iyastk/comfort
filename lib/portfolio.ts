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

// ──────────────────────────────────────────────────────────────────────────────
// Static JSON helpers (used at build time / getStaticProps)
// ──────────────────────────────────────────────────────────────────────────────

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

export function getAllCategories(): string[] {
  return Object.keys(portfolioData.categories);
}

export function getServiceInfo() {
  return portfolioData.serviceInfo;
}

// ──────────────────────────────────────────────────────────────────────────────
// Runtime helpers — fetch from /api/portfolio (works server & client side)
// ──────────────────────────────────────────────────────────────────────────────

/**
 * Fetch the live portfolio data from the API route.
 * On the server (getServerSideProps), pass the absolute base URL.
 * On the client, use relative URL.
 */
export async function fetchPortfolioData(baseUrl = ""): Promise<{
  categories: Record<string, WorkItem[]>;
  serviceInfo: any[];
} | null> {
  try {
    const url = `${baseUrl}/api/portfolio`;
    const res = await fetch(url, { next: { revalidate: 60 } } as any);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}
