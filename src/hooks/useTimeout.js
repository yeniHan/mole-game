import { useEffect, useRef } from "react";

const useTimeout = () => {
  const ref = useRef(null);

  const setTimeoutRef = (callback, time) => {
    ref.current = setTimeout(callback, time);
  };

  const clearTimeoutRef = () => {
    clearTimeout(ref.current);
    ref.current = null;
  };

  useEffect(() => {
    return () => clearTimeoutRef();
  }, []);

  return {
    setTimeoutRef,
    clearTimeoutRef,
  };
};

export default useTimeout;
