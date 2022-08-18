import React, { useEffect, useRef } from "react";
import { useState } from "react";
import MoleHoles from "./MoleHoles";
import useInterval from "./hooks/useInterval";
import useRenderTrigger from "./hooks/useRenderTrigger";
import useMoleGenerator from "./hooks/useMoleGenerator";

function App() {
  const prevLeftTime =
    sessionStorage.getItem("left-time") !== null
      ? Number(sessionStorage.getItem("left-time"))
      : null;
  const prevScore = Number(sessionStorage.getItem("score"));
  const [score, setScore] = useState(prevScore);
  const [isStarted, setIsStarted] = useState(false);
  const limitSeconds = 60;
  const [finalScore, setFinalScore] = useState(0);

  const [leftSeconds, setLeftSeconds] = useState(
    prevLeftTime !== null ? prevLeftTime : limitSeconds
  );
  const { trigger, setTrigger } = useRenderTrigger();
  const { setIntervalRef: setTimer, clearIntervalRef: clearTimer } =
    useInterval();
  const { appearedMoles, setAppearedMoles, stopMoleGenerator } =
    useMoleGenerator({ setTrigger, trigger, leftSeconds });

  const reset = async () => {
    clearTimer();
    stopMoleGenerator();
    setAppearedMoles([]);
    await setLeftSeconds(limitSeconds);
    setScore(0);
    sessionStorage.removeItem("left-time");
    sessionStorage.removeItem("score");
  };

  const startGame = async () => {
    if (isStarted) {
      await reset();
    }
    setIsStarted(true);
    setTimer(function () {
      setLeftSeconds((v) => v - 1);
    }, 1000);
    setTrigger();
  };

  useEffect(() => {
    if (leftSeconds === 0) {
      setIsStarted(false);
      setFinalScore(score);
      reset();
    } else if (isStarted) {
      sessionStorage.setItem("left-time", leftSeconds);
    }
  }, [leftSeconds]);

  useEffect(() => {
    if (prevLeftTime !== null) startGame();
  }, []);

  return (
    <div>
      <div>
        <div>점수: {isStarted ? score : finalScore}</div>
        <div>시간: {isStarted ? leftSeconds : 0} 초</div>
      </div>
      <MoleHoles appearedMoles={appearedMoles} setScore={setScore} />
      <button onClick={startGame}>START</button>
    </div>
  );
}

export default App;
