import React, { useCallback, useEffect, useRef, useState } from 'react';


const useTimer = (time: number) => {

    const [counter, setCounter] = useState(time);
    const [toggle, setToggle] = useState(false);
    const timerRef = useRef<any>();

    useEffect(() => {
        const timer = () => {
          return setInterval(() => {
            setCounter(counter - 1);
          }, 1000);
        };
    
        if (counter > 0 && toggle) {
          timerRef.current = timer();
        }
    
        return () => clearInterval(timerRef.current);
      }, [counter, toggle]);

      const handleCounterStart = useCallback(() => {
        setCounter(time)
        setToggle(true)
      }, [time])

      const handleCounterStop = useCallback(() => {
          setToggle(false);
      }, [])

      return {counter, timerToggle: toggle, handleCounterStart, handleCounterStop}
}

export default useTimer;