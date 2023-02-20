const customLocalStorage = {
  get: (key: string, defaultValue: [] | number) => {
    if (typeof window !== undefined) {
      const storage = localStorage;
      try {
        const storedValue = JSON.parse(storage.getItem(key) || '""');

        return storedValue ? storedValue : defaultValue;
      } catch (error) {
        console.error(error);
        return defaultValue;
      }
    }
  },
  set: <T>(key: string, value: T) => {
    if (typeof window !== undefined) {
      const storage = localStorage;
      try {
        storage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.error(error);
      }
    }
  },
  remove: (key: string) => {
    if (typeof window !== undefined) {
      const storage = localStorage;
      try {
        storage.removeItem(key);
      } catch (error) {
        console.error(error);
      }
    }
  },
};

export default customLocalStorage;
