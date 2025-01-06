import React from "react";
import RotatableImage from "@/components/rotate";
import { useServiceContext } from "@/store/serviceContext";
import Link from "next/link";
import useCheckScreen from "@/components/utils/checkScreen";
import Sidebar from "@/components/sidebar";

const Services = () => {
  const { serviceData } = useServiceContext();
  const isAboveMd = useCheckScreen();

  return (
    <div className="container mx-auto  flex">
            {isAboveMd ? <Sidebar></Sidebar> : <></>}

      <div className="bg-white  w-full  ">
        <div className=" w-full  flex flex-col items-between justify-center  md:p-6  md:-m-10 ">
          <p className="text-orange-400  text-center  p-6">
            Rotate in 360 view
          </p>
          <RotatableImage></RotatableImage>
        </div>

        <div className="flex items-center justify-center bg-white mt-10 px-1 z-50">
          <h1 className="text-3xl md:text-5xl 	  P-2	">Our Services</h1>
        </div>

        {/* Features List */}
        <div className="md:grid md:grid-flow-row	z-50  md:grid-cols-2 lg:grid-cols-3 gap-6 md:p-8">
          {serviceData.map((feature, index) => (
            <div
              key={index}
              className="flex items-start text-justify md:text-left	gap-3 md:gap-1 p-4 md:p-0  space-x-4"
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
