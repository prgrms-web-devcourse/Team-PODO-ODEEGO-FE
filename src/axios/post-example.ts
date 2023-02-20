import HTTP from "./config/axios-instance";

export const PostsAPI = {
  getAll: async () => {
    try {
      const { data } = await HTTP.get("/posts");

      return data;
    } catch (e) {
      console.error(e);
    }
  },
  getOnePost: async (id: string) => {
    try {
      const { data } = await HTTP.get(`/posts/${id}`);

      return data;
    } catch (e) {
      console.error(e);
    }
  },
};
