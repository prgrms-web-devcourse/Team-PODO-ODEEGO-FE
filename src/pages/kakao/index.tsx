import React, { useEffect, useState } from "react";
import SignUpSearchInput from "@/components/signup/signup-search";
import styled from "@emotion/styled";
import { COLORS } from "@/constants/css";

import { setLocalStorage } from "@/utils/storage";
import Header from "@/components/layout/header";

import { axiosInstanceWitToken } from "@/axios/instance";
import fetch from "node-fetch";
import queryString from "query-string";
import { useRouter } from "next/router";
import { LOCAL_STORAGE } from "@/constants";

const { TOKEN, LOGOUT_TOKEN } = LOCAL_STORAGE;

const Kakao = () => {
  const [accessToken, setAccessToken] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;

    const fetchKakaoUserData = async () => {
      const { code: authCode } = router.query;

      const tokenUrl = `https://kauth.kakao.com/oauth/token?${queryString.stringify(
        {
          grant_type: "authorization_code",
          client_id: process.env.NEXT_PUBLIC_REST_API_KEY,
          redirect_uri:
            process.env.NODE_ENV === "development"
              ? `${process.env.NEXT_PUBLIC_URL}/kakao` //local
              : process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI, //deploy
          code: authCode,
        }
      )}`;
      try {
        const tokenResponse = await fetch(tokenUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }).then((res) => res.json());

        setAccessToken(tokenResponse.access_token);
        setLocalStorage(LOGOUT_TOKEN, tokenResponse.access_token);

        if (window.performance && performance.navigation.type !== 1) {
          const loginBackendUrl = `${process.env.NEXT_PUBLIC_API_END_POINT_ODEEGO}/api/v1/auth/user/me`;
          const { data } = await axiosInstanceWitToken.post(loginBackendUrl);
          setLocalStorage(TOKEN, data.accessToken);
        } else {
          console.error("The page is reloaded");
        }
      } catch (err) {
        console.error(err);
        throw new Error((err as Error).message);
      }
    };
    fetchKakaoUserData();
  }, [router]);

  return (
    <SignUpContainer>
      <Header token={accessToken} />
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
