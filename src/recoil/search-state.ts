import { atom } from "recoil";

import { recoilPersist } from "recoil-persist";
import { searchProps } from "@/types/search-props";

const { persistAtom } = recoilPersist();

export const defaultSearchState = [];

export const searchState = atom<searchProps[]>({
  key: "search",
  default: defaultSearchState,
  effects_UNSTABLE: [persistAtom],
});

export const tabState = atom({
  key: "tab",
  default: "",
});
