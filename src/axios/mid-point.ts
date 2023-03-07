import { searchProps } from "@/types/search-props";
import axios from "axios";
import HTTP from "./config/axios-instance";

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

      const result = {
        start: [],
        midPointResponses: [],
      };

      result.start = data.start.map((s: searchProps) => ({
        stationName: s.stationName,
        lat: s.lat,
        lng: s.lng,
        address: s.address,
      }));

      console.log(data);
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
