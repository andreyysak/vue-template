const prefix = `APP_${import.meta.env.VITE_APP_NAME}`;

export const storage = {
  setItem: (key, value) => {
    localStorage.setItem(`${prefix}_${key}`, value);
  },
  getItem: (key) => {
    return localStorage.getItem(`${prefix}_${key}`);
  },
  removeItem: (key) => {
    if (storage.getItem(key)) {
      return localStorage.removeItem(`${prefix}_${key}`);
    }
  },
  removeItems: (keys) => {
    for (let key of keys) {
      storage.removeItem(key);
    }
  }
};
