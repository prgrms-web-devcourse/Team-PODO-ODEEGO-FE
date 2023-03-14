import styled from "@emotion/styled";

export const EnterSearchPageModal = () => {
  return (
    <Wrapper>
      <Span>약속 장소를 찾기 위해 주소가 필요합니다.</Span>
      <Span>계속 하시겠습니까?</Span>
    </Wrapper>
  );
};

export default EnterSearchPageModal;

const Span = styled.span`
  margin: 0;
`;

const Wrapper = styled.p`
  margin-bottom: 1rem;
  text-align: center;
`;
