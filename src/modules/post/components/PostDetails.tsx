import React from "react";

import {Post} from "../typings/post";

type Props = {
  post: Post;
};

const PostDetails = ({post}: Props) => (
  <div>
    <h1>
      {post.author} <small>{post.created}</small>
    </h1>
    {post.thumbnail && <img alt="Post thumbnail" src={post.thumbnail} />}
    <p>{post.title}</p>
  </div>
);

export default PostDetails;
