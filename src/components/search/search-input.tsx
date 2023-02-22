import { SearchAPI } from "@/pages/api/search";
import styled from "@emotion/styled";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useSetRecoilState } from "recoil";
import React, { useState } from "react";
import { searchOriginProps, searchProps } from "@/types/search-props";
import NotFound from "@/components/search/not-found";
import { InputAdornment, TextField } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { searchState } from "@/recoil/search-state";

const SearchInput = () => {
  const [value, setValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const setRecoilData = useSetRecoilState<searchProps[]>(searchState);
  const id = parseInt(useSearchParams().get("id") || "0", 10);

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (!value.includes("역")) {
      setErrorMessage("역만 입력해주세요");
    } else {
      setErrorMessage("");
    }

    setValue(value);
  };

  const handleLocationClick = (val: searchOriginProps) => {
    if (id === undefined || id === null) return;

    const obj = {
      name: val.place_name,
      lat: val.y,
      lng: val.x,
      address: val.address_name,
    };
    setRecoilData((prev: searchProps[]) => [
      ...prev.slice(0, id),
      obj,
      ...prev.slice(id + 1),
    ]);

    if (val) {
      router.push("/");
    }
  };

  const { data: resultSubway } = useQuery(
    ["search", value],
    () => SearchAPI.getSubway(value),
    {
      enabled: value.length > 0 && value.includes("역"),
    }
  );

  return (
    <SearchContainer>
      <SearchInputWrapper>
        <TextField
          style={{
            width: "400px",
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
        {errorMessage.length > 0 && value.length > 0 && (
          <NotFound
            title={"역만 입력해주세요"}
            icon={"지하철역"}
            sxNumber={50}
          />
        )}
      </SearchInputWrapper>

      {resultSubway?.data?.documents?.length > 0 && (
        <SearchToggleBox>
          {resultSubway?.data?.documents?.map(
            (val: searchOriginProps, index: number) => {
              return (
                <SearchToggleWrapper key={index}>
                  <SearchToggleData
                    onClick={() => handleLocationClick(val)}
                    key={index}>
                    {val.place_name}
                  </SearchToggleData>
                </SearchToggleWrapper>
              );
            }
          )}
        </SearchToggleBox>
      )}
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
  width: 390px;
  max-height: 884px;
  position: relative;
  margin: auto;
  border: 0;
`;

const SearchToggleBox = styled.div`
  margin-top: 50px;
  height: 200px;
  overflow-y: auto;
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }

  max-height: 884px;
  width: 370px;
  background-color: #fff;
  position: absolute;
  top: 45px;
  border: #464646;
  padding: 15px;
`;

const SearchToggleWrapper = styled.ul`
  position: relative;
  right: 9%;
`;

const SearchToggleData = styled.li`
  padding: 10px 8px;
  width: 100%;
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 2px;
  border-bottom: 1px solid rgba(236, 244, 255, 0.95);
  list-style: none;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }
  position: relative;
`;
