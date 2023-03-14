import { COLORS } from "@/constants/css";
import styled from "@emotion/styled";
import { ReactNode } from "react";

interface MainProps {
  children: ReactNode;
  text: string;
}

const Main = ({ children, text }: MainProps) => {
  return (
    <MainContainer>
      <BorderContainer />
      <TextP>{text}</TextP>
      {children}
    </MainContainer>
  );
};

export default Main;

const MainContainer = styled.main`
  width: 100%;
  max-height: 625px;
  height: 76vh;
  position: relative;
  background-color: ${COLORS.backgroundPrimary};
  display: flex;
  flex-direction: column;
  align-items: center;
  user-select: none;
  padding: 0 1.2rem;
  box-sizing: border-box;
`;

const TextP = styled.p`
  text-align: center;
  font-size: 1.2rem;
  margin-bottom: 3.3rem;
  opacity: 0.7;
  color: ${COLORS.semiBlack};
`;

const BorderContainer = styled.div`
  position: absolute;
  left: 0;
  top: -15px;
  height: 25px;
  width: 100%;
  background-color: ${COLORS.backgroundPrimary};
  border-radius: 20px 20px 0 0;
`;
