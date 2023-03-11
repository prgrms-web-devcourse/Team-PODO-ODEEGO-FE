import React from "react";
import styled from "@emotion/styled";
import { COLORS } from "@/constants/css";
import Header from "@/components/layout/header";
import { getLocalStorage, removeLocalStorage } from "@/utils/storage";
import { ROUTES } from "@/constants";
import useModal from "@/hooks/use-modal";
import { axiosInstanceWitToken } from "@/axios/instance";
import { useRouter } from "next/router";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const MyPage = () => {
  // 임시 로그인 토큰
  // const token = "";

  const { openModal } = useModal();

  const router = useRouter();

  const handleClick = () => {
    openModal({
      children: "회원탈퇴 하시겠습니까?.",
      btnText: {
        confirm: "회원탈퇴",
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
        const odeegoLogoutUrl = `/api/odeego-leave`;
        const response = await axiosInstanceWitToken.delete(odeegoLogoutUrl);

        console.log(response);
        removeLocalStorage("token");
        removeLocalStorage("logoutToken");
        router.push(`${ROUTES.HOME}`);

        return response;
      },
    });
  };

  const handleLogout = async () => {
    const logoutToken = getLocalStorage("logoutToken");
    try {
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
    } catch (err) {
      throw new Error((err as Error).message);
    }
  };

  return (
    <LoginContainer>
      <Header />

      <BorderContainer />

      <LoginWrapper>
        <h3>홍길동 님 안녕하세요 ^^!</h3>

        <MypageContainer>
          <AccountCircleIcon style={{ fontSize: 200, margin: "0 auto" }} />

          <MyapgeShutDown onClick={handleLogout}>로그아웃</MyapgeShutDown>
          <MypageLogout onClick={handleClick}>회원탈퇴</MypageLogout>
        </MypageContainer>
      </LoginWrapper>
    </LoginContainer>
  );
};
export default MyPage;

const MypageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const MyapgeShutDown = styled.button`
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 10px 2px;
  cursor: pointer;
  border-radius: 5px;
`;

const MypageLogout = styled.button`
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 10px 2px;
  cursor: pointer;
  border-radius: 5px;
`;

const BorderContainer = styled.div`
  height: 25px;
  background-color: ${COLORS.backgroundPrimary};
  margin-top: -15px;
  border-radius: 20px 20px 0 0;
`;

const LoginContainer = styled.div`
  width: 110%;
  margin: 0 auto;
`;

const LoginWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 60vh;
  h3 {
    margin-bottom: 60px;
  }
`;
