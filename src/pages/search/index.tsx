"use client";

import { countState } from "@/recoil/count-state";
import { searchState } from "@/recoil/search-state";
import { useRouter, useSearchParams } from "next/navigation";
import { useRecoilState } from "recoil";

const Search = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const index = parseInt(searchParams.get("id") || "0", 10);

  const [addressList, setAddressList] = useRecoilState(searchState);
  const [count, setCount] = useRecoilState(countState);

  const handleClick = () => {
    if (index !== undefined || index !== null) {
      const newAddressList = [
        ...addressList.slice(0, index),
        {
          name: "new 주소",
          lat: "1.22222",
          lng: "2.33333",
          address: `new 강남대로 무슨로 무슨길-${count} 71${index}`,
        },
        ...addressList.slice(index + 1),
      ];

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
