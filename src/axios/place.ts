import axios from "axios";
import HTTP from "./config/axios-instance";

export const PlaceApi = {
  getPlaces: async (stationName: string, category: string) => {
    try {
      const { data } = await HTTP.get({
        url: `/v1/places?stationName=${stationName}&category=${category}`,
      });

      //TODO: 지우기 (Loading component확인을 위한 코드)
      // await (() => new Promise((r) => setTimeout(r, 3000)))();

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
