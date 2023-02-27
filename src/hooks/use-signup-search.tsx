import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { searchOriginProps, searchProps } from "@/types/search-props";
import { searchState } from "@/recoil/search-state";
import checkSignup from "@/utils/check-signup";
import { errorType, valueType } from "@/types/register-props";

const useSignupSearch = () => {
  const [values, setValue] = useState<Partial<valueType>>({});
  const [errorMessage, setErrorMessage] = useState<Partial<errorType>>({});
  const [recoilData, setRecoildData] =
    useRecoilState<searchProps[]>(searchState);

  const [isToggleBoxLoading, setToggleBoxIsLoading] = useState(true);

  const handleValue = (e: any) => {
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

    setValue({
      ...values,
      station: val.place_name,
    });
  };

  const handleSignUpSubmit = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    console.log(values);
  };

  return {
    errorMessage,
    recoilData,
    isToggleBoxLoading,
    values,
    handleSignUpSubmit,
    handleLocationClick,
    handleStationKeyDown,
    handleValue,
  };
};
export default useSignupSearch;
