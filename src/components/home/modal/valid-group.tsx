import styled from "@emotion/styled";

interface ValidGroupProps {
  remainingTime: string;
}

const ValidGroupModal = ({ remainingTime }: ValidGroupProps) => {
  return (
    <>
      <P>남은 시간: {remainingTime}</P>
    </>
  );
};

export default ValidGroupModal;

const P = styled.p`
  font-size: 1.5rem;
  margin: 3rem 0 2.5rem 0;
`;
