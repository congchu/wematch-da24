import { useEffect } from "react";

const useScript = (url: string) => {
  useEffect(() => {
    const script = document.createElement("script");

    script.async = true;
    script.type = "text/javascript";
    script.text = url;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [url]);
};

export default useScript;
