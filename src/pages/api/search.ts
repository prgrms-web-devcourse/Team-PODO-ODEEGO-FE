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

      return result.data.documents;
    } catch (err) {
      throw new Error((<Error>err).message);
    }
  },

  sendStartPoint: async (value: object) => {
    try {
      const result = await axios.patch(
        `http://52.78.224.123:8080/api/v1/mid-points/starts`,
        {
          body: {
            groupId: "백엔드에서 만든 그룹 아이디", // value.groupId
            stationName: "출발지A역", // value.stationName
            lat: 1.123123, // value.lat
            lng: 11.123123, // value.lng
          },
        }
      );

      return result;
    } catch (err) {
      throw new Error((<Error>err).message);
    }
  },
};
