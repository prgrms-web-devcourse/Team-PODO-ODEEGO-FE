import { atom } from "recoil";

export const tokenRecoilState = atom<any>({
  key: "test",
  default: "",
});
