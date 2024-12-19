import Link from "next/link";
import React from "react";

const ServiceNavigation = () => {
  const services = [
    "Hospitality Furnishing",
    "Upholstery",
    "Joinery and Fit-Out",
    "Curtains and Blinds",
    "Premium Leather Trading",
    "Office furnishing",
    "Shop Fittings",
    "Home furnishing",
  ];
  return (
    <>
      {services.map((service, i) => (
        <Link
          key={i}
          href="#"
          // className={
          //   // activeCategory === service ? "bg-blue-500 text-white" : "bg-white"
          // }
        >
          {service}
        </Link>
      ))}
    </>
  );
};

export default ServiceNavigation;
