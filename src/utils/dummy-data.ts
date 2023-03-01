import { MidpointResponse } from "@/types/api/midpoint";

export const dummyData: MidpointResponse = {
  start: [
    {
      id: "dsksjfn3",
      stationName: "강남역",
      address: "강남대로 무슨로 무슨길 711",
      lat: 37.5172,
      lng: 127.0473,
    },
    {
      id: "dfkhss3",
      stationName: "판교역",
      address: "강남대로 무슨로 무슨길 711",
      lat: 37.3948,
      lng: 127.1112,
    },
    {
      id: "kdfhauiehr3",
      stationName: "오리역",
      address: "강남대로 무슨로 무슨길 711",
      lat: 37.3398,
      lng: 127.109,
    },
  ],
  midpoints: [
    {
      id: "fddffssssf",
      stationName: "강남역A",
      address: "강남대로 무슨로 무슨길 711",
      lat: 37.5172,
      lng: 127.0473,
      line: 2,
      path: [
        {
          startStation: "강남역A",
          time: 80,
          stations: [
            {
              id: "dsksjfn3",
              stationName: "강남역",
              address: "강남대로 무슨로 무슨길 711",
              lat: 37.5172,
              lng: 127.0473,
            },
            {
              id: "dfkhss3",
              stationName: "판교역",
              address: "강남대로 무슨로 무슨길 711",
              lat: 37.3948,
              lng: 127.1112,
            },
            {
              id: "kdfhauiehr3",
              stationName: "오리역",
              address: "강남대로 무슨로 무슨길 711",
              lat: 37.3398,
              lng: 127.109,
            },
          ],
        },
      ],
    },
    {
      id: "3fjsd9fd",
      stationName: "강남역B",
      address: "강남대로 무슨로 무슨길 711",
      lat: 37.5172,
      lng: 127.0473,
      line: 2,
      path: [
        {
          startStation: "강남역A",
          time: 80,
          stations: [
            {
              id: "dsksjfn3",
              stationName: "강남역",
              address: "강남대로 무슨로 무슨길 711",
              lat: 37.5172,
              lng: 127.0473,
            },
            {
              id: "dfkhss3",
              stationName: "판교역",
              address: "강남대로 무슨로 무슨길 711",
              lat: 37.3948,
              lng: 127.1112,
            },
            {
              id: "kdfhauiehr3",
              stationName: "오리역",
              address: "강남대로 무슨로 무슨길 711",
              lat: 37.3398,
              lng: 127.109,
            },
          ],
        },
      ],
    },
    {
      id: "dfssljdfl3",
      stationName: "판교역",
      address: "강남대로 무슨로 무슨길 711",
      lat: 37.3948,
      lng: 127.1112,
      line: "신분당",
      path: [
        {
          startStation: "강남역A",
          time: 80,
          stations: [
            {
              id: "dsksjfn3",
              stationName: "강남역",
              address: "강남대로 무슨로 무슨길 711",
              lat: 37.5172,
              lng: 127.0473,
            },
            {
              id: "dfkhss3",
              stationName: "판교역",
              address: "강남대로 무슨로 무슨길 711",
              lat: 37.3948,
              lng: 127.1112,
            },
            {
              id: "kdfhauiehr3",
              stationName: "오리역",
              address: "강남대로 무슨로 무슨길 711",
              lat: 37.3398,
              lng: 127.109,
            },
          ],
        },
      ],
    },
  ],
};
