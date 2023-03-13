import { StartPointPros } from "@/types/startpoint-props";
import axios from "axios";
import HTTP from "./config/axios-instance";
import { getLocalStorage } from "@/utils/storage";

const ERROR_DEFAULT_MSG = "오류가 발생했습니다.";

export const SearchAPI22 = {
  NonHostSendStartPoint: async (value: StartPointPros) => {
    const accessToken = getLocalStorage("token");

    try {
      const { data } = await HTTP.post({
        url: `/v1/groups/startpoint/nonhost`,
        headers: {
          Authorization: accessToken,
        },
        data: {
          value: value,
        },
      });

      return data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const { response } = err;
        const errorMessage = response?.data?.error || ERROR_DEFAULT_MSG;
        throw new Error(errorMessage);
      }
      throw new Error("axios/send-start-point error: NonHostSend");
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
    } catch (err) {
      console.error(err);
      if (axios.isAxiosError(err)) {
        const { response } = err;
        const errorMessage = response?.data?.error || ERROR_DEFAULT_MSG;
        throw new Error(errorMessage);
      }
      throw new Error("axios/send-start-point error: HostSendStartPoint");
    }
  },
};
