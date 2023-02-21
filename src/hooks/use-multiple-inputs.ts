import { searchState } from "@/recoil/search-state";
import { MouseEvent, useEffect, useState } from "react";
import { useRecoilState } from "recoil";

interface InputItem {
  roadAddress: string;
}

const useMultipleInputs = () => {
  const [inputs, setInputs] = useState<InputItem[]>([
    {
      roadAddress: "",
    },
    {
      roadAddress: "",
    },
  ]);
  const [addressList, setAddressList] = useRecoilState(searchState);

  useEffect(() => {
    const newInputs = addressList.map((a) => ({ roadAddress: a.address }));
    const emptyInputs = new Array(2 - newInputs.length).fill({
      roadAddress: "",
    });

    setInputs([...newInputs, ...emptyInputs]);
  }, [addressList]);

  const addInput = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setInputs((prev) => [...prev, { roadAddress: "" }]);
  };

  const removeInput = (e: MouseEvent<HTMLButtonElement>, index: number) => {
    e.stopPropagation();

    if (index === 0 || index === 1) {
      if (!inputs[index] || inputs[index].roadAddress === "") return;
      setAddressList((prev) =>
        prev.map((address, i) =>
          i === index ? { ...address, address: "" } : address
        )
      );
      setInputs((prev) =>
        prev.map((input, i) => (i === index ? { roadAddress: "" } : input))
      );
    } else {
      setAddressList((prev) => prev.filter((_, i) => i != index));
      setInputs((prev) => prev.filter((_, i) => i !== index));
    }
  };

  return { inputs, addInput, removeInput };
};

export default useMultipleInputs;
