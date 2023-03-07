import { searchProps } from "@/types/search-props";
import axios from "axios";
import HTTP from "./config/axios-instance";

export const MidPointApi = {
  postMidPoint: async (addressList: searchProps[]) => {
    try {
      const { data } = await HTTP.post({
        url: "/v1/mid-point/search",
        data: {
          stations: addressList,
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
