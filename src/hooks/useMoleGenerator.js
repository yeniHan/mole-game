import getRandomIntInRange from "../utills/getRandomIntInRange";
import { useEffect, useState } from "react";
import useTimeout from "./useTimeout";

const useMoleGenerator = ({ setTrigger, trigger, leftSeconds }) => {
  const [appearedMoles, setAppearedMoles] = useState([]);
  const { setTimeoutRef, clearTimeoutRef } = useTimeout();

  const generateApearTime = () => getRandomIntInRange(1, 3);
  const generateMoleNum = () => getRandomIntInRange(1, 5);
  const generateAppearMoleNos = (num) => {
    const moleNos = [];
    for (let i = 0; i < num; i++) {
      let moleNo = getRandomIntInRange(1, 24);
      while (moleNos.includes(moleNo)) {
        moleNo = getRandomIntInRange(1, 24);
      }
      moleNos.push(moleNo);
    }
    setAppearedMoles(moleNos);
  };

  const stopMoleGenerator = () => clearTimeoutRef();

  useEffect(() => {
    if (trigger === 0) return;

    const appearSecs = generateApearTime();
    const inLimitTime = 0 < leftSeconds - appearSecs;

    if (inLimitTime) {
      setTimeoutRef(function () {
        const thisTimeMoleNum = generateMoleNum();
        generateAppearMoleNos(thisTimeMoleNum);
        setTrigger();
      }, appearSecs * 1000);
    }
  }, [trigger]);

  return {
    appearedMoles,
    setAppearedMoles,
    stopMoleGenerator,
  };
};

export default useMoleGenerator;
