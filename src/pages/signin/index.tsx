import React, { useEffect } from "react";
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

  useEffect(() => {
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
    }
  }, [token, openModal, router]);

  return (
    <LoginContainer>
      <Header />
      <Main text='로그인'>
        <Box>
          <a
            href={`https://kauth.kakao.com/oauth/authorize?client_id=${
              process.env.NEXT_PUBLIC_REST_API_KEY
            }&redirect_uri=${
              process.env.NODE_ENV === "development"
                ? `${process.env.NEXT_PUBLIC_URL}/kakao` //local
                : process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI //deploy
            }&response_type=code`}>
            <LoginButton
              variant='contained'
              color='kakao'
              aria-label='카카오 로그인'
              type='button'>
              <Image
                src='/kakao_login.svg'
                alt='카카오 로그인'
                width={20}
                height={20}
              />
              <span>카카오 로그인</span>
            </LoginButton>
          </a>
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
  flex-direction: column;
  justify-content: center;
  > a {
    text-decoration: none;
  }
`;

const LoginButton = styled(Button)`
  height: 4.5rem;
  width: 30rem;
  font-size: 1.5rem;
  > * {
    margin-right: auto;
  }
`;
