import { COLORS } from "@/constants";
import styled from "@emotion/styled";

const LoginConfirmModal = () => {
  return (
    <>
      <TextP>로그인을 먼저해주세요</TextP>
    </>
  );
};

export default LoginConfirmModal;

const TextP = styled.p`
  font-size: 1.5rem;
  margin: 3rem 0 2.5rem 0;
  color: ${COLORS.semiBlack};
`;
