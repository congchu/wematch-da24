import { useState, useEffect } from 'react';

const useInfiniteScroll = (callback: () => void): [boolean, React.Dispatch<boolean>] => {
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
        if (document.documentElement.scrollTop !== 0 && document.documentElement.scrollTop + document.documentElement.clientHeight === document.documentElement.scrollHeight) {
            setIsFetching(true)
        }
    }
    return [isFetching, setIsFetching];
};

export default useInfiniteScroll;

