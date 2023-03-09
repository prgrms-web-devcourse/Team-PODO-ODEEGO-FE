// import { useState } from "react";
// import { PlaceResponse } from "../types/api/place";
// import useIntersectionObserver from "./use-intersection-observer";

const useInfiniteScroll = () => {
  //   const [data, setData] = useState<PlaceResponse[] | null>(null);
  //   const [isLoading, setIsLoading] = useState(false);
  //   const [isSearched, setIsSearched] = useState(false);
  //   const [isAllRendered, setIsAllRendered] = useState(false);
  //   const [page, setPage] = useState(0);
  //   const SIZE = 4;
  //   const initAllStateAndGetDataWithAPI = async () => {
  //     setIsLoading(true);
  //     //initialize
  //     setIsAllRendered(false);
  //     setIsSearched(false);
  //     setPage(1);
  //     // const result = await getUserList();
  //     setData(result);
  //     setIsLoading(false);
  //   };
  //   const getMoreDataWithAPI = async () => {
  //     setIsLoading(true);
  //     // const result = await getUserList(offset * DATA_LIMIT);
  //     setData([...(data || []), ...result]);
  //     setPage((cur) => cur + 1);
  //     if (result.length === 0) setIsAllRendered(true);
  //     setIsLoading(false);
  //   };
  //   const { setTarget } = useIntersectionObserver({
  //     root: null,
  //     rootMargin: "0px",
  //     threshold: 0.5,
  //     // onIntersect: async ([{ isIntersecting }]) => {
  //     //   if (isIntersecting && !isLoading) {
  //     //     !isSearched ? await getMoreDataWithAPI() : getMoreDataWithState();
  //     //   }
  //     // },
  //   });
  //   return {
  //     setTarget,
  //     data,
  //     isLoading,
  //     setIsLoading,
  //     isAllRendered,
  //     initAllStateAndGetDataWithAPI,
  //   };
};

export default useInfiniteScroll;
