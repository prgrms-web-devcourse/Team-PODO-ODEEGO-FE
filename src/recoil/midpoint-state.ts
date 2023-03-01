import { MidpointResponse } from "@/types/api/midpoint";
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const MidPointState = atom<MidpointResponse>({
  key: "midPointState",
  default: {
    start: [],
    midPointResponses: [],
  },
  effects_UNSTABLE: [persistAtom],
});
