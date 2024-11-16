import VerticalImageSlider from "./imageSlider";

export default function InfoSection() {
  return (
    <div className="container flex  mx-auto bg-white  py-16  items-center justify-between">
      {/* Left Text Section */}
      <div className="space-y-6 w-1/2  ">
        <h1 className="text-5xl font-bold text-gray-800">Few words</h1>
        <p className="text-gray-600 leading-relaxed">
          Donec laoreet placerat aliquet. Phasellus volutpat ultricies
          tristique. Sed ac bibendum quam. Nunc consequat sollicitudin felis,
          quis finibus purus port. Vestibulum dapibus lorem vel ex varius, sit
          amet consequat nisi ulvin Mauris a congue lorem. Morbi eu dolor id
          erat sodales finibus. In hac hab itasplatea dictumst.
        </p>
        <p className="text-gray-600 leading-relaxed ">
          Donec tempus ut ex ac molestie. Vivamus ultrices, eros non cursus
          tempor neque finibus massa, in vehicula dolor magna nec nisl.
        </p>
      </div>

      {/* Right Image Section */}
      <VerticalImageSlider></VerticalImageSlider>
    </div>
  );
}
