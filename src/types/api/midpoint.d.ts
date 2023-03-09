import { SUBWAY } from "@/constants/css";

export interface BaseResponse {
  id: string;
  stationName: string;
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
  midPointResponses: EndpointResponse[];
}
