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
      `${process.env.NEXT_PUBLIC_API_END_POINT}/api/v1/places?station-name=${stationName}&page=0&size=4`
    );

    return {
      props: {
        stationName,
        places: data,
      },
    };
  } catch (e) {
    //임시 처리
    console.error(e);
  }
};

interface PageProps {
  stationName: string;
  places: { content: PlaceResponse[] };
}

const PlacePage = ({ stationName, places }: PageProps) => {
  const tabValue = useRecoilValue(tabState);

  const { data } = useQuery(
    ["place", tabValue],
    () => PlaceApi.getPlaces(stationName, tabValue, 0, 4),
    {
      keepPreviousData: true,
    }
  );

  // const { data, fetchNextPage, isFetching, isFetchingNextPage, hasNextPage } =
  //   useInfiniteQuery(
  //     ["place", tabValue],
  //     ({ pageParam = 0 }) =>
  //       PlaceApi.getPlaces(stationName, tabValue, pageParam, 4),
  //     {
  //       // keepPreviousData: true,
  //       getNextPageParam: (lastPage, allPages) => {
  //         // console.log('getNextPageParam:', lastPage, allPages);
  //         const nextPage = allPages.length + 1;
  //         return lastPage.currentPage < lastPage.totalPage
  //           ? nextPage
  //           : undefined;
  //       },
  //     }
  //   );

  return (
    <PlaceContainer>
      <Header>
        <PlaceInput value={stationName} />
        <PlaceTabList />
      </Header>
      <BorderContainer />
      <PlaceList placeList={data?.content || places?.content} />
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
  box-shadow: 0 5px 6px -5px rgba(3, 3, 3, 0.1);
  z-index: 999;
  margin-bottom: -16px;
  border-radius: 0 0 40px 40px;
  position: relative;
  border: 1px solid rgba(90, 178, 125, 0.22);
  border-width: 0 0 1px 0;
`;
