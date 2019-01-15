import React, {useState, useEffect} from "react";
import styled from "styled-components";

import {Post, PostsResponse} from "../../post/typings/post";
import {Status} from "../typings/status";

import postApi from "../../post/resources";
import postStore from "../../post/store";
import uniqConcat from "../utils/uniqConcat";

import PostCard from "../../post/components/PostCard";
import PostDetails from "../../post/components/PostDetails";

import Button from "../../../ui/controls/Button";
import Animated from "../../../ui/structure/Animated";
import AnimationGroup from "../../../ui/structure/AnimationGroup";
import Placeholder from "../../../ui/feedback/Placeholder";
import List from "../../../ui/listing/List";

const Sidebar = styled.aside`
  width: 320px;
  background-color: var(--light);
  max-height: 100vh;
  overflow-y: auto;
  padding: 12px;

  .header {
    margin-bottom: 12px;
    display: flex;
  }

  @media (max-width: 768px) {
    width: 100vw;
    position: absolute;
    z-index: 1;
  }
`;

const Content = styled.section`
  flex: 1;
  background-color: var(--gray);
  max-height: 100vh;
  overflow-y: auto;
  margin: 12px;
`;

const SUBREDDIT = "frontend";

const App = () => {
  const [seen, setSeen] = useState<string[]>([]);
  const [nextPage, setNextPage] = useState<string | undefined>(undefined);
  const [dismissed, setDismissed] = useState<string[]>([]);
  const [status, setStatus] = useState<Status>("init");
  const [posts, setPosts] = useState<Post[]>([]);
  const [post, setPost] = useState<null | Post>(null);

  function handleFetchResolved({
    posts: _posts,
    nextPage: _nextPage,
  }: PostsResponse) {
    Promise.all([postStore.dismissed.get(), postStore.seen.get()])
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

  function handleFetch(subreddit: string, page: string = "") {
    setStatus("pending");

    postApi.posts
      .fetch(subreddit, page)
      .then(handleFetchResolved)
      .catch(handleFetchRejected);
  }

  useEffect(() => {
    handleFetch(SUBREDDIT);
  }, []);

  function handleNextPage() {
    handleFetch(SUBREDDIT, nextPage);
  }

  function handleSetPost(_post: Post) {
    setPost(_post);
  }

  function handleDismissPost(_post: Post) {
    setDismissed(_dismissed => uniqConcat(_dismissed, _post.id));
  }

  function handleDismissAll() {
    setDismissed(_dismissed =>
      uniqConcat(_dismissed, posts.map(_post => _post.id))
    );
  }

  useEffect(
    () => {
      post && setSeen(_seen => uniqConcat(_seen, post.id));
    },
    [post]
  );

  useEffect(
    () => {
      setPosts(_posts => _posts.filter(_post => !dismissed.includes(_post.id)));
      dismissed.length && postStore.dismissed.post(dismissed);
    },
    [dismissed]
  );

  useEffect(
    () => {
      seen.length && postStore.seen.post(seen);
    },
    [seen]
  );

  if (status === "rejected") return <Placeholder>Error</Placeholder>;
  if (["init", "pending"].includes(status))
    return <Placeholder>Loading...</Placeholder>;

  return (
    <>
      <Sidebar>
        <div className="header">
          <Button onClick={handleDismissAll}>Dismiss all</Button>
          {nextPage && <Button onClick={handleNextPage}>Next page</Button>}
        </div>
        <List>
          <AnimationGroup>
            {posts.map(_post => (
              <Animated key={_post.id}>
                <PostCard
                  post={_post}
                  seen={seen.includes(_post.id)}
                  onClick={handleSetPost}
                  onDismiss={handleDismissPost}
                />
              </Animated>
            ))}
          </AnimationGroup>
        </List>
      </Sidebar>
      <Content>
        {post ? (
          <PostDetails post={post} />
        ) : (
          <Placeholder>No post selected</Placeholder>
        )}
      </Content>
    </>
  );
};

export default App;
