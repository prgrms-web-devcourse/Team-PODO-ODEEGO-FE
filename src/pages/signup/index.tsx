import { useRouter } from "next/navigation";

import React from "react";
import styled from "@emotion/styled";
// import Header from "@/components/home/home-header";
import SignUpSearchInput from "@/components/signup/signup-search";
import { COLORS } from "@/constants/css";

const Index = () => {
  const router = useRouter();

  console.log(router);

  // 임시 로그인 토큰
  // const token = "";
  return (
    <SignUpContainer>
      {/*<Header userImage={token} />*/}
      <BorderContainer />
      <SignUpTitle>홍길동 님의 가까운 지하철역을 입력해주세요. ^^</SignUpTitle>

      <SignUpSearchInput />
    </SignUpContainer>
  );
};
export default Index;

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
  width: 100%;
  margin: 0 auto;
`;
