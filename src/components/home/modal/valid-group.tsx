import styled from "@emotion/styled";
import { useEffect, useState } from "react";

interface ValidGroupProps {
  minutes: number;
  seconds: number;
}

const INTERVAL_IN_MILLISECONDS = 1000; //1s

const ValidGroupModal = ({ minutes, seconds }: ValidGroupProps) => {
  const [min, setMinutes] = useState(minutes);
  const [sec, setSeconds] = useState(seconds * 1000);
  const [referenceTime, setReferenceTime] = useState(Date.now());

  useEffect(() => {
    const countDownUntilZero = () => {
      console.log(min, sec);
      setSeconds((prev) => {
        if (prev <= 0) return 0;

        const now = Date.now();
        const realInterval = now - referenceTime;
        setReferenceTime(now);

        return prev - realInterval;
      });

      if (sec === 0) {
        if (min === 0) return;

        setMinutes((prev) => {
          if (prev <= 0) return 0;
          return prev - 1;
        });
        setSeconds(60 * 1000);
      }
    };

    setTimeout(countDownUntilZero, INTERVAL_IN_MILLISECONDS);
  }, [min, sec]);

  return (
    <>
      <TextP>
        남은 시간:{" "}
        {`${min}분 ${sec === 60 * 1000 ? 59 : Math.ceil(sec / 1000)}초`}
      </TextP>
    </>
  );
};

export default ValidGroupModal;

const TextP = styled.p`
  font-size: 1.4rem;
  margin: 3rem 0 2.5rem 0;
  color: rgba(70, 70, 70, 0.8);
`;
