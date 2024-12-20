// components/Navigation/serviceNavigation.tsx
import React from 'react';
import { useServiceContext } from "@/store/serviceContext";

interface Service {
  id: number;
  name: string;
  slug: 'hospitalityFurnishing' | 'upholstery' | 'joineryAndFitOut' | 'curtainsAndBlinds' | 'premiumLeatherTrading' | 'officeFurnishing' | 'shopFittings' | 'homeFurnishing'; // Strict slug types
}


const ServiceNavigation = () => {
  const { handleClick } = useServiceContext();
  const services: Service[] = [
    { id: 1, name: 'Hospitality Furnishing', slug: 'hospitalityFurnishing' },
    { id: 2, name: 'Upholstery', slug: 'upholstery' },
    { id: 3, name: 'Joinery and Fit-Out', slug: 'joineryAndFitOut' },
    { id: 4, name: 'Curtains and Blinds', slug: 'curtainsAndBlinds' },
    { id: 5, name: 'Premium Leather Trading', slug: 'premiumLeatherTrading' },
    { id: 6, name: 'Office furnishing', slug: 'officeFurnishing' },
    { id: 7, name: 'Shop Fittings', slug: 'shopFittings' },
    { id: 8, name: 'Home furnishing', slug: 'homeFurnishing' }
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
