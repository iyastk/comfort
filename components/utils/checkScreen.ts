import { useEffect, useState } from "react";

const useCheckScreen = () => {
  const [isAboveMd, setIsAboveMd] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsAboveMd(window.innerWidth >= 768); // `Md` breakpoint is 640px
    };

    handleResize(); // Check on initial render
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isAboveMd;
};

export default useCheckScreen;
