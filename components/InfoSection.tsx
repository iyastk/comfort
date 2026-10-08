import VerticalImageSlider from "./imageSlider";
import { useServiceContext } from "@/store/serviceContext";
import Link from "next/link";

const highlights = [
  { value: "20+", label: "Years of Experience" },
  { value: "100%", label: "Bespoke Manufacturing" },
  { value: "GCC", label: "Region Wide Delivery" },
];

export default function InfoSection() {
  const { isDarkMode } = useServiceContext();

  return (
    <section
      aria-label="About Comfort Furniture Factory"
      className={`transition-colors duration-500 ${isDarkMode ? "bg-[#0f0d0c]" : "bg-white"}`}
    >
      <div className="max-w-7xl mx-auto px-6 py-20 md:py-28">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-16 md:gap-20">
          {/* Left Text Section */}
          <div className="md:w-1/2 space-y-8">
            {/* Label */}
            <p className="text-primary font-bold text-xs uppercase tracking-[0.3em]">About the Factory</p>

            <h2 className={`text-4xl md:text-5xl font-serif font-bold leading-tight transition-colors duration-500 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              Few words <span className="text-primary italic">about us</span>
            </h2>

            <div className={`w-16 h-1 bg-primary rounded-full`} />

            <p className={`text-base md:text-lg leading-relaxed transition-colors duration-500 ${isDarkMode ? "text-white/60" : "text-gray-600"}`}>
              Comfort Furniture Factory is a leading supplier of custom-built contract furniture, specializing in solutions for the hospitality and leisure industries. We offer a wide range of high-quality products, including classic, traditional, and contemporary furniture, as well as fixed seating, outdoor furniture, reclaimed pieces, case goods, and soft furnishings.
            </p>

            <p className={`text-base leading-relaxed transition-colors duration-500 ${isDarkMode ? "text-white/50" : "text-gray-500"}`}>
              Our bespoke furniture is crafted using advanced joinery and upholstery techniques to meet the specific needs of each project, ensuring long-lasting durability and design excellence.
            </p>

            {/* Stats Strip */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              {highlights.map((h, i) => (
                <div key={i} className={`text-center p-4 rounded-2xl border transition-all duration-500 ${isDarkMode ? "bg-white/5 border-white/10" : "bg-black/[0.03] border-black/5"}`}>
                  <p className="text-2xl md:text-3xl font-serif font-bold text-primary">{h.value}</p>
                  <p className={`text-[10px] font-bold uppercase tracking-widest mt-1 transition-colors ${isDarkMode ? "text-white/40" : "text-black/50"}`}>{h.label}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link
                href="/about"
                className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-primary/80 transition-all duration-300 hover:scale-105 shadow-xl active:scale-95"
              >
                Learn More About Us
              </Link>
              <Link
                href="/portfolio"
                className={`inline-flex items-center justify-center px-8 py-4 rounded-2xl font-bold uppercase tracking-widest text-xs border transition-all duration-300 hover:scale-105 active:scale-95 ${isDarkMode ? "border-white/20 text-white hover:bg-white/10" : "border-black/20 text-black hover:bg-black/5"}`}
              >
                View Our Works
              </Link>
            </div>
          </div>

          {/* Right Image Section */}
          <div className="md:w-1/2 w-full">
            <VerticalImageSlider />
          </div>
        </div>
      </div>
    </section>
  );
}
