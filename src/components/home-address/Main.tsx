import { colors } from "@/src/constants/css";
import { ColorProps } from "@/src/types/css-props";
import styled from "@emotion/styled";
import AddressForm from "./address-form";

const MAIN_TEXT = "만날 사람 주소를 추가해주세요";

const Main = () => {
  return (
    <MainContainer colors={colors}>
      <BorderContainer colors={colors} />
      <TextP colors={colors}>{MAIN_TEXT}</TextP>
      <AddressForm />
    </MainContainer>
  );
};

export default Main;

const MainContainer = styled.main<{ colors: ColorProps }>`
  width: 100%;
  max-height: 625px;
  height: 76vh;
  background-color: ${({ colors }) => colors.greenSecondary};
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: -2px 0 4px -5px #333, 2px 0 4px -5px #333;
`;

const TextP = styled.p<{ colors: ColorProps }>`
  text-align: center;
  font-size: 12px;
  margin: 2.5rem 0 2rem 0;
  opacity: 0.7;
  color: ${({ colors }) => colors.semiBlack};
`;

const BorderContainer = styled.div<{ colors: ColorProps }>`
  height: 20px;
  width: 100%;
  background-color: ${({ colors }) => colors.greenSecondary};
  margin-top: -15px;
  border-radius: 20px 20px 0 0;
`;
