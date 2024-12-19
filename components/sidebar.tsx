import React from "react";
import Image from "next/image";
import Logo from "../public/logo.png";
import Navigation from "@/components/Navigation/mainNavigation";
import ServiceNavigation from "@/components/Navigation/serviceNavigation";

const Sidebar = () => {
  return (
    <>
      <div className="w-1/4 flex flex-col p-4 ">
        <div className="sticky top-0">
          <Image src={Logo} width={200} alt="comfort logo" className="" />

          <p className="text-gray-600 p-1">Your comfort is our first choice.</p>
        </div>
        <nav className="flex flex-col gap-3  my-4 p-6">
          <Navigation></Navigation>
        </nav>

        <p className="text-emerald-600 p-1">See our latest projects.</p>
        <nav className="flex flex-col gap-3 p-2 px-6">
          <ServiceNavigation></ServiceNavigation>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
