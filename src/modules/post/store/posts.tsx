import React, {createContext, ReactNode, useEffect, useState} from "react";

import {Post, PostsResponse} from "../typings/post";
import {Status} from "../../app/typings/status";

import {PostProvider} from "./post";

import resources from "../resources";

import uniqConcat from "../../utils/uniqConcat";

type Props = {
  children: ReactNode;
  subreddit: string;
};

export type PostsContextType = {
  status: Status;
  posts: Post[];
  seen: string[];
  nextPage: () => void;
  dismissPost: (post: Post) => void;
  dismissAll: () => void;
  seePost: (post: Post) => void;
};

const PostsContext = createContext<PostsContextType>({
  status: "init",
  posts: [],
  seen: [],
  nextPage: () => null,
  dismissPost: () => null,
  dismissAll: () => null,
  seePost: () => null,
});

const PostsProvider = ({children, subreddit}: Props) => {
  const [seen, setSeen] = useState<string[]>([]);
  const [nextPage, setNextPage] = useState<string | undefined>(undefined);
  const [dismissed, setDismissed] = useState<string[]>([]);
  const [status, setStatus] = useState<Status>("init");
  const [posts, setPosts] = useState<Post[]>([]);

  function handleFetchResolved({
    posts: _posts,
    nextPage: _nextPage,
  }: PostsResponse) {
    Promise.all([resources.dismissed.fetch(), resources.seen.fetch()])
      .then(([_dismissed, _seen]) => {
        setPosts(_posts);
        setNextPage(_nextPage);
        setSeen(_seen);
        setDismissed(_dismissed);
        setStatus("resolved");
      })
      .catch((error: Error) => {
        console.log(error.message);
        setStatus("rejected");
      });
  }

  function handleFetchRejected(error: Error) {
    console.log(error.message);
    setStatus("rejected");
  }

  function handleFetch() {
    setStatus("pending");

    resources.posts
      .fetch(subreddit, nextPage)
      .then(handleFetchResolved)
      .catch(handleFetchRejected);
  }

  useEffect(() => {
    handleFetch();
  }, []);

  function handleNextPage() {
    handleFetch();
  }

  function handleDismissPost(_post: Post) {
    setDismissed(_dismissed => uniqConcat(_dismissed, _post.id));
  }

  function handleDismissAll() {
    setDismissed(_dismissed =>
      uniqConcat(_dismissed, posts.map(_post => _post.id))
    );
  }

  function handleSeePost(_post: Post) {
    setSeen(_seen => uniqConcat(_seen, _post.id));
  }

  useEffect(
    () => {
      setPosts(_posts => _posts.filter(_post => !dismissed.includes(_post.id)));
      dismissed.length && resources.dismissed.replace(dismissed);
    },
    [dismissed]
  );

  useEffect(
    () => {
      seen.length && resources.seen.replace(seen);
    },
    [seen]
  );

  return (
    <PostsContext.Provider
      value={{
        status,
        posts,
        seen,
        nextPage: handleNextPage,
        dismissPost: handleDismissPost,
        dismissAll: handleDismissAll,
        seePost: handleSeePost,
      }}
    >
      <PostProvider>{children}</PostProvider>
    </PostsContext.Provider>
  );
};

export {PostsContext as default, PostsProvider};
