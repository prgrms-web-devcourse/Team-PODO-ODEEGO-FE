import { userAddressState } from "@/recoil/address-state";

import { MouseEvent, useEffect, useState } from "react";
import { useRecoilState } from "recoil";

interface InputItem {
  roadAddress: string;
}

const useMultipleInputs = () => {
  const [inputs, setInputs] = useState<InputItem[]>([]);
  const [addressList, setAddressList] = useRecoilState(userAddressState);

  useEffect(() => {
    // const addressList = customLocalStorage.get(USER_ADDRESS, []);

    const inputList = [];

    for (const a of addressList) {
      const newAddress = {
        roadAddress: a.roadAddress,
      };

      inputList.push(newAddress);
    }

    for (let i = inputList.length; i < 2; i++) {
      inputList.push({
        roadAddress: "",
      });
    }

    setInputs(inputList);
  }, [addressList]);

  const addInput = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const newInput = {
      roadAddress: "",
    };

    setInputs((prev) => [...prev, newInput]);
    // customLocalStorage.set(USER_ADDRESS, [
    //   ...customLocalStorage.get(USER_ADDRESS),
    //   newInput,
    // ]);
  };

  const removeInput = (e: MouseEvent<HTMLButtonElement>, index: number) => {
    e.stopPropagation();

    const inputsCopy = JSON.parse(JSON.stringify(inputs));

    inputsCopy.splice(index, 1);
    setInputs(inputsCopy);

    // const addressList = customLocalStorage.get(USER_ADDRESS, []);

    const addressListCopy = JSON.parse(JSON.stringify(addressList));
    addressListCopy.splice(index, 1);
    // customLocalStorage.set(USER_ADDRESS, addressList);
    setAddressList(addressListCopy);
  };

  return { inputs, addInput, removeInput };
};

export default useMultipleInputs;
