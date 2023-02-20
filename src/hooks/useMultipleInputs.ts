import { MouseEvent, useState } from "react";
import { useRecoilState } from "recoil";
import { addressState } from "../recoil/addressState";

interface InputItem {
  roadAddress: string;
}

const useMultipleInputs = () => {
  const [addressList, setAddressList] = useRecoilState(addressState);
  const [inputs, setInputs] = useState<InputItem[]>(() => {
    if (addressList.length === 0)
      return [
        {
          roadAddress: "",
        },
        {
          roadAddress: "",
        },
      ];

    const inputList = [];

    for (const a of addressList) {
      const newAddress = {
        roadAddress: a.roadAddress,
      };

      inputList.push(newAddress);
    }

    if (inputList.length < 2) {
      inputList.push({
        roadAddress: "",
      });
    }

    return inputList;
  });
  const addInput = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const newInput = {
      roadAddress: "",
    };

    setInputs((prev) => [...prev, newInput]);
    setAddressList([...addressList, { name: "", roadAddress: "" }]);
  };

  const removeInput = (e: MouseEvent<HTMLButtonElement>, index: number) => {
    e.stopPropagation();

    const inputsCopy = JSON.parse(JSON.stringify(inputs));

    inputsCopy.splice(index, 1);
    setInputs(inputsCopy);

    // recoil 해당되는 id의 주소값 같이 제거
    const addressListCopy = JSON.parse(JSON.stringify(addressList));

    addressListCopy.splice(index, 1);
    setAddressList(addressListCopy);
  };

  return { inputs, addInput, removeInput };
};

export default useMultipleInputs;
