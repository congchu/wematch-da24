import { useState, useEffect } from "react";
import { throttle } from "lodash";

const useInfiniteScroll = (callback: () => void): [boolean, React.Dispatch<boolean>] => {
  const [isFetching, setIsFetching] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isFetching) return;
    callback();
  }, [isFetching]);

  const handleScroll = throttle(() => {
    // const scrollTop = element.scrollTop || 0
    // 일부 기기에서(아이폰) body: hidden 때문에 scrollTop이 0 으로 계산됨.
    const scrollTop = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop);
    const clientHeight = document.documentElement.clientHeight || 0;
    const scrollHeight = document.documentElement.scrollHeight || 0;

    if (scrollTop + clientHeight >= scrollHeight - 250) {
      setIsFetching(true);
    }
  }, 300);
  return [isFetching, setIsFetching];
};

export default useInfiniteScroll;
