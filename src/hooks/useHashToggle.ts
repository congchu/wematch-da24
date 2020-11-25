import React, { useState, useEffect, useCallback } from 'react'
import { useHistory } from 'react-router-dom'

const useHashToggle = (hash: string): [boolean, React.Dispatch<boolean>] =>  {
    const [isToggle, setIsToggle] = useState<boolean>(false);
    const history = useHistory()

    const toggleOpenModal = useCallback((isToggle: boolean) => {
        if (isToggle) {
            history.push(hash)
        } else {
            window.history.replaceState(null, '', ' ')
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
