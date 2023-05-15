import { ERROR_CLIENT_TEXT } from "@/constants/error";
import { searchProps } from "@/types/search-props";

const { ERROR_DUPLICATE_START_POINT, ERROR_MISSING_START_POINT } =
  ERROR_CLIENT_TEXT;

export const validateAddressListUnderTwoLength = (
  addressList: searchProps[]
) => {
  if (addressList.length < 2) {
    return ERROR_MISSING_START_POINT;
  }

  let prevAddress = addressList[0];
  for (const curAddress of addressList) {
    const { lat: pLat, lng: pLng } = prevAddress;
    const { lat: cLat, lng: cLng } = curAddress;

    if (pLat !== cLat || pLng !== cLng) return "";

    prevAddress = curAddress;
  }

  return ERROR_DUPLICATE_START_POINT;
};
