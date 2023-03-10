import React from "react";
import styled from "@emotion/styled";
import { COLORS } from "@/constants/css";
import Image from "next/image";
import kakao_image from "public/kakao_login_medium_wide.png";
import Header from "@/components/layout/header";
import { getLocalStorage, removeLocalStorage } from "@/utils/storage";
import useModal from "../../hooks/use-modal";
import { useRouter } from "next/router";
import { ROUTES } from "@/constants";

const LoginPage = () => {
  const { openModal } = useModal();
  const token = getLocalStorage("logoutToken");

  const router = useRouter();

  const handleKakaoLogin = () => {
    if (token) {
      openModal({
        children: "이미 로그인 되어있습니다.",
        btnText: {
          confirm: "로그아웃",
          close: "취소",
        },
        handleConfirm: async () => {
          const logoutToken = getLocalStorage("logoutToken");
          const kakaoLogoutUrl = `/api/kakao-logout`;
          await fetch(kakaoLogoutUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              logoutToken,
            }),
          });

          removeLocalStorage("token");
          removeLocalStorage("logoutToken");
          router.push(`${ROUTES.HOME}`);

          // return response;
        },
      });
    } else {
      window.Kakao.Auth.authorize({
        //개인 테스트용 리다이랙션 주소
        // redirectUri: "http://localhost:3000/kakao",
        // 배포 리다이랙션 주소 Production
        redirectUri: "https://odeego.vercel.app/kakao",
        // 배포 리다이랙션 주소 Preview
        // redirectUri:
        // "https://team-podo-odeego-fe-git-feature-signin-seung-hwan285.vercel.app/kakao",
      });
    }
  };

  // 임시 로그인 토큰
  // const token = "";
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
