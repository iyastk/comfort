import React from "react";
import Link from "next/link";
import Image from "next/image";
import Display_1 from "/public/display_1.jpg";
import Display_2 from "/public/display_2.jpg";
import chair from "/public/images/chair_3.png";

const Portfolio = () => {
  return (
    <div className="flex flex-wrap justify-between items-center w-full p-4 pl-24">
      <div className="  flex flex-col justify-center text-center items-center  md:text-left md:flex md:flex-col md:justify-center md:items-center">
        <Image
          src={chair}
          alt="Feature Image"
          width={100}
          height={100}
          //   className="rounded-lg shadow-lg"
        />
        <h2 className="text-4xl font-serif mb-4"> Modern & Innovative</h2>
        <h3>FURNITURE INTERIOR & EXTERIOR</h3>
        <p className="text-gray-600 mb-4">
          We will make your life more comfortable...
        </p>
        <Link href="/portfolio">
          <div className="inline-block px-6 py-2 mt-2 text-lg font-medium text-white bg-gray-800 rounded-full hover:bg-gray-700">
            View More
          </div>
        </Link>
      </div>
      <div className="flex  gap-3 h-80 -mb-7  ">
        <Image
          src={Display_1}
          alt="Feature Image"
          width={400}
          //   className="rounded-lg shadow-lg"
        />
        <Image
          src={Display_2}
          alt="Feature Image"
          width={400}

          //   className="rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
};

export default Portfolio;
