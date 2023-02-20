import { atom } from "recoil";
import type { AtomEffect } from "recoil";

const Storage = typeof window !== "undefined" ? window.localStorage : null;

const localStorageEffect: <T>(key: string) => AtomEffect<T> =
  (key) =>
  ({ setSelf, onSet }) => {
    if (!Storage) return;
    const item = Storage.getItem(key);
    if (item) {
      setSelf(JSON.parse(item));
    }

    onSet((value) => {
      Storage.setItem(key, JSON.stringify(value));
    });
  };

export const midwayResultState = atom({
  key: "midwayResultState",
  default: {},
  effects: [localStorageEffect("midway-result")],
});
