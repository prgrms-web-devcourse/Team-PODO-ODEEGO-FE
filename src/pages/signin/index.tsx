import React from "react";
import styled from "@emotion/styled";
import { COLORS } from "@/constants/css";
import Image from "next/image";
import kakao_image from "public/kakao_login_medium_wide.png";
import Header from "@/components/layout/header";
import useLogin from "@/hooks/use-login";

const LoginPage = () => {
  const { handleKakaoLogin } = useLogin();
  return (
    <LoginContainer>
      <Header />
      <BorderContainer />
      <LoginWrapper>
        <Image src={kakao_image} alt={"dsa"} onClick={handleKakaoLogin} />
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
  width: 100%;
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
