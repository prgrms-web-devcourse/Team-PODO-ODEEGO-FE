import axios from "axios";

export const PlaceAPI = {
  // http://52.78.224.123:8080/api/v1/places?station-name=강남역&address=서울 강남구 강남대로 396&category=RESTAURANT
  getPlace: async (
    stationName: string | undefined,
    address: string | undefined,
    category: string | undefined
  ) => {
    const response = await axios.get(
      `http://52.78.224.123:8080/api/v1/places?station-name=${stationName}&address=${address}&category=${category}`
    );

    return response.data.places;
  },
};
