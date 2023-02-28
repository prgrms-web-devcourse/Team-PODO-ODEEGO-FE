import axios from "axios";

export const SearchAPI = {
  getSubway: async (value: string) => {
    try {
      const result = await axios.get(
        `http://dapi.kakao.com/v2/local/search/keyword.json?query=${value}&category_group_code=SW8`,
        {
          headers: {
            Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_SEARCH_KEY}`,
          },
        }
      );

      // result 에서 data 만 꺼내서 return 할까?
      return result.data.documents;
    } catch (err) {
      throw new Error((<Error>err).message);
    }
  },
};
