import styled from "@emotion/styled";
import { COLORS } from "@/constants";
import { useRecoilValue } from "recoil";
import { tabState } from "@/recoil/search-state";
import { useInfiniteQuery } from "@tanstack/react-query";
import { PlaceApi } from "@/axios/place";
import { Box } from "@mui/material";
import { useIntersectionObserver } from "@/hooks";
import { PlaceInput, PlaceList, PlaceTabList } from "@/components/place";
import Image from "next/image";
import PacManSpinner from "@/components/common/spinner/pac-man-spinner";

interface PageProps {
  stationName: string;
}

const SIZE = 4;
const FIRST_PAGE_NUM = 0;
const USE_QUERY_KEYWORD = "place";

export const getServerSideProps = async ({
  query: { stationName },
}: {
  query: { stationName: string };
}) => {
  return {
    props: {
      stationName,
    },
  };
};

const PlacePage = ({ stationName }: PageProps) => {
  const tabValue = useRecoilValue(tabState);

  const { setTarget } = useIntersectionObserver({
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
    onIntersect: async ([{ isIntersecting }]) => {
      if (isIntersecting) {
        fetchNextPage();
      }
    },
  });

  const {
    data,
    fetchNextPage,
    isLoading,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    [USE_QUERY_KEYWORD, tabValue, stationName],
    ({ pageParam = FIRST_PAGE_NUM }) =>
      PlaceApi.getPlaces(stationName, tabValue, pageParam, SIZE),
    {
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length + 1;
        return !lastPage.last ? nextPage : undefined;
      },
    }
  );

  return (
    <PlaceContainer>
      <Header>
        <PlaceInput value={stationName} />
        <PlaceTabList />
      </Header>
      <BorderContainer />
      <MainContainer>
        <UnOrderedList>
          {isLoading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "5rem",
                padding: "2rem 0 2.5rem 0",
              }}>
              <PacManSpinner pacManSize='40px' ballSize='13px' />
            </Box>
          ) : (
            <>
              {data &&
                data.pages.map((p, i) => (
                  <PlaceList key={i} placeList={p.content} />
                ))}
              {hasNextPage ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "3rem 0 5rem 0",
                  }}
                  ref={setTarget}>
                  {isFetching && isFetchingNextPage && (
                    <PacManSpinner pacManSize='30px' ballSize='10px' />
                  )}
                </Box>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "1.5rem 0",
                  }}>
                  <Image
                    src='/logo1.svg'
                    alt='odeego'
                    width={200}
                    height={30}
                  />
                </Box>
              )}
            </>
          )}
        </UnOrderedList>
      </MainContainer>
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

const MainContainer = styled.main`
  width: 100%;
  max-height: 700px;
  height: 90vh;
  background-color: ${COLORS.backgroundSecondary};
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: -2px 0 4px -5px #333, 2px 0 4px -5px #333;
  user-select: none;
  padding: 3rem 0 0 0;
`;

const UnOrderedList = styled.ul`
  padding: 0;
  width: 100%;
  margin-top: 0;
  margin-bottom: 0;

  overflow: auto;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }

  & li:not(:first-of-child) {
    border-top: 1px solid rgba(90, 178, 125, 0.3);
  }
`;
