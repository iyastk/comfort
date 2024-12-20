// components/PortfolioGrid.js
import React from "react";
import ImageGallery from "@/components/imageGallary";

import employee_1 from "/public/images/Portfolio/worker/Employee-1.jpeg";
import employee_2 from "/public/images/Portfolio/worker/Employee-2.jpeg";
import employee_3 from "/public/images/Portfolio/worker/Employee-3.jpeg";
import employee_4 from "/public/images/Portfolio/worker/Employee-4.jpeg";
import employee_5 from "/public/images/Portfolio/worker/Employee-5.jpeg";
import employee_6 from "/public/images/Portfolio/worker/Employee-6.jpeg";
import employee_7 from "/public/images/Portfolio/worker/Employee-7.jpeg";
import employee_8 from "/public/images/Portfolio/worker/Employee-8.jpeg";

import Sidebar from "@/components/sidebar";

const services ={
    pictureSet1:[employee_1, employee_2, employee_3, employee_8];
    PictureSet2: [employee_4, employee_5, employee_6]
},

const PortfolioPage = () => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const value = event.target.value; // TypeScript now knows `target` is a button
    console.log("Button value:", value);
  };
  return (
    <div className="container mx-auto p-6 flex">
      <Sidebar handleClick={handleClick}></Sidebar>
      <ImageGallery items={employees}></ImageGallery>
    </div>
  );
};

export default PortfolioPage;