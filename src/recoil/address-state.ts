import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

interface UserAddressType {
  name: string;
  roadAddress: string;
}

const { persistAtom } = recoilPersist({
  key: "user-address",
});

export const userAddressState = atom<UserAddressType[]>({
  key: "userAddressState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
