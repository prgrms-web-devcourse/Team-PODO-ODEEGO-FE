import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import SignUpSearchInput from "@/components/signup/signup-search";
import styled from "@emotion/styled";
import { COLORS } from "@/constants/css";
import Header from "@/components/layout/header";
// import Header from "@/components/layout/header";

const Kakao = () => {
  const router = useRouter();
  const { code: authCode } = router.query;
  //
  // const [key, setKey] = useState(
  //   "no0GyXiyp3x5whSPxfkdEmFSHXuGPn0ResRXWMcECinI2gAAAYaXTULM"
  // );
  // const [firstData, setFirstData] = useState("");

  const [userImage, setTokenImage] = useState("");
  const [token, setToken] = useState("");
  // const token = "";
  useEffect(() => {
    try {
      const NewTest = async () => {
        if (authCode) {
          const res2 = await fetch(
            // 배포 서버
            `http://52.78.224.123:8080/api/v1/auth/login/oauth2/callback/kakao?code=${authCode}`
            // 개인서버
            // `http://15.165.99.21:8080/api/v1/auth/login/oauth2/callback/kakao?code=${authCode}`
          );
          const data = await res2.json();

          console.log(data);

          const res = await fetch(
            // 배포 서버
            `http://52.78.224.123:8080/api/v1/auth/user/me`,
            // 개인 서버
            // `http://15.165.99.21:8080/api/v1/auth/user/me`,
            {
              headers: {
                Authorization: `Bearer ${data.access_token}`,
              },
              method: "POST",
            }
          );

          const data3 = await res.json();
          console.log(data3);

          // 여기서 잘라서 보내기

          const sliceImage = data3.profileImageUrl.slice(
            21,
            data3.accessToken.length
          );
          setToken(data3.accessToken);
          setTokenImage(sliceImage);
        }

        // axios
        //   .post(`http://15.165.99.21:8080/api/v1/auth/user/me`, {
        //     data: JSON.stringify({
        //       accessToken: `Bearer ${key}`,
        //     }),
        //   })
        //
        //   .then((res) => console.log(res))
        //   .catch((err) => console.log(err));

        // if (authCode) {
        //   axios
        //     .get(
        //       `http://15.165.99.21:8080/api/v1/auth/login/oauth2/callback/kakao?code=${authCode}`
        //     )
        //     .then((response) => {
        //       //  success
        //       console.log(response.data.access_token);
        //       return axios.post(`http://15.165.99.21:8080/api/v1/auth/user/me`, {
        //         headers: {
        //           Authorization: `Bearer ${response.data.access_token}`,
        //         },
        //       });
        //     })
        //     .then((response) => {
        //       // Handle success
        //       console.log(response);
        //     })
        //     .catch((error) => {
        //       // Handle error
        //       console.log(error);
        //     });

        //   // 인가코드를 제대로 못 받았을 경우에 에러 페이지를 띄운다.
        //   const test = async () => {
        //     try {
        //       const res = await axios.get(
        //         `http://15.165.99.21:8080/api/v1/auth/login/oauth2/callback/kakao?code=${authCode}`
        //       );
        //       //  access token 이쪽으로 보내주기
        //       // "Bareaer ${access_token}";
        //
        //       console.log(res);
        //
        //       const data = await axios.post(
        //         `http://15.165.99.21:8080/api/v1/auth/user/me`,
        //         {
        //           headers: {
        //             Authorization: `Bearer ${res.data.access_token}`,
        //           },
        //         }
        //       );
        //
        //       console.log(data);
        //     } catch (e) {
        //       alert(e);
        //     }
        //   };
        //   test();
      };
      NewTest();
    } catch (e) {
      alert(e);
    }
  }, [router]);

  console.log(userImage);

  return (
    <SignUpContainer>
      <Header userImage={userImage} token={token} />
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
