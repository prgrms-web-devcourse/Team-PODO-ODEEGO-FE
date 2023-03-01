import { atom } from "recoil";

export const tokenRecoilState = atom<unknown>({
  key: "test",
  default: "",
});

export const testState2 = atom<unknown>({
  key: "test2",
  default: "",
});
