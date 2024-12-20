import React from "react";
import Sidebar from "@/components/sidebar";
import Image from "next/image";
import AboutHero from "../public/images/Portfolio/image-60.webp";
import AboutPhoto from "../public/images/Icon/decoration.png";

const about = () => {
  return (
    <div className="container mx-auto  flex ">
      <Sidebar></Sidebar>
      <div className="w-full bg-slate-100 relative ">
        <div className="  bg-slate-100 flex items-center justify-between  ">
          <div className="h-screen">
            <Image
              src={AboutHero}
              alt="photo of a sofa and lamb to represent about"
              objectFit="contain"
              object-position="bottom"
              className="h-4/5"
            ></Image>
            {/* <h1 className="absolute top-28 left-44 text-4xl font-semibold  p-4">
              Who We Are <span className="text-red-600">?</span>
            </h1> */}

            <div>
              <div className="flex bg-slate-100">
                <Image
                  src={AboutPhoto}
                  alt="photo of a sofa and lamb to represent about"
                  width={400}
                ></Image>
                <div className="px-10 bg-slate-100 py-5">
                  <h1 className="text-3xl  py-6">About us</h1>
                  <span className="font-bold	">
                    Comfort Furniture Factory
                  </span>{" "}
                  is a leading manufacturer and supplier of custom-built
                  contract furniture, serving the hospitality and leisure
                  industries. We specialize in crafting both contemporary and
                  traditional furniture solutions designed to meet the highest
                  standards of quality and durability.
                  <ul className="font-bold p-2	">
                    Our extensive product range includes:
                  </ul>
                  <li>Classic, traditional, and contemporary furniture</li>{" "}
                  <li>Fixed seating and outdoor furniture</li>{" "}
                  <li className="pb-2">
                    Reclaimed furniture, case goods, and soft furnishings With
                    state-of-the-art joinery and upholstery units,
                  </li>
                  we deliver bespoke solutions tailored to your project&apos;s
                  unique needs.
                  <span className="font-bold	">
                    Backed by a professional management team with over 20 years
                    of combined experience in the contract furniture sector,
                  </span>
                  we have earned the trust of leading hotel chains, interior
                  contractors, designers, and architects. Our commitment to
                  innovation, precision, and craftsmanship has positioned us as
                  a preferred supplier in the Gulf region’s contract furniture
                  market. At Comfort Furniture Factory,
                  <ul className="font-bold p-2		">we prioritize: </ul>
                  <li>Reliable construction for long-lasting performance</li>
                  <li> Timely and relevant designs to match evolving trends</li>
                  <li className="pb-2">
                    Value-driven pricing to suit your project requirements
                  </li>
                  Our products are built to withstand even the most demanding
                  environments, ensuring years of maintenance-free service. We
                  take pride in transforming spaces with furniture that blends
                  quality, durability, and design excellence. Comfort Furniture
                  Factory — your trusted partner in contract furniture
                  solutions.
                </div>
              </div>
              <div>
                {/* <h1 className="text-3xl  py-6 flex justify-center items-center ">
                  Our Team
                </h1>
                <div className="flex gap-3 p-2 h-80">
                  <TeamCard
                    name={"Shafi Muhammed"}
                    role={"Business Development Manager"}
                    email={"shafi@comfortplus.com"}
                    image={"👨🏻"}
                  ></TeamCard>
                  <TeamCard
                    name={"Najeeb"}
                    role={"Business Development Manager"}
                    email={"shafi@comfortplus.com"}
                    image={"👨🏻"}
                  ></TeamCard>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default about;
