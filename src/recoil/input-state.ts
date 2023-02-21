import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

interface InputType {
  roadAddress: string;
}

const { persistAtom } = recoilPersist({
  key: "inputs",
});

export const InputListState = atom<InputType[]>({
  key: "inputListState",
  default: [],
  //   effects_UNSTABLE: [persistAtom],
});
