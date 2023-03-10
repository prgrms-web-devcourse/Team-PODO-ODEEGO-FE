import { atom } from "recoil";

export const tokenRecoilState = atom<string>({
  key: "test",
  default:
    "eyJhbGciOiJIUzI1NiJ9.eyJtZW1iZXJJZCI6MTEzMzIsImV4cCI6MTY3OTU1NjAwOX0.n9dKwZbsaFdWqg-yBkSwUals-tUbAzb2SH3Y7I8Fs1c",
});

export const tokenState = atom<unknown>({
  key: "tokenState",
  default: "",
});
