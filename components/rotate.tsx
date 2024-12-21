import { useState } from "react";
import houseImage from "/public/images/house.png";
import Image from "next/image";
export default function RotatableImage() {
  const [isDragging, setIsDragging] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [startX, setStartX] = useState(0);

  const handleMouseDown = (e: React.MouseEvent<HTMLImageElement>) => {
    setIsDragging(true);
    setStartX(e.clientX); // Record the initial mouse position
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLImageElement>) => {
    if (!isDragging) return;

    const deltaX = e.clientX - startX; // Calculate the change in X position
    setRotation((prevRotation) => prevRotation + deltaX / 5); // Adjust sensitivity
    setStartX(e.clientX); // Update the starting position for the next movement
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      className="relative flex justify-center items-center h-screen "
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp} // Stop dragging if the mouse leaves the container
    >
      <Image
        src={houseImage} // Replace with your image path
        alt="Rotatable"
        className=" object-cover  "
        width={500}
        draggable={false}
        style={{
          transform: `rotate(${rotation}deg)`,
          transition: isDragging ? "none" : "transform 0.2s ease-out",
          cursor: isDragging ? "grabbing" : "grab",
        }}
        onMouseDown={handleMouseDown}
      />
    </div>
  );
}
