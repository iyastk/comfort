import { useState } from "react";
import houseImage from "/public/images/house.png";
import Image from "next/image";

export default function RotatableImage() {
  const [isDragging, setIsDragging] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [startX, setStartX] = useState(0);

  // Handle mouse and touch start events
  const handleStart = (x: number) => {
    setIsDragging(true);
    setStartX(x); // Record the initial position
  };

  // Handle mouse and touch move events
  const handleMove = (x: number) => {
    if (!isDragging) return;

    const deltaX = x - startX; // Calculate the change in X position
    setRotation((prevRotation) => prevRotation + deltaX / 5); // Adjust sensitivity
    setStartX(x); // Update the starting position for the next movement
  };

  const handleEnd = () => {
    setIsDragging(false);
  };

  return (
    <div
      className="relative flex justify-center items-center sm:h-screen"
      onMouseMove={(e) => handleMove(e.clientX)}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchMove={(e) => handleMove(e.touches[0].clientX)}
      onTouchEnd={handleEnd}
    >
      <Image
        src={houseImage}
        alt="Rotatable"
        className="object-cover"
        width={500}
        draggable={false}
        style={{
          transform: `rotate(${rotation}deg)`,
          transition: isDragging ? "none" : "transform 0.2s ease-out",
          cursor: isDragging ? "grabbing" : "grab",
        }}
        onMouseDown={(e) => handleStart(e.clientX)}
        onTouchStart={(e) => handleStart(e.touches[0].clientX)}
      />
    </div>
  );
}
