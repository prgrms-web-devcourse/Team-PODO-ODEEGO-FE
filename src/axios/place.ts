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
        url: `/v1/places?stationName=${stationName}&category=${category}&page=${page}&size=${size}`,
      });

      return data;
    } catch (e) {
      console.error(e);
      if (axios.isAxiosError(e)) {
        const { response } = e;
        const errorMessage = response?.data?.message;
        throw new Error(errorMessage);
      }
      return true;
    }
  },
};
