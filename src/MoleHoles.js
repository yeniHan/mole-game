import React from "react";
import styled from "styled-components";
import moleImg from "./assets/mole.jpg";
import MoleHole from "./MoleHole";

const MoleHoles = ({ appearedMoles, setScore }) => {
  const moleNumsInLine = [2, 4, 6, 6, 4, 2];
  let moleNoCount = 1;

  return (
    <div>
      {moleNumsInLine.map((num, idx) => {
        return (
          <Line key={idx}>
            {new Array(num).fill(0).map((_, idx) => {
              const thisMoleNo = moleNoCount;
              moleNoCount += 1;
              const isAppeared = appearedMoles.includes(thisMoleNo);
              return (
                <MoleHole
                  key={idx}
                  src={moleImg}
                  setScore={setScore}
                  isAppeared={isAppeared}
                  appearedMoles={appearedMoles}
                />
              );
            })}
          </Line>
        );
      })}
    </div>
  );
};

const Line = styled.div`
  display: flex;
  justify-content: center;
`;

export default MoleHoles;
