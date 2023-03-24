import React, { useState } from "react";
import { searchOriginProps } from "@/types/search-props";
import checkSignup from "@/utils/check-signup";
import { errorType, valueType } from "@/types/register-props";
import { useRouter } from "next/router";
import { getLocalStorage } from "@/utils/storage";
import { axiosInstanceWitToken } from "@/axios/instance";

interface isErrorProps {
  nickname: boolean;
  defaultStationName: boolean;
}

const useSignupSearch = () => {
  const [values, setValue] = useState<Partial<valueType>>({});
  const [errorMessage, setErrorMessage] = useState<Partial<errorType>>({});
  const [isError, setIsError] = useState<isErrorProps>({
    nickname: false,
    defaultStationName: false,
  });

  const [isToggleBoxLoading, setToggleBoxIsLoading] = useState(true);

  const [, setToken] = useState("");

  const router = useRouter();

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    checkSignup.StationAndNickName(
      name,
      value,
      errorMessage,
      setErrorMessage,
      setIsError
    );
    setValue({
      ...values,
      [name]: value,
    });
  };

  const handleKeyDownStation = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.keyCode) {
      case 8:
        setToggleBoxIsLoading(true);
        break;
    }
  };

  const handleClickLocation = (val: searchOriginProps) => {
    setToggleBoxIsLoading(false);

    setToken(getLocalStorage("token"));
    setValue({
      ...values,
      defaultStationName: val.place_name,
    });
  };

  const handleSubmitSignup = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const registerUrl = `${process.env.NEXT_PUBLIC_API_END_POINT_ODEEGO}/api/v1/members/sign-up`;

    const data = {
      nickname: values.nickname,
      defaultStationName: values.defaultStationName,
    };

    const response = await axiosInstanceWitToken.patch(registerUrl, data);

    if (response.status === 200) {
      router.push("/");
    }
  };

  return {
    errorMessage,
    isToggleBoxLoading,
    values,
    handleSubmitSignup,
    handleClickLocation,
    handleKeyDownStation,
    handleChangeValue,
    isError,
  };
};
export default useSignupSearch;
