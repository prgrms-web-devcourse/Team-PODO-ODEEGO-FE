"use client";

import { addressState } from "@/src/recoil/addressState";
import { useRouter, useSearchParams } from "next/navigation";
import { useRecoilState } from "recoil";

const Search = () => {
  const [addressList, setAddressList] = useRecoilState(addressState);
  const router = useRouter();
  const searchParams = useSearchParams();
  const index = parseInt(
    searchParams.get("index") || addressList.length + "",
    10
  );

  const handleClick = () => {
    if (index !== undefined || index !== null) {
      const addressListCopy = JSON.parse(JSON.stringify(addressList));

      const newAddressList = [
        ...addressListCopy.slice(0, index),
        {
          name: "new 주소",
          roadAddress: `new 강남대로 무슨로 무슨길 71${index}`,
        },
        ...addressListCopy.slice(index + 1),
      ];
      setAddressList(newAddressList);
    }

    router.push("/");
  };

  return (
    <div>
      <h1>Search</h1>
      <button onClick={handleClick}>Click</button>
    </div>
  );
};

export default Search;
