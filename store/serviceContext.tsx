import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { useRouter } from "next/router";
import portfolioData from "@/data/portfolio.json";
import { getPortfolioFromFirestore } from "@/lib/firebase";

// Type for individual media item
export interface MediaItem {
  id: string;
  url: string;
  type: "image" | "video";
  title?: string;
  slug?: string;
  category?: string;
  categoryName?: string;
  description?: string;
  client?: string;
  location?: string;
  year?: string;
  features?: string[];
  gallery?: string[];
}

// Utility to transform Google Drive links to direct stream links
const transformDriveUrl = (url: string): string => {
  if (url.includes("drive.google.com")) {
    const id = url.match(/[-\w]{25,}/);
    if (id) {
      return `https://docs.google.com/uc?export=download&id=${id[0]}`;
    }
  }
  return url;
};

interface ServiceContextType {
  selectedImages: MediaItem[];
  activeCategorySlug: string;
  activeButton: string;
  serviceData: any[];
  isOpen: boolean;
  isAdmin: boolean;
  isDarkMode: boolean;
  isLoadingData: boolean;
  setIsAdmin: (val: boolean) => void;
  toggleDarkMode: () => void;
  handleClick: (serviceSlug: string, serviceName: string) => void;
  toggleSidebar: () => void;
  updatePortfolio: (newCategories: any) => void;
  categories: any;
}

const ServiceContext = createContext<ServiceContextType | undefined>(undefined);

export const ServiceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [categories, setCategories] = useState(portfolioData.categories as Record<string, any[]>);
  const [serviceInfo, setServiceInfo] = useState(portfolioData.serviceInfo as any[]);
  const [selectedImages, setSelectedImages] = useState<MediaItem[]>([]);
  const [activeCategorySlug, setActiveCategorySlug] = useState("homeFurnishing");
  const [activeButton, setActiveButton] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const router = useRouter();

  // On mount: try to hydrate from Firestore, fall back to local JSON
  useEffect(() => {
    let cancelled = false;

    async function loadData() {
      setIsLoadingData(true);
      try {
        const firestoreData = await getPortfolioFromFirestore();
        if (!cancelled && firestoreData) {
          setCategories(firestoreData.categories);
          if (firestoreData.serviceInfo) {
            setServiceInfo(firestoreData.serviceInfo);
          }
          console.log("[ServiceContext] Loaded portfolio data from Firestore.");
        } else {
          console.log("[ServiceContext] Using local JSON fallback.");
        }
      } catch {
        console.warn("[ServiceContext] Firestore fetch failed — using local JSON.");
      } finally {
        if (!cancelled) setIsLoadingData(false);
      }
    }

    loadData();
    return () => { cancelled = true; };
  }, []);

  // Re-initialize selectedImages when categories change
  useEffect(() => {
    const initial = (categories.homeFurnishing || []).map((item: any) => ({
      ...item,
      url: transformDriveUrl(item.url),
    }));
    setSelectedImages(initial as MediaItem[]);
  }, [categories]);

  // Theme initialization (client-only)
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    } else {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleClick = (serviceSlug: string, serviceName: string) => {
    setActiveCategorySlug(serviceSlug);
    setActiveButton(serviceName);
    toggleSidebar();

    const categoryImages = (categories as any)[serviceSlug] || [];
    const transformed = categoryImages.map((item: any) => ({
      ...item,
      url: transformDriveUrl(item.url),
    }));

    setSelectedImages(transformed);
    router.push(`/portfolio/${serviceSlug}`, undefined, { shallow: true });
  };

  const updatePortfolio = (newCategories: any) => {
    setCategories(newCategories);
  };

  return (
    <ServiceContext.Provider
      value={{
        selectedImages,
        activeCategorySlug,
        handleClick,
        serviceData: serviceInfo,
        activeButton,
        toggleSidebar,
        isOpen,
        isAdmin,
        setIsAdmin,
        isDarkMode,
        toggleDarkMode,
        updatePortfolio,
        categories,
        isLoadingData,
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
};

export const useServiceContext = () => {
  const context = useContext(ServiceContext);
  if (!context) throw new Error("useServiceContext must be used within a ServiceProvider");
  return context;
};
