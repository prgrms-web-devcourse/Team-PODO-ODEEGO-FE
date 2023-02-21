export const SearchAPI = {
  getSubway: async (value: string) => {
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
