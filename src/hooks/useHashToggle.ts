import React, { useState, useEffect, useCallback } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

const useHashToggle = (hash: string): [boolean, React.Dispatch<boolean>] =>  {
    const [isToggle, setIsToggle] = useState<boolean>(false);
    const history = useHistory()
    const location = useLocation();

    const toggleOpenModal = useCallback((isToggle: boolean) => {
        if (isToggle) {
            history.push(hash)
        } else {
            if(location.hash) {
                history.goBack();
            }
        }
    }, [isToggle])

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
