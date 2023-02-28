import axios from "axios";

interface StartPointPros {
  groupId: string;
  stationName: string;
  lat: number;
  lng: number;
}

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

  sendStartPoint: async (value: StartPointPros) => {
    console.log(value);
    try {
      const result = await axios.patch(
        `http://52.78.224.123:8080/api/v1/mid-points/starts`,
        {
          body: {
            value,
          },
        }
      );

      return result;
    } catch (err) {
      throw new Error((<Error>err).message);
    }
  },
};
