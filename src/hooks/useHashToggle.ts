import React, { useState, useEffect, useCallback } from 'react'
import { useHistory } from 'react-router-dom'

const useHashToggle = (hash: string): [boolean, React.Dispatch<boolean>] =>  {
    const [isToggle, setIsToggle] = useState<boolean>(false);
    const history = useHistory()

    const toggleOpenModal = useCallback((isToggle: boolean) => {
        if (isToggle) {
            history.push(hash)
        }
    }, [isToggle])


    useEffect(() => {
        if (isToggle) {
            toggleOpenModal(isToggle)
        } else {
            if(history.location.hash.length > 0) {
                history.goBack();
            }
        }
    }, [isToggle])


    return [isToggle, setIsToggle];
}

export default useHashToggle
