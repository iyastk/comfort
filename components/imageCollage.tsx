import Image from "next/image";
import React from "react";
import gallary_1 from "/public/images/gallary/gallary_1.webp";
import gallary_2 from "/public/images/gallary/gallary_2.jpeg";
import gallary_3 from "/public/images/gallary/gallary_3.jpg";
import gallary_4 from "/public/images/gallary/gallary_4.jpg";
import gallary_5 from "/public/images/gallary/gallary_5.jpg";
import gallary_6 from "/public/images/gallary/gallary_6.jpg";
import gallary_7 from "/public/images/gallary/gallary_7.jpg";
import gallary_8 from "/public/images/gallary/gallary_8.jpg";
import gallary_9 from "/public/images/gallary/gallary_9.jpg";
import gallary_10 from "/public/images/gallary/gallary_10.jpg";
import gallary_11 from "/public/images/gallary/gallary_11.jpg";
import gallary_12 from "/public/images/gallary/gallary_12.jpg";
import gallary_13 from "/public/images/gallary/gallary_13.jpg";

import image_1 from "/public/images/image_2.jpg";
import { useServiceContext } from "@/store/serviceContext";

const ImageCollage = () => {
  const { selectedImages } = useServiceContext();
  console.log(selectedImages);
  return (
    <div className="grid grid-cols-8 grid-rows-[5vw] col-span-full gap-3 p-4 ">
      <div className="col-span-2 row-span-2">
        <Image
          src={gallary_1}
          alt="Image 1"
          className="object-cover w-full h-full "
        />
      </div>
      <div className="col-span-3 row-span-3">
        <Image
          src={gallary_2}
          alt="Image 2"
          className="object-cover w-full h-full "
        />
      </div>
      <div className="col-start-6 col-span-1 row-span-1">
        <Image
          src={gallary_3}
          alt="Image 3"
          className="object-cover w-full h-full "
        />
      </div>
      <div className="col-start-7 col-span-2 row-span-2">
        <Image
          src={gallary_4}
          alt="Image 4"
          className="object-cover w-full h-full "
        />
      </div>
      <div className="row-start-3 row-span-2 col-span-2">
        <Image
          src={gallary_5}
          alt="Image 5"
          className="object-cover w-full h-full "
        />
      </div>
      <div className="row-start-4 row-span-3 col-start-3 col-span-2">
        <Image
          src={gallary_6}
          alt="Image 5"
          className="object-cover w-full h-full "
        />
      </div>
      <div className="row-start-4 row-span-1 col-start-5 col-span-1">
        <Image
          src={gallary_7}
          alt="Image 5"
          className="object-cover w-full h-full "
        />
      </div>
      <div className="row-start-3 row-span-2 col-start-6 col-span-2">
        <Image
          src={gallary_8}
          alt="Image 5"
          className="object-cover w-full h-full "
        />
      </div>
      <div className="row-start-3 row-span-1 col-start-8">
        <Image
          src={gallary_9}
          alt="Image 5"
          className="object-cover w-full h-full "
        />
      </div>
      <div className="row-start-4 row-span-1 col-start-8">
        <Image
          src={gallary_10}
          alt="Image 5"
          className="object-cover w-full h-full "
        />
      </div>
      <div className="row-start-5 row-span-2 col-span-2 ">
        <Image
          src={gallary_11}
          alt="Image 5"
          className="object-cover w-full h-full "
        />
      </div>
      <div className="row-start-5 row-span-2 col-span-2 ">
        <Image
          src={gallary_12}
          alt="Image 5"
          className="object-cover w-full h-full "
        />
      </div>
      <div className="row-start-5 row-span-2 col-span-2 ">
        <Image
          src={gallary_13}
          alt="Image 5"
          className="object-cover w-full h-full "
        />
      </div>

      <div className="">
        <Image
          src={image_1}
          alt="Image 6"
          className="object-cover w-full h-full "
        />
      </div>
    </div>
  );
};

export default ImageCollage;
