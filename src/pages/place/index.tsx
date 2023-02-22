import styled from "@emotion/styled";

import React from "react";
import PlaceInput from "@/components/place/place-input";
import PlaceTabList from "@/components/place/place-tab-list";

interface Props {
  title: string;
  businessName: string;
  address: string;
}

interface Temp {
  places: Array<Props>;
}

export const dummy: Temp[] = [
  {
    places: [
      {
        title: "restaurant",
        businessName: "어글리스토브 신논현강남역점",
        address: "서울특별시 강남구 강남대로98길 20",
      },
      {
        title: "restaurant",
        businessName: "트리오드",
        address: "서울특별시 강남구 강남대로94길 28 유니언타운 L층",
      },
      {
        title: "restaurant",
        businessName: "헤이스테이",
        address: "서울특별시 강남구 봉은사로6길 39 1층(역삼동)",
      },
      {
        title: "cafe",
        businessName: "썸띵어바웃커피",
        address: "서울특별시 강남구 강남대로102길 30 1, 2, 3층",
      },
      {
        title: "cafe",
        businessName: "어퍼앤언더",
        address: "서울특별시 강남구 강남대로102길 28 지하1층, 1층, 2층",
      },
      {
        title: "cafe",
        businessName: "알베르",
        address: "서울특별시 강남구 강남대로102길 34",
      },
      {
        title: "cafe",
        businessName: "더달달",
        address: "서울특별시 강남구 강남대로102길 38-6",
      },
      {
        title: "cafe",
        businessName: "노티드 강남 카카오",
        address: "서울특별시 서초구 강남대로 429",
      },
    ],
  },
];

const PlacePage = () => {
  return (
    <PlaceContainer>
      <PlaceBox>
        <TextContainer>
          <PlaceInput />
          <PlaceTabList />
        </TextContainer>
      </PlaceBox>
    </PlaceContainer>
  );
};
export default PlacePage;

const TextContainer = styled.div`
  margin-top: 3rem;
`;

const PlaceContainer = styled.div`
  width: 100%;
  position: relative;
  border: 0;
  z-index: 1;
`;

const PlaceBox = styled.div`
  height: 18rem;
  z-index: 999;
  opacity: 0.5;
  border: 1px solid rgba(0, 0, 0, 0.2);

  border-bottom-right-radius: 50px;
  border-bottom-left-radius: 50px;
`;
