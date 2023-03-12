import { COLORS } from "@/constants/css";
import styled from "@emotion/styled";
import Image from "next/image";
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

const Header = ({ token }: TokenProps) =>
  // props: InferGetServerSidePropsType<typeof getServerSideProps>
  {
    // console.log(props);
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
            children: "추가정보에서 나가면 다시 내 주소를 저장 할 수 없습니다.",
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
          <HeaderIconWrap>
            <HeaderBackImage>
              <KeyboardBackspaceIcon onClick={handleBackClick} />
            </HeaderBackImage>
            <NavbarIcons>
              <AccountCircleIcon onClick={handleClickMypage} />
              <ExitToAppIcon onClick={handleLogout} />
            </NavbarIcons>
          </HeaderIconWrap>
        )}

        <TextP>{HEADER_TEXT}</TextP>

        <Image
          src='/logo1.svg'
          alt='Odeego Logo'
          width={147}
          height={56}
          priority
        />
      </HeaderContainer>
    );
  };

export default Header;

const HeaderBackImage = styled.div`
  margin-left: 20px;
`;

const NavbarIcons = styled.div`
  display: flex;
  svg {
    margin: 1rem;
  }
  align-items: center;
  height: 10vh;
  justify-content: right;
  width: 100%;
`;

// const HeaderLogout = styled.h2`
//   font-size: 1.2rem;
//   font-weight: 700;
//   color: #fff;
//   cursor: pointer;
//   position: relative;
//   right: 2rem;
// `;

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
  align-items: center;
  position: absolute;
  top: 0;

  width: 100%;
  svg {
    font-size: 3rem;
  }
`;
