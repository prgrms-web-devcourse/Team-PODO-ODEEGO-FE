import { searchState } from "@/recoil/search-state";
import { MouseEvent, useEffect, useState } from "react";
import { useRecoilState } from "recoil";

interface InputItem {
  address: string;
}

const useMultipleInputs = () => {
  const [inputs, setInputs] = useState<InputItem[]>([
    {
      address: "",
    },
    {
      address: "",
    },
  ]);
  const [addressList, setAddressList] = useRecoilState(searchState);

  useEffect(() => {
    const newInputs = addressList.map((a) => ({ address: a.address }));

    const arrayLength = newInputs.length >= 2 ? 2 : newInputs.length;
    const emptyInputs = new Array(2 - arrayLength).fill({
      address: "",
    });

    setInputs([...newInputs, ...emptyInputs]);
  }, [addressList]);

  const addInput = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setInputs((prev) => [...prev, { address: "" }]);
  };

  const removeInput = (e: MouseEvent<HTMLButtonElement>, index: number) => {
    e.stopPropagation();

    if (index === 0 || index === 1) {
      if (!inputs[index] || inputs[index].address === "") return;
      setAddressList((prev) =>
        prev.map((address, i) =>
          i === index ? { ...address, address: "" } : address
        )
      );
      setInputs((prev) =>
        prev.map((input, i) => (i === index ? { address: "" } : input))
      );
    } else {
      setAddressList((prev) => prev.filter((_, i) => i != index));
      setInputs((prev) => prev.filter((_, i) => i !== index));
    }
  };

  return { inputs, addInput, removeInput };
};

export default useMultipleInputs;
