import { useRef, useEffect } from "react";

const useInterval = () => {
  const ref = useRef(null);

  const setIntervalRef = (callback, time) => {
    ref.current = setInterval(callback, time);
  };

  const clearIntervalRef = () => {
    clearInterval(ref.current);
    ref.current = null;
  };

  useEffect(() => {
    return () => clearIntervalRef();
  }, []);

  return {
    setIntervalRef,
    clearIntervalRef,
  };
};

export default useInterval;
