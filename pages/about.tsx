import React from "react";
import Image from "next/image";
import AboutHero from "../public/images/Portfolio/sample-22.webp";
import AboutPhoto from "../public/images/Icon/decoration.png";
import TeamCard from "@/components/teamCard";
import useCheckScreen from "@/components/utils/checkScreen";
import Sidebar from "@/components/sidebar";

const About = () => {
  const isAboveMd = useCheckScreen();

  return (
    <div className="container mx-auto  flex bg-slate-100 text-black font-serif">
      {isAboveMd ? <Sidebar></Sidebar> : <></>}

      <div className="w-full  bg-slate-100 text-black ">
        <div className="  bg-slate-100   ">
          <div className="md:h-screen">
            <Image
              src={AboutHero}
              alt="photo of a sofa and lamb to represent about"
              objectFit="contain"
              object-position="bottom"
              className="md:h-4/5 "
            ></Image>
            {/* <h1 className="absolute top-28 left-44 text-4xl font-semibold  p-4">
              Who We Are <span className="text-red-600">?</span>
            </h1> */}
          </div>
          <div>
            <div className="flex md:-mt-32 bg-slate-100 w-full">
              <div className="flex justify-center items-center w-full ">
                <Image
                  src={AboutPhoto}
                  alt="photo of a sofa and lamb to represent about"
                  className="md:p-10 hidden md:block "
                  width={500}
                ></Image>
              </div>

              <div className="md:px-10 bg-slate-100 text-black py-5">
                <h1 className="text-3xl  py-6">About us</h1>
                <div className="text-justify p-5">
                  {" "}
                  <span className="font-bold	">
                    Comfort Furniture Factory
                  </span>{" "}
                  is a leading manufacturer and supplier of custom-built
                  contract furniture, serving the hospitality and leisure
                  industries. We specialize in crafting both contemporary and
                  traditional furniture solutions designed to meet the highest
                  standards of quality and durability.
                  <ul className="font-bold p-2	text-red-400">
                    Our extensive product range includes:
                  </ul>
                  <li className="font-bold">
                    Classic, traditional, and contemporary furniture
                  </li>{" "}
                  <li className="font-bold">
                    Fixed seating and outdoor furniture
                  </li>{" "}
                  <li className="pb-2 font-bold">
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
                  innovation, precision, and craftmdanship has positioned us as
                  a preferred supplier in the Gulf region’s contract furniture
                  market. At Comfort Furniture Factory,
                  <ul className="font-bold p-2	text-red-400	">we prioritize: </ul>
                  <li className="font-bold">
                    Reliable construction for long-lasting performance
                  </li>
                  <li className="font-bold">
                    {" "}
                    Timely and relevant designs to match evolving trends
                  </li>
                  <li className="pb-2 font-bold">
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
            </div>
            <div></div>
          </div>
        </div>
        {/* our team section */}
        <div className="bg-white text-black p-4">
          <h1 className="text-3xl  py-6 text-center p-2">Our Team</h1>
          <div className="flex flex-col md:flex-wrap gap-5 items-center justify-center">
            <TeamCard
              name={"info"}
              role={"Administrator"}
              email={"info@comfortsplus.com"}
              image={"👨🏻"}
            ></TeamCard>
            <TeamCard
              name={"Sales"}
              role={"Sales executive"}
              email={"sales@comfortsplus.com"}
              image={"👨🏻"}
            ></TeamCard>
            <TeamCard
              name={"Shafi Muhammed"}
              role={"Business Development Manager"}
              email={"shafi@comfortsplus.com"}
              image={"👨🏻"}
            ></TeamCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
