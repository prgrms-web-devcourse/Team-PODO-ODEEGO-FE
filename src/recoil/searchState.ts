import { atom } from "recoil";

import { recoilPersist } from "recoil-persist";
import { searchProps } from "@/types/search-props"; // ✔

const { persistAtom } = recoilPersist(); // ✔
export const searchState = atom<searchProps[]>({
  key: "search",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
