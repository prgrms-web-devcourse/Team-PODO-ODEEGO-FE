import { useRouter } from "next/router";
import React, { useEffect } from "react";
import SignUpSearchInput from "@/components/signup/signup-search";

import { setLocalStorage } from "@/utils/storage";
import Header from "@/components/layout/header";
import Main from "@/components/layout/main";

import { axiosInstanceWitToken } from "@/axios/instance";
import fetch from "node-fetch";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { Container } from "@mui/material";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { NEXT_PUBLIC_URL } = process.env;

  const loginKakao = `/api/kakao-login`;

  const { code: authCode } = context.query;

  const responseKakao = await fetch(NEXT_PUBLIC_URL + loginKakao, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ authCode }),
  });

  const result = await responseKakao.json();

  const { tokenResponse } = result;

  const loginAuthUrl = `/api/auth/login`;

  await fetch(NEXT_PUBLIC_URL + loginAuthUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tokenResponse),
  });

  console.log(tokenResponse.access_token);

  return {
    props: {
      tokenResponse,
    },
  };
}

const Kakao = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const router = useRouter();
  const { code: authCode } = router.query;

  useEffect(() => {
    try {
      const fetchKaokaoUserData = async () => {
        if (authCode) {
          setLocalStorage("logoutToken", props.tokenResponse.access_token);

          // 새로고침 임시 방편 코드
          if (window.performance) {
            if (performance.navigation.type === 1) {
              console.error("The page is reloaded");
            } else {
              const loginBackendUrl = `${process.env.NEXT_PUBLIC_API_END_POINT_ODEEGO}/api/v1/auth/user/me`;

              const { data } = await axiosInstanceWitToken.post(
                loginBackendUrl
              );

              setLocalStorage("token", data.accessToken);
            }
          }
        }
      };
      fetchKaokaoUserData();
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }, [authCode, router]);

  return (
    <>
      <Header token={props.tokenResponse.access_token} />
      <Main text='회원정보'>
        <Container>
          <SignUpSearchInput />
        </Container>
      </Main>
    </>
  );
};
export default Kakao;
