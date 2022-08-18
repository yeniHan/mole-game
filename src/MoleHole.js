import React, { useEffect, useState, useMemo } from "react";
import styled from "styled-components";
import moleImg from "./assets/mole.jpg";

const MoleHole = ({ setScore, isAppeared, appearedMoles }) => {
  const [isCaught, setIsCaught] = useState(false);

  const onClickMole = () => {
    if (isCaught) return;

    setIsCaught(true);
    setScore((v) => {
      sessionStorage.setItem("score", v + 1);
      return v + 1;
    });
  };

  useEffect(() => {
    if (isCaught) setIsCaught(false);
  }, [appearedMoles]);

  return useMemo(
    () =>
      isAppeared && !isCaught ? (
        <Img src={moleImg} onClick={onClickMole} />
      ) : (
        <Hole />
      ),
    [isAppeared, isCaught]
  );
};

const Img = styled.img`
  width: 50px;
  height: 50px;
  min-width: 50px;
  min-height: 50px;
`;

const Hole = styled.div`
  width: 50px;
  height: 50px;
  min-width: 50px;
  min-height: 50px;
  background-color: saddlebrown;
  border: 1px solid white;
`;

export default MoleHole;
