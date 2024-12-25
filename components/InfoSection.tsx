import VerticalImageSlider from "./imageSlider";

export default function InfoSection() {
  return (
    <div className=" sm:flex   bg-white    sm:items-center sm:justify-between p-2">
      {/* Left Text Section */}
      <div className="  sm:w-1/2  ">
        <h1 className="text-4xl p-2 text-center sm:text-left  sm:text-5xl font-bold text-gray-800">
          Few words
        </h1>
        <p className="text-gray-600 p-4 sm:p-0 leading-relaxed">
          Comfort Furniture Factory is a leading supplier of custom-built
          contract furniture, specializing in solutions for the hospitality and
          leisure industries. We offer a wide range of high-quality products,
          including classic, traditional, and contemporary furniture, as well as
          fixed seating, outdoor furniture, reclaimed pieces, case goods, and
          soft furnishings. Our bespoke furniture is crafted using advanced
          joinery and upholstery techniques to meet the specific needs of each
          project, ensuring long-lasting durability and design excellence.
        </p>
      </div>

      {/* Right Image Section */}
      <VerticalImageSlider></VerticalImageSlider>
    </div>
  );
}
