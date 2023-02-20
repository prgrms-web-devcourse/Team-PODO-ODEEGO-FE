import { atom } from "recoil";

interface Address {
  name: string;
  roadAddress: string;
}

export const addressState = atom<Address[]>({
  key: "addressState",
  default: [],
});
