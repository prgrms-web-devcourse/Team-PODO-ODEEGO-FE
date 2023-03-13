import HTTP from "./config/axios-instance";
import { getLocalStorage } from "@/utils/storage";
import axios from "axios";
import { CustomError } from "@/constants/custom-error";

export const GetMyStartpoint = async () => {
  const accessToken = getLocalStorage("token");

  const RequestUrl = `/v1/members/defaultStation`;
  try {
    const { data } = await HTTP.get({
      url: RequestUrl,
      headers: {
        Authorization: accessToken,
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
    throw new Error("axios/get-my-startpoint error: fail to getMyStartStation");
  }
};

export default GetMyStartpoint;
