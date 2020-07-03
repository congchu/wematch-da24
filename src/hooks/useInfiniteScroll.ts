import { useState, useEffect } from 'react';

const useInfiniteScroll = (callback: () => void) => {
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (!isFetching) return;
        callback();
    }, [isFetching]);

    function handleScroll() {
        let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight)
        let scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop)
        let clientHeight = document.documentElement.clientHeight

        if (scrollTop + clientHeight === scrollHeight) {
            setIsFetching(true);
        }
    }

    return [isFetching, setIsFetching];
};

export default useInfiniteScroll;