import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const API_END_POINT = process.env.NEXT_PUBLIC_API_END_POINT;

const ERROR_NOT_FOUND_404 = "ERROR: Not found";
const ERROR_INTERNAL_SERVER_500 = "네트워크 오류";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { stationName, category } = req.query;
  const requestUrl = `${API_END_POINT}/api/v1/places?station-name=${stationName}${
    category ? `&category=${category}` : ""
  }`;
  console.log(
    `API routes(/api/v1/places?station-name=&category=): ${requestUrl}`
  );

  try {
    // const { data } = await axios({
    //   url: requestUrl,
    //   method: "get",
    // });

    res.status(200).json({ places: dummy.places.slice(0, 5) });
  } catch (e) {
    console.error(e);
    if (axios.isAxiosError(e)) {
      const { response } = e;

      if (response && response.status === 404) {
        res.status(404).json({ message: ERROR_NOT_FOUND_404, status: 404 });
      } else {
        res
          .status(500)
          .json({ message: ERROR_INTERNAL_SERVER_500, status: 500 });
      }
    }
  }
}

const dummy = {
  places: [
    {
      businessName: "어글리스토브 신논현강남역점",
      address: "서울특별시 강남구 강남대로98길 20",
    },
    {
      businessName: "헤이스테이",
      address: "서울특별시 강남구 봉은사로6길 39 1층(역삼동)",
    },
    {
      businessName: "트리오드",
      address: "서울특별시 강남구 강남대로94길 28 유니언타운 L층",
    },
    {
      businessName: "썸띵어바웃커피",
      address: "서울특별시 강남구 강남대로102길 30 1, 2, 3층",
    },
    {
      businessName: "프라텔리",
      address: "서울특별시 강남구 봉은사로4길 31 지하1층, 지상1층",
    },
    {
      businessName: "알베르",
      address: "서울특별시 강남구 강남대로102길 34",
    },
    {
      businessName: "더달달",
      address: "서울특별시 강남구 강남대로102길 38-6",
    },
    {
      businessName: "노티드 강남 카카오",
      address: "서울특별시 서초구 강남대로 429",
    },
    {
      businessName: "트라가 강남역점",
      address: "서울특별시 서초구 강남대로55길 24 2층 201호 트라가",
    },
    {
      businessName: "구구당",
      address: "서울특별시 강남구 강남대로102길 35 구구당",
    },
    {
      businessName: "감성타코 강남역점",
      address: "서울특별시 강남구 강남대로 406 지하1층 감성타코",
    },
    {
      businessName: "땀땀",
      address: "서울특별시 강남구 강남대로98길 12-5",
    },
    {
      businessName: "마초쉐프 강남본점",
      address: "서울특별시 강남구 강남대로106길 29 1층",
    },
    {
      businessName: "쉐이크쉑 강남점",
      address: "서울특별시 강남구 강남대로 452 (역삼동) 1층",
    },
    {
      businessName: "바비레드 강남본점",
      address: "서울특별시 강남구 봉은사로6길 39 바비레드",
    },
  ],
};
