import { EndpointResponse } from "@/types/api/midpoint";
import { searchProps } from "@/types/search-props";
import axios from "axios";
import HTTP from "@/axios/config/axios-instance";

export const MidPointApi = {
  postMidPoint: async (addressList: searchProps[]) => {
    try {
      const { data } = await HTTP.post({
        url: "/v1/mid-point/search",
        data: {
          stations: addressList,
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
      }));

      result.midPointResponses = data.midPointResponses.map(
        (m: EndpointResponse) => ({
          id: m.id,
          address: m.address,
          lat: m.lat,
          lng: m.lng,
          line: m.line,
          path: m.path,
          stationName: m.stationName,
        })
      );

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
