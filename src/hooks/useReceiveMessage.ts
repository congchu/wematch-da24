import React, { useEffect, useState } from 'react'
import { checkApp, checkIos } from 'lib/checkDevice'

export default function useReceiveMessage() {
    const [message, setMessage] = useState('')

    const handleMessage = (event: MessageEvent) => {
        try {
            const deviceInfo = JSON.parse(event.data)
            if (deviceInfo.type === 'DEVICE_ID') {
                setMessage(deviceInfo.data)
            }
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        // ios에서는 window로 가져와야하고 android에서는 document로 가져와야함.
        if (checkApp()) {
            if (checkIos()) {
                window.addEventListener('message', handleMessage, false)
                return () => {
                    window.removeEventListener('message', handleMessage)
                }
            } else {
                // @ts-ignore
                document.addEventListener('message', handleMessage, false)
                return () => {
                    window.removeEventListener('message', handleMessage)
                }
            }
        }
    }, [])

    return message
}
