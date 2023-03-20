import React from "react";
import styled from "@emotion/styled";
import Image from "next/image";
import Header from "@/components/layout/header";
import { getLocalStorage, removeLocalStorage } from "@/utils/storage";
import useModal from "../../hooks/use-modal";
import { useRouter } from "next/router";
import { ROUTES } from "@/constants";
import Main from "@/components/layout/main";
import { Button } from "@mui/material";

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
          <LoginButton
            variant='contained'
            color='kakao'
            onClick={handleKakaoLogin}
            aria-label='카카오 로그인'>
            <Image
              src='/kakao_login.svg'
              alt='카카오 로그인'
              width={20}
              height={20}
            />
            <span>카카오 로그인</span>
          </LoginButton>
        </Box>
      </Main>
    </LoginContainer>
  );
};
//
export default LoginPage;

const LoginContainer = styled.div`
  width: 100%;
  margin: 0 auto;
`;

const Box = styled.div`
  display: flex;
  height: 50%;
  flex-direction: column;
  justify-content: center;
`;

const LoginButton = styled(Button)`
  height: 4.5rem;
  width: 30rem;
  font-size: 1.5rem;
  > * {
    margin-right: auto;
  }
`;
