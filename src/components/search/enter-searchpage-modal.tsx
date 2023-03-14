import styled from "@emotion/styled";

export const EnterSearchPageModal = () => {
  return (
    <>
      {/* 닉네임을 받아올 수 있는가? */}
      <H1>000님이 주소를 요청했습니다.</H1>
      <Wrapper>
        <Span>약속 장소를 찾기 위해 주소가 필요합니다.</Span>
        <Span>계속 하시겠습니까?</Span>
      </Wrapper>
    </>
  );
};

export default EnterSearchPageModal;

const H1 = styled.h1`
  font-size: 2rem;
`;

const Span = styled.span`
  margin: 0;
`;

const Wrapper = styled.p`
  margin-bottom: 1rem;
  text-align: center;
`;
