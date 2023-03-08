import styled from "@emotion/styled";
import PlaceInput from "@/components/place/place-input";
import PlaceTabList from "@/components/place/place-tab-list";
import PlaceList from "@/components/place/place-list";
import { COLORS } from "@/constants";
import { useRecoilValue } from "recoil";
import { tabState } from "@/recoil/search-state";
import { useQuery } from "@tanstack/react-query";
import { PlaceApi } from "@/axios/place";
import axios from "axios";
import { PlaceResponse } from "@/types/api/place";

export const getServerSideProps = async ({
  query: { stationName },
}: {
  query: { stationName: string };
}) => {
  try {
    const { data } = await axios.get(
      `http://52.78.224.123:8080/api/v1/places?station-name=${stationName}`
    );
    return {
      props: {
        places: data,
      },
    };
  } catch (e) {
    //임시 처리
    console.error(e);
  }
};

interface PageProps {
  places: { places: PlaceResponse[] };
}

const PlacePage = ({ places }: PageProps) => {
  const getTabData = useRecoilValue(tabState);

  const { data } = useQuery(
    ["place", getTabData],
    () => PlaceApi.getPlaces("강남역", getTabData),
    {
      keepPreviousData: true,
    }
  );

  return (
    <PlaceContainer>
      <Header>
        <PlaceInput />
        <PlaceTabList />
      </Header>
      <BorderContainer />
      <PlaceList placeList={data?.places || places.places} />
    </PlaceContainer>
  );
};
export default PlacePage;

const PlaceContainer = styled.div`
  width: 100%;
  position: relative;
  border: 0;
  z-index: 1;
  background-color: ${COLORS.backgroundSecondary};
`;

const Header = styled.div`
  z-index: 999;
  box-shadow: -2px 0 4px -5px #333, 2px 0 4px -5px #333;
  padding: 2rem 2rem 0 2rem;
  /* background-color: rgba(219, 228, 215, 0.3); */
  background-color: ${COLORS.backgroundPrimary};
`;

const BorderContainer = styled.div`
  height: 2rem;
  width: 100%;
  background-color: ${COLORS.backgroundPrimary};
  box-shadow: 0 5px 6px -5px rgba(3, 3, 3, 0.3);
  z-index: 999;
  margin-bottom: -16px;
  border-radius: 0 0 40px 40px;
  position: relative;
`;
