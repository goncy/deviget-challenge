import React, {useState, useEffect} from "react";
import styled from "styled-components";

import {Post} from "../../post/typings/post";
import {Status} from "../typings/status";

import postApi from "../../post/resources";

import uniqConcat from "../utils/uniqConcat";

import PostCard from "../../post/components/PostCard";
import PostDetails from "../../post/components/PostDetails";

const Sidebar = styled.aside`
  width: 320px;
  background-color: var(--light);
  max-height: 100vh;
  overflow-y: auto;
`;

const Content = styled.section`
  flex: 1;
  background-color: var(--gray);
  padding: 12px;
`;

const App = () => {
  const [seen, setSeen] = useState<string[]>([]);
  const [dismissed, setDismissed] = useState<string[]>([]);
  const [status, setStatus] = useState<Status>("init");
  const [posts, setPosts] = useState<Post[]>([]);
  const [post, setPost] = useState<null | Post>(null);

  function handleInitialFetchResolved(_posts: Post[]) {
    setPosts(_posts);
    setStatus("resolved");
  }

  function handleInitialFetchRejected(error: Error) {
    console.log(error.message);
    setStatus("rejected");
  }

  useEffect(() => {
    postApi.top
      .fetch()
      .then(handleInitialFetchResolved)
      .catch(handleInitialFetchRejected);
  }, []);

  function handleSetPost(_post: Post) {
    setPost(_post);
  }

  function handleDismissPost(_post: Post) {
    setDismissed(_dismissed => uniqConcat(_dismissed, _post.id));
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
    },
    [dismissed]
  );

  if (status === "rejected") return <div>Error</div>;
  if (["init", "pending"].includes(status)) return <div>Loading...</div>;

  return (
    <>
      <Sidebar>
        {posts.map(_post => (
          <PostCard
            key={_post.id}
            post={_post}
            seen={seen.includes(_post.id)}
            onClick={handleSetPost}
            onDismiss={handleDismissPost}
          />
        ))}
      </Sidebar>
      <Content>
        {post ? <PostDetails post={post} /> : <span>No post selected</span>}
      </Content>
    </>
  );
};

export default App;
