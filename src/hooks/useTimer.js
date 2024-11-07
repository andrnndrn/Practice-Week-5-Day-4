import { useCallback, useRef, useState } from "react";

const useTimer = () => {
  const [time, setTime] = useState(0);
  const intervalRef = useRef(null);

  const startTimer = useCallback(() => {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
  }, []);

  const stopTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const resetTimer = useCallback(() => {
    stopTimer();
    setTime(0);
  }, [stopTimer]);

  return { time, startTimer, stopTimer, resetTimer };
};

export default useTimer;
