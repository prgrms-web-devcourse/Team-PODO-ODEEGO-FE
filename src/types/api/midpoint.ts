import { SUBWAY } from "@/constants/css";

export interface BaseResponse {
  id: string;
  name: string;
  address?: string | null;
  lat: number;
  lng: number;
}

export interface StationResponse {
  id?: string; //dummy-data를 위해 잠시 추가
  name: string;
  address?: string | null;
  lat: number;
  lng: number;
}

export interface PathResponse {
  startStation: string;
  time: number;
  stations: StationResponse[];
}

export interface EndpointResponse extends BaseResponse {
  line: keyof typeof SUBWAY;
  path: PathResponse[];
}

export interface MidpointResponse {
  start: StationResponse[];
  midPointResponses: EndpointResponse[];
}

export const DefaultMidpointValue = {
  start: [
    //StationResponse[]
    {
      name: "",
      address: "", //null
      lat: 37.5172,
      lng: 127.0473,
    },
  ],
  midPointResponses: [
    {
      //BaseResponse
      id: "",
      name: "",
      address: "", //null
      lat: 37.5172,
      lng: 127.0473,
      line: "3호선",
      path: [
        //StationResponse[]
        {
          startStation: "강남역",
          time: 1,
          path: [
            {
              name: "",
              address: "",
              lat: 37.5172,
              lng: 127.0473,
            },
          ],
        },
      ],
    },
    {
      id: "",
      name: "",
      address: "", //null
      lat: 37.5172,
      lng: 127.0473,
      line: "3호선",
      path: [
        {
          startStation: "잠실역",
          time: 1,
          path: [
            {
              name: "",
              address: "",
              lat: 37.5172,
              lng: 127.0473,
            },
          ],
        },
      ],
    },
  ],
};
