import { COLORS } from "@/constants/css";
import styled from "@emotion/styled";
import Image from "next/image";

const HEADER_TEXT = "어디서 만날까?";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { ROUTES } from "@/constants/routes";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import axios from "axios";
interface TokenProps {
  token?: string;
}

const Header = ({ token }: TokenProps) => {
  const router = useRouter();

  const { pathname } = router;

  const [tokenData, setToken] = useState<string>("");

  useEffect(() => {
    const getToken = localStorage.getItem("logoutToken");
    if (!getToken) return;
    setToken(getToken);
  }, [router, token]);

  const handleBackClick = async () => {
    switch (pathname) {
      case "/signin":
        router.push(`${ROUTES.HOME}`);
        break;

      case "/kakao":
        const token = localStorage.getItem("logoutToken" || "");
        await fetch(`/api/kakao-logout`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token,
          }),
        });

        setToken("");
        localStorage.setItem("token", "");
        localStorage.setItem("logoutToken", "");
        router.push(`${ROUTES.LOGIN}`);
        break;
    }
  };

  const handleLogout = async () => {
    const token = localStorage.getItem("token" || "");
    const logoutToken = localStorage.getItem("logoutToken" || "");

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

      // 회원탈퇴
      const odeegoLogoutUrl = `https://odeego.shop/api/v1/members/leave`;

      const response = await axios.delete(odeegoLogoutUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setToken("");

      localStorage.removeItem("token");
      localStorage.removeItem("logoutToken");
      router.push(`${ROUTES.HOME}`);

      return response;
    } catch (e) {
      alert(e);
    }
  };

  return (
    <HeaderContainer>
      {tokenData && (
        <HeaderIconWrap>
          <KeyboardBackspaceIcon
            style={{
              marginTop: "0.6rem",
            }}
            onClick={handleBackClick}
          />

          <HeaderLogout>
            <ExitToAppIcon onClick={handleLogout} />
          </HeaderLogout>
        </HeaderIconWrap>
      )}

      <TextP>{HEADER_TEXT}</TextP>
      <Image
        src='/logo1.svg'
        alt='Odeego Logo'
        width={137}
        height={46}
        priority
      />
    </HeaderContainer>
  );
};

export default Header;

const HeaderLogout = styled.h2`
  font-size: 1.2rem;
  font-weight: 700;
  color: #fff;
  cursor: pointer;
  position: relative;
  right: 2rem;
`;

const HeaderContainer = styled.header`
  height: 17.4rem;
  max-height: 174px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  background-color: ${COLORS.backgroundAccent};
  user-select: none;
`;

const TextP = styled.p`
  text-align: center;
  font-size: 12px;
  margin-bottom: 0;
  opacity: 0.7;
`;

const HeaderIconWrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-left: 2rem;
  svg {
    font-size: 3rem;
  }
`;
