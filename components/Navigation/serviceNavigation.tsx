// components/Navigation/serviceNavigation.tsx
import React from "react";
import { useServiceContext } from "@/store/serviceContext";

interface Service {
  id: number;
  name: string;
  slug:
    | "hospitalityFurnishing"
    | "upholstery"
    | "joineryAndFitOut"
    | "curtainsAndBlinds"
    | "MajlisDesigns"
    | "officeFurnishing"
    | "shopFittings"
    | "homeFurnishing"; // Strict slug types
}

const ServiceNavigation = () => {
  const { handleClick } = useServiceContext();
  const services: Service[] = [
    { id: 1, name: "Hospitality Furnishing", slug: "hospitalityFurnishing" },
    { id: 2, name: "Majlis designs", slug: "MajlisDesigns" },
    { id: 3, name: "Shop Fittings", slug: "shopFittings" },
    { id: 4, name: "Office furnishing", slug: "officeFurnishing" },
    { id: 5, name: "Home furnishing", slug: "homeFurnishing" },
    { id: 6, name: "Joinery and Fit-Out", slug: "joineryAndFitOut" },
    { id: 7, name: "Curtains and Blinds", slug: "curtainsAndBlinds" },
    { id: 8, name: "Upholstery", slug: "upholstery" },
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
