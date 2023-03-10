import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const isFirstVisitState = atom<boolean | null>({
  key: "isFirstVisitState",
  default: null,
  effects_UNSTABLE: [persistAtom],
});
