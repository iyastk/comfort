import { useEffect, useState } from "react";

const useCheckScreen = () => {
  const [isAboveSm, setIsAboveSm] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsAboveSm(window.innerWidth >= 640); // `sm` breakpoint is 640px
    };

    handleResize(); // Check on initial render
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isAboveSm;
};

export default useCheckScreen;
