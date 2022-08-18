import { useState } from "react";

const useRenderTrigger = () => {
  const [t, setT] = useState(0);

  const setTrigger = () => {
    setT((v) => v + 1);
  };

  return {
    trigger: t,
    setTrigger,
  };
};

export default useRenderTrigger;
