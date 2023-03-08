import { atom } from "recoil";

export const tokenRecoilState = atom<string>({
  key: "test",
  default: "9994",
});

export const tokenState = atom<unknown>({
  key: "tokenState",
  default: "",
});
