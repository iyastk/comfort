import React from "react";
import Link from "next/link";
import Image from "next/image";
import chair from "/public/images/chair_3.png";
const Portfolio = () => {
  return (
    <div className="flex flex-wrap justify-center items-center p-8">
      <div className="w-full md:w-1/3 p-2 flex flex-col justify-center text-center md:text-left md:flex md:flex-col md:justify-center md:items-center">
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
        <Link href="/adorn">
          <div className="inline-block px-6 py-2 mt-2 text-lg font-medium text-white bg-gray-800 rounded-full hover:bg-gray-700">
            View More
          </div>
        </Link>
      </div>
      <div className="w-full h-80 md:w-1/3  ">
        {/* Video Component */}
        <video
          src="/images/video_4.mp4" // Replace with the actual path of your video in the public folder
          autoPlay
          loop
          muted
          className=" w-full h-5/6	 object-cover"
        />

        <h3 className="p-2 ">place</h3>
        <p className="px-2">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque
        </p>
      </div>
      <div className="w-full h-80 md:w-1/3  ">
        {/* Video Component */}
        <video
          src="/images/video_5.mp4" // Replace with the actual path of your video in the public folder
          autoPlay
          loop
          muted
          className=" w-full h-5/6	 object-cover"
        />
        <h3 className="p-2 ">place</h3>
        <p className="px-2">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque
        </p>
      </div>
    </div>
  );
};

export default Portfolio;
