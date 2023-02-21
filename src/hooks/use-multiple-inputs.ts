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
  };

  const removeInput = (e: MouseEvent<HTMLButtonElement>, index: number) => {
    e.stopPropagation();

    if (index === 0 || index === 1) {
      if (!inputs[index] || inputs[index].roadAddress === "") return;

      const inputsCopy = JSON.parse(JSON.stringify(inputs));

      inputsCopy.splice(index, 1, { roadAddress: "" });
      setInputs(inputsCopy);

      const addressListCopy = JSON.parse(JSON.stringify(addressList));
      const address = addressListCopy[index];
      addressListCopy.splice(index, 1, { ...address, roadAddress: "" });
      setAddressList(addressListCopy);
    } else {
      const inputsCopy = JSON.parse(JSON.stringify(inputs));

      inputsCopy.splice(index, 1);
      setInputs(inputsCopy);
      const addressListCopy = JSON.parse(JSON.stringify(addressList));
      addressListCopy.splice(index, 1);
      setAddressList(addressListCopy);
    }
  };

  return { inputs, addInput, removeInput };
};

export default useMultipleInputs;
