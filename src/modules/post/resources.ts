import {PostsPayload, PostWrapper, PostsResponse} from "./typings/post";

import storageApi from "../storage/resources";

export default {
  posts: {
    fetch: (subreddit: string, page?: string): Promise<PostsResponse> =>
      fetch(`https://www.reddit.com/r/${subreddit}.json?after=${page}`)
        .then(res => res.json())
        .then((response: PostsPayload) => ({
          posts: response.data.children.map((post: PostWrapper) => post.data),
          nextPage: response.data.after || "",
        })),
  },
  dismissed: {
    fetch: (): Promise<string[]> => storageApi.fetch("dismissed", []),
    replace: (posts: string[]) => storageApi.replace("dismissed", posts),
  },
  seen: {
    fetch: (): Promise<string[]> => storageApi.fetch("seen", []),
    replace: (posts: string[]) => storageApi.replace("seen", posts),
  },
};
