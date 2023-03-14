import { SearchAPI } from "@/pages/api/search";
import styled from "@emotion/styled";
import { useQuery } from "@tanstack/react-query";

import React from "react";
import { searchOriginProps } from "@/types/search-props";
import NotFound from "@/components/search/not-found";

import useSignupSearch from "@/hooks/use-signup-search";
import SignupInput from "@/components/signup/signup-input";
import { Button } from "@mui/material";
import { COLORS } from "@/constants";

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
    <>
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
          <CustomButton
            variant='contained'
            color='secondary'
            size='large'
            disabled={!!isError}
            onClick={handleSubmitSignup}>
            내 주소 저장하기
          </CustomButton>
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
    </>
  );
};
export default SignUpSearchInput;

const SignUpSearchInputWrapper = styled.div`
  p {
    color: red;
    font-size: 10px;
  }
`;

const SignUpSearchToggleBox = styled.div`
  position: relative;
  top: -9.5rem;
  height: 150px;
  overflow-y: auto;
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
  max-height: 884px;
  background-color: ${COLORS.backgroundSecondary};
  border: 1px solid ${COLORS.borderPrimary};
  border-radius: 0 0 0.5rem 0.5rem;
  padding: 15px;
`;

const SignUpSearchToggleWrapper = styled.ul`
  position: relative;
`;

const SignUpSearchToggleData = styled.li`
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
  position: relative;
`;

const CustomButton = styled(Button)`
  font-size: 1.5rem;
  width: 100%;
  margin-top: 5rem;
`;
