import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import SignUpSearchInput from "@/components/signup/signup-search";
import styled from "@emotion/styled";
import { COLORS } from "@/constants/css";

import { setLocalStorage } from "@/utils/storage";
import Header from "@/components/layout/header";

import { axiosInstanceWitToken } from "@/axios/instance";
import fetch from "node-fetch";

export async function getServerSideProps(context: any) {
  const { NEXT_PUBLIC_URL } = process.env;

  const loginKakao = `/api/kakao-login`;

  const { code: authCode } = context.query;
  console.log(authCode);

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

  console.log("TTT");
  await fetch(NEXT_PUBLIC_URL + loginAuthUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tokenResponse),
  });

  return {
    props: {
      tokenResponse,
    },
  };
}

const Kakao = (props: any) => {
  const router = useRouter();
  const { code: authCode } = router.query;

  const [token, setToken] = useState("");

  useEffect(() => {
    console.log(token);
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

              // const { data } = await axios.post(
              //   loginBackendUrl,
              //   {},
              //   {
              //     headers: {
              //       Authorization: `Bearer ${access_token}`,
              //     },
              //   }
              // );

              setToken(data.accessToken);
              setLocalStorage("token", data.accessToken);
            }
          }
        }
      };
      fetchKaokaoUserData();
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }, [authCode, router, setToken]);

  return (
    <SignUpContainer>
      <Header token={props.tokenResponse.access_token} />
      <BorderContainer />
      <SignUpTitle>가까운 지하철역을 입력해주세요. ^^</SignUpTitle>

      <SignUpSearchInput />
    </SignUpContainer>
  );
};
export default Kakao;

const SignUpTitle = styled.h1`
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  margin-bottom: 50px;
`;

const BorderContainer = styled.div`
  height: 25px;
  width: 100%;
  background-color: ${COLORS.backgroundPrimary};
  margin-top: -15px;
  border-radius: 20px 20px 0 0;
`;

const SignUpContainer = styled.div`
  width: 43rem;
  margin: 0 auto;
`;
