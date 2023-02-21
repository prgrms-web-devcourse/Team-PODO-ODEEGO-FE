import { SearchAPI } from "@/pages/api/search";
import styled from "@emotion/styled";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import React, { useState } from "react";
import { searchState } from "@/recoil/atom";
import { searchOriginProps, searchProps } from "@/types/search-props";

const SearchInput = () => {
  const [value, setValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [recoilData, setRecoildData] =
    useRecoilState<searchProps[]>(searchState);

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
    setRecoildData((prev: searchProps[]) => [...prev, val]);

    if (val) {
      router.push("/");
    }
  };

  const { data } = useQuery(
    ["search", value],
    () => SearchAPI.getSubway(value),
    {
      enabled: value.length > 0 && value.includes("역"),
    }
  );

  return (
    <SearchContainer>
      <SearchInputWrapper>
        <Search type='text' onChange={handleChange} />
        {errorMessage.length > 0 && value.length > 0 && "역만입력"}
      </SearchInputWrapper>

      {data?.documents?.length > 0 && (
        <SearchToggleBox>
          {data?.documents?.map((val: searchOriginProps, index: number) => {
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

const Search = styled.input`
  border: 0;
  padding-left: 10px;
  background-color: #eaeaea;
  width: 100%;
  height: 50px;

  outline: none;
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
