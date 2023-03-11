import React from "react";
import styled from "@emotion/styled";
import { COLORS } from "@/constants/css";
import Header from "@/components/layout/header";

const LoginPage = () => {
  // 임시 로그인 토큰
  // const token = "";
  return (
    <LoginContainer>
      <Header />

      <BorderContainer />
      <LoginWrapper>
        <h1>테스트</h1>
      </LoginWrapper>
    </LoginContainer>
  );
};
export default LoginPage;

const BorderContainer = styled.div`
  height: 25px;
  background-color: ${COLORS.backgroundPrimary};
  margin-top: -15px;
  border-radius: 20px 20px 0 0;
`;

const LoginContainer = styled.div`
  width: 110%;
  margin: 0 auto;
`;

const LoginWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 50vh;
  h3 {
    margin-bottom: 60px;
  }
`;
