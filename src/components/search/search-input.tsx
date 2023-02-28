import { SearchAPI } from "@/pages/api/search";
import styled from "@emotion/styled";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useRecoilState, useSetRecoilState } from "recoil";
import React, { useState } from "react";
import { searchOriginProps, searchProps } from "@/types/search-props";
import NotFound from "@/components/search/not-found";
import { Button, InputAdornment, TextField } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { searchState } from "@/recoil/search-state";
import useModal from "@/hooks/use-modal";
import { tokenRecoilState } from "@/recoil/token-recoil";

const SearchInput = () => {
  const [value, setValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("검색 결과가 없습니다");
  const setRecoilData = useSetRecoilState<searchProps[]>(searchState);
  const [testToken] = useRecoilState(tokenRecoilState); // 로그인 토큰 가져오기.
  const id = parseInt(useSearchParams().get("id") || "0", 10); // input Id(주소입력창)
  const groupId = useSearchParams().get("id") || "0"; // 방 Id
  const host = useSearchParams().get("host") || null;

  const { openModal } = useModal();

  const router = useRouter();

  const setLoginModalContent = () => {
    return <p>로그인 되어 있지 않아 로그인 페이지로 이동합니다</p>;
  };

  // 링크를 공유 받았을 때.
  if (groupId) {
    if (!testToken) {
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
  }

  const handleLocationClick = (val: searchOriginProps) => {
    if (id === undefined || id === null) return;

    handleStartPointModal(val);
  };

  const { data: resultSubway } = useQuery(
    ["search", value],
    () => SearchAPI.getSubway(value),
    {
      enabled: value.length > 0,
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

  const handleStartPointModal = (val: searchOriginProps) => {
    const obj = {
      groupId: groupId,
      name: val.place_name, //stationName
      lat: val.y,
      lng: val.x,
      // address: val.address_name, // 필요없는듯?
    };

    openModal({
      children: setStartPointModalContent(obj.name),
      btnText: {
        confirm: "장소를 확정합니다.",
        close: "다시 선택합니다.",
      },
      // 출발지 확정시
      handleConfirm: () => {
        // 공유된 링크로 접속할 때는 안쓰일듯?
        setRecoilData((prev: searchProps[]) => [
          ...prev.slice(0, id),
          obj,
          ...prev.slice(id + 1),
        ]);

        // 선택한 주소를 BE로 보낸다.
        SearchAPI.sendStartPoint({
          groupId: obj.groupId.toString(),
          stationName: obj.name,
          lat: +obj.lat,
          lng: +obj.lng,
        });

        if (host) {
          console.log("방장임!");
        } else {
          console.log("방장아님!");
        }

        router.push("/");
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
