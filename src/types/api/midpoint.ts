import { SUBWAY } from "@/constants/css";

export interface BaseResponse {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
}

export interface PathResponse {
  startStation: string;
  time: number;
  stations: BaseResponse[];
}

export interface EndpointResponse extends BaseResponse {
  line: keyof typeof SUBWAY;
  path: PathResponse[];
}

export interface MidpointResponse {
  start: BaseResponse[];
  midpoints: EndpointResponse[];
}

export const DefaultMidpointValue = {
  start: [
    {
      id: "",
      name: "",
      address: "",
      lat: 37.5172,
      lng: 127.0473,
    },
  ],
  end: [
    {
      id: "",
      name: "",
      address: "",
      lat: 37.5172,
      lng: 127.0473,
      start: [
        {
          name: "",
          address: "",
          time: 80,
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
