// context/ServiceContext.tsx
import React, { createContext, useState, useContext, ReactNode } from "react";
import { useRouter } from "next/router";
import { StaticImageData } from "next/image";

import employee_1 from "/public/images/Portfolio/worker/Employee-1.jpeg";
import employee_2 from "/public/images/Portfolio/worker/Employee-2.jpeg";
import employee_3 from "/public/images/Portfolio/worker/Employee-3.jpeg";
import employee_4 from "/public/images/Portfolio/worker/Employee-4.jpeg";
import employee_5 from "/public/images/Portfolio/worker/Employee-5.jpeg";
import employee_6 from "/public/images/Portfolio/worker/Employee-6.jpeg";
import employee_7 from "/public/images/Portfolio/worker/Employee-7.jpeg";
import employee_8 from "/public/images/Portfolio/worker/Employee-8.jpeg";
import hospitality_1 from "@/public/images/Portfolio/hospitality/hospitality-1.jpeg";
import hospitality_2 from "@/public/images/Portfolio/hospitality/hospitality-2.jpeg";
import hospitality_3 from "@/public/images/Portfolio/hospitality/hospitality-3.jpeg";
import hospitality_4 from "@/public/images/Portfolio/hospitality/hospitality-4.jpeg";
import hospitality_5 from "@/public/images/Portfolio/hospitality/hospitality-5.jpeg";
import hospitality_6 from "@/public/images/Portfolio/hospitality/hospitality-6.jpeg";
import hospitality_7 from "@/public/images/Portfolio/hospitality/hospitality-7.jpeg";
import hospitality_8 from "@/public/images/Portfolio/hospitality/hospitality-8.jpeg";
import hospitality_9 from "@/public/images/Portfolio/hospitality/hospitality-9.jpeg";
import hospitality_10 from "@/public/images/Portfolio/hospitality/hospitality-10.jpeg";
import hospitality_11 from "@/public/images/Portfolio/hospitality/hospitality-11.jpeg";
import hospitality_12 from "@/public/images/Portfolio/hospitality/hospitality-12.jpeg";
import hospitality_13 from "@/public/images/Portfolio/hospitality/hospitality-13.jpeg";
import hospitality_14 from "@/public/images/Portfolio/hospitality/hospitality-14.jpeg";
import hospitality_15 from "@/public/images/Portfolio/hospitality/hospitality-15.jpg";
import hospitality_16 from "@/public/images/Portfolio/hospitality/hospitality-16.jpg";
import hospitality_17 from "@/public/images/Portfolio/hospitality/hospitality-17.jpg";

import sample_3 from "@/public/images/Portfolio/sample-3.jpeg";
import sample_4 from "@/public/images/Portfolio/sample-4.jpeg";
import sample_5 from "@/public/images/Portfolio/sample-5.jpeg";
import sample_6 from "@/public/images/Portfolio/sample-6.jpeg";
import sample_7 from "@/public/images/Portfolio/sample-7.jpeg";
import sample_8 from "@/public/images/Portfolio/sample-8.jpeg";
import sample_9 from "@/public/images/Portfolio/sample-9.jpeg";
import sample_10 from "@/public/images/Portfolio/sample-10.jpeg";
import sample_11 from "@/public/images/Portfolio/sample-11.jpeg";
import sample_12 from "@/public/images/Portfolio/sample-12.jpeg";
import sample_13 from "@/public/images/Portfolio/sample-13.jpeg";
import sample_14 from "@/public/images/Portfolio/sample-14.jpeg";
import sample_15 from "@/public/images/Portfolio/sample-15.jpeg";
import sample_16 from "@/public/images/Portfolio/sample-16.jpeg";
import sample_17 from "@/public/images/Portfolio/sample-17.jpeg";
import sample_18 from "@/public/images/Portfolio/sample-18.jpeg";

import gallary_1 from "/public/images/gallary/gallary_1.webp";
import gallary_2 from "/public/images/gallary/gallary_2.jpeg";
import gallary_3 from "/public/images/gallary/gallary_3.jpg";
import gallary_4 from "/public/images/gallary/gallary_4.jpg";
import gallary_5 from "/public/images/gallary/gallary_5.jpg";
import gallary_6 from "/public/images/gallary/gallary_6.jpg";
import gallary_7 from "/public/images/gallary/gallary_7.jpg";
import gallary_8 from "/public/images/gallary/gallary_8.jpg";
import gallary_9 from "/public/images/gallary/gallary_9.jpg";
import gallary_10 from "/public/images/gallary/gallary_10.jpg";
import gallary_11 from "/public/images/gallary/gallary_11.jpg";
import gallary_12 from "/public/images/gallary/gallary_12.jpg";
import gallary_13 from "/public/images/gallary/gallary_13.jpg";

// Define the types for the services and the context
const services = {
  hospitalityFurnishing: [
    hospitality_5,
    hospitality_6,
    hospitality_7,
    hospitality_8,
    hospitality_9,
    hospitality_10,
    hospitality_11,
    hospitality_12,
    hospitality_13,
    hospitality_14,
    hospitality_15,
    hospitality_16,
    hospitality_17,
    hospitality_1,
    hospitality_2,
    hospitality_3,
    hospitality_4,
  ],
  upholstery: [employee_4, employee_5, employee_6],
  joineryAndFitOut: [
    employee_1,
    employee_2,
    employee_3,
    employee_4,
    employee_5,
    employee_6,
    employee_7,
  ],
  curtainsAndBlinds: [sample_14, sample_15, sample_16, sample_17],
  premiumLeatherTrading: [
    sample_10,
    sample_11,
    sample_12,
    sample_13,
    sample_18,
  ],
  officeFurnishing: [
    sample_3,
    sample_4,
    sample_5,
    sample_6,
    sample_7,
    sample_8,
    sample_9,
  ],
  shopFittings: [employee_6, employee_7, employee_8],
  homeFurnishing: [
    gallary_1,
    gallary_2,
    gallary_3,
    gallary_4,
    gallary_5,
    gallary_6,
    gallary_7,
    gallary_8,
    gallary_9,
    gallary_10,
    gallary_11,
    gallary_12,
    gallary_13,
  ],
};
const serviceData = [
  {
    title: "Complete Upholstery Solutions",
    slug: "upholstery",

    icon: "🛋️",

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

    icon: "⚙️",
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
    slug: "premiumLeatherTrading",
    icon: "🕌",
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
  serviceData: {
    title: string;
    icon: string;
    slug: string;
    description: string;
  }[];

  handleClick: (serviceSlug: ServiceKeys) => void;
}

const ServiceContext = createContext<ServiceContextType | undefined>(undefined);

interface ServiceProviderProps {
  children: ReactNode;
}

export const ServiceProvider: React.FC<ServiceProviderProps> = ({
  children,
}) => {
  const [selectedImages, setSelectedImages] = useState(services.homeFurnishing); // Default set
  const router = useRouter();

  const handleClick = (serviceSlug: ServiceKeys) => {
    setSelectedImages([...services[serviceSlug]]);
    router.push(`/portfolio/${serviceSlug}`, undefined, { shallow: true });
  };

  return (
    <ServiceContext.Provider
      value={{ selectedImages, handleClick, serviceData }}
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
