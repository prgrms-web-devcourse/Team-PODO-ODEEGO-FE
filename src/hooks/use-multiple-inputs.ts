import customLocalStorage from "@/utils/localStorage";
import { MouseEvent, useEffect, useState } from "react";

interface InputItem {
  roadAddress: string;
}

//TODO
// - 전역 상수로 빼기
const USER_ADDRESS = "user-address";

const useMultipleInputs = () => {
  const [inputs, setInputs] = useState<InputItem[]>([]);

  useEffect(() => {
    const addressList = customLocalStorage.get(USER_ADDRESS, []);

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
  }, []);

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

    const addressList = customLocalStorage.get(USER_ADDRESS, []);

    addressList.splice(index, 1);
    customLocalStorage.set(USER_ADDRESS, addressList);
  };

  return { inputs, addInput, removeInput };
};

export default useMultipleInputs;
