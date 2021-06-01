import {useState, useEffect} from 'react';
import {throttle} from 'lodash';

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

    const handleScroll = throttle(() => {
        const element = document.scrollingElement || document.documentElement

        const scrollTop = element.scrollTop || 0
        const clientHeight = document.documentElement.clientHeight || 0
        const scrollHeight = document.documentElement.scrollHeight || 0

        if ((scrollTop + clientHeight) >= (scrollHeight - 10)) {
            setIsFetching(true)
        }
    }, 500)
    return [isFetching, setIsFetching];
};

export default useInfiniteScroll;

