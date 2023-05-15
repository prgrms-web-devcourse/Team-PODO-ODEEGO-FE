import { COLORS } from "@/constants/css";
import styled from "@emotion/styled";

const HEADER_TEXT = "어디서 만날까?";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { ROUTES } from "@/constants/routes";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { getLocalStorage, removeLocalStorage } from "@/utils/storage";
import { axiosInstanceWitToken } from "@/axios/instance";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import useModal from "../../hooks/use-modal";
import fetch from "node-fetch";
import Cookies from "cookies";
import { GetServerSidePropsContext } from "next";

interface TokenProps {
  token?: string;
}
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const cookies = new Cookies(context.req, context.res);
  const token = cookies.get("token");

  return {
    props: {
      token,
    },
  };
}

const Header = ({ token }: TokenProps) => {
  const router = useRouter();
  const { pathname } = router;
  const [tokenData, setToken] = useState<string>("");

  useEffect(() => {
    const getToken = getLocalStorage("logoutToken");
    if (!getToken) return;

    setToken(getToken);
  }, [router, token]);
  const { openModal } = useModal();

  const handleBackClick = async () => {
    switch (pathname) {
      case "/signin":
        router.push(`${ROUTES.HOME}`);
        break;
      case "/kakao":
        openModal({
          children: (
            <p style={{ textAlign: "center", width: "20rem" }}>
              추가정보에서 나가면 다시 내 주소를 저장 할 수 없습니다.
            </p>
          ),
          btnText: {
            confirm: "홈으로",
            close: "취소",
          },
          handleConfirm: async () => {
            router.push(`${ROUTES.HOME}`);

            // return response;
          },
        });
        break;

      case "/mypage":
        router.push(`${ROUTES.HOME}`);
        break;
    }
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

      const odeegoLogoutUrl = `/api/odeego-leave`;
      const response = await axiosInstanceWitToken.delete(odeegoLogoutUrl);
      setToken("");
      removeLocalStorage("token");

      removeLocalStorage("logoutToken");
      router.push(`${ROUTES.HOME}`);
      return response;
    } catch (err) {
      throw new Error((err as Error).message);
    }
  };

  const handleClickMypage = () => {
    if (pathname === "/kakao") {
      openModal({
        children: "추가정보에서 나가면 다시 내 주소를 저장 할 수 없습니다.",
        btnText: {
          confirm: "마이페이지 이동",
          close: "취소",
        },
        handleConfirm: async () => {
          router.push("/mypage");
          // return response;
        },
      });
    } else {
      router.push("/mypage");
    }
  };

  return (
    <HeaderContainer>
      {(token || tokenData) && (
        <>
          <HeaderBackImageWrap>
            <KeyboardBackspaceIcon onClick={handleBackClick} />
          </HeaderBackImageWrap>

          <HeaderIconWrap>
            <NavbarIcons>
              <AccountCircleIcon onClick={handleClickMypage} />
              <ExitToAppIcon onClick={handleClickLogout} />
            </NavbarIcons>
          </HeaderIconWrap>
        </>
      )}

      <TextP>{HEADER_TEXT}</TextP>

      <embed src='/logo1.svg' width={147} height={56} />
    </HeaderContainer>
  );
};

export default Header;

const HeaderBackImageWrap = styled.div`
  position: absolute;
  left: 10%;
  top: 11%;
  svg {
    font-size: 3rem;
  }
`;

const NavbarIcons = styled.div`
  display: flex;
  svg {
    margin: 1rem;
  }
  align-items: center;
  justify-content: right;
  top: 0;
`;

const HeaderContainer = styled.header`
  height: 17.4rem;
  max-height: 174px;
  display: flex;
  position: relative;
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
  position: absolute;
  right: 5%;
  top: 7%;
  svg {
    font-size: 3rem;
  }
`;
