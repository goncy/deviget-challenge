import React, {useContext} from "react";
import styled from "styled-components";

import {Post} from "../../post/typings/post";

import PostCard from "../../post/components/PostCard";
import PostDetails from "../../post/components/PostDetails";

import Button from "../../../ui/controls/Button";
import Animated from "../../../ui/structure/Animated";
import AnimationGroup from "../../../ui/structure/AnimationGroup";
import Placeholder from "../../../ui/feedback/Placeholder";
import List from "../../../ui/listing/List";

import PostsContext from "../../post/store/posts";

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

const App = () => {
  const {
    status,
    posts,
    post,
    seen,
    nextPage,
    dismissPost,
    dismissAll,
    setPost,
  } = useContext(PostsContext);

  if (status === "rejected") return <Placeholder>Error</Placeholder>;
  if (["init", "pending"].includes(status))
    return <Placeholder>Loading...</Placeholder>;

  return (
    <>
      <Sidebar>
        <div className="header">
          <Button onClick={dismissAll}>Dismiss all</Button>
          {nextPage && <Button onClick={nextPage}>Next page</Button>}
        </div>
        <List>
          <AnimationGroup>
            {posts.map((_post: Post) => (
              <Animated key={_post.id}>
                <PostCard
                  post={_post}
                  seen={seen.includes(_post.id)}
                  onClick={setPost}
                  onDismiss={dismissPost}
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
