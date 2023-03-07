import { atom } from "recoil";

export const tokenRecoilState = atom<string>({
  key: "test",
  default: "testToken",
});

export const tokenState = atom<unknown>({
  key: "tokenState",
  default: "",
});
