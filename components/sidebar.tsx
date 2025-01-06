// components/Sidebar.tsx
import React from "react";
import ServiceNavigation from "@/components/Navigation/serviceNavigation";
import Navigation from "@/components/Navigation/mainNavigation";
import Image from "next/image";
import Logo from "@/public/logo.png";
import { useServiceContext } from "@/store/serviceContext";

const Sidebar = () => {
  const { toggleSidebar, isOpen } = useServiceContext();

  return (
    <>
      <button
        className="p-2  text-white bg-green-500 rounded-md fixed top-2 left-4 z-50 md:hidden"
        onClick={toggleSidebar}
      >
        {isOpen ? "Close" : "Menu"}
      </button>

      <div
        className={`w-full bg-white md:w-1/4 md:flex md:flex-col md:p-4 ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <div className="sticky top-10 bg-white">
          <div>
            <Image src={Logo} width={200} alt="comfort logo" className="" />
            <p className="text-gray-600 p-1">
              Your comfort is our first choice.
            </p>
          </div>
          <div className="absolute top-28 bg-slate-100">
            <nav className=" flex flex-col gap-3  my-4 p-6 bg-slate-100 text-black">
              <Navigation></Navigation>
            </nav>

            <p className=" text-emerald-600 bg-slate-100 p-1">See our latest projects.</p>
            <nav className="flex flex-col gap-3 p-2 px-6 bg-white text-black">
              <ServiceNavigation></ServiceNavigation>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
