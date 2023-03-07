import { atom } from "recoil";

export const tokenRecoilState = atom<unknown>({
  key: "test",
  default: "testToken",
});

export const tokenState = atom<unknown>({
  key: "tokenState",
  default: "",
});
