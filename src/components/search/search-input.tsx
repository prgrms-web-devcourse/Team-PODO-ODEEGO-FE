import { SearchAPI22 } from "@/axios/send-start-point";
import { getSubway } from "@/axios/get-subway";
import styled from "@emotion/styled";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import { useSetRecoilState } from "recoil";
import React, { useCallback, useEffect, useState } from "react";
import { searchOriginProps, searchProps } from "@/types/search-props";
import NotFound from "@/components/search/not-found";
import { Button, Container, InputAdornment, TextField } from "@mui/material";
import { searchState } from "@/recoil/search-state";
import useModal from "@/hooks/use-modal";
import EnterSearchPageModal from "./enter-searchpage-modal";
import SetStartPointModalContent from "./set-startpoint-modal";
import SetLoginModalContent from "./login-modal";
import { StartPointPros } from "@/types/startpoint-props";
import { getLocalStorage } from "@/utils/storage";
import { Search } from "@mui/icons-material";
import { COLORS } from "@/constants";

const SearchInput = () => {
  const [searchInput, setSearchInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("검색 결과가 없습니다");
  const setRecoilData = useSetRecoilState<searchProps[]>(searchState); // 입력한 출발지들(혼자서 모두 입력할 때 사용)
  const token = getLocalStorage("token"); // 로그인 토큰 가져오기.
  const router = useRouter();

  const id = useSearchParams().get("id") || null; // input Id(주소입력창)
  const groupId = useSearchParams().get("groupId") || null; // 방 Id.
  const host = useSearchParams().get("host") || null;
  const { openModal, closeModal } = useModal();

  const handleConfirmEnterSearchPage = useCallback(() => {
    openModal({
      children: <EnterSearchPageModal />,
      btnText: {
        confirm: "예",
        close: "아니오",
      },
      handleConfirm: () => {
        // router.push("/");
      },
      handleClose: () => {
        router.push("/");
      },
    });
  }, [openModal, router]);

  // URL Params에 groupId가 포함되어 있으면 모달을 보여준다.
  useEffect(() => {
    if (groupId !== null) {
      if (!host) handleConfirmEnterSearchPage();
    }
  }, [closeModal, groupId, handleConfirmEnterSearchPage, host]);

  // 링크를 공유 받았을 때.
  useEffect(() => {
    if (groupId && !token) {
      openModal({
        children: <SetLoginModalContent />,
        btnText: {
          confirm: "로그인하기!",
          close: "취소",
        },
        handleClose: () => {
          router.push("/");
        },
        handleConfirm: () => {
          router.push("/signin", undefined, { shallow: true });
        },
      });
    }
  }, [groupId, openModal, router, token]);

  const handleLocationClick = (val: searchOriginProps) => {
    const startPoint = {
      groupId: groupId,
      stationName: val.place_name,
      lat: +val.y,
      lng: +val.x,
    };

    // 한 명이 모든 출발지를 입력할 때.
    if (!groupId) {
      if (id === undefined || id === null) return;

      setRecoilData((prev: searchProps[]) => [
        ...prev.slice(0, +id),
        startPoint,
        ...prev.slice(+id + 1),
      ]);

      return router.push("/");
    }

    handleStartPointModal(startPoint);
  };

  const { data: resultSubway } = useQuery(
    ["search", searchInput], // key가 충분히 unique 한가?
    () => {
      console.log("search input is changed");
      return getSubway(searchInput);
    },
    {
      enabled: searchInput.length > 0,
      refetchOnMount: true,
      staleTime: 10000,
    }
  );

  let timer: number | null = null;
  const handleChangeStartPoint = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    // 임시 debounce 적용
    if (timer !== null) {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        setSearchInput(value);
      }, 500);
    } else {
      timer = window.setTimeout(() => {
        setSearchInput(value);
      }, 500);
    }

    if (!resultSubway || resultSubway.length === 0) {
      setErrorMessage("검색 결과가 없습니다");
    } else {
      setErrorMessage("");
    }

    // setValue(value);
  };

  const handleStartPointModal = (startPoint: StartPointPros) => {
    openModal({
      children: (
        <SetStartPointModalContent startingPoint={startPoint.stationName} />
      ),
      btnText: {
        confirm: "장소를 확정합니다.",
        close: "다시 선택합니다.",
      },
      // 출발지 확정시
      handleConfirm: async () => {
        // 약속'방'을 만들어서 출발지를 입력할 때
        if (groupId !== null) {
          if (host) {
            console.log("방장임!");
            await SearchAPI22.HostSendStartPoint(startPoint);

            // 모임 화면(홈페이지16)으로 redirection 으로 변경예정.
            router.replace(`/group/${groupId}`);
          } else {
            console.log("방장아님!");
            await SearchAPI22.NonHostSendStartPoint(startPoint);

            // redirection 경로 상의 예정
            router.replace("/");
          }
        }
      },
    });
  };

  // 개인 정보 받아오기 API가 완성되면 '내주소'를 TextField에 넣을 수 있게한다.
  const handleClickButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("click");
  };

  return (
    <CustomContainer>
      <SearchInputWrapper>
        <CustomTextField
          autoFocus
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <Search fontSize='large' sx={{ color: COLORS.altGreen }} />
              </InputAdornment>
            ),
          }}
          type='text'
          onChange={handleChangeStartPoint}
        />
        {(resultSubway?.length <= 0 || !resultSubway) && (
          <NotFound title={errorMessage} icon={"지하철역"} sxNumber={50} />
        )}
      </SearchInputWrapper>

      {resultSubway?.length > 0 && (
        <SearchToggleBoxContainer>
          <SearchToggleBox>
            {resultSubway.map((val: searchOriginProps, index: number) => {
              return (
                <SearchToggleWrapper key={index}>
                  <SearchToggleData
                    onClick={() => handleLocationClick(val)}
                    key={index}>
                    {val.place_name}
                  </SearchToggleData>
                </SearchToggleWrapper>
              );
            })}
          </SearchToggleBox>
        </SearchToggleBoxContainer>
      )}
      <CustomButton
        onClick={handleClickButton}
        color='primary'
        variant='contained'
        size='large'>
        내 주소 입력하기
      </CustomButton>
    </CustomContainer>
  );
};
export default SearchInput;

const CustomTextField = styled(TextField)`
  width: 100%;
  background-color: ${COLORS.backgroundSecondary};
  z-index: 100;

  & .MuiOutlinedInput-root {
    fieldset {
      border-color: ${COLORS.borderPrimary};
    }

    &.Mui-focused fieldset {
      border-color: ${COLORS.mainGreen};
    }

    &:hover fieldset {
      border-color: ${COLORS.mainGreen};
    }

    & input {
      color: ${COLORS.semiBlack};
      font-size: 1.5rem;
      -webkit-text-fill-color: ${COLORS.semiBlack};
    }
  }
`;

const CustomButton = styled(Button)`
  font-size: 1.5rem;
  width: 100%;
  margin-top: 5rem;
`;

const CustomContainer = styled(Container)`
  margin: 5rem auto;
`;

const SearchInputWrapper = styled.div`
  p {
    color: red;
    font-size: 10px;
  }
`;

const SearchToggleBoxContainer = styled.div`
  height: 30rem;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
  transform: translateY(-1rem);
  background-color: ${COLORS.backgroundSecondary};
  border: 1px solid ${COLORS.borderPrimary};
  border-radius: 0 0 0.5rem 0.5rem;
  padding: 15px;
`;

const SearchToggleBox = styled.ul`
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
  margin: 0;
  padding: 0;
`;

const SearchToggleWrapper = styled.li`
  list-style: none;
`;

const SearchToggleData = styled.div`
  padding: 2rem 0;
  margin: 0 2rem;
  box-sizing: border-box;
  font-size: 1.5rem;
  letter-spacing: 0.1rem;
  border-bottom: 1px solid rgba(180, 201, 188, 0.2);

  &:hover {
    background-color: rgba(180, 201, 188, 0.2);
    cursor: pointer;
  }
`;
