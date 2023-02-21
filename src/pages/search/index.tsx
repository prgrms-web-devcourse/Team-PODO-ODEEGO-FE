"use client";

import { userAddressState } from "@/recoil/address-state";
import { countState } from "@/recoil/count-state";
import { useRouter, useSearchParams } from "next/navigation";
import { useRecoilState } from "recoil";

const Search = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const index = parseInt(searchParams.get("index") || "0", 10);

  const [addressList, setAddressList] = useRecoilState(userAddressState);
  const [count, setCount] = useRecoilState(countState);

  const handleClick = () => {
    if (index !== undefined || index !== null) {
      // const addressList = customLocalStorage.get("user-address", []);
      // const count = customLocalStorage.get("count", 0);

      const newAddressList = [
        ...addressList.slice(0, index),
        {
          name: "new 주소",
          roadAddress: `new 강남대로 무슨로 무슨길-${count} 71${index}`,
        },
        ...addressList.slice(index + 1),
      ];
      // customLocalStorage.set("user-address", newAddressList);
      // customLocalStorage.set("count", customLocalStorage.get("count", 0) + 1);

      setAddressList(newAddressList);
      setCount((prev) => prev + 1);
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
