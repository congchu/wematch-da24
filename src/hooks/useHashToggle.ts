import React, { useState, useEffect } from 'react'

const useHashToggle = (hash: string): [boolean, React.Dispatch<boolean>] =>  {
    const [isToggle, setIsToggle] = useState<boolean>(false);

    const toggleOpenModal = (isToggle: boolean) => {
        if (isToggle) {
            window.location.assign(hash);
        }
        // } else {
        //     window.location.replace('#');
        // }
    }

    const handleOnHashChange = () => {
        const isHashMatch = window.location.hash === hash;
        setIsToggle(isHashMatch);
    };

    useEffect(() => {
        toggleOpenModal(isToggle)
    }, [isToggle])

    useEffect(() => {
        window.addEventListener('hashchange', handleOnHashChange);
        return () => window.removeEventListener('hashchange', handleOnHashChange);
    }, []);

    return [isToggle, setIsToggle];
}

export default useHashToggle
