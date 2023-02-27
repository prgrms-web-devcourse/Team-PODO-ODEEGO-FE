"use client";

import { useRouter } from "next/navigation";
import SignupForm from "./signup-form";
import { useRecoilValue } from "recoil";
import { testState2 } from "@/recoil/test-state";
import { useQuery } from "@tanstack/react-query";
import { SearchAPI } from "@/pages/api/search";
import { searchOriginProps } from "@/types/search-props";
import React from "react";
import styled from "@emotion/styled";

const Index = () => {
  const router = useRouter();

  const handleSuccess = () => {
    router.push("/signup");
  };

  const valueRecoil = useRecoilValue(testState2);

  console.log(valueRecoil);

  const { data: resultSubway } = useQuery(
    ["search", valueRecoil],
    () => SearchAPI.getSubway(valueRecoil),
    {
      enabled: valueRecoil.length > 0 && valueRecoil.includes("역"),
    }
  );

  console.log(resultSubway);
  return (
    <div>
      <h1>Sign Up Page</h1>
      <SignupForm onSuccess={handleSuccess} />

      {resultSubway?.data?.documents?.length > 0 && (
        <SearchToggleBox>
          {resultSubway?.data?.documents?.map(
            (val: searchOriginProps, index: number) => {
              return (
                <SearchToggleWrapper key={index}>
                  <SearchToggleData
                    onClick={() => console.log(val)}
                    key={index}>
                    {val.place_name}
                  </SearchToggleData>
                </SearchToggleWrapper>
              );
            }
          )}
        </SearchToggleBox>
      )}
    </div>
  );
};
export default Index;

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
