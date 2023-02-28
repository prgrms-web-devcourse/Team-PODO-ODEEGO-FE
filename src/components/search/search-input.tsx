import { SearchAPI } from "@/pages/api/search";
import styled from "@emotion/styled";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useRecoilState, useSetRecoilState } from "recoil";
import React, { useEffect, useState } from "react";
import { searchOriginProps, searchProps } from "@/types/search-props";
import NotFound from "@/components/search/not-found";
import { InputAdornment, TextField } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { searchState } from "@/recoil/search-state";
import useModal from "@/hooks/use-modal";
import { tokenRecoilState } from "@/recoil/token-recoil";

const SearchInput = () => {
  const [value, setValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("검색 결과가 없습니다");
  const setRecoilData = useSetRecoilState<searchProps[]>(searchState);
  const [testToken, setTestToken] = useRecoilState<any>(tokenRecoilState); // 로그인 토큰 가져오기.
  const id = parseInt(useSearchParams().get("id") || "0", 10);

  const router = useRouter();

  if (!testToken) {
    // 로그인 화면으로 대체해야함.
    router.push("/");
  }

  const handleLocationClick = (val: searchOriginProps) => {
    if (id === undefined || id === null) return;

    handleOpenModal(val);
  };

  const { data: resultSubway } = useQuery(
    ["search", value],
    () => SearchAPI.getSubway(value),
    {
      enabled: value.length > 0,
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (!resultSubway || resultSubway.length === 0) {
      setErrorMessage("검색 결과가 없습니다");
    } else {
      setErrorMessage("");
    }

    setValue(value);
  };

  const { openModal } = useModal();

  const modalContent = () => {
    return <></>;
  };

  // const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

  const handleOpenModal = (val: searchOriginProps) => {
    const obj = {
      name: val.place_name,
      lat: val.y,
      lng: val.x,
      address: val.address_name,
    };

    openModal({
      children: modalContent(),
      btnText: {
        confirm: "장소를 확정합니다.",
        close: "다시 선택합니다.",
      },
      handleConfirm: () => {
        // await sleep(1000);
        setRecoilData((prev: searchProps[]) => [
          ...prev.slice(0, id),
          obj,
          ...prev.slice(id + 1),
        ]);

        router.push("/");
      },
      handleClose: () => {
        // router.push("/");
      },
    });
  };

  return (
    <SearchContainer>
      <SearchInputWrapper>
        <TextField
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
          onChange={handleChange}
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
      <p>test</p>
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
