import posts from "./data/top.json";

import {PostsPayload, PostWrapper, PostsResponse} from "./typings/post";

export default {
  posts: {
    fetch: (subreddit: string, page: string): Promise<PostsResponse> =>
      fetch(`https://www.reddit.com/r/${subreddit}.json?after=${page}`)
        .then(res => res.json())
        .then((response: PostsPayload) => ({
          posts: response.data.children.map((post: PostWrapper) => post.data),
          nextPage: response.data.after || "",
        })),
  },
  top: {
    fetch: () => Promise.resolve(posts.data.children.map(post => post.data)),
  },
};
