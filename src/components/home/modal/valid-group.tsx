import styled from "@emotion/styled";
import { useEffect, useState } from "react";

interface ValidGroupProps {
  minutes: number;
  seconds: number;
}

const ValidGroupModal = ({ minutes, seconds }: ValidGroupProps) => {
  const [min, setMinutes] = useState(minutes);
  const [sec, setSeconds] = useState(seconds);

  useEffect(() => {
    const i = setInterval(() => {
      if (sec > 0) {
        setSeconds(sec - 1);
      }
      if (sec === 0) {
        if (min === 0) {
          clearInterval(i);
        } else {
          setMinutes(min - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => clearInterval(i);
  }, [min, sec]);

  return (
    <>
      <TextP>남은 시간: {`${min}분 ${sec}초`}</TextP>
    </>
  );
};

export default ValidGroupModal;

const TextP = styled.p`
  font-size: 1.4rem;
  margin: 3rem 0 2.5rem 0;
  color: rgba(70, 70, 70, 0.8);
`;
