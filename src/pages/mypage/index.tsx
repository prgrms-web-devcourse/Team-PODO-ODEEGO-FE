import React from "react";
import styled from "@emotion/styled";
import { COLORS } from "@/constants/css";
import Header from "@/components/layout/header";
import { getLocalStorage, removeLocalStorage } from "@/utils/storage";
import { ROUTES } from "@/constants";
import useModal from "@/hooks/use-modal";
import { axiosInstanceWitToken } from "@/axios/instance";
import { useRouter } from "next/router";

const MyPage = () => {
  const { openModal } = useModal();

  const router = useRouter();

  const handleClickAccount = () => {
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

  const handleClickLogout = async () => {
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
    <MypageContainer>
      <Header />

      <BorderContainer />

      <MypageWrapper>
        <MypageContainer>
          {/*<AccountCircleIcon style={{ fontSize: 200, margin: "0 auto" }} />*/}

          <MypageDeleteAcoountButton onClick={handleClickAccount}>
            회원탈퇴
          </MypageDeleteAcoountButton>
          <MypageLogoutButton onClick={handleClickLogout}>
            로그아웃
          </MypageLogoutButton>
        </MypageContainer>
      </MypageWrapper>
    </MypageContainer>
  );
};
export default MyPage;

// const MypageNameTitle = styled.h3`
//   margin: 0 auto;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;
//
// const MypageData = styled.div`
//   background-color: #4caf50;
//   border: none;
//   color: white;
//   padding: 10px 20px;
//   text-align: center;
//   text-decoration: none;
//   display: inline-block;
//   font-size: 16px;
//   margin: 10px 2px;
//   cursor: pointer;
//   border-radius: 5px;
// `;

const MypageDeleteAcoountButton = styled.button`
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

const MypageLogoutButton = styled.button`
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

const MypageContainer = styled.div`
  width: 110%;
  margin: 0 auto;
`;

const MypageWrapper = styled.div`
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
