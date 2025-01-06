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
    | "FactoryWorks"
    | "HotelFurnishing";
  // Strict slug types
}

const ServiceNavigation = () => {
  const { handleClick, activeButton } = useServiceContext();
  const services: Service[] = [
    { id: 1, name: "Majlis Designs", slug: "MajlisDesigns" },
    { id: 2, name: "Shop Fittings", slug: "shopFittings" },
    { id: 3, name: "Office Furnishing", slug: "officeFurnishing" },
    { id: 4, name: "Hotel Furnishing", slug: "HotelFurnishing" },
    { id: 5, name: "Home Furnishing", slug: "homeFurnishing" },
    { id: 6, name: "Factory Works", slug: "FactoryWorks" },
  ];

  return (
    <>
      {services.map((service, i) => (
        <button
          key={i}
          className={` py-2 text-left  ${
            activeButton === service.name ? " text-green-600" : " text-black"
          }`}
          onClick={() => handleClick(service.slug, service.name) } // This is now properly typed
        >
          {service.name}
        </button>
      ))}
    </>
  );
};

export default ServiceNavigation;
