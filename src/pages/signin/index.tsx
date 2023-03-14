import React from "react";
import styled from "@emotion/styled";
import Image from "next/image";
import kakao_image from "public/kakao_login_medium_wide.png";
import Header from "@/components/layout/header";
import { getLocalStorage, removeLocalStorage } from "@/utils/storage";
import useModal from "../../hooks/use-modal";
import { useRouter } from "next/router";
import { ROUTES } from "@/constants";
import Main from "@/components/layout/main";

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

  // test
  return (
    <LoginContainer>
      <Header />
      <Main text='로그인'>
        <Box>
          <LoginButton onClick={handleKakaoLogin} aria-label='카카오 로그인'>
            <Image src={kakao_image} alt={"dsa"} />
          </LoginButton>
        </Box>
      </Main>
    </LoginContainer>
  );
};
export default LoginPage;

const LoginContainer = styled.div`
  width: 100%;
  margin: 0 auto;
`;

const Box = styled.div`
  display: flex;
  height: 50%;
`;

const LoginButton = styled.button`
  align-self: center;
  display: flex;
  cursor: pointer;
  border-radius: 0.6rem;
  overflow: hidden;
  box-shadow: 2px 2px 5px -1px rgb(28 27 30 / 23%);
  transition: all 0.2s;

  &:hover,
  &:focus {
    box-shadow: 2px 2px 6px -1px rgb(28 27 30 / 38%);
  }
`;
