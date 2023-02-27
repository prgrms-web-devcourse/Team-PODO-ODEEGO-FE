import HTTP from "./config/axios-instance";

export const GroupsApi = {
  getAll: async () => {
    try {
      const { data } = await HTTP.get({
        //TODO
        // - /v1/groups api로 바꿀 것
        // - axios instance에 accessToken 추가 : refreshToken이 있어서... 잠시 보류
        url: "/v1/groups",
      });

      return { groups: [{ groupId: "", capacity: 4 }] };
    } catch (e) {
      console.error(e);
    }
  },
};
