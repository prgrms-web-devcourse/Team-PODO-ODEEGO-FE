import { errorType } from "@/types/register-props";
import { omit } from "lodash";

type StateWithoutStation = Pick<
  errorType,
  "nickname" | "nickname_len" | "defaultStationName"
>;

//ㅇㄴ
const checkSignup = {
  StationAndNickName: (
    name: string,
    value: string,
    errorMessage: Partial<errorType>,
    setErrorMessage: (arg: Pick<StateWithoutStation, never>) => void,
    setIsError: any
  ) => {
    switch (name) {
      case "defaultStationName":
        if (!value.includes("역")) {
          setErrorMessage({
            ...errorMessage,
            defaultStationName: "역만 입력해주세요",
          });
        } else {
          const newObj = omit(errorMessage, "defaultStationName");
          setErrorMessage(newObj);
        }
        break;

      case "nickname":
        if (!(value.length <= 20 && value.length >= 3)) {
          setErrorMessage({
            ...errorMessage,
            nickname_len: "닉네임은 3자 이상 20자이하로 입력해주세요",
          });
          setIsError(true);
        } else if (
          !new RegExp(
            /^[가-힣|ㄱ-ㅎ][^!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\s]*$/
          ).test(value)
        ) {
          setErrorMessage({
            ...errorMessage,
            nickname:
              "닉네임에 특수문자가 포함되면 안되고 한글만 입력가능합니다.",
          });
        } else {
          const newObj = omit(errorMessage, "nickname", "nickname_len");
          setErrorMessage(newObj);
          setIsError(false);
        }
        break;
    }
  },
};
export default checkSignup;
