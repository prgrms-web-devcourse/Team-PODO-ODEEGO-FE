import { searchState } from "@/recoil/search-state";
import { searchProps } from "@/types/search-props";

import { MouseEvent, useEffect, useState } from "react";
import { useRecoilState } from "recoil";

interface InputItem {
  roadAddress: string;
}

const useMultipleInputs = () => {
  const [inputs, setInputs] = useState<InputItem[]>([]);
  const [addressList, setAddressList] = useRecoilState(searchState);

  useEffect(() => {
    const inputList = [];

    for (const a of addressList) {
      const newAddress = {
        roadAddress: a.address,
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
  };

  const removeInputElement = (
    inputList: InputItem[],
    addressList: searchProps[],
    index: number
  ) => {
    inputList.splice(index, 1);
    setInputs(inputList);

    addressList.splice(index, 1);
    setAddressList(addressList);
  };

  const removeInputAndInsertElement = (
    inputList: InputItem[],
    addressList: searchProps[],
    index: number
  ) => {
    const deletedInput = { roadAddress: "" };
    const deletedAddress = { ...addressList[index], address: "" };

    inputList.splice(index, 1, deletedInput);
    setInputs(inputList);

    addressList.splice(index, 1, deletedAddress);
    setAddressList(addressList);
  };

  const removeInput = (e: MouseEvent<HTMLButtonElement>, index: number) => {
    e.stopPropagation();

    if (index === 0 || index === 1) {
      if (!inputs[index] || inputs[index].roadAddress === "") return;
    }

    const inputsCopy = JSON.parse(JSON.stringify(inputs));
    const addressListCopy = JSON.parse(JSON.stringify(addressList));

    if (index === 0 || index === 1) {
      removeInputAndInsertElement(inputsCopy, addressListCopy, index);
    } else {
      removeInputElement(inputsCopy, addressListCopy, index);
    }

    // inputsCopy.splice(index, 1);
    // setInputs(inputsCopy);

    // addressListCopy.splice(index, 1);
    // setAddressList(addressListCopy);
  };

  return { inputs, addInput, removeInput };
};

export default useMultipleInputs;
