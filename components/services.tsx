import React from "react";

// components/FeatureSection.js
import Image from "next/image";
import houseImage from "/public/images/house.png";
// replace with your actual image path

const features1 = [
  {
    title: "Extensive documentation",
    icon: "🏠",
    description:
      "Sed sodales vitae lectus nec lobortis. Aliquam eget est ac mi gravida viverra in quis elit.",
  },
  {
    title: "Awesome design",
    icon: "✏️",
    description:
      "Sed sodales vitae lectus nec lobortis. Aliquam eget est ac mi gravida viverra in quis elit.",
  },
  {
    title: "Free plugins included",
    icon: "⚙️",
    description:
      "Sed sodales vitae lectus nec lobortis. Aliquam eget est ac mi gravida viverra in quis elit.",
  },
];
const features2 = [
  {
    title: "Extensive documentation",
    icon: "🏠",
    description:
      "Sed sodales vitae lectus nec lobortis. Aliquam eget est ac mi gravida viverra in quis elit.",
  },
  {
    title: "Awesome design",
    icon: "✏️",
    description:
      "Sed sodales vitae lectus nec lobortis. Aliquam eget est ac mi gravida viverra in quis elit.",
  },
  {
    title: "Free plugins included",
    icon: "⚙️",
    description:
      "Sed sodales vitae lectus nec lobortis. Aliquam eget est ac mi gravida viverra in quis elit.",
  },
];

const Services = () => {
  return (
    <div>
      <div className="flex items-center justify-center bg-white px-6">
        <h1 className="text-5xl 	 mt-8	">Our Services</h1>
      </div>

      <div className="flex bg-white flex-col lg:flex-row items-center lg:justify-between  mx-auto p-6">
        {/* Features List */}
        <div className="flex flex-col gap-6">
          {features1.map((feature, index) => (
            <div key={index} className="flex items-start text-right	 space-x-4">
              <div>
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="text-gray-600 mt-2">{feature.description}</p>
              </div>
              <div className="text-yellow-500 text-3xl">{feature.icon}</div>
            </div>
          ))}
        </div>

        {/* Feature Image */}
        <div className="mt-10 p-6  lg:mt-0 lg:w-1/2 flex justify-center">
          <Image
            src={houseImage}
            alt="Feature Image"
            width={500}
            height={500}
            //   className="rounded-lg shadow-lg"
          />
        </div>

        <div className="flex flex-col gap-6">
          {features2.map((feature, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="text-yellow-500 text-3xl">{feature.icon}</div>

              <div>
                <h3 className="text-lg font-semibold">{feature.title}</h3>
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
