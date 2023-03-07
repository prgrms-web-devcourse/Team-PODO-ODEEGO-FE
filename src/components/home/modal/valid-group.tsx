import styled from "@emotion/styled";

interface ValidGroupProps {
  minutes: number;
  seconds: number;
}

const ValidGroupModal = ({ minutes, seconds }: ValidGroupProps) => {
  return (
    <>
      <P>남은 시간: {`${minutes}분 ${seconds}초`}</P>
    </>
  );
};

export default ValidGroupModal;

const P = styled.p`
  font-size: 1.4rem;
  margin: 3rem 0 2.5rem 0;
`;
