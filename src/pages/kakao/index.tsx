import { useRouter } from "next/router";
import React, { useEffect } from "react";
import SignUpSearchInput from "@/components/signup/signup-search";
import styled from "@emotion/styled";
import { COLORS } from "@/constants/css";
import Header from "@/components/layout/header";
// import Header from "@/components/layout/header";

const Kakao = () => {
  const router = useRouter();
  const { code: authCode } = router.query;

  // const { pathname } = router;

  // const handleBackClick=()=>{
  //   if(pathname === "/signin"){
  //     router.push(`${ROUTES.LOGIN}}`)
  //   }
  // }
  //
  // const [key, setKey] = useState(
  //   "no0GyXiyp3x5whSPxfkdEmFSHXuGPn0ResRXWMcECinI2gAAAYaXTULM"
  // );
  // const [firstData, setFirstData] = useState("");

  //

  // const [userImage, setTokenImage] = useState("");
  // const [token, setToken] = useRecoilState(tokenState);
  // const token = "";
  useEffect(() => {
    try {
      const NewTest = async () => {
        console.log(authCode);
      };
      NewTest();
    } catch (e) {
      alert(e);
    }
  }, [router]);

  // console.log(userImage);

  return (
    <SignUpContainer>
      <Header />
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
  width: 100%;
  margin: 0 auto;
`;
