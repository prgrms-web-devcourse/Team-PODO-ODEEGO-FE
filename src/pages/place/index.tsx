import styled from "@emotion/styled";

import React from "react";
import PlaceInput from "@/components/place/place-input";
import PlaceTabList from "@/components/place/place-tab-list";
import { useRecoilValue } from "recoil";
import { tabState } from "@/recoil/search-state";

import { useQuery } from "@tanstack/react-query";
import { PlaceAPI } from "@/pages/api/place";
import PlaceList from "@/components/place/place-list";

const PlacePage = () => {
  const getTabData = useRecoilValue(tabState);

  // const [cafeData, setCafeData] = useState<Props[]>([]);
  // PlacePage 복구
  // const [place, setPlace] = useState("강남역");
  // const [address, setAddress] = useState("강남구 강남대로 396");

  const { data, isLoading } = useQuery(
    ["place", getTabData],
    () => PlaceAPI.getPlace("강남역", "강남구 강남대로 396", getTabData),
    {
      keepPreviousData: true,
    }
  );

  //임시 코드 -> 페이지 변경되면 로딩스피너 넣어야할듯
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <PlaceContainer>
      <PlaceBox>
        <TextContainer>
          <PlaceInput />
          <PlaceTabList />
        </TextContainer>
      </PlaceBox>

      <PlaceList data={data} />
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
