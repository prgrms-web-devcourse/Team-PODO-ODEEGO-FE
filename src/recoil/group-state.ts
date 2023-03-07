import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const GroupState = atom<string>({
  key: "GroupState",
  default: "",
  effects_UNSTABLE: [persistAtom],
});
