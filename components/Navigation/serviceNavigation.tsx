import React, { MouseEventHandler } from "react";

interface ChildProps {
  handleClick: MouseEventHandler<HTMLButtonElement>;
}

const ServiceNavigation: React.FC<ChildProps> = ({ handleClick }) => {
  const services = [
    { id: 1, name: "Hospitality Furnishing", slug: "/hospitality_furnishing" },
    { id: 2, name: "Upholstery", slug: "/upholstery" },

    { id: 3, name: "Joinery and Fit-Out", slug: "/joinery_and_fit-out" },
    { id: 4, name: "Curtains and Blinds", slug: "/curtains_and_blinds" },
    {
      id: 5,
      name: "Premium Leather Trading",
      slug: "/premium_leather_trading",
    },
    { id: 6, name: "Office furnishing", slug: "/office_furnishing" },
    { id: 7, name: "Shop Fittings", slug: "/shop_fittings" },
    { id: 8, name: "Home furnishing", slug: "/home-furnishing" },
  ];
  return (
    <>
      {services.map((service, i) => (
        <button key={i} className={`text-left`} onClick={handleClick} value={service.}>
          {service.name}
        </button>
      ))}
    </>
  );
};

export default ServiceNavigation;
