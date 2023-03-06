import React, { useState } from "react";
import { searchOriginProps } from "@/types/search-props";
import checkSignup from "@/utils/check-signup";
import { errorType, valueType } from "@/types/register-props";
import { useRouter } from "next/router";
import axios from "axios";
import { getLocalStorage } from "@/utils/storage";

const useSignupSearch = () => {
  const [values, setValue] = useState<Partial<valueType>>({});
  const [errorMessage, setErrorMessage] = useState<Partial<errorType>>({});

  const [isToggleBoxLoading, setToggleBoxIsLoading] = useState(true);

  const [token, setToken] = useState("");

  const router = useRouter();
  console.log(token);

  const handleValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    checkSignup.StationAndNickName(name, value, errorMessage, setErrorMessage);
    setValue({
      ...values,
      [name]: value,
    });
  };

  const handleStationKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.keyCode) {
      case 8:
        setToggleBoxIsLoading(true);
        break;
    }
  };

  const handleLocationClick = (val: searchOriginProps) => {
    setToggleBoxIsLoading(false);

    setToken(getLocalStorage("token"));
    setValue({
      ...values,
      defaultStationName: val.place_name,
    });
  };

  // const [str, setString] = useState("");

  const handleSignUpSubmit = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const registerUrl = `${process.env.NEXT_PUBLIC_API_END_POINT_ODEEGO}/api/v1/members/sign-up`;

    console.log(registerUrl);
    const data = {
      nickname: values.nickname,
      defaultStationName: values.defaultStationName,
    };

    const response = await axios.patch(registerUrl, data, {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("token") || ""
        )}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      router.push("/");
    }
    console.log(response);
  };

  return {
    errorMessage,
    isToggleBoxLoading,
    values,
    handleSignUpSubmit,
    handleLocationClick,
    handleStationKeyDown,
    handleValue,
  };
};
export default useSignupSearch;
