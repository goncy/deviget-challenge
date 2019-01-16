import React from "react";
import styled from "styled-components";

import {Post} from "../typings/post";

import dateToWords from "../../utils/dateToWords";

import Card from "../../../ui/structure/Card";

type Props = {
  post: Post;
};

const Title = styled.h3`
  display: flex;
  flex-direction: column;
  margin-top: 0;
`;

const PostDetails = ({post}: Props) => (
  <Card
    footer={<i>{post.title}</i>}
    header={
      <Title>
        {post.author} <small>{dateToWords(post.created_utc)}</small>
      </Title>
    }
  >
    {post.thumbnail && !["self", "default"].includes(post.thumbnail) && (
      <img alt="Post thumbnail" src={post.thumbnail} />
    )}
  </Card>
);

export default PostDetails;
