import axios from "axios";
import HTTP from "./config/axios-instance";

export const GroupsApi = {
  getAll: async (memberId: string) => {
    try {
      const { data } = await HTTP.get({
        //TODO
        // - axios instance에 accessToken 추가 : refreshToken이 있어서... 잠시 보류
        url: `/v1/groups?memberId=${memberId}`,
      });
      console.log(data);
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
      console.error(e);
      if (axios.isAxiosError(e)) {
        const { response } = e;
        const errorMessage = response?.data?.message;
        throw new Error(errorMessage);
      }
    }
  },
  deleteGroup: async (groupId: string, token: string) => {
    try {
      const { data } = await HTTP.delete({
        url: `/v1/groups/delete?groupId=${groupId}`,
        headers: {
          Authorization: token,
        },
      });

      return data;
    } catch (error) {
      throw error;
    }
  },
};
