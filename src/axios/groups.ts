import axios from "axios";
import HTTP from "./config/axios-instance";

export const GroupsApi = {
  getAll: async () => {
    try {
      const { data } = await HTTP.get({
        //TODO
        // - axios instance에 accessToken 추가 : refreshToken이 있어서... 잠시 보류
        url: "/v1/groups",
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
  postCreateGroup: async (id: number, count: number) => {
    try {
      const { data } = await HTTP.post({
        //TODO
        // - 현재는 test용 api
        // - axios instance에 accessToken 추가 : refreshToken이 있어서... 잠시 보류
        url: `/v1/groups/post?memberId=${id}`,
        data: {
          capacity: count,
        },
      });

      console.log(data);

      return data;
    } catch (e) {
      if (axios.isAxiosError(e) && e.response?.status === 400) {
        return { error: "Error", status: 400 };
      }
    }
  },
};
