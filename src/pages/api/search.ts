import axios from "axios";
import { StartPointPros } from "@/types/startpoint-props";

export const SearchAPI = {
  getSubway: async (value: string | undefined) => {
    try {
      const result = await axios.get(
        `${process.env.NEXT_PUBLIC_API_END_POINT_KAKAO}/v2/local/search/keyword.json?query=${value}&category_group_code=SW8`,
        {
          headers: {
            Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`,
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
        `${process.env.NEXT_PUBLIC_API_END_POINT_ODEEGO}/api/v1/groups/b6deb966-8179-43db-9f08-ec5271cbaccc/group-members?memberId=99`,
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
        `${process.env.NEXT_PUBLIC_API_END_POINT_ODEEGO}/api/v1/groups/${value.groupId}/group-members?memberId=${value.memberId}`,
        {
          stationName: value.stationName,
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

  // sendStartPoint의 이름을 바꾸려 했으나 어느 곳에서 사용되고 있는지 전부 파악되지 않아 임시로 생성함.
  HostSendStartPoint: async (value: StartPointPros) => {
    console.log(`Host Send Start Point: ${value}`);
    try {
      const result = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_END_POINT_ODEEGO}/api/v1/groups/${value.groupId}/host?memberId=${value.memberId}`,
        {
          stationName: value.stationName,
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
