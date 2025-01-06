import { useState } from "react";
import Image from "next/image";
import Slider1 from "../public/images/slider/slider_1.avif";
import Slider2 from "../public/images/slider/slider_3.webp";

import Slider3 from "../public/images/slider/slider_4.avif";
import Slider4 from "../public/images/slider/slider_1.avif";

const images = [Slider1, Slider2, Slider3, Slider4];

export default function VerticalImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : images.length - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < images.length - 1 ? prevIndex + 1 : 0
    );
  };

  return (
    <div className="relative w-full max-w-md  md:m-2 overflow-hidden">
      <div className="relative h-96 overflow-hidden">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full transition-transform duration-500 ${
              index === currentIndex
                ? "transform translate-y-0"
                : "transform -translate-y-full"
            }`}
            style={{
              transform: `translateY(${(index - currentIndex) * 100}%)`,
            }}
          >
            <Image
              src={image}
              alt={`Slide ${index + 1}`}
              width={500}
              objectFit="cover"
              className="rounded-lg w-full h-full"
            />
          </div>
        ))}
      </div>

      {/* Navigation buttons */}
      <div className="absolute inset-y-0 right-1 flex flex-col justify-center space-y-2">
        <button
          onClick={handlePrev}
          className="text-gray-700 bg-orange-400 bg-opacity-75 p-1 rounded-full hover:bg-gray-100"
        >
          ↑
        </button>
        <button
          onClick={handleNext}
          className="text-gray-700 bg-green-400 bg-opacity-75 p-2 rounded-full hover:bg-gray-100"
        >
          ↓
        </button>
      </div>
    </div>
  );
}
