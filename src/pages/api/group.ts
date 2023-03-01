import { GroupDetailResponse } from "@/types/api/group";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const fetchGroup = async (groupId: string, token: string) => {
  try {
    // **TODO: 모임 상세 정보 찾기 API로 변경
    const { data } = await axios.get<GroupDetailResponse>(
      `https://52.78.224.123:8080/api/test/groups/${groupId}`
    );
    console.log(token);

    return data;
  } catch (error) {
    throw error;
  }
};

const createGroup = async (memberId: string, capacity: number) => {
  try {
    axios.post(
      `https://52.78.224.123:8080/api/test/?
    member-id=${memberId}`,
      {
        capacity: capacity,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    throw error;
  }
};

const deleteGroup = async (groupId: string, token: string) => {
  try {
    await axios.delete(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/groups/${groupId}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
  } catch (error) {
    throw error;
  }
};

const useGroup = (groupId: string, token: string) => {
  return useQuery(["group"], () => fetchGroup(groupId, token), {
    refetchOnMount: true,
    staleTime: 10000,
  });
};

export { useGroup, fetchGroup, deleteGroup, createGroup };
