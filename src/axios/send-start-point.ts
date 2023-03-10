import { StartPointPros } from "@/types/startpoint-props";
import axios from "axios";
import HTTP from "./config/axios-instance";
import { getLocalStorage } from "@/utils/storage";

export const SearchAPI22 = {
  NonHostSendStartPoint: async (value: StartPointPros) => {
    const accessToken = getLocalStorage("token");

    try {
      const { data } = await HTTP.post({
        url: `/v1/groups/startpoint/nonhost`,
        headers: {
          Authorization: `bearer ${accessToken}`,
        },
        data: {
          value: value,
        },
      });

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
    const accessToken = getLocalStorage("token");

    console.log(`Host Send Start Point: ${value}`);
    try {
      const result = await HTTP.patch({
        url: `/v1/groups/startpoint/host`,
        headers: {
          Authorization: accessToken,
        },
        data: {
          value: value,
        },
      });

      return result;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.log(
          "Error IN: axios/send-start-point/SearchAPI22 HostSendStartPoint"
        );
        console.log(e);
      }
      throw new Error(
        "Error IN: axios/send-start-point/SearchAPI22 HostSendStartPoint"
      );
    }
  },
};
