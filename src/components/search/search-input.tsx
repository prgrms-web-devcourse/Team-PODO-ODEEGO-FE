import { SearchAPI22 } from "@/axios/send-start-point";
import { getSubway } from "@/axios/get-subway";
import styled from "@emotion/styled";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useSetRecoilState } from "recoil";
import React, { useCallback, useEffect, useState } from "react";
import { searchOriginProps, searchProps } from "@/types/search-props";
import NotFound from "@/components/search/not-found";
import { Button, InputAdornment, TextField } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { searchState } from "@/recoil/search-state";
import useModal from "@/hooks/use-modal";
import EnterSearchPageModal from "./enter-searchpage-modal";
import SetStartPointModalContent from "./set-startpoint-modal";
import SetLoginModalContent from "./login-modal";
import { StartPointPros } from "@/types/startpoint-props";
import { getLocalStorage } from "@/utils/storage";
import GetMyStartpoint from "@/axios/get-my-startpoint";
import { toast } from "react-hot-toast";

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
      // 출발지 확정시
      handleConfirm: () => {
        // router.push("/");
      },
    });
  }, [openModal]);

  useEffect(() => {
    window.addEventListener("popstate", () => {
      closeModal();
    });
  });

  // URL Params에 groupId가 포함되어 있으면 모달을 보여준다.
  useEffect(() => {
    if (groupId !== null) {
      if (!host) handleConfirmEnterSearchPage();
    }
  }, [closeModal, groupId, handleConfirmEnterSearchPage, host]);

  // 링크를 공유 받았을 때.
  if (groupId && !token) {
    openModal({
      children: <SetLoginModalContent />,
      btnText: {
        confirm: "로그인하기!",
        close: "취소",
      },
      handleClose: () => {
        window.close();
      },
    });
    router.push("/signin");
  }

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
      return getSubway(searchInput);
    },
    {
      enabled: searchInput.length > 0,
      refetchOnMount: true,
      staleTime: 10000,
    }
  );

  const handleChangeStartPoint = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = e.target;
    setSearchInput(value);

    if (!resultSubway || resultSubway.length === 0) {
      setErrorMessage("검색 결과가 없습니다");
    } else {
      setErrorMessage("");
    }

    setSearchInput(value);
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
            await SearchAPI22.HostSendStartPoint(startPoint);

            // 모임 화면(홈페이지16)으로 redirection 으로 변경예정.
            router.replace(`/group/${groupId}`);
          } else {
            await SearchAPI22.NonHostSendStartPoint(startPoint);

            // redirection 경로 상의 예정
            toast.success("경로 제출이 완료되었어요!");
            router.replace("/");
          }
        }
      },
    });
  };

  // 개인 정보 받아오기 API가 완성되면 '내주소'를 TextField에 넣을 수 있게한다.
  const handleClickButton = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!token) toast.error("로그인을 먼저 해주세요!");

    const myDefaultStartpoint = await GetMyStartpoint();
    setSearchInput(myDefaultStartpoint.stationName);
  };

  return (
    <SearchContainer>
      <SearchInputWrapper>
        <TextField
          autoFocus
          sx={{
            width: "100%",
          }}
          inputProps={{
            style: { fontSize: 15 },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <KeyboardBackspaceIcon />
              </InputAdornment>
            ),
          }}
          type='text'
          onChange={(e) => handleChangeStartPoint(e)}
          value={searchInput}
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
      <Button onClick={handleClickButton} color='primary'>
        내 주소 입력하기
      </Button>
    </SearchContainer>
  );
};
export default SearchInput;

const SearchInputWrapper = styled.div`
  p {
    color: red;
    font-size: 10px;
  }
`;

const SearchContainer = styled.div`
  width: 100%;
  margin: auto;
  border: 0;
`;

const SearchToggleBoxContainer = styled.div`
  height: 643px;
  width: 370px;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }

  background-color: #fff;
  border: #464646;
  padding: 15px;
`;

const SearchToggleBox = styled.ul`
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
  width: 370px;
  background-color: #fff;
  border: #464646;
  padding: 15px;
`;

const SearchToggleWrapper = styled.li`
  list-style: none;
  right: 9%;
`;

const SearchToggleData = styled.div`
  padding: 10px 8px;
  width: 100%;
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 2px;
  border-bottom: 1px solid rgba(236, 244, 255, 0.95);

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }
`;
