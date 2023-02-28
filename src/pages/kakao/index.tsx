import { useRouter } from "next/router";
import { useEffect } from "react";

const Kakao = () => {
  const router = useRouter();
  const { code: authCode } = router.query;
  //
  // const [key, setKey] = useState(
  //   "no0GyXiyp3x5whSPxfkdEmFSHXuGPn0ResRXWMcECinI2gAAAYaXTULM"
  // );
  // const [firstData, setFirstData] = useState("");

  useEffect(() => {
    try {
      const NewTest = async () => {
        if (authCode) {
          const res2 = await fetch(
            `http://15.165.99.21:8080/api/v1/auth/login/oauth2/callback/kakao?code=${authCode}`
          );
          const data = await res2.json();

          const res = await fetch(
            `http://15.165.99.21:8080/api/v1/auth/user/me`,
            {
              headers: {
                Authorization: `Bearer ${data.access_token}`,
              },
              method: "POST",
            }
          );

          const data3 = await res.json();
          console.log(data3);
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

  return <h2>로그인 중입니다..</h2>;
};
export default Kakao;
