import React from "react";
import Sidebar from "@/components/sidebar";
import Image from "next/image";
import AboutPhoto from "../public/images/Portfolio/image-60.webp";

const about = () => {
  return (
    <div className="container mx-auto  flex ">
      <Sidebar></Sidebar>
      <div className="w-full bg-slate-100 relative ">
        <div className="  bg-slate-100 flex items-center justify-between  ">
          <div className="h-screen">
            <Image
              src={AboutPhoto}
              alt="photo of a sofa and lamb to represent about"
              objectFit="contain"
              object-position="bottom"
              className="h-4/5"
            ></Image>
            <h1 className="absolute top-28 left-44 text-4xl font-semibold  p-4">
              Who We Are <span className="text-red-600">?</span>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default about;
