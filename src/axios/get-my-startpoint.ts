import HTTP from "./config/axios-instance";
import { getLocalStorage } from "@/utils/storage";
import axios from "axios";

const ERROR_DEFAULT_MSG = "오류가 발생했습니다.";

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
    console.error(err);
    if (axios.isAxiosError(err)) {
      const { response } = err;
      const errorMessage = response?.data?.error || ERROR_DEFAULT_MSG;
      throw new Error(errorMessage);
    }
    throw new Error("axios/get-my-startpoint error: fail to getMyStartStation");
  }
};

export default GetMyStartpoint;
