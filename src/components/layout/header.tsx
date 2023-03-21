import { COLORS } from "@/constants/css";
import styled from "@emotion/styled";
import Image from "next/image";
const HEADER_TEXT = "어디서 만날까?";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { getLocalStorage, removeLocalStorage } from "@/utils/storage";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import useModal from "../../hooks/use-modal";
import Cookies from "cookies";
import { GetServerSidePropsContext } from "next";
import LoginIcon from "@mui/icons-material/Login";
import {
  Divider,
  Grow,
  IconButton,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Stack,
  Tooltip,
} from "@mui/material";
import { axiosInstanceWitToken } from "@/axios/instance";
import { ROUTES } from "@/constants";

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

  const [open, setOpen] = useState(false);
  const anchorRef = React.useRef<any>(null);

  const handleOpenToggle = () => {
    setOpen((prev) => !prev);
    console.log(open);
  };

  const handleClickLogOut = async () => {
    const logoutToken = getLocalStorage("logoutToken");
    setOpen(false);

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

  useEffect(() => {
    const getToken = getLocalStorage("logoutToken");
    if (!getToken) return;
    setToken(getToken);
  }, [router, token]);
  const { openModal } = useModal();

  const handleClickLogin = () => {
    router.push(`${ROUTES.LOGIN}`);
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
          router.push(`${ROUTES.MYPAGE}`);
          // return response;
        },
      });
    } else {
      router.push(`${ROUTES.MYPAGE}`);
    }
  };

  return (
    <HeaderContainer>
      {(token || tokenData) && (
        <>
          <HeaderIconWrap>
            <NavbarIcons>
              <IconButton
                style={{
                  color: "white",
                }}
                ref={anchorRef}
                onClick={handleOpenToggle}>
                <AccountCircleIcon />
              </IconButton>
              {/*<AccountCircleIcon onClick={handleClickMypage} />*/}
            </NavbarIcons>
          </HeaderIconWrap>

          <Popper
            style={{
              position: "absolute",
              left: "75%",
              top: "30%",
            }}
            anchorEl={anchorRef.current}
            open={open}
            placement='bottom-start'
            transition
            disablePortal>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === "right" ? "right bottom" : "right bottom",
                }}>
                <Stack direction='row' spacing={2}>
                  <Paper>
                    <MenuList>
                      <MenuItem onClick={handleClickMypage}>
                        마이페이지
                      </MenuItem>
                      <Divider />
                      <MenuItem onClick={handleClickLogOut}>로그아웃</MenuItem>
                    </MenuList>
                  </Paper>
                </Stack>
              </Grow>
            )}
          </Popper>
        </>
      )}

      <TextP>{HEADER_TEXT}</TextP>

      {!token && !tokenData && (
        <>
          <HeaderIconWrap>
            <Tooltip title='로그인' arrow>
              <IconButton
                style={{
                  color: "white",
                }}>
                <LoginIcon onClick={handleClickLogin} />
              </IconButton>
            </Tooltip>
          </HeaderIconWrap>
        </>
      )}

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
