type LocalStorage = typeof window.localStorage;

export const getLocalStorage = (key: string, defaultValue = "") => {
  if (defaultValue === undefined) return;

  const storage: LocalStorage = localStorage;
  try {
    const storedValue = JSON.parse(storage.getItem(key) || "");

    return storedValue;
  } catch (error) {
    throw new Error((<Error>error).message);
  }
};

export const setLocalStorage = <T>(key: string, value: T) => {
  if (value === undefined) return;

  const storage: LocalStorage = localStorage;
  try {
    storage.setItem(key, JSON.stringify(value));
  } catch (error) {
    throw new Error((<Error>error).message);
  }
};

export const removeLocalStorage = (key: string) => {
  if (key === "") return;

  const storage: LocalStorage = localStorage;
  try {
    storage.removeItem(key);
  } catch (error) {
    throw new Error((<Error>error).message);
  }
};
