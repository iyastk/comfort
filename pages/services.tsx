import Sidebar from "@/components/sidebar";
import React from "react";
import RotatableImage from "@/components/rotate";
import { useServiceContext } from "@/store/serviceContext";
import Link from "next/link";

const Services = () => {
  const { serviceData } = useServiceContext();

  return (
    <div className="container mx-auto  flex">
      <Sidebar></Sidebar>
      <div className="bg-white  w-full  ">
        <div className=" w-full  flex flex-col items-between justify-center  p-6  -m-10 ">
          <p className="text-orange-400  text-center  p-6">
            Rotate in 360 view
          </p>
          <RotatableImage></RotatableImage>
        </div>

        <div className="flex items-center justify-center bg-white mt-10 px-1 z-50">
          <h1 className="text-5xl 	  P-2	">Our Services</h1>
        </div>

        {/* Features List */}
        <div className="grid grid-flow-row	z-50  grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
          {serviceData.map((feature, index) => (
            <div
              key={index}
              className="flex items-start text-right	 sm:text-left space-x-4"
            >
              <div className="text-yellow-500 text-3xl">{feature.icon}</div>

              <div>
                <Link href={`/portfolio/${feature.slug}`}>
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                </Link>

                <p className="text-gray-600 mt-2">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
