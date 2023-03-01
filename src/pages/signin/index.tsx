import { useRouter } from "next/navigation";

import React from "react";
import styled from "@emotion/styled";
// import Header from "@/components/home/home-header";
import { COLORS } from "@/constants/css";
import Image from "next/image";

import kakao_image from "public/kakao_login_medium_wide.png";
import Header from "@/components/layout/header";

const LoginPage = () => {
  const router = useRouter();
  function kakaoLogin() {
    window.Kakao.Auth.authorize({
      redirectUri: "https://team-podo-odeego-fe-sigma.vercel.app/kakao",
    });
  }
  console.log(router);
  // 임시 로그인 토큰
  // const token = "";
  return (
    <LoginContainer>
      <Header />

      <BorderContainer />

      <LoginWrapper>
        <h3>로그인</h3>
        <Image src={kakao_image} alt={"dsa"} onClick={kakaoLogin} />
      </LoginWrapper>
    </LoginContainer>
  );
};
export default LoginPage;

const BorderContainer = styled.div`
  height: 25px;
  width: 100%;
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
  height: 30vh;
  h3 {
    margin-bottom: 60px;
  }
`;
