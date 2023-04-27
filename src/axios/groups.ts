import { GroupDetailResponse } from "@/types/api/group";
import { removeLocalStorage } from "@/utils/storage";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import HTTP from "./config/axios-instance";

const ERROR_DEFAULT_MSG = "오류가 발생했습니다.";

export const GroupsApi = {
  getAll: async (token: string) => {
    try {
      const { data } = await HTTP.get({
        url: "/v1/groups",
        headers: {
          Authorization: token,
        },
      });

      return data;
    } catch (e) {
      console.error(e);
      if (axios.isAxiosError(e)) {
        const data = e.response?.data;

        if (data.errorCode === "M001") {
          removeLocalStorage("logoutToken");
          removeLocalStorage("token");
        }

        const errorMessage = data.error || ERROR_DEFAULT_MSG;
        throw new Error(errorMessage);
      }
    }
  },
  postCreateGroup: async (token: string, count: string) => {
    try {
      const { data } = await HTTP.post({
        url: "/v1/groups/post",
        data: {
          capacity: count,
        },
        headers: {
          Authorization: token,
        },
      });

      return data;
    } catch (e) {
      console.error(e);
      if (axios.isAxiosError(e)) {
        const { response } = e;
        const errorMessage = response?.data?.error || ERROR_DEFAULT_MSG;
        throw new Error(errorMessage);
      }
    }
  },
  getGroup: async (groupId: string, token: string) => {
    try {
      if (!groupId) return null;

      const { data } = await HTTP.get<GroupDetailResponse>({
        url: `/v1/groups/${groupId}`,
        headers: {
          Authorization: token,
        },
      });

      return data;
    } catch (e) {
      console.error(e);
      if (axios.isAxiosError(e)) {
        const { response } = e;
        const errorMessage = response?.data?.error || ERROR_DEFAULT_MSG;
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
    } catch (e) {
      console.error(e);
      if (axios.isAxiosError(e)) {
        const { response } = e;
        const errorMessage = response?.data?.error || ERROR_DEFAULT_MSG;
        throw new Error(errorMessage);
      }
    }
  },
};

const useGroupDetail = (groupId: string, token: string) => {
  return useQuery(
    ["group", groupId],
    () => GroupsApi.getGroup(groupId, token),
    {
      keepPreviousData: true,
    }
  );
};

export { useGroupDetail };
