import styled from "@emotion/styled";
import axios from "axios";

const LoginPage = () => {
  // 등록한 redirectUri를 매개변수로 넣어준다.
  const kakaoLogin = async () => {
    const responmse = await axios.post(`http://15.165.99.21:8080/login`);

    console.log(responmse);
  };

  return (
    <LoginContainer>
      <h1>로그인 페이지</h1>
      <button onClick={kakaoLogin}>카카오 로그인</button>
    </LoginContainer>
  );
};
export default LoginPage;

const LoginContainer = styled.div`
  height: 100vh;
`;
