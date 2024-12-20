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

// Define the types for the services and the context
const services = {
  hospitalityFurnishing: [employee_1, employee_2, employee_3, employee_8],
  upholstery: [employee_4, employee_5, employee_6],
  joineryAndFitOut: [employee_1, employee_6, employee_7],
  curtainsAndBlinds: [employee_3, employee_4, employee_7],
  premiumLeatherTrading: [employee_2, employee_5, employee_8],
  officeFurnishing: [employee_1, employee_4, employee_5],
  shopFittings: [employee_6, employee_7, employee_8],
  homeFurnishing: [employee_2, employee_3, employee_6],
};

type ServiceKeys = keyof typeof services; // This creates a type for the keys of the `services` object

interface ServiceContextType {
  selectedImages: StaticImageData[];
  handleClick: (serviceSlug: ServiceKeys) => void;
}

const ServiceContext = createContext<ServiceContextType | undefined>(undefined);

interface ServiceProviderProps {
  children: ReactNode;
}

export const ServiceProvider: React.FC<ServiceProviderProps> = ({
  children,
}) => {
  const [selectedImages, setSelectedImages] = useState(
    services.hospitalityFurnishing
  ); // Default set
  const router = useRouter();

  const handleClick = (serviceSlug: ServiceKeys) => {
    setSelectedImages([...services[serviceSlug]]);
    console.log("------------------");
    console.log(selectedImages);

    router.push(`/portfolio/${serviceSlug}`, undefined, { shallow: true });
  };

  return (
    <ServiceContext.Provider value={{ selectedImages, handleClick }}>
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
