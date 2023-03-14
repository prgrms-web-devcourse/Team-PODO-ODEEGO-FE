import React from "react";
import styled from "@emotion/styled";
import { COLORS } from "@/constants/css";
import Header from "@/components/layout/header";
import useMypage from "@/hooks/use-mypage";

const MyPage = () => {
  const { handleClickAccount, handleClickLogout } = useMypage();

  return (
    <MypageContainer>
      <Header />

      <BorderContainer />

      <MypageWrapper>
        {/*<AccountCircleIcon style={{ fontSize: 200, margin: "0 auto" }} />*/}

        <MypageDeleteAcoountButton onClick={handleClickAccount}>
          회원탈퇴
        </MypageDeleteAcoountButton>
        <MypageLogoutButton onClick={handleClickLogout}>
          로그아웃
        </MypageLogoutButton>
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
  width: 100%;
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
