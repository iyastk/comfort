import React from "react";

// components/FeatureSection.js
import Image from "next/image";
import houseImage from "/public/images/house.png";

const features1 = [
  {
    title: "Complete Upholstery Solutions",
    icon: "🛋️",
    description:
      "We offer professional upholstery services for residential, commercial, automotive, and marine needs, including reupholstering, frame repairs, and restoring furniture with high-quality materials for comfort and style.",
  },
  {
    title: "Joinery and Fit-Out Solutions",
    icon: "🛠️",
    description:
      "We specialize in custom joinery and fit-outs, crafting furniture, cabinetry, doors, and partitions. Our services cover residential, commercial, and bespoke projects, focusing on quality craftsmanship and seamless execution.",
  },
];
const features2 = [
  {
    title: "Hospitality Furnishing ",
    icon: "🏠",
    description:
      "Tailored solutions for hospitality venues, including custom furniture, upholstery, and fit-outs. We focus on comfort, durability, and aesthetic appeal to meet the unique needs of hotels, restaurants, and event spaces.",
  },

  {
    title: "Curtains and Blinds Solutions",
    icon: "🪟",
    description:
      "We provide a variety of custom curtains and blinds, including drapes, Roman blinds, Venetian blinds, and motorized options. Our solutions offer style, privacy, and light control, with expert design, fabrication, and installation.",
  },
];

const Services = () => {
  return (
    <div>
      <div className="flex items-center justify-center bg-white px-1">
        <h1 className="text-5xl 	 mt-8	">Our Services</h1>
      </div>

      <div className="flex bg-white flex-col lg:flex-row items-center lg:justify-between  mx-auto p-1">
        {/* Features List */}
        <div className="flex flex-col w-1/3 gap-6">
          {features1.map((feature, index) => (
            <div
              key={index}
              className="flex items-start text-right	 sm:text-left space-x-4"
            >
              <div>
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="text-gray-600 mt-2">{feature.description}</p>
              </div>
              <div className="text-yellow-500 text-3xl">{feature.icon}</div>
            </div>
          ))}
        </div>

        {/* Feature Image */}
        <div className="mt-10 p-6 w-1/3  lg:mt-0 lg:w-1/2 flex justify-center">
          <Image
            src={houseImage}
            alt="Feature Image"
            width={500}
            height={500}
            //   className="rounded-lg shadow-lg"
          />
        </div>

        <div className="flex flex-col w-1/3 gap-6 ">
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
