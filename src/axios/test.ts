import axios from "axios";
import HTTP from "./config/axios-instance";

export const TestApi = {
  postDummyUser: async (nickname: string) => {
    try {
      const { data } = await HTTP.post({
        //TODO
        // - 지우기
        url: `/test/members?nickname=${nickname}`,
      });

      console.log(data);

      return data;
    } catch (e) {
      console.error(e);
      if (axios.isAxiosError(e) && e.response?.status === 400) {
        return { error: "Error", status: 400 };
      }
    }
  },
};
