import styled from "@emotion/styled";

interface SetStartPointModalprops {
  startingPoint: string;
}

export const SetStartPointModalContent = ({
  startingPoint,
}: SetStartPointModalprops) => {
  return (
    <>
      <H1>{startingPoint}</H1>
      <P>출발역은 수정할 수 없습니다.</P>
    </>
  );
};

export default SetStartPointModalContent;

const H1 = styled.h1`
  font-size: 2rem;
`;

const P = styled.p`
  margin: 0 0 1rem 0;
`;
