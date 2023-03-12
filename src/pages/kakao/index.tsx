import { useRouter } from "next/router";
import React, { useEffect } from "react";
import SignUpSearchInput from "@/components/signup/signup-search";
import styled from "@emotion/styled";
import { COLORS } from "@/constants/css";

import { setLocalStorage } from "@/utils/storage";
import Header from "@/components/layout/header";
import axios from "axios";
import Cookies from "cookies";

export async function getServerSideProps(context: any) {
  const cookies = new Cookies(context.req, context.res);
  const token = cookies.get("token");

  // const isLoggedIn = false;
  console.log(token);

  if (token) {
    // const response = await axios.get("https://api.example.com/user");
    //
    // if (response.status === 200) {
    //   isLoggedIn = true;
    // }
  }

  return {
    props: {
      token: token,
    },
  };
}

const Kakao = (props: any) => {
  const router = useRouter();
  const { code: authCode } = router.query;

  console.log(props.token);
  // const [token, setToken] = useState("");

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

          const { tokenResponse } = resultKakao;

          // 카카오 토큰 쿠키에 저장완료
          const data = await axios.post(`/api/auth/login`, tokenResponse);

          const { access_token } = JSON.parse(data.config.data);
          // 이 스토리지에 저장하는 역할을 지금 -> 쿠키에한거임
          setLocalStorage(
            "logoutToken",
            resultKakao.tokenResponse.access_token
          );

          // 새로고침 임시 방편 코드
          if (window.performance) {
            if (performance.navigation.type === 1) {
              console.error("The page is reloaded");
            } else {
              const loginBackendUrl = `${process.env.NEXT_PUBLIC_API_END_POINT_ODEEGO}/api/v1/auth/user/me`;

              // const { data } = await axiosInstanceWitToken.post(
              //   loginBackendUrl
              // );
              //
              const { data } = await axios.post(
                loginBackendUrl,
                {},
                {
                  headers: {
                    Authorization: `Bearer ${access_token}`,
                  },
                }
              );

              setToken(data.accessToken);
              // 오디고 토큰 쿠키에 저장하기
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
      <Header token={props.token} />
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
