import { SearchAPI } from "@/pages/api/search";
import { SearchAPI22 } from "@/axios/send-start-point";
import styled from "@emotion/styled";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useRecoilState, useSetRecoilState } from "recoil";
import React, { useCallback, useEffect, useState } from "react";
import { searchOriginProps, searchProps } from "@/types/search-props";
import NotFound from "@/components/search/not-found";
import { Button, InputAdornment, TextField } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { searchState } from "@/recoil/search-state";
import useModal from "@/hooks/use-modal";
import { tokenRecoilState } from "@/recoil/token-recoil";
import { StartPointPros } from "@/types/startpoint-props";

const SearchInput = () => {
  const [value, setValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("검색 결과가 없습니다");
  const setRecoilData = useSetRecoilState<searchProps[]>(searchState);
  const [testToken] = useRecoilState(tokenRecoilState); // 로그인 토큰 가져오기.
  const id = useSearchParams().get("id") || null; // input Id(주소입력창)
  const groupId = useSearchParams().get("groupId") || null; // 방 Id. 임시로 사용할 수 있는 ID b6deb966-8179-43db-9f08-ec5271cbaccc
  const host = useSearchParams().get("host") || null;
  const memberId = testToken;
  const { openModal, closeModal } = useModal();
  const router = useRouter();

  const setLoginModalContent = () => {
    return <p>로그인 되어 있지 않아 로그인 페이지로 이동합니다</p>;
  };

  const ConfirmEnterSearchPageModal = () => {
    return (
      <>
        {/* 닉네임을 받아올 수 있는가? */}
        <h1>000님이 주소를 요청했습니다.</h1>
        <p>약속 장소를 찾기 위해 주소가 필요합니다.</p>
        <p>계속 하시겠습니까?</p>
      </>
    );
  };

  const handleConfirmEnterSearchPage = useCallback(() => {
    openModal({
      children: ConfirmEnterSearchPageModal(),
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

    // URL Params에 groupId가 포함되어 있으면 모달을 보여준다.
    if (groupId !== null) {
      if (!host) handleConfirmEnterSearchPage();
    }
  }, [closeModal, groupId, handleConfirmEnterSearchPage, host]);

  // 링크를 공유 받았을 때.
  if (groupId && !testToken) {
    openModal({
      children: setLoginModalContent(),
      btnText: {
        confirm: "로그인하기!",
        close: "취소",
      },
      handleClose: () => {
        window.close();
      },
    });
    // 로그인 화면으로 대체 예정.
    router.push("/");
  }

  const handleLocationClick = (val: searchOriginProps) => {
    const startPoint = {
      groupId: groupId,
      memberId: memberId,
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
    ["search", value], // key가 충분히 unique 한가?
    () => {
      console.log("search input is changed");
      return SearchAPI.getSubway(value);
    },
    {
      enabled: value.length > 0,
      refetchOnMount: true,
      staleTime: 10000,
    }
  );

  const handleChangeStartPoint = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (!resultSubway || resultSubway.length === 0) {
      setErrorMessage("검색 결과가 없습니다");
    } else {
      setErrorMessage("");
    }

    setValue(value);
  };

  const setStartPointModalContent = (startPoint: string) => {
    return (
      <>
        <p>{startPoint}</p>
        <p>출발역은 수정할 수 없습니다.</p>
      </>
    );
  };

  const handleStartPointModal = (startPoint: StartPointPros) => {
    openModal({
      children: setStartPointModalContent(startPoint.stationName),
      btnText: {
        confirm: "장소를 확정합니다.",
        close: "다시 선택합니다.",
      },
      // 출발지 확정시
      handleConfirm: () => {
        // 약속'방'을 만들어서 출발지를 입력할 때
        if (groupId !== null) {
          if (host) {
            console.log("방장임!");
            SearchAPI22.HostSendStartPoint(startPoint);

            // 모임 화면(홈페이지16)으로 redirection 으로 변경예정.
            router.replace(`/group/${groupId}`);
          } else {
            console.log("방장아님!");
            SearchAPI22.NonHostSendStartPoint(startPoint);

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
