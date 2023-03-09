import { StartPointPros } from "@/types/startpoint-props";
import axios from "axios";
import HTTP from "./config/axios-instance";

export const SearchAPI22 = {
  NonHostSendStartPoint: async (value: StartPointPros) => {
    console.log(`Non Host Send Start Point: ${value}`);
    try {
      const { data } = await HTTP.post({
        url: `/v1/groups/startpoint/nonhost`,
        data: {
          value: value,
        },
      });

      console.log(`result`);
      return data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.log("axios send-start-point SearchAPI22 NonHostSendStartPoint");
        console.log(e.response?.data);
      }
      throw new Error("axios send-start-point error");
    }
  },

  HostSendStartPoint: async (value: StartPointPros) => {
    console.log(`Host Send Start Point: ${value}`);
    try {
      const result = await HTTP.patch({
        url: `/v1/groups/startpoint/host`,
        data: {
          value: value,
        },
      });

      return result;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.log("axios send-start-point SearchAPI22 HostSendStartPoint");
        console.log(e);
      }
      throw new Error("axios send-start-point error");
    }
  },
};
