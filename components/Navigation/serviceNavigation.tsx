// components/Navigation/serviceNavigation.tsx
import React from "react";
import { useServiceContext } from "@/store/serviceContext";

interface Service {
  id: number;
  name: string;
  slug:
    | "MajlisDesigns"
    | "officeFurnishing"
    | "shopFittings"
    | "homeFurnishing"
    | "FactoryWorks";
  // Strict slug types
}

const ServiceNavigation = () => {
  const { handleClick } = useServiceContext();
  const services: Service[] = [
    { id: 1, name: "Majlis designs", slug: "MajlisDesigns" },
    { id: 2, name: "Shop Fittings", slug: "shopFittings" },
    { id: 3, name: "Office furnishing", slug: "officeFurnishing" },
    { id: 4, name: "Home furnishing", slug: "homeFurnishing" },
    { id: 4, name: "Factory Works", slug: "FactoryWorks" },
  ];

  return (
    <>
      {services.map((service, i) => (
        <button
          key={i}
          className="text-left"
          onClick={() => handleClick(service.slug)} // This is now properly typed
        >
          {service.name}
        </button>
      ))}
    </>
  );
};

export default ServiceNavigation;
