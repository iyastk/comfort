// context/ServiceContext.tsx
import React, { createContext, useState, useContext, ReactNode } from "react";
import { useRouter } from "next/router";
import { StaticImageData } from "next/image";

import employee_2 from "/public/images/Portfolio/worker/Employee-2.jpeg";
import employee_3 from "/public/images/Portfolio/worker/Employee-3.jpeg";
import employee_4 from "/public/images/Portfolio/worker/Employee-4.jpeg";
import employee_6 from "/public/images/Portfolio/worker/Employee-6.jpeg";
import employee_7 from "/public/images/Portfolio/worker/Employee-7.jpeg";
import employee_8 from "/public/images/Portfolio/worker/Employee-8.jpeg";

// import Majlis_1
import Majlis_1 from "@/public/images/Portfolio/majlis/Majlis-1.jpeg";
import Majlis_2 from "@/public/images/Portfolio/majlis/Majlis-2.jpeg";
import Majlis_3 from "@/public/images/Portfolio/majlis/Majlis-3.jpg";
import Majlis_4 from "@/public/images/Portfolio/majlis/Majlis-4.jpeg";
import Majlis_5 from "@/public/images/Portfolio/majlis/Majlis-5.jpg";

import Majlis_6 from "@/public/images/Portfolio/majlis/Majlis-6.webp";
import Majlis_7 from "@/public/images/Portfolio/majlis/Majlis-7.jpg";
import Majlis_8 from "@/public/images/Portfolio/majlis/majlis-8.jpg";
import Majlis_9 from "@/public/images/Portfolio/majlis/Majlis-10.jpg";

//import shopFitting
import shop_1 from "@/public/images/Portfolio/Shop/shop-1.jpeg";
import shop_2 from "@/public/images/Portfolio/Shop/shop-2.jpeg";
import shop_3 from "@/public/images/Portfolio/Shop/shop-3.jpeg";
import shop_4 from "@/public/images/Portfolio/Shop/shop-4.jpeg";

import office_1 from "@/public/images/Portfolio/office/Office-1.jpeg";
import office_2 from "@/public/images/Portfolio/office/Office-2.jpeg";
import office_3 from "@/public/images/Portfolio/office/Office-3.jpeg";
import office_4 from "@/public/images/Portfolio/office/Office-4.jpeg";
import office_5 from "@/public/images/Portfolio/office/Office-5.jpeg";
import office_6 from "@/public/images/Portfolio/office/Office-6.jpeg";
import office_7 from "@/public/images/Portfolio/office/Office-7.jpg";
import office_8 from "@/public/images/Portfolio/office/Office-8.jpg";
import office_9 from "@/public/images/Portfolio/office/Office-9.jpg";
import office_10 from "@/public/images/Portfolio/office/Office-10.jpeg";

import home_1 from "@/public/images/Portfolio/home/Home-1.jpeg";
import home_2 from "@/public/images/Portfolio/home/Home-2.jpeg";
import home_3 from "@/public/images/Portfolio/home/Home-3.jpg";
import home_4 from "@/public/images/Portfolio/home/Home-4.jpg";
import home_5 from "@/public/images/Portfolio/home/Home-5.jpg";
import home_6 from "@/public/images/Portfolio/home/Home-6.jpg";
import home_7 from "@/public/images/Portfolio/home/Home-7.jpg";
import home_8 from "@/public/images/Portfolio/home/Home-8.jpg";
import home_9 from "@/public/images/Portfolio/home/Home-9.jpeg";
import home_10 from "@/public/images/Portfolio/home/Home-10.jpg";
import home_11 from "@/public/images/Portfolio/home/Home-11.jpg";
import home_12 from "@/public/images/Portfolio/home/Home-12.jpeg";

import home_13 from "@/public/images/Portfolio/home/home-13.jpg";

import home_14 from "@/public/images/Portfolio/home/Home-14.jpg";

// Define the types for the services and the context
const services = {
  MajlisDesigns: [
    Majlis_9,
    Majlis_8,
    Majlis_7,
    Majlis_6,
    Majlis_5,
    Majlis_1,
    Majlis_2,
    Majlis_3,
    Majlis_4,
  ],
  HotelFurnishing: [office_1, office_2, office_9, office_7],
  FactoryWorks: [
    employee_2,
    employee_3,
    employee_4,
    employee_6,
    employee_7,
    employee_8,
  ],
  officeFurnishing: [
    office_3,
    office_4,
    office_5,
    office_6,
    office_8,
    office_10,
  ],
  shopFittings: [shop_1, shop_2, shop_3, shop_4],
  homeFurnishing: [
    home_13,
    home_14,
    home_11,
    home_12,
    home_1,
    home_2,
    home_3,
    home_4,
    home_5,
    home_6,
    home_7,
    home_8,
    home_9,
    home_10,
  ],
};
const serviceData = [
  {
    title: "Complete Upholstery Solutions",
    slug: "upholstery",

    icon: "⚙️",

    description:
      "We offer professional upholstery services for residential, commercial, automotive, and marine needs, including reupholstering, frame repairs, and restoring furniture with high-quality materials for comfort and style.",
  },
  {
    title: "Joinery and Fit-Out Solutions",
    slug: "joineryAndFitOut",

    icon: "🛠️",

    description:
      "We specialize in custom joinery and fit-outs, crafting furniture, cabinetry, doors, and partitions. Our services cover residential, commercial, and bespoke projects, focusing on quality craftsmanship and seamless execution.",
  },
  {
    title: "Curtains and Blinds Solutions",
    slug: "curtainsAndBlinds",

    icon: "🪟",
    description:
      "We provide a variety of custom curtains and blinds, including drapes, Roman blinds, Venetian blinds, and motorized options. Our solutions offer style, privacy, and light control, with expert design, fabrication, and installation.",
  },
  {
    title: "Shop Fittings",
    slug: "shopFittings",

    icon: "🔨",
    description:
      "We supply retail store fixtures, including shelving, display units, counters, and lighting, to enhance product presentation and create an inviting atmosphere.",
  },
  {
    title: "Hospitality Furnishing ",
    slug: "hospitalityFurnishing",

    icon: "🏠",

    description:
      "Tailored solutions for hospitality venues, including custom furniture, upholstery, and fit-outs. We focus on comfort, durability, and aesthetic appeal to meet the unique needs of hotels, restaurants, and event spaces.",
  },
  {
    title: "Office furnishing",
    slug: "officeFurnishing",
    icon: "🏢",
    description:
      "We offer ergonomic desks, chairs, and storage solutions for offices, including conference room furniture and reception area furnishings, designed for comfort, functionality, and a professional look.",
  },
  {
    title: "Majlis designs",
    slug: "MajlisDesigns",
    icon: "🛋️",
    description:
      "Enhance your space with exquisite Majlis designs, blending tradition and modernity. we Create a welcoming Majlis with custom seating, luxurious fabrics, and elegant décor, blending tradition and modern style for timeless sophistication.",
  },
  {
    title: "home furnishing",
    slug: "homeFurnishing",
    icon: "🛏️",
    description:
      "Transform your home with custom-made furniture, curtains, blinds, upholstery, and décor. We focus on craftsmanship and premium materials to reflect your personal style and lifestyle.",
  },
];

type ServiceKeys = keyof typeof services; // This creates a type for the keys of the `services` object

interface ServiceContextType {
  selectedImages: StaticImageData[];
  activeButton: string;
  serviceData: {
    title: string;
    icon: string;
    slug: string;
    description: string;
  }[];
  isOpen:boolean;

  handleClick: (serviceSlug: ServiceKeys, serviceName: string) => void;
  toggleSidebar: () => void;
}

const ServiceContext = createContext<ServiceContextType | undefined>(undefined);

interface ServiceProviderProps {
  children: ReactNode;
}

export const ServiceProvider: React.FC<ServiceProviderProps> = ({
  children,
}) => {
  const [selectedImages, setSelectedImages] = useState<StaticImageData[]>(
    services.homeFurnishing
  ); // Default set
  const [activeButton, setActiveButton] = useState(""); // Track active button
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const router = useRouter();

  const handleClick = (serviceSlug: ServiceKeys, serviceName: string) => {
    setActiveButton(serviceName);
    toggleSidebar();
    setSelectedImages([...services[serviceSlug]]);
    router.push(`/portfolio/${serviceSlug}`, undefined, { shallow: true });
  };

  return (
    <ServiceContext.Provider
      value={{
        selectedImages,
        handleClick,
        serviceData,
        activeButton,
        toggleSidebar,
        isOpen
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
};

export const useServiceContext = (): ServiceContextType => {
  const context = useContext(ServiceContext);
  if (!context) {
    throw new Error("useServiceContext must be used within a ServiceProvider");
  }
  return context;
};
