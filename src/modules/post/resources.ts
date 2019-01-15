import posts from "./data/top.json";

export default {
  top: {
    fetch: () => Promise.resolve(posts.data.children.map(post => post.data)),
  },
};
