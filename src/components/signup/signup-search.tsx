import { SearchAPI } from "@/pages/api/search";
import styled from "@emotion/styled";
import { useQuery } from "@tanstack/react-query";

import React from "react";
import { searchOriginProps } from "@/types/search-props";
import NotFound from "@/components/search/not-found";

import useSignupSearch from "@/hooks/use-signup-search";
import SignupInput from "@/components/signup/signup-input";

const SignUpSearchInput = () => {
  const {
    errorMessage,
    isError,
    isToggleBoxLoading,
    handleSubmitSignup,
    handleKeyDownStation,
    handleClickLocation,
    handleChangeValue,
    values,
  } = useSignupSearch();

  const { data: resultSubway, isLoading } = useQuery(
    ["search", values.defaultStationName],
    () => SearchAPI.getSubway(values.defaultStationName),
    {
      enabled:
        values.defaultStationName?.includes("역") &&
        values.defaultStationName.length > 0,
    }
  );

  return (
    <SignUpSearchContainer>
      <SignUpSearchInputWrapper>
        <form>
          <SignupInput
            values={values}
            handleValue={handleChangeValue}
            errorMessage={errorMessage}
            handleStationKeyDown={handleKeyDownStation}
          />
          {errorMessage?.defaultStationName?.length && (
            <NotFound
              title={"역만 입력해주세요"}
              icon={"지하철역"}
              sxNumber={50}
            />
          )}
          <SignUpButton disabled={!!isError} onClick={handleSubmitSignup}>
            내 주소 저장하기
          </SignUpButton>
        </form>
      </SignUpSearchInputWrapper>

      {isLoading === isToggleBoxLoading || resultSubway?.length <= 0 ? null : (
        <SignUpSearchToggleBox>
          {resultSubway?.map((val: searchOriginProps, index: number) => {
            return (
              <SignUpSearchToggleWrapper key={index}>
                <SignUpSearchToggleData
                  onClick={() => handleClickLocation(val)}
                  key={index}>
                  {val.place_name}
                </SignUpSearchToggleData>
              </SignUpSearchToggleWrapper>
            );
          })}
        </SignUpSearchToggleBox>
      )}
    </SignUpSearchContainer>
  );
};
export default SignUpSearchInput;

const SignUpSearchInputWrapper = styled.div`
  p {
    color: red;
    font-size: 10px;
  }
`;

const SignUpSearchContainer = styled.div`
  width: 390px;
  max-height: 884px;
  position: relative;
  margin: auto;
  border: 0;
`;

const SignUpSearchToggleBox = styled.div`
  margin-top: 118px;
  height: 150px;
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

const SignUpSearchToggleWrapper = styled.ul`
  position: relative;
  right: 9%;
`;

const SignUpSearchToggleData = styled.li`
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

const SignUpButton = styled.button`
  color: ${(props) => (props.disabled ? "#aaa" : "#fff")};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70%;
  margin: 0 auto;
  height: 5vh;
  margin-top: 10rem;
  border-radius: 5px;
  background-color: #ff7754;
  border: none;
`;
