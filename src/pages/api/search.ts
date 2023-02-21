export const SearchAPI = {
  getSubway: async (value: string) => {
    // const API_KEY = `06d31e08cffa1b28d94af0313467cde8`;
    try {
      const result = await fetch(
        `http://dapi.kakao.com/v2/local/search/keyword.json?query=${value}&category_group_code=SW8`,
        {
          headers: {
            Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_SEARCH_KEY}`,
          },
        }
      );

      return await result.json();
    } catch (e: unknown) {
      if (e instanceof Error) {
        alert(e);
      }
    }
  },
};
