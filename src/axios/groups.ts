import { GroupDetailResponse } from "@/types/api/group";
import { removeLocalStorage } from "@/utils/storage";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import HTTP from "./config/axios-instance";
import { LOCAL_STORAGE } from "@/constants";

const { TOKEN, LOGOUT_TOKEN } = LOCAL_STORAGE;

const ERROR_DEFAULT_MSG = "오류가 발생했습니다.";
const ERROR_CODE_REMOVE_LOCAL_STORAGE = "MOO1";

export const GroupsApi = {
  getAll: async () => {
    try {
      const { data } = await HTTP.get({
        url: "/v1/groups",
      });

      return data;
    } catch (e) {
      console.error(e);
      if (axios.isAxiosError(e)) {
        const data = e.response?.data;

        if (data.errorCode === ERROR_CODE_REMOVE_LOCAL_STORAGE) {
          removeLocalStorage(LOGOUT_TOKEN);
          removeLocalStorage(TOKEN);
        }

        const errorMessage = data.error || ERROR_DEFAULT_MSG;
        throw new Error(errorMessage);
      }
    }
  },
  postCreateGroup: async (count: string) => {
    try {
      const { data } = await HTTP.post({
        url: "/v1/groups/post",
        data: {
          capacity: count,
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
