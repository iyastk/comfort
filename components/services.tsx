import React from "react";
import Image from "next/image";
import { HiOutlineUserGroup, HiOutlineHome, HiOutlineCog, HiOutlineTable } from "react-icons/hi";
import houseImage from "/public/images/house.png";

const features = [
  {
    title: "Complete Upholstery Solutions",
    icon: <HiOutlineCog className="w-8 h-8" />,
    description: "Professional upholstery for residential, commercial, automotive, and marine. Reupholstering, frame repairs, and high-quality restorations.",
  },
  {
    title: "Joinery and Fit-Out Solutions",
    icon: <HiOutlineTable className="w-8 h-8" />,
    description: "Custom joinery, cabinetry, doors, and partitions for residential and commercial projects with seamless execution.",
  },
  {
    title: "Hospitality Furnishing",
    icon: <HiOutlineUserGroup className="w-8 h-8" />,
    description: "Tailored solutions for hotels and restaurants. Focus on comfort, durability, and aesthetic appeal for all event spaces.",
  },
  {
    title: "Majlis Designs",
    icon: <HiOutlineHome className="w-8 h-8" />,
    description: "Creating welcoming Majlis spaces with custom seating and luxurious fabrics, blending tradition with modern sophistication.",
  },
];

const Services = () => {
  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-serif mb-4">Our Services</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          {/* Left Column Features */}
          <div className="space-y-12 order-2 lg:order-1">
            {features.slice(0, 2).map((feature, index) => (
              <div key={index} className="group flex gap-6 animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 transform group-hover:rotate-12 cursor-default">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold mb-3 group-hover:text-primary transition-colors">{feature.title}</h3>
                  <p className="text-foreground/60 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Center Image */}
          <div className="relative order-1 lg:order-2 flex justify-center animate-fade-in">
            <div className="relative w-full max-w-md aspect-square bg-primary/5 rounded-full flex items-center justify-center p-8">
              <Image
                src={houseImage}
                alt="Comfort Services"
                width={500}
                height={500}
                className="object-contain relative z-10 hover:scale-105 transition-transform duration-500"
              />
              {/* Decorative rings */}
              <div className="absolute inset-4 border border-primary/10 rounded-full animate-spin-slow" />
              <div className="absolute inset-8 border border-accent/10 rounded-full animate-spin-slow-reverse" />
            </div>
          </div>

          {/* Right Column Features */}
          <div className="space-y-12 order-3">
            {features.slice(2).map((feature, index) => (
              <div key={index} className="group flex gap-6 animate-slide-up" style={{ animationDelay: `${(index + 2) * 100}ms` }}>
                <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300 transform group-hover:-rotate-12 cursor-default">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold mb-3 group-hover:text-accent transition-colors">{feature.title}</h3>
                  <p className="text-foreground/60 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
