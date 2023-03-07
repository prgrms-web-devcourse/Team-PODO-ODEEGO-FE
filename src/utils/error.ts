import { ERROR_TEXT } from "@/constants/error";
import { searchProps } from "@/types/search-props";

const { ERROR_DUPLICATE_START_POINT, ERROR_MISSING_START_POINT } = ERROR_TEXT;

export const validateAddressListUnderTwoLength = (
  addressList: searchProps[]
) => {
  if (addressList.length < 2) {
    return ERROR_MISSING_START_POINT;
  }

  if (addressList.length === 2) {
    const one = addressList[0];
    const two = addressList[1];

    if (
      one.stationName === two.stationName &&
      one.lat === two.lat &&
      one.lng === two.lng
    ) {
      return ERROR_DUPLICATE_START_POINT;
    }
  }

  return "";
};
