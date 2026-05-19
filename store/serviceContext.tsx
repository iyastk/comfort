import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { useRouter } from "next/router";
import portfolioData from "@/data/portfolio.json";

// Type for individual media item
export interface MediaItem {
  id: string;
  url: string;
  type: "image" | "video";
  title?: string;
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
  setIsAdmin: (val: boolean) => void;
  handleClick: (serviceSlug: string, serviceName: string) => void;
  toggleSidebar: () => void;
  updatePortfolio: (newCategories: any) => void;
  categories: any;
}

const ServiceContext = createContext<ServiceContextType | undefined>(undefined);

export const ServiceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [categories, setCategories] = useState(portfolioData.categories);
  const [selectedImages, setSelectedImages] = useState<MediaItem[]>([]);
  const [activeCategorySlug, setActiveCategorySlug] = useState("homeFurnishing");
  const [activeButton, setActiveButton] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  // Initialize with home furnishing
  useEffect(() => {
    const initial = (categories.homeFurnishing || []).map(item => ({
      ...item,
      url: transformDriveUrl(item.url)
    }));
    setSelectedImages(initial as MediaItem[]);
  }, [categories]);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleClick = (serviceSlug: string, serviceName: string) => {
    setActiveCategorySlug(serviceSlug);
    setActiveButton(serviceName);
    toggleSidebar();
    
    const categoryImages = (categories as any)[serviceSlug] || [];
    const transformed = categoryImages.map((item: any) => ({
      ...item,
      url: transformDriveUrl(item.url)
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
        serviceData: portfolioData.serviceInfo,
        activeButton,
        toggleSidebar,
        isOpen,
        isAdmin,
        setIsAdmin,
        updatePortfolio,
        categories
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
