import React from "react";
import styled from "styled-components";

import Card from "../../../ui/structure/Card";
import Button from "../../../ui/controls/Button";

import {Post} from "../typings/post";

type Props = {
  post: Post;
  onClick: (post: Post) => void;
  onDismiss: (post: Post) => void;
  seen: boolean;
};

const Title = styled.h3`
  display: flex;
  flex-direction: column;
  margin-top: 0;
`;

const Comments = styled.i`
  color: var(--info);
`;

const PostCard = ({post, onClick, onDismiss, seen}: Props) => {
  function handleDismiss(event: React.MouseEvent) {
    event.stopPropagation();

    onDismiss(post);
  }

  return (
    <Card
      action={<Button onClick={handleDismiss}>Dismiss</Button>}
      active={seen}
      footer={<Comments>{post.num_comments} comments</Comments>}
      header={
        <Title>
          {post.author} <small>{post.created_utc}</small>
        </Title>
      }
      onClick={() => onClick(post)}
    >
      {post.thumbnail && <img alt="Post thumbnail" src={post.thumbnail} />}
      <span>{post.title}</span>
    </Card>
  );
};

export default PostCard;
