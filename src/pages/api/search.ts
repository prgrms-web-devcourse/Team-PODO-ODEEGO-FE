import axios from "axios";
import { StartPointPros } from "@/types/startpoint-props";

// interface StartPointPros {
//   groupId: string;
//   stationName: string;
//   lat: number;
//   lng: number;
// }

export const SearchAPI = {
  getSubway: async (value: string | undefined) => {
    try {
      const result = await axios.get(
        `https://dapi.kakao.com/v2/local/search/keyword.json?query=${value}&category_group_code=SW8`,
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
        `${process.env.NEXT_PUBLIC_API_END_POINT}/api/v1/groups/b6deb966-8179-43db-9f08-ec5271cbaccc/group-members?memberId=99`,
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

  // sendStartPoint의 이름을 바꾸려 했으나 어느 곳에서 사용되고 있는지 전부 파악되지 않아 임시로 생성함.
  NonHostSendStartPoint: async (value: StartPointPros) => {
    console.log(`Non Host Send Start Point: ${value}`);
    try {
      const result = await axios.post(
        `${process.env.NEXT_PUBLIC_API_END_POINT}/api/v1/groups/b6deb966-8179-43db-9f08-ec5271cbaccc/group-members?memberId=99`,
        {
          stationName: "압구정역",
          lat: value.lat,
          lng: value.lng,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return result;
    } catch (err) {
      console.log(err);
      throw new Error((<Error>err).message);
    }
  },

  HostSendStartPoint: async (value: StartPointPros) => {
    console.log(`Host Send Start Point: ${value}`);
    try {
      const result = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_END_POINT}/api/v1/groups/b6deb966-8179-43db-9f08-ec5271cbaccc/host?memberId=99`,
        {
          stationName: "백석역",
          lat: value.lat,
          lng: value.lng,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return result;
    } catch (err) {
      console.log(err);
      throw new Error((<Error>err).message);
    }
  },
};
