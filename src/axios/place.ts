import axios from "axios";
import HTTP from "./config/axios-instance";

export const PlaceApi = {
  getPlaces: async (
    stationName: string,
    category: string,
    page: number,
    size: number
  ) => {
    try {
      const { data } = await HTTP.get({
        url: `/v1/places?stationName=${stationName}&category=${category}&page=${page}${
          size ? `&size=${size}` : ""
        }`,
      });

      //TODO: 지우기 (Loading component확인을 위한 코드)
      await (() => new Promise((r) => setTimeout(r, 2000)))();

      return data;
    } catch (e) {
      console.error(e);
      if (axios.isAxiosError(e)) {
        const { response } = e;
        const errorMessage = response?.data?.message;
        throw new Error(errorMessage);
      }
    }
  },
};
