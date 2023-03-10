import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import SignUpSearchInput from "@/components/signup/signup-search";
import styled from "@emotion/styled";
import { COLORS } from "@/constants/css";

import { setLocalStorage } from "@/utils/storage";
import { axiosInstanceWitToken } from "@/axios/instance";
import Header from "@/components/layout/header";

const Kakao = () => {
  const router = useRouter();
  const { code: authCode } = router.query;

  const [token, setToken] = useState("");

  useEffect(() => {
    try {
      const fetchKaokaoUserData = async () => {
        if (authCode) {
          const loginKakao = `/api/kakao-login`;

          const responseKakao = await fetch(loginKakao, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ authCode }),
          });

          const resultKakao = await responseKakao.json();

          // const { tokenResponse } = resultKakao;

          // console.log(tokenResponse);
          // const data = await axios.post(`/api/auth/login`, tokenResponse);

          // console.log(data);

          setLocalStorage(
            "logoutToken",
            resultKakao.tokenResponse.access_token
          );

          // 새로고침 임시 방편 코드
          if (window.performance) {
            if (performance.navigation.type == 1) {
              console.error("The page is reloaded");
            } else {
              const loginBackendUrl = `${process.env.NEXT_PUBLIC_API_END_POINT_ODEEGO}/api/v1/auth/user/me`;
              const { data } = await axiosInstanceWitToken.post(
                loginBackendUrl
              );
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
  }, [authCode, router]);

  return (
    <SignUpContainer>
      <Header token={token} />
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
