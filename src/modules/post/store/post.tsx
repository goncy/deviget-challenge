import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import {Post} from "../typings/post";

import PostsContext from "./posts";

type Props = {
  children: ReactNode;
};

export type PostContextType = {
  post: null | Post;
  setPost: (post: Post) => void;
};

const PostContext = createContext<PostContextType>({
  post: null,
  setPost: () => null,
});

const PostProvider = ({children}: Props) => {
  const {seePost} = useContext(PostsContext);
  const [post, setPost] = useState<null | Post>(null);

  function handleSetPost(_post: Post) {
    setPost(_post);
  }

  useEffect(
    () => {
      post && seePost(post);
    },
    [post]
  );

  return (
    <PostContext.Provider
      value={{
        post,
        setPost: handleSetPost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export {PostContext as default, PostProvider};
