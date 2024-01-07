import { useEffect, useRef, useState } from 'react';
import useLocalStorage from './useLocalStorage';

export default function useGeneralTimer() {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [record, setRecord] = useState({ minutes, seconds });

  const { setLocalStorage } = useLocalStorage();
  useEffect(() => {
    setRecord({ minutes, seconds });
    setLocalStorage('record', record);
  }, [minutes, seconds]);

  const interval = useRef();
  useEffect(() => {
    (interval.current = setInterval(() => {
      setSeconds(seconds + 1);
      if (seconds === 59) {
        setMinutes(minutes + 1);
        setSeconds(0);
      }
    }, 1000)),
      [minutes, seconds];

    return () => clearInterval(interval.current);
  }, [minutes, seconds]);

  return { minutes, seconds };
}
