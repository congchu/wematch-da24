import React, { useState, useEffect } from "react";

const useScrollDirection = (): [boolean, React.Dispatch<boolean>] => {
  const [isFixed, setIsFixed] = useState<boolean>(false);
  let lastScrollTop = 0;

  const handleScroll = () => {
    const st = window.pageYOffset || document.documentElement.scrollTop;

    if (st > lastScrollTop) {
      // scroll down
      setIsFixed(false);
    } else {
      // scroll up
      setIsFixed(true);
    }

    lastScrollTop = st <= 0 ? 0 : st;

    if (st <= 0) {
      setIsFixed(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return [isFixed, setIsFixed];
};

export default useScrollDirection;
