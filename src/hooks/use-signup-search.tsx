import React, { useState } from "react";
import { searchOriginProps } from "@/types/search-props";
import checkSignup from "@/utils/check-signup";
import { errorType, valueType } from "@/types/register-props";
import { useRouter } from "next/router";
import axios from "axios";

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

    setToken(localStorage.getItem("token") || "");
    setValue({
      ...values,
      defaultStationName: val.place_name,
    });
  };

  // const [str, setString] = useState("");

  const handleSignUpSubmit = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const registerUrl = `${process.env.NEXT_PUBLIC_API_END_POINT_ODEEGO}/api/v1/members/sign-up`;

    const data = {
      nickname: values.nickname,
      defaultStationName: values.defaultStationName,
    };

    const response = await axios.patch(registerUrl, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      router.push("/");
    }
    console.log(response);

    // Axios 바꾸기 전 코드
    // const res = await fetch(
    //   // 배포 서버
    //   registerUrl,
    //   // `https://odeego.shop/api/v1/members/sign-up`, (되는 코드)
    //   // 배포 서버
    //   // `https://52.78.224.123:8080/api/v1/auth/user/me`,
    //   // 개인 서버
    //   // `http://15.165.99.21:8080/api/v1/auth/user/me`,
    //   {
    //     body: JSON.stringify({
    //       nickname: values.nickname,
    //       defaultStationName: values.defaultStationName,
    //     }),
    //     headers: {
    //       Authorization: `Bearer ${localStorage.getItem("token")}`,
    //       "Content-Type": "application/json",
    //     },
    //     method: "PATCH",
    //   }
    // );
    //
    // if (res.ok) {
    //   router.push("/");
    // }
    console.log(values);
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
