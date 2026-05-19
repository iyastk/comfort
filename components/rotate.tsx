import { useState } from "react";
import houseImage from "/public/images/house.png";
import Image from "next/image";

export default function RotatableImage() {
  const [isDragging, setIsDragging] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [startX, setStartX] = useState(0);

  const handleStart = (x: number) => {
    setIsDragging(true);
    setStartX(x);
  };

  const handleMove = (x: number) => {
    if (!isDragging) return;
    const deltaX = x - startX;
    setRotation((prevRotation: number) => prevRotation + deltaX / 5);
    setStartX(x);
  };

  const handleEnd = () => {
    setIsDragging(false);
  };

  return (
    <div
      className="relative w-full max-w-2xl mx-auto flex flex-col justify-center items-center py-20"
      onMouseMove={(e: React.MouseEvent) => handleMove(e.clientX)}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchMove={(e: React.TouchEvent) => handleMove(e.touches[0].clientX)}
      onTouchEnd={handleEnd}
    >
      {/* Premium Floor Shadow */}
      <div 
        className="absolute bottom-16 w-3/4 h-12 bg-black/20 blur-3xl rounded-full transition-transform duration-300"
        style={{ transform: `scaleX(${1 + Math.sin(rotation * Math.PI / 180) * 0.1})` }}
      />
      
      <div className="relative group transition-all duration-500 transform hover:scale-110">
        <Image
          src={houseImage}
          alt="Rotatable Showroom Item"
          width={600}
          height={600}
          draggable={false}
          className="object-contain drop-shadow-2xl select-none"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: isDragging ? "none" : "transform 0.4s cubic-bezier(0.2, 0, 0, 1)",
            cursor: isDragging ? "grabbing" : "grab",
          }}
          onMouseDown={(e: React.MouseEvent) => handleStart(e.clientX)}
          onTouchStart={(e: React.TouchEvent) => handleStart(e.touches[0].clientX)}
        />
        
        {/* Interaction Indicator */}
        <div className={`absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-[10px] font-bold tracking-[0.3em] uppercase text-primary transition-opacity duration-300 ${isDragging ? 'opacity-0' : 'opacity-40'}`}>
          <span className="w-8 h-px bg-primary/30" />
          INTERACT
          <span className="w-8 h-px bg-primary/30" />
        </div>
      </div>
    </div>
  );
}
