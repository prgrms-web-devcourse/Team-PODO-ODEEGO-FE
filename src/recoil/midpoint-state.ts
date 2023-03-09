import { MidpointResponse } from "@/types/api/midpoint";
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const DefaultMidpointValue = {
  start: [],
  midPointResponses: [],
};

export const MidPointState = atom<MidpointResponse>({
  key: "midPointState",
  default: DefaultMidpointValue,
  effects_UNSTABLE: [persistAtom],
});
