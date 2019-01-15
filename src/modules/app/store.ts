export default {
  get: (key: string, defaultValue: any): Promise<any> =>
    new Promise((resolve, reject) => {
      try {
        const value = localStorage.getItem(key);

        resolve(value ? JSON.parse(value) : defaultValue);
      } catch (e) {
        reject(e.message);
      }
    }),
  set: (key: string, value: Object | Array<any>): Promise<any> =>
    new Promise((resolve, reject) => {
      try {
        localStorage.setItem(key, JSON.stringify(value));
        resolve(value);
      } catch (e) {
        reject(e.message);
      }
    }),
};
