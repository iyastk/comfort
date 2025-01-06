import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import React from "react";

interface ImageGalleryProps {
  selectedImages: StaticImageData[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ selectedImages }) => {
  return (
    <>
      <div className="bg-slate-100 w-full mt-10 p-4">
        <div className=" grid grid-flow-row-  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {selectedImages.map((src, index) => (
            <div key={index} className="container mx-auto relative group  ">
              <Image
                src={src}
                alt={`Portfolio item ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Link href={"/contact"}>
                  <p className="text-white font-semibold text-lg">Contact Us</p>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ImageGallery;
