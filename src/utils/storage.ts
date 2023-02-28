export const getLocalStorage = (key: string, defaultValue = "") => {
  if (typeof window === undefined) return defaultValue;

  const storage = localStorage;
  try {
    const storedValue = JSON.parse(storage.getItem(key) || '""');

    return storedValue ? storedValue : defaultValue;
  } catch (error) {
    console.error(error);
    return defaultValue;
  }
};

export const setLocalStorage = <T>(key: string, value: T) => {
  if (typeof window === undefined) return "";

  const storage = localStorage;
  try {
    storage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(error);
  }
};

export const removeLocalStorage = (key: string) => {
  if (typeof window === undefined) return "";

  const storage = localStorage;
  try {
    storage.removeItem(key);
  } catch (error) {
    console.error(error);
  }
};
