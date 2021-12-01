import React, { useState, useEffect } from "react";

export default function useUserAgent() {
  const [isIE, setIsIE] = useState(false);

  useEffect(() => {
    if (/MSIE \d|Trident.*rv:/.test(navigator.userAgent)) {
      setIsIE(true);
    }
  }, [navigator.userAgent]);

  return { isIE };
}
