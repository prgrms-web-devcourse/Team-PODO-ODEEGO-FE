import { useState } from "react";

const useLocalStorage = (key: string, initialValue: unknown) => {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === "undefined") return initialValue;

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value: unknown) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);

      if (typeof window === "undefined") return;

      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  const removeValue = (key: string) => {
    if (key === "") return;
    if (typeof window === "undefined") return;

    try {
      window.localStorage.removeItem(key);
    } catch (err) {
      throw new Error((err as Error).message);
    }
  };
  return [storedValue, setValue, removeValue];
};

export default useLocalStorage;
