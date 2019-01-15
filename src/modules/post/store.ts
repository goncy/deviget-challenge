import appStorage from "../app/store";

export default {
  dismissed: {
    get: (): Promise<string[]> => appStorage.get("dismissed", []),
    post: (posts: string[]) => appStorage.set("dismissed", posts),
  },
  seen: {
    get: (): Promise<string[]> => appStorage.get("seen", []),
    post: (posts: string[]) => appStorage.set("seen", posts),
  },
};
