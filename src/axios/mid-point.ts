import { searchProps } from "@/types/search-props";
import axios from "axios";
import HTTP from "@/axios/config/axios-instance";

export const MidPointApi = {
  postMidPoint: async (addressList: searchProps[]) => {
    const filteredAddressList = addressList
      .filter((a) => a.address !== "")
      .map((a) => {
        return {
          stationName: a.stationName.split(" ")[0],
          lat: parseFloat(a.lat),
          lng: parseFloat(a.lng),
        };
      });

    try {
      const { data } = await HTTP.post({
        url: "/v1/mid-point/search",
        data: {
          stations: filteredAddressList,
        },
      });

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
