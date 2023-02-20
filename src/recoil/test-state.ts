import { atom } from "recoil";

export const testState = atom<string>({
  key: "test",
  default: "",
});
