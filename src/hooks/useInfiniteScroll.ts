import { useState, useEffect } from 'react';

const useInfiniteScroll = (callback: () => void) => {
    const [isFetching, setIsFetching] = useState<boolean>(false);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (!isFetching) return;
        callback();
    }, [isFetching]);

    function handleScroll() {
        if (window.innerHeight + document.documentElement.scrollTop <= document.documentElement.offsetHeight - 300 || isFetching) return;
        setIsFetching(true);
    }
    return [isFetching, setIsFetching];
};

export default useInfiniteScroll;
