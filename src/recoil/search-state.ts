import { atom } from "recoil";

import { recoilPersist } from "recoil-persist";
import { searchProps } from "@/types/search-props";
import { v4 } from "uuid";

const { persistAtom } = recoilPersist();
export const searchState = atom<searchProps[]>({
  key: `search${v4()}`,
  default: [],
  effects_UNSTABLE: [persistAtom],
});
