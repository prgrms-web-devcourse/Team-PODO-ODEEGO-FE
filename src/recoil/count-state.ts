import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "count",
});

export const countState = atom<number>({
  key: "countState",
  default: 0,
  effects_UNSTABLE: [persistAtom],
});
