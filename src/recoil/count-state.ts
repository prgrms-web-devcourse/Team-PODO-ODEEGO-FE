import { atom } from "recoil";

export const countState = atom<string>({
  key: "countState",
  default: "",
});
