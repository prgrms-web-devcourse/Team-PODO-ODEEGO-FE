import styled from "@emotion/styled";
import PlaceInput from "@/components/place/place-input";
import PlaceTabList from "@/components/place/place-tab-list";
import PlaceList from "@/components/place/place-list";
import { COLORS } from "@/constants";
import { useRecoilValue } from "recoil";
import { tabState } from "@/recoil/search-state";
import { useQuery } from "@tanstack/react-query";
import { PlaceApi } from "@/axios/place";
import { CircularProgress } from "@mui/material";

const PlacePage = () => {
  const getTabData = useRecoilValue(tabState);

  const { data, isLoading } = useQuery(
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
      {isLoading ? (
        <CircularProgress
          color='warning'
          size={48}
          sx={{
            position: "absolute",
            top: "150%",
            right: "45%",
            transform: "translate(-50%, -50%)",
          }}
        />
      ) : (
        <PlaceList placeList={data?.places} />
      )}
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
