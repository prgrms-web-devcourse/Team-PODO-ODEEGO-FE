type LocalStorage = typeof window.localStorage;

export const getLocalStorage = (key: string) => {
  // if (key === undefined || key === null) return;

  const storage: LocalStorage = localStorage;
  try {
    const getItemValue = storage.getItem(key);
    const storedValue = JSON.parse(getItemValue as string);

    return storedValue;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

export const setLocalStorage = (key: string, value: string) => {
  if (value === undefined || value === null) return;

  const storage: LocalStorage = localStorage;
  try {
    storage.setItem(key, JSON.stringify(value));
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

export const removeLocalStorage = (key: string) => {
  if (key === "") return;

  const storage: LocalStorage = localStorage;
  try {
    storage.removeItem(key);
  } catch (err) {
    throw new Error((err as Error).message);
  }
};
