import { atom } from "recoil";

export const tokenRecoilState = atom<any>({
  key: "test",
  default: "",
});

export const testState2 = atom<any>({
  key: "test2",
  default: "",
});
