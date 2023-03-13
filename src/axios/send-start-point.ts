import { StartPointPros } from "@/types/startpoint-props";
import axios from "axios";
import HTTP from "./config/axios-instance";
import { getLocalStorage } from "@/utils/storage";
import { CustomError } from "@/constants/custom-error";
import { toast } from "react-hot-toast";

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
        const errorCode = err.response?.data.errorCode;

        if (CustomError[errorCode]) {
          throw new Error(`${err.response?.data.error}`);
        } else if (err.response?.status) {
          throw new Error("unknown Error");
        }
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
      if (axios.isAxiosError(err)) {
        const errorCode = err.response?.data.status;

        toast.error(err.response?.data.error);

        if (CustomError[errorCode]) {
          throw new Error(`${err.response?.data.error}`);
        } else if (err.response?.status) {
          throw new Error("unknown Error");
        }
      }
      throw new Error("axios/send-start-point error: HostSendStartPoint");
    }
  },
};
